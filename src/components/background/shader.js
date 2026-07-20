/*
 * SHADERS DO MESH DE FUNDO (WebGL)
 * -----------------------------------------------------------------------------
 * Um quad full-screen. O fragment shader gera um campo de ruído fluido (fbm com
 * "domain warp") e mistura 3 cores sobre o quase-preto — a c1 domina, a c3 entra
 * com pouco peso (disciplina anti-arco-íris embutida no próprio shader).
 * O movimento é MUITO lento (u_time * fator pequeno): aurora vista de longe.
 */

export const VERTEX = /* glsl */ `
  attribute vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

export const FRAGMENT = /* glsl */ `
  precision highp float;

  uniform vec2  u_res;
  uniform float u_time;
  uniform vec3  u_c1;   // cor dominante da seção
  uniform vec3  u_c2;   // variação/glow
  uniform vec3  u_c3;   // vizinha (peso baixo) — costura a próxima seção
  uniform float u_intensity;

  // --- Simplex noise 2D (Ashima Arts, domínio público) ---
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0))
                             + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // fbm com 3 oitavas — suficiente para manchas suaves, barato o bastante para 60fps
  float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++){
      v += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / u_res.xy;
    vec2 p  = uv;
    p.x *= u_res.x / u_res.y;   // corrige o aspecto para as manchas ficarem redondas

    float t = u_time * 0.045;   // <- lentidão proposital

    // domain warp: o ruído distorce a si mesmo, criando fluxo orgânico
    vec2 q = vec2(fbm(p * 1.2 + vec2(0.0, t)),
                  fbm(p * 1.2 + vec2(5.2, -t)));
    vec2 r = vec2(fbm(p * 1.2 + q * 1.4 + vec2(1.7, 9.2) + t * 0.6),
                  fbm(p * 1.2 + q * 1.4 + vec2(8.3, 2.8) - t * 0.6));
    float n = fbm(p * 1.2 + r * 1.1);
    n = n * 0.5 + 0.5;          // normaliza para 0..1

    // separa as 3 cores em bandas suaves de altitude do ruído
    float m1 = smoothstep(0.25, 0.72, n);
    float m2 = smoothstep(0.55, 0.98, n + r.x * 0.25);

    vec3 col = mix(u_c1, u_c2, m1);
    col = mix(col, u_c3, m2 * 0.55);   // c3 com peso menor (anti-arco-íris)

    // brilho concentrado nos picos -> fundo quase-preto com auroras de cor.
    // expoente alto = midtones mais escuros, picos vivos (mais contraste p/ o texto)
    float glow = pow(n, 2.3);
    vec3 outc = col * glow * u_intensity;

    // vinheta suave afunda as bordas
    float vig = smoothstep(1.25, 0.35, length(uv - 0.5));
    outc *= mix(0.72, 1.0, vig);

    // grão bem leve mata o banding sem virar "ruído de TV"
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    outc += (grain - 0.5) * 0.012;

    gl_FragColor = vec4(outc, 1.0);
  }
`;

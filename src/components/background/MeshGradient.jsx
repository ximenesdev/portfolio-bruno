/*
 * MESH GRADIENT — o "fundo camaleão".
 * -----------------------------------------------------------------------------
 * Desktop com mouse + movimento permitido -> canvas WebGL rodando o shader.
 * Mobile / touch / reduced-motion            -> fallback CSS estático (sem loop).
 *
 * Quando a seção ativa muda, o App passa novas cores/intensidade e aqui fazemos
 * um tween GSAP lento dos uniforms: é isso que faz o fundo "viajar" de cor.
 */
import { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import { hexToRgb01 } from "../../lib/math";
import { VERTEX, FRAGMENT } from "./shader";
import styles from "./MeshGradient.module.css";

const RENDER_SCALE = 0.55; // desenha em baixa resolução de propósito (mais suave + leve)

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("Shader:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function MeshGradient({ animated, colors, intensity }) {
  const canvasRef = useRef(null);
  // se o navegador não tiver WebGL, caímos no fallback CSS (nada de canvas preto)
  const [failed, setFailed] = useState(false);
  // Estado mutável lido a cada frame. Inicia já na paleta atual (sem flash).
  const uRef = useRef(null);
  if (uRef.current === null) {
    const [a, b, c] = colors.map(hexToRgb01);
    uRef.current = { c1: { ...a }, c2: { ...b }, c3: { ...c }, intensity, time: 0 };
  }

  // ---- Setup WebGL + loop (só no modo animado) ----
  useEffect(() => {
    if (!animated) return;
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) {
      setFailed(true); // sem WebGL: renderiza o fallback CSS
      return;
    }

    const prog = gl.createProgram();
    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // quad full-screen
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = {
      res: gl.getUniformLocation(prog, "u_res"),
      time: gl.getUniformLocation(prog, "u_time"),
      c1: gl.getUniformLocation(prog, "u_c1"),
      c2: gl.getUniformLocation(prog, "u_c2"),
      c3: gl.getUniformLocation(prog, "u_c3"),
      intensity: gl.getUniformLocation(prog, "u_intensity"),
    };

    const resize = () => {
      const w = Math.floor(canvas.clientWidth * RENDER_SCALE);
      const h = Math.floor(canvas.clientHeight * RENDER_SCALE);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    let raf;
    let last = performance.now();
    const render = (now) => {
      raf = requestAnimationFrame(render);
      // pausa quando a aba está oculta: nada de gastar GPU à toa
      if (document.hidden) {
        last = now;
        return;
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const u = uRef.current;
      u.time += dt;

      gl.uniform2f(U.res, canvas.width, canvas.height);
      gl.uniform1f(U.time, u.time);
      gl.uniform3f(U.c1, u.c1.r, u.c1.g, u.c1.b);
      gl.uniform3f(U.c2, u.c2.r, u.c2.g, u.c2.b);
      gl.uniform3f(U.c3, u.c3.r, u.c3.g, u.c3.b);
      gl.uniform1f(U.intensity, u.intensity);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [animated]);

  // ---- Troca de seção: tween lento dos uniforms (o "camaleão") ----
  useEffect(() => {
    if (!animated) return;
    const u = uRef.current;
    const [a, b, c] = colors.map(hexToRgb01);
    gsap.to(u.c1, { ...a, duration: 1.4, ease: "sine.inOut", overwrite: true });
    gsap.to(u.c2, { ...b, duration: 1.4, ease: "sine.inOut", overwrite: true });
    gsap.to(u.c3, { ...c, duration: 1.4, ease: "sine.inOut", overwrite: true });
    gsap.to(u, { intensity, duration: 1.4, ease: "sine.inOut", overwrite: "auto" });
  }, [animated, colors, intensity]);

  if (!animated || failed) {
    // Fallback estático: as cores vêm das CSS vars (--accent-rgb) que o App atualiza.
    return <div className={styles.fallback} aria-hidden="true" />;
  }

  return (
    <div className={styles.wrap} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}

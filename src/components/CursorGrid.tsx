"use client"

// Adapted from ReactBits CursorGrid (TS + Tailwind), reduced to the one look the hero uses:
// cells light up around the cursor, a soft spotlight reveals the grid lines, and a click sends a pulse.

import { useEffect, useRef } from "react"

const CELL = 60
const RADIUS = 90
const HOLD_SECONDS = 0.4
const FADE_SECONDS = 0.8
const PULSE_SPEED = 600
const INTRO_SECONDS = 1.4

const VERTEX = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`

const FRAGMENT = `#version 300 es
precision highp float;

const float MAX_OPACITY = 0.2;
const float FILL_OPACITY = 0.03;
const float SPOTLIGHT = 0.4;
const float EDGE_FADE = 0.2;

uniform vec2 uResolution;
uniform float uCellSize;
uniform float uLineWidth;
uniform float uOffset;
uniform sampler2D uState;
uniform ivec2 uCells;
uniform vec3 uColor;
uniform vec3 uGridColor;
uniform vec2 uMouse;
uniform float uRadius;
uniform float uPresence;
uniform float uReveal;

out vec4 outColor;

float level(vec2 cell) {
  if (cell.x < 0.0 || cell.y < 0.0 || cell.x >= float(uCells.x) || cell.y >= float(uCells.y)) return 0.0;
  float v = texelFetch(uState, ivec2(cell), 0).r;
  return v * v * (3.0 - 2.0 * v);
}

float line(float d) {
  float w = max(uLineWidth, 1.0);
  return clamp(w * 0.5 + 0.5 - d, 0.0, 1.0) * (uLineWidth / w);
}

vec2 smoother(vec2 a) {
  return a * a * a * (a * (a * 6.0 - 15.0) + 10.0);
}

void main() {
  vec2 pos = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y);
  vec2 g = (pos - uOffset) / uCellSize;
  vec2 cell = floor(g);
  vec2 f = g - cell;
  vec2 edge = min(f, 1.0 - f) * uCellSize;
  float vx = line(edge.x);
  float vy = line(edge.y);

  vec2 toMouse = pos - uMouse;
  float spot = exp(-dot(toMouse, toMouse) / (uRadius * uRadius) * 1.6) * SPOTLIGHT * uPresence;

  // Intro: the grid reveals outward from the center.
  vec2 center = uResolution * 0.5;
  float front = uReveal * (length(center) + uCellSize * 2.0);
  float shown = uReveal >= 1.0 ? 1.0 : smoothstep(front, front - uCellSize * 2.0, length(pos - center));

  vec2 norm = pos / uResolution;
  vec2 sa = smoother(clamp(norm / EDGE_FADE, 0.0, 1.0));
  vec2 sb = smoother(clamp((1.0 - norm) / EDGE_FADE, 0.0, 1.0));
  float fade = sa.x * sa.y * sb.x * sb.y;

  // A line lights up when either cell beside it is lit; corners also check the diagonal cell.
  float own = level(cell);
  vec2 side = step(0.5, f) * 2.0 - 1.0;
  float ex = max(own, level(cell + vec2(side.x, 0.0)));
  float ey = max(own, level(cell + vec2(0.0, side.y)));
  float joint = max(max(ex, ey), level(cell + side));
  float lit = max(vx * (edge.y < uLineWidth ? joint : ex), vy * (edge.x < uLineWidth ? joint : ey));

  float cellAlpha = clamp(max(lit * MAX_OPACITY, own * FILL_OPACITY), 0.0, 1.0) * fade;
  float gridAlpha = max(vx, vy) * min(spot * 0.45, 1.0) * fade * shown;
  float alpha = cellAlpha + gridAlpha * (1.0 - cellAlpha);
  outColor = vec4(uColor * cellAlpha + uGridColor * gridAlpha * (1.0 - cellAlpha), alpha);
}`

type Pulse = { x: number; y: number; t0: number; strength: number }

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const smoothstep = (t: number) => t * t * (3 - 2 * t)

function hexToRgb(hex: string): [number, number, number] {
  const num = parseInt(hex.replace("#", ""), 16)
  return [
    ((num >> 16) & 255) / 255,
    ((num >> 8) & 255) / 255,
    (num & 255) / 255,
  ]
}

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader
  gl.deleteShader(shader)
  return null
}

function link(gl: WebGL2RenderingContext) {
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX)
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
  const program = gl.createProgram()
  if (!vertex || !fragment || !program) return null
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  gl.deleteShader(vertex)
  gl.deleteShader(fragment)
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program
  gl.deleteProgram(program)
  return null
}

/** WebGL grid whose cells light up around the cursor. Colors are `#rrggbb`. */
export default function CursorGrid({
  color,
  gridColor,
  className,
}: {
  color: string
  gridColor: string
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const colorsRef = useRef({ color, gridColor })
  const redrawRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    colorsRef.current = { color, gridColor }
    redrawRef.current?.()
  }, [color, gridColor])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const gl = canvas?.getContext("webgl2", {
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
    })
    if (!container || !canvas || !gl) return
    const program = link(gl)
    if (!program) return
    const u = (name: string) => gl.getUniformLocation(program, name)
    const uniforms = {
      resolution: u("uResolution"),
      cellSize: u("uCellSize"),
      lineWidth: u("uLineWidth"),
      offset: u("uOffset"),
      state: u("uState"),
      cells: u("uCells"),
      color: u("uColor"),
      gridColor: u("uGridColor"),
      mouse: u("uMouse"),
      radius: u("uRadius"),
      presence: u("uPresence"),
      reveal: u("uReveal"),
    }

    const vao = gl.createVertexArray()
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1)

    const view = { width: 1, height: 1, ratio: 1 }
    const grid = { cols: 0, rows: 0 }
    const pointer = { x: 0, y: 0, inside: false }
    const mouse = { x: 0, y: 0 }
    const pulses: Pulse[] = []
    let levels = new Float32Array(0)
    let waves = new Float32Array(0)
    let targets = new Float32Array(0)
    let touched = new Float32Array(0)
    let pixels = new Uint8Array(0)
    let presence = 0
    let clock = 0
    let intro = 0
    let raf = 0
    let last = 0
    let visible = true
    let dirty = true

    const resize = () => {
      view.width = Math.max(1, container.clientWidth)
      view.height = Math.max(1, container.clientHeight)
      view.ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(view.width * view.ratio)
      canvas.height = Math.round(view.height * view.ratio)
      const cols = Math.ceil(view.width / CELL) + 1
      const rows = Math.ceil(view.height / CELL) + 1
      if (cols !== grid.cols || rows !== grid.rows) {
        grid.cols = cols
        grid.rows = rows
        levels = new Float32Array(cols * rows)
        waves = new Float32Array(cols * rows)
        targets = new Float32Array(cols * rows)
        touched = new Float32Array(cols * rows).fill(-1e9)
        pixels = new Uint8Array(cols * rows)
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.R8,
          cols,
          rows,
          0,
          gl.RED,
          gl.UNSIGNED_BYTE,
          pixels
        )
      }
      dirty = true
    }

    /** Calls `fn` for every cell whose center lies within `reach` of (x, y). */
    const eachCellNear = (
      x: number,
      y: number,
      reach: number,
      fn: (index: number, distance: number) => void
    ) => {
      const minCol = Math.max(0, Math.floor((x - reach) / CELL))
      const maxCol = Math.min(grid.cols - 1, Math.floor((x + reach) / CELL))
      const minRow = Math.max(0, Math.floor((y - reach) / CELL))
      const maxRow = Math.min(grid.rows - 1, Math.floor((y + reach) / CELL))
      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          const distance = Math.hypot(
            col * CELL + CELL / 2 - x,
            row * CELL + CELL / 2 - y
          )
          fn(row * grid.cols + col, distance)
        }
      }
    }

    const energize = (x: number, y: number) => {
      eachCellNear(x, y, RADIUS, (index, distance) => {
        if (distance > RADIUS) return
        const value = smoothstep(1 - distance / RADIUS)
        if (value > targets[index]) targets[index] = value
        touched[index] = clock
      })
    }

    const sweepPulses = () => {
      const ahead = CELL * 0.6
      const behind = CELL * 1.4
      const far = Math.hypot(view.width, view.height)
      waves.fill(0)
      for (let k = pulses.length - 1; k >= 0; k--) {
        const pulse = pulses[k]
        const ring = (clock - pulse.t0) * PULSE_SPEED
        if (ring - behind * 2 > far) {
          pulses.splice(k, 1)
          continue
        }
        if (ring < 0) continue
        const envelope =
          pulse.strength * Math.pow(Math.max(0, 1 - ring / (far + behind)), 0.6)
        eachCellNear(pulse.x, pulse.y, ring + ahead * 2, (index, distance) => {
          const off = distance - ring
          if (off > ahead * 2 || off < -behind * 2) return
          const t = off > 0 ? off / ahead : off / behind
          const value = envelope * Math.exp(-t * t)
          if (value > waves[index]) waves[index] = value
        })
      }
      dirty = true
    }

    const draw = () => {
      const { ratio } = view
      const lineWidth = ratio
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.bindVertexArray(vao)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      if (dirty) {
        for (let i = 0; i < levels.length; i++)
          pixels[i] = Math.round(
            clamp(Math.max(levels[i], waves[i]), 0, 1) * 255
          )
        gl.texSubImage2D(
          gl.TEXTURE_2D,
          0,
          0,
          0,
          grid.cols,
          grid.rows,
          gl.RED,
          gl.UNSIGNED_BYTE,
          pixels
        )
        dirty = false
      }
      gl.uniform1i(uniforms.state, 0)
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height)
      gl.uniform1f(uniforms.cellSize, CELL * ratio)
      gl.uniform1f(uniforms.lineWidth, lineWidth)
      // Odd line widths sit on half pixels to stay crisp.
      gl.uniform1f(uniforms.offset, Math.round(lineWidth) % 2 === 1 ? 0.5 : 0)
      gl.uniform2i(uniforms.cells, grid.cols, grid.rows)
      gl.uniform3fv(uniforms.color, hexToRgb(colorsRef.current.color))
      gl.uniform3fv(uniforms.gridColor, hexToRgb(colorsRef.current.gridColor))
      gl.uniform2f(uniforms.mouse, mouse.x * ratio, mouse.y * ratio)
      gl.uniform1f(uniforms.radius, RADIUS * ratio)
      gl.uniform1f(uniforms.presence, presence)
      gl.uniform1f(
        uniforms.reveal,
        intro >= 1 ? 1 : 1 - Math.pow(1 - intro, 2.2)
      )
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      gl.bindVertexArray(null)
    }

    const frame = (now: number) => {
      raf = 0
      if (!visible || document.hidden) return
      const dt = last ? clamp((now - last) / 1000, 0, 1 / 20) : 1 / 60
      last = now
      clock += dt
      if (intro < 1) intro = Math.min(1, intro + dt / INTRO_SECONDS)

      const follow = 1 - Math.exp(-dt / 0.07)
      mouse.x += (pointer.x - mouse.x) * follow
      mouse.y += (pointer.y - mouse.y) * follow
      const presenceGoal = pointer.inside ? 1 : 0
      presence += (presenceGoal - presence) * (1 - Math.exp(-dt / 0.25))

      if (pulses.length) sweepPulses()
      else if (waves.some((value) => value > 0)) {
        waves.fill(0)
        dirty = true
      }

      const fadeStep = dt / FADE_SECONDS
      const attack = 1 - Math.exp(-dt / 0.045)
      let active =
        pulses.length > 0 ||
        intro < 1 ||
        Math.abs(presence - presenceGoal) > 0.002
      for (let i = 0; i < levels.length; i++) {
        let target = targets[i]
        if (target <= 0 && levels[i] <= 0) continue
        if (clock - touched[i] > HOLD_SECONDS)
          target = Math.max(0, target - fadeStep)
        targets[i] = target
        const before = levels[i]
        const next =
          target > before ? before + (target - before) * attack : target
        levels[i] = next < 0.002 ? 0 : next
        if (levels[i] !== before) dirty = true
        if (levels[i] > 0 || targets[i] > 0) active = true
      }
      if (
        Math.abs(mouse.x - pointer.x) + Math.abs(mouse.y - pointer.y) > 0.05 &&
        presence > 0.002
      )
        active = true

      draw()
      if (active) raf = requestAnimationFrame(frame)
    }

    const wake = () => {
      if (raf || !visible || document.hidden) return
      last = 0
      raf = requestAnimationFrame(frame)
    }

    const locate = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      return {
        x,
        y,
        inside: x >= 0 && y >= 0 && x <= rect.width && y <= rect.height,
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const { x, y, inside } = locate(event)
      const was = pointer.inside
      pointer.inside = inside
      if (!inside) {
        if (was) wake()
        return
      }
      pointer.x = x
      pointer.y = y
      if (!was) {
        mouse.x = x
        mouse.y = y
      }
      energize(x, y)
      wake()
    }

    const onPointerDown = (event: PointerEvent) => {
      const { x, y, inside } = locate(event)
      if (!inside) return
      pulses.push({ x, y, t0: clock, strength: 1 })
      wake()
    }

    const onPointerLeave = () => {
      pointer.inside = false
      wake()
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      draw()
      wake()
    })
    resizeObserver.observe(container)
    const intersection = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting)
      wake()
    })
    intersection.observe(container)
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerdown", onPointerDown, { passive: true })
    document.documentElement.addEventListener("pointerleave", onPointerLeave)
    document.addEventListener("visibilitychange", wake)

    resize()
    pulses.push({
      x: view.width / 2,
      y: view.height / 2,
      t0: 0.15,
      strength: 0.6,
    })
    draw()
    wake()
    redrawRef.current = () => {
      draw()
      wake()
    }

    return () => {
      cancelAnimationFrame(raf)
      redrawRef.current = null
      resizeObserver.disconnect()
      intersection.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerdown", onPointerDown)
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave
      )
      document.removeEventListener("visibilitychange", wake)
      gl.deleteTexture(texture)
      gl.deleteVertexArray(vao)
      gl.deleteProgram(program)
      // No loseContext(): Strict Mode remounts on the same canvas and would get a lost context.
    }
  }, [])

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 block size-full"
      />
    </div>
  )
}

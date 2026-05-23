/*
  IslamicPattern.jsx
  مثلثات هندسية متشابكة — Interlocking nested triangles
  كل بلاطة: مثلث صاعد (▲) + نصفا مثلث هابط (▽) من الحافتين اليسرى واليمنى
  عند التكرار تتكامل الأنصاف لتكوّن مثلثات هابطة كاملة
  النتيجة: صف متواصل من ▲▽▲▽ بخطوط متداخلة
*/

import { useId } from 'react';

/** points string for a triangle shrunk t-fraction toward its centroid */
function shrink(ax, ay, bx, by, cx, cy, t) {
  const gx = (ax + bx + cx) / 3;
  const gy = (ay + by + cy) / 3;
  const p  = (vx, vy) =>
    `${+(gx + (1 - t) * (vx - gx)).toFixed(2)},${+(gy + (1 - t) * (vy - gy)).toFixed(2)}`;
  return `${p(ax, ay)} ${p(bx, by)} ${p(cx, cy)}`;
}

const RINGS = 3; // number of concentric rings per triangle

/** Render RINGS nested outlines for one triangle */
function nested(ax, ay, bx, by, cx, cy, color, sw, opacity) {
  return Array.from({ length: RINGS }, (_, i) => {
    const t = (i / (RINGS - 1)) * 0.70; // 0 = outer, 0.70 = innermost
    return (
      <polygon
        key={i}
        points={shrink(ax, ay, bx, by, cx, cy, t)}
        fill="none"
        stroke={color}
        strokeWidth={+(sw * (1 - i * 0.18)).toFixed(3)}
        opacity={+(opacity * (1 - i * 0.14)).toFixed(4)}
      />
    );
  });
}

export default function IslamicPattern({
  opacity = 0.09,
  color   = '#A89060',
  size    = 80,           // tile width in px
  style   = {},
}) {
  const uid = useId().replace(/:/g, 'p');
  const W   = size;
  const H   = Math.round(W * 0.70); // tile height — triangle steepness ratio

  /*
    Tile [0,W] × [0,H] contains:

    1.  UP triangle  — fully inside tile
        apex (W/2, 0)  base-left (0,H)  base-right (W,H)

    2a. DOWN-left half — right portion visible (x: 0 → W/2)
        Full DOWN apex (0,H), base (-W/2,0)→(W/2,0); SVG clips left half

    2b. DOWN-right half — left portion visible (x: W/2 → W)
        Full DOWN apex (W,H), base (W/2,0)→(3W/2,0); SVG clips right half

    When tiled, 2a from tile N and 2b from tile N-1 together form one
    complete downward triangle at every junction — seamless.
  */

  const sw = 0.68;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%" height="100%"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, ...style }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={uid}
          x="0" y="0"
          width={W} height={H}
          patternUnits="userSpaceOnUse"
        >
          {/* ── ▲ UP triangle ── */}
          {nested(W/2, 0,  0, H,  W, H,  color, sw, opacity)}

          {/* ── ▽ DOWN-left (apex left edge — right half visible in tile) ── */}
          {nested(0, H,  -W/2, 0,  W/2, 0,  color, sw, opacity)}

          {/* ── ▽ DOWN-right (apex right edge — left half visible in tile) ── */}
          {nested(W, H,  W/2, 0,  3*W/2, 0,  color, sw, opacity)}
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${uid})`} />
    </svg>
  );
}

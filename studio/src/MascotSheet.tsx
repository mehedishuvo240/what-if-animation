import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Mascot, baseMascotPose, MascotPose } from './engine/mascot';

// The character reference sheet: front, side and back views plus a row of facial expressions.
// Render it with: npx remotion still src/index.ts MascotSheet out/mascot-sheet.png

const Label: React.FC<{ x: number; y: number; text: string }> = ({ x, y, text }) => (
  <text x={x} y={y} textAnchor="middle" fontFamily="sans-serif" fontSize={26} fill="#F6EFE3" letterSpacing={1.5}>
    {text}
  </text>
);

const P = (o: Partial<MascotPose>): MascotPose => ({ ...baseMascotPose, ...o });

const FRONT = { x: 0, y: 0, scale: 1, yaw: 0, look: 0 };
const SIDE_L = { x: 0, y: 0, scale: 1, yaw: -0.95, look: -0.8 };
const SIDE_R = { x: 0, y: 0, scale: 1, yaw: 0.95, look: 0.8 };
const BACK = { x: 0, y: 0, scale: 1, yaw: 0, look: 0 };

export const MascotSheet: React.FC = () => {
  const views = [
    { name: 'FRONT', p: P({ ...FRONT, expr: 'neutral', yaw: 0, look: 0 }) },
    { name: 'SIDE (LEFT)', p: P({ ...SIDE_L, expr: 'neutral', yaw: -0.95, look: -0.8 }) },
    { name: 'SIDE (RIGHT)', p: P({ ...SIDE_R, expr: 'neutral', yaw: 0.95, look: 0.8 }) },
    { name: 'BACK', p: P({ ...BACK, expr: 'neutral', yaw: 0, look: 0 }) },
  ];
  const exprs: { name: string; p: Partial<MascotPose> }[] = [
    { name: 'neutral', p: { expr: 'neutral', yaw: 0.2, look: 0.4 } },
    { name: 'happy', p: { expr: 'happy', yaw: 0.2, look: 0.4 } },
    { name: 'shock', p: { expr: 'shock', yaw: 0.1, look: 0.2 } },
    { name: 'worried', p: { expr: 'worried', yaw: 0.15, look: -0.3 } },
    { name: 'smug', p: { expr: 'smug', yaw: 0.25, look: 0.6 } },
    { name: 'oops', p: { expr: 'oops', yaw: 0.1, look: -0.2 } },
    { name: 'cool', p: { expr: 'cool', yaw: 0.3, look: 0.7 } },
    { name: 'tired', p: { expr: 'tired', yaw: 0.15, look: 0.1 } },
  ];
  return (
    <AbsoluteFill style={{ backgroundColor: '#14101C' }}>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        {/* title */}
        <text x={960} y={60} textAnchor="middle" fontFamily="sans-serif" fontSize={44} fill="#FFD96A" letterSpacing={3}>
          MASCOT REFERENCE SHEET
        </text>
        <text x={960} y={92} textAnchor="middle" fontFamily="sans-serif" fontSize={20} fill="#E2D3BE" letterSpacing={2}>
          ORIGINAL CHARACTER · CONSISTENT ACROSS EVERY SCENE
        </text>

        {/* views row */}
        <g transform="translate(120 220)">
          <rect x={0} y={0} width={1680} height={330} fill="#0B0816" rx={14} stroke="#3A3446" strokeWidth={2} />
          {views.map((v, i) => (
            <g key={v.name} transform={`translate(${i * 420 + 210} 170)`}>
              <Mascot pose={v.p} shadow={0.7} rimId="rimR" />
              <Label x={0} y={150} text={v.name} />
            </g>
          ))}
        </g>

        {/* expressions row */}
        <g transform="translate(120 600)">
          <rect x={0} y={0} width={1680} height={420} fill="#0B0816" rx={14} stroke="#3A3446" strokeWidth={2} />
          <text x={840} y={36} textAnchor="middle" fontFamily="sans-serif" fontSize={22} fill="#FFD96A" letterSpacing={2}>
            FACIAL EXPRESSIONS
          </text>
          {exprs.map((e, i) => (
            <g key={e.name} transform={`translate(${i * 210 + 105} 240)`}>
              <Mascot pose={P({ ...e.p, scale: 0.85 })} shadow={0.6} rimId="rimR" />
              <Label x={0} y={140} text={e.name.toUpperCase()} />
            </g>
          ))}
        </g>

        {/* design notes */}
        <g transform="translate(120 1060)">
          <rect x={0} y={0} width={1680} height={1} fill="#3A3446" />
          <text x={840} y={110} textAnchor="middle" fontFamily="sans-serif" fontSize={18} fill="#B9C4D6" letterSpacing={1}>
            CHUBBY · SHORT · ROUNDED BODY · LARGE ROUNDED HEAD · BIG BRIGHT WHITE EYES ·
            OVERSIZED ORANGE HOODIE · DARK NAVY TROUSERS · LARGE WHITE SNEAKERS ·
            SMALL ROUNDED HANDS AND FEET
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};

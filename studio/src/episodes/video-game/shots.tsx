import React from 'react';
import {
  Mascot, baseMascotPose, MascotPose, mascotPoseAt, mascotFaceAt, MASCOT, MLEG_LEN, makeRoom, Box, S3, WallTexture, RoomCorners,
  SkyView, Glow, Cone, LightVeil, Dust, Foreground, camT, kf, clamp, lerp, easeInOut, easeOut, easeIn, rnd, ShotProps,
} from '../../engine';

// "What If You Were Trapped in a Video Game?" — 16 scenes, 3 minutes, 16:9, 30 fps.
// Every shot is a pure function of its own clock t. The mascot (approved orange-hoodie design) is drawn
// with the Mascot rig so it never drifts between shots.

// ---------- shared: a blocky video-game living room ----------
const LR = makeRoom({ x: 960, y: 500 }, { x0: 520, x1: 1400, y0: 320, y1: 740 }, 3.4);
const LR_FLOOR_Y = 740;

const LivingRoomWalls = ({ t }: { t: number }) => {
  const { P, Q } = LR;
  return (
    <g>
      <polygon points={Q([[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]])} fill="#1A1220" />
      <polygon points={Q([[0, 0, 0], [0, 1, 0], [1, 1, 0], [1, 0, 0]])} fill="#3A2E40" />
      <WallTexture rect={[520, 320, 880, 420]} />
      <polygon points={Q([[0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 1, 0]])} fill="#2E2434" />
      <polygon points={Q([[1, 0, 0], [1, 0, 1], [1, 1, 1], [1, 1, 0]])} fill="#2E2434" />
      <RoomCorners x0={520} x1={1400} y0={320} y1={740} />
      <polygon points={Q([[0, 1, 0], [1, 1, 0], [1, 1, 1], [0, 1, 1]])} fill="#2A1E26" />
      <WallTexture rect={[520, 720, 880, 20]} />
      <rect x={520} y={716} width={880} height={24} fill="#1A1220" />
      <polygon points={Q([[0, 0.965, 0], [0, 0.965, 1], [0, 1, 1], [0, 1, 0]])} fill="#1A1220" />
      <polygon points={Q([[1, 0.965, 0], [1, 0.965, 1], [1, 1, 1], [1, 1, 0]])} fill="#1A1220" />
      <ellipse cx={960} cy={736} rx={60} ry={16} fill="#000" opacity={0.35} />
      <ellipse cx={960} cy={734} rx={44} ry={12} fill="#FFD96A" stroke="#B87A10" strokeWidth={3} />
      <circle cx={960} cy={734} r={22} fill="#FFD96A" />
      <circle cx={960} cy={734} r={14} fill="#FFF3DC" />
      {Math.sin(t / 10) > 0 ? <circle cx={960} cy={734} r={10} fill="#FFD96A" opacity={0.6} /> : null}
      <Glow x={960} y={734} r={260} o={0.3} />
    </g>
  );
};

const Fridge = ({ x, y }: { x: number; y: number }) => (
  <g>
    <rect x={x - 70} y={y - 300} width={140} height={300} rx={6} fill="#242030" stroke="#121019" strokeWidth={3} />
    <rect x={x - 56} y={y - 286} width={112} height={24} rx={4} fill="#8A8EA6" />
    <Glow x={x} y={y - 150} r={200} o={0.25} kind="cool" />
  </g>
);

const Couch = ({ x, y }: { x: number; y: number }) => (
  <g>
    <rect x={x - 140} y={y - 90} width={280} height={90} rx={12} fill="#2A2434" stroke="#121019" strokeWidth={3} />
    <rect x={x - 132} y={y - 98} width={264} height={16} rx={8} fill="#3A3446" />
    <rect x={x - 120} y={y - 70} width={240} height={40} rx={10} fill="#242030" />
    <Glow x={x} y={y - 40} r={180} o={0.15} />
  </g>
);

const standPose = (x: number, yaw: number = 0, look: number = 0): MascotPose => ({
  ...baseMascotPose,
  x,
  y: LR_FLOOR_Y - MLEG_LEN,
  scale: 1,
  yaw,
  look,
  armL: { a: 10, b: -8 },
  armR: { a: 10, b: -8 },
  legL: { a: 5, b: 0 },
  legR: { a: -5, b: 0 },
  expr: 'neutral',
  handL: 'open',
  handR: 'open',
});

// ---------- V1: wide, living room, respawn ----------
export const V1: React.FC<ShotProps> = ({ t, len }) => {
  const pose = mascotPoseAt(t, [
    { f: 0, p: { ...standPose(960, 0, 0), squash: 0.15 } },
    { f: 8, p: { ...standPose(960, 0, 0), squash: 0 } },
    { f: 16, p: { ...standPose(960, 0.1, 0.3), armR: { a: 14, b: -6 } } },
    { f: 30, p: { ...standPose(960, 0.1, 0.3), armR: { a: 14, b: -6 } } },
  ]);
  const face = mascotFaceAt(t, [[0, 'shock'], [10, 'worried']]);
  return (
    <g transform={camT(kf(t, [[0, 960], [len, 940]]), kf(t, [[0, 500], [len, 520]]), kf(t, [[0, 1.15], [len, 1.3]]))}>
      <LivingRoomWalls t={t} />
      <Glow x={1080} y={470} r={600} o={0.35} />
      <Fridge x={1260} y={700} />
      <Couch x={740} y={700} />
      <Mascot pose={{ ...pose, ...face }} shadow={0.7} rimId="rimR" />
      <Foreground blur={10}>
        <rect x={-400} y={780} width={2720} height={300} fill="#0E0A16" />
      </Foreground>
    </g>
  );
};

// ---------- V2: medium, jump on couch ----------
export const V2: React.FC<ShotProps> = ({ t, len }) => {
  const bounce = Math.min(t / 8, 1);
  const lift = Math.sin(bounce * Math.PI) * 110;
  const pose = mascotPoseAt(t, [
    { f: 0, p: { ...standPose(740, 0.2, 0.4), y: LR_FLOOR_Y - MLEG_LEN - lift } },
    { f: 6, p: { ...standPose(740, 0.2, 0.4), y: LR_FLOOR_Y - MLEG_LEN - lift, armL: { a: 100, b: 20 }, armR: { a: 100, b: 20 } } },
    { f: 14, p: { ...standPose(740, 0.2, 0.4), y: LR_FLOOR_Y - MLEG_LEN - lift } },
    { f: 24, p: { ...standPose(740, 0.2, 0.4), y: LR_FLOOR_Y - MLEG_LEN } },
  ]);
  const face = mascotFaceAt(t, [[0, 'happy'], [12, 'shock']]);
  return (
    <g transform={camT(kf(t, [[0, 740], [len, 760]]), kf(t, [[0, 520], [len, 500]]), kf(t, [[0, 1.7], [len, 1.9]]))}>
      <LivingRoomWalls t={t} />
      <Fridge x={1260} y={700} />
      <Couch x={740} y={700} />
      <Mascot pose={{ ...pose, ...face }} shadow={0.6} rimId="rimR" />
    </g>
  );
};

// ---------- V3: macro insert, glowing cookie ----------
const cookiePulse = (t: number) => 1 + 0.15 * Math.sin(t / 6);
export const V3: React.FC<ShotProps> = ({ t }) => {
  const cx = 960, cy = 540;
  const s = cookiePulse(t);
  return (
    <g transform={camT(kf(t, [[0, 960], [22, 960]]), kf(t, [[0, 540], [22, 540]]), kf(t, [[0, 3.2], [22, 3.6]]))}>
      <rect x={0} y={0} width={1920} height={1080} fill="#14101C" />
      <Glow x={cx} y={cy} r={500} o={0.5} />
      <ellipse cx={cx} cy={cy} rx={110 * s} ry={66 * s} fill="#3A2E40" stroke="#121019" strokeWidth={4} />
      <ellipse cx={cx} cy={cy} rx={86 * s} ry={52 * s} fill="#F6EFE3" />
      <circle cx={cx} cy={cy - 8} r={34 * s} fill="#FFD96A" />
      <circle cx={cx + 10 * s} cy={cy - 14} r={14 * s} fill="#FFF3DC" />
      <ellipse cx={cx} cy={cy + 4} rx={44 * s} ry={10} fill="#E8C46A" opacity={0.6} />
      <g transform={camT(960, 860, 1)}>
        <path d="M 860 720 Q 960 540 1060 720" stroke="#121019" strokeWidth={70} fill="none" strokeLinecap="round" />
        <path d="M 860 720 Q 960 540 1060 720" stroke="#E2D3BE" strokeWidth={54} fill="none" strokeLinecap="round" />
        <circle cx={960} cy={540} r={42} fill="#F6EFE3" stroke="#121019" strokeWidth={3} />
      </g>
    </g>
  );
};

// ---------- V4: wide camera follows, double-jump off fridge ----------
export const V4: React.FC<ShotProps> = ({ t, len }) => {
  const phase = Math.min(t / 14, 1);
  const arc = Math.sin(phase * Math.PI);
  const x = lerp(960, 1260, phase);
  const y = lerp(740 - MLEG_LEN, 740 - MLEG_LEN - 160 * arc, phase);
  const pose = mascotPoseAt(t, [
    { f: 0, p: { ...standPose(960, 0.2, 0.3), y } },
    { f: 8, p: { ...standPose(1120, 0.4, 0.2), y, armL: { a: 140, b: 30 }, armR: { a: 140, b: 30 }, squash: -0.06 } },
    { f: 14, p: { ...standPose(1260, 0.6, 0.1), y: 740 - MLEG_LEN } },
  ]);
  const face = mascotFaceAt(t, [[0, 'happy'], [8, 'shock']]);
  return (
    <g transform={camT(kf(t, [[0, 1000], [len, 1260]]), kf(t, [[0, 520], [len, 460]]), kf(t, [[0, 1.5], [len, 1.6]]))}>
      <LivingRoomWalls t={t} />
      <Fridge x={1260} y={700} />
      <Couch x={740} y={700} />
      <Mascot pose={{ ...pose, ...face }} shadow={0.6} rimId="rimR" />
    </g>
  );
};

// ---------- V5: medium, pause time ----------
export const V5: React.FC<ShotProps> = ({ t, len }) => {
  const frozen = t > 10;
  const pose = mascotPoseAt(t, [
    { f: 0, p: { ...standPose(960, 0.1, 0.2) } },
    { f: 10, p: { ...standPose(960, 0.1, 0.2), look: 0.8 } },
    { f: 30, p: { ...standPose(960, 0.1, 0.8), armR: { a: 20, b: -10 } } },
  ]);
  const face = mascotFaceAt(t, [[0, 'worried'], [12, 'smug']]);
  const freezeTint = frozen ? <rect x={0} y={0} width={1920} height={1080} fill="#00FFFF" opacity={0.12} /> : null;
  return (
    <g transform={camT(kf(t, [[0, 960], [len, 960]]), kf(t, [[0, 520], [len, 520]]), kf(t, [[0, 1.8], [len, 1.85]]))}>
      <LivingRoomWalls t={t} />
      <Fridge x={1260} y={700} />
      <Couch x={740} y={700} />
      {Array.from({ length: 20 }).map((_, i) => (
        <circle key={i} cx={500 + rnd(i, 1) * 920} cy={400 + rnd(i, 2) * 340} r={1.2 + rnd(i, 3) * 2} fill="#E2D3BE" opacity={0.5} />
      ))}
      <Mascot pose={{ ...pose, ...face }} shadow={0.6} rimId="rimR" />
      {freezeTint}
    </g>
  );
};

// ---------- V6: top-down, fall and respawn ----------
export const V6: React.FC<ShotProps> = ({ t, len }) => {
  const falling = t < 12;
  const p = clamp(t / 12);
  const y = falling ? lerp(100, 740 - MLEG_LEN, easeIn(p)) : 740 - MLEG_LEN;
  const spin = falling ? lerp(0, 720, p) : 0;
  const squash = t >= 12 && t < 18 ? 0.12 * Math.sin(((t - 12) / 6) * Math.PI) : 0;
  const pose: MascotPose = {
    ...baseMascotPose,
    x: 960,
    y,
    scale: 1,
    facing: 1,
    tilt: 0,
    spin,
    headTilt: 0,
    armL: { a: 100, b: 20 },
    armR: { a: 100, b: 20 },
    legL: { a: 40, b: -30 },
    legR: { a: -40, b: -30 },
    expr: falling ? 'shock' : 'neutral',
    blink: 0,
    look: 0,
    yaw: 0,
    squash,
    handL: 'open',
    handR: 'open',
    sway: 0,
  };
  const face = mascotFaceAt(t, [[0, 'shock'], [14, 'neutral']]);
  return (
    <g transform={`translate(960 540) rotate(${t * 0.05}) scale(${1 + t * 0.001}) translate(-960 -540)`}>
      <rect x={0} y={0} width={1920} height={1080} fill="#14101C" />
      <g filter="url(#blur10)">
        <LivingRoomWalls t={t + 200} />
      </g>
      <Mascot pose={{ ...pose, ...face }} shadow={0} rimId="rimR" />
      <Glow x={960} y={740 - MLEG_LEN} r={120} o={0.4} />
    </g>
  );
};

// ---------- V7: over the shoulder, NPC ----------
export const V7: React.FC<ShotProps> = ({ t, len }) => {
  const talking = Math.sin(t / 4) > 0;
  return (
    <g transform={camT(kf(t, [[0, 1060], [len, 1080]]), kf(t, [[0, 540], [len, 520]]), kf(t, [[0, 1.9], [len, 2.0]]))}>
      <LivingRoomWalls t={t} />
      <Fridge x={1260} y={700} />
      <Couch x={740} y={700} />
      <g transform="translate(1200 640)">
        <ellipse cx={0} cy={0} rx={70} ry={50} fill="#2A2434" stroke="#121019" strokeWidth={4} />
        <rect x={-24} y={-18} width={48} height={34} rx={8} fill="#121019" />
        {talking ? <rect x={-10} y={-4} width={20} height={10} rx={4} fill="#FFD96A" /> : null}
        <circle cx={-20} cy={-10} r={6} fill="#F6EFE3" />
        <circle cx={20} cy={-10} r={6} fill="#F6EFE3" />
        <circle cx={-20} cy={-10} r={2.5} fill="#121019" />
        <circle cx={20} cy={-10} r={2.5} fill="#121019" />
      </g>
      <Foreground blur={16}>
        <Mascot pose={{ ...standPose(1060, -0.3, 0.8), scale: 1.1 }} shadow={0} rimId="rimR" />
      </Foreground>
    </g>
  );
};

// ---------- V8: extreme close-up, blocky wall ----------
export const V8: React.FC<ShotProps> = ({ t }) => {
  const sc = 5;
  return (
    <g transform={camT(960, 540, kf(t, [[0, 1], [14, 1.05]]))}>
      <rect x={0} y={0} width={1920} height={1080} fill="#14101C" />
      <g filter="url(#blur16)">
        <rect x={700} y={300} width={520} height={480} fill="#3A2E40" />
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={i} x={740 + i * 70} y={380} width={48} height={48} rx={4} fill="#2E2434" stroke="#121019" strokeWidth={2} />
        ))}
      </g>
      <rect x={0} y={0} width={1920} height={1080} fill="#07040C" opacity={0.25} />
      <Mascot pose={{ ...standPose(960, 0.2, 0.4), scale: sc, x: 960, y: 740 - MLEG_LEN * sc }} shadow={0} rimId="rimR" />
    </g>
  );
};

// ---------- V9: wide, no exit door ----------
export const V9: React.FC<ShotProps> = ({ t, len }) => {
  return (
    <g transform={camT(kf(t, [[0, 960], [len, 960]]), kf(t, [[0, 500], [len, 520]]), kf(t, [[0, 1.0], [len, 1.05]]))}>
      <LivingRoomWalls t={t} />
      <Fridge x={1260} y={700} />
      <Couch x={740} y={700} />
      <Mascot pose={{ ...standPose(960, 0, 0), armL: { a: 160, b: 100 }, armR: { a: 160, b: 100 } }} shadow={0.7} rimId="rimR" />
      <Glow x={960} y={340} r={400} o={0.15} />
    </g>
  );
};

// ---------- V10: medium low angle, glitchy figure ----------
const glitchOffset = (t: number) => Math.sin(t * 7) * (t % 10 > 5 ? 8 : -8);
export const V10: React.FC<ShotProps> = ({ t, len }) => {
  const gx = glitchOffset(t);
  return (
    <g transform={camT(kf(t, [[0, 960], [len, 960 + gx]]), kf(t, [[0, 620], [len, 600]]), kf(t, [[0, 1.6], [len, 1.7]]))}>
      <LivingRoomWalls t={t} />
      <Fridge x={1260} y={700} />
      <Couch x={740} y={700} />
      <g transform={`translate(700 640) scale(${0.9 + 0.02 * Math.sin(t / 3)})`}>
        <ellipse cx={0} cy={0} rx={60} ry={50} fill="#121019" />
        <rect x={-20} y={-16} width={40} height={28} rx={6} fill="#0A080E" />
        <circle cx={-18} cy={-8} r={7} fill="#00FF41" />
        <circle cx={18} cy={-8} r={7} fill="#00FF41" />
        <circle cx={-18} cy={-8} r={2.5} fill="#121019" />
        <circle cx={18} cy={-8} r={2.5} fill="#121019" />
        <rect x={-24} y={4} width={48} height={4} rx={2} fill="#00FF41" opacity={0.5} />
        <Glow x={0} y={-10} r={120} o={0.4} kind="cool" />
        {t % 6 < 1 ? <rect x={-60} y={-80} width={120} height={40} fill="#FF0000" opacity={0.3} /> : null}
      </g>
      <Mascot pose={{ ...standPose(960, 0.2, 0.6), expr: 'worried' }} shadow={0.6} rimId="rimR" />
    </g>
  );
};

// ---------- V11: extreme close-up, unblinking eye ----------
export const V11: React.FC<ShotProps> = ({ t }) => {
  const pulse = 1 + 0.05 * Math.sin(t / 5);
  return (
    <g transform={camT(960, 540, kf(t, [[0, 4], [18, 4.4]]))}>
      <rect x={0} y={0} width={1920} height={1080} fill="#0A080E" />
      <ellipse cx={960} cy={540} rx={220 * pulse} ry={150 * pulse} fill="#121019" />
      <circle cx={960} cy={540} r={90 * pulse} fill="#00FF41" />
      <circle cx={960 + 12} cy={540} r={34 * pulse} fill="#121019" />
      <circle cx={960 + 14} cy={540 - 4} r={8} fill="#FFF3DC" />
      <Glow x={960} y={540} r={300} o={0.35} kind="cool" />
    </g>
  );
};

// ---------- V12: wide, loading screen ----------
export const V12: React.FC<ShotProps> = ({ t, len }) => {
  const p = clamp((t - 10) / 20);
  const barW = lerp(0, 700, p);
  return (
    <g transform={camT(kf(t, [[0, 960], [len, 960]]), kf(t, [[0, 500], [len, 520]]), kf(t, [[0, 1.0], [len, 1.05]]))}>
      <rect x={0} y={0} width={1920} height={1080} fill="#0A080E" />
      <rect x={610} y={500} width={700} height={6} rx={3} fill="#242030" />
      <rect x={610} y={500} width={barW} height={6} rx={3} fill="#FFD96A" />
      <Glow x={610 + barW} y={503} r={100} o={0.6} />
      <text x={960} y={440} textAnchor="middle" fontFamily="monospace" fontSize={28} fill="#E2D3BE" letterSpacing={4}>
        LOADING... {Math.floor(p * 100)}%
      </text>
      <g transform="translate(960 620)">
        <ellipse cx={0} cy={-40} rx={70} ry={55} fill="#F6EFE3" stroke="#121019" strokeWidth={3} />
        <rect x={-28} y={-12} width={56} height={26} rx={6} fill="#121019" />
        <circle cx={-22} cy={-6} r={7} fill="#F6EFE3" />
        <circle cx={22} cy={-6} r={7} fill="#F6EFE3" />
        <circle cx={-22} cy={-6} r={2.5} fill="#121019" />
        <circle cx={22} cy={-6} r={2.5} fill="#121019" />
        <rect x={0} y={80} width={120} height={160} rx={10} fill="#0A080E" stroke="#121019" strokeWidth={3} />
        <Glow x={0} y={-40} r={140} o={0.3} />
      </g>
      <Mascot pose={{ ...standPose(700, 0.5, 0.2), expr: 'worried' }} shadow={0.7} rimId="rimR" />
    </g>
  );
};

// ---------- V13: medium, timer countdown ----------
export const V13: React.FC<ShotProps> = ({ t, len }) => {
  const secs = Math.max(0, 10 - Math.floor(t / 6));
  return (
    <g transform={camT(kf(t, [[0, 960], [len, 960]]), kf(t, [[0, 520], [len, 500]]), kf(t, [[0, 1.7], [len, 1.8]]))}>
      <rect x={0} y={0} width={1920} height={1080} fill="#0A080E" />
      <rect x={610} y={500} width={700} height={6} rx={3} fill="#242030" />
      <rect x={610} y={500} width={700} height={6} rx={3} fill="#FF3344" />
      <Glow x={960} y={503} r={120} o={0.7} />
      <text x={960} y={430} textAnchor="middle" fontFamily="monospace" fontSize={64} fill="#FF3344" letterSpacing={8}>
        00:{secs < 10 ? '0' : ''}{secs}
      </text>
      <Mascot pose={{ ...standPose(960, 0.1, -0.2), expr: 'shock', armL: { a: 150, b: 60 }, armR: { a: 150, b: 60 } }} shadow={0.7} rimId="rimR" />
    </g>
  );
};

// ---------- V14: low angle slow push in, boss door ----------
export const V14: React.FC<ShotProps> = ({ t, len }) => {
  const open = clamp((t - 10) / 20);
  const doorW = lerp(0, 340, open);
  return (
    <g transform={camT(kf(t, [[0, 960], [len, 960]]), kf(t, [[0, 700], [len, 600]]), kf(t, [[0, 1.0], [len, 1.35]]))}>
      <rect x={0} y={0} width={1920} height={1080} fill="#0A080E" />
      <rect x={790} y={300} width={340} height={500} rx={6} fill="#1A1220" stroke="#121019" strokeWidth={4} />
      <rect x={790} y={300} width={340} height={8} rx={4} fill="#FF3344" />
      <Glow x={960} y={550} r={400} o={0.5} />
      <g transform={`translate(960 550)`}>
        <rect x={-doorW / 2} y={-250} width={doorW} height={500} rx={6} fill="#050408" />
        <rect x={-doorW / 2} y={-250} width={doorW} height={6} rx={3} fill="#FF3344" />
      </g>
      <Mascot pose={{ ...standPose(960, -0.1, 0.4), expr: 'worried', scale: 1.2 }} shadow={0} rimId="rimR" />
    </g>
  );
};

// ---------- V15: extreme close-up, one life left ----------
export const V15: React.FC<ShotProps> = ({ t }) => {
  const beat = 1 + 0.1 * Math.sin(t / 3);
  return (
    <g transform={camT(960, 540, kf(t, [[0, 5], [12, 5.4]]))}>
      <rect x={0} y={0} width={1920} height={1080} fill="#0A080E" />
      <Glow x={960} y={540} r={260} o={0.5} />
      {[-34, 0, 34].map((dx, i) => (
        <g key={i} transform={`translate(${960 + dx * beat} ${540})`}>
          <path d="M 0 -26 L 16 4 L 0 10 L -16 4 Z" fill={i === 0 ? '#FF3344' : '#2A1212'} />
          <circle cx={0} cy={0} r={6} fill={i === 0 ? '#FF5A5A' : '#1A0A0A'} />
        </g>
      ))}
      <text x={960} y={700} textAnchor="middle" fontFamily="monospace" fontSize={26} fill="#E2D3BE" letterSpacing={3}>
        1 LIFE LEFT
      </text>
    </g>
  );
};

// ---------- V16: title wide, cliffhanger ----------
export const V16: React.FC<ShotProps> = ({ t, len }) => {
  const fade = clamp(t / 12);
  return (
    <g transform={camT(kf(t, [[0, 960], [len, 960]]), kf(t, [[0, 500], [len, 520]]), kf(t, [[0, 1.0], [len, 1.05]]))}>
      <rect x={0} y={0} width={1920} height={1080} fill="#0A080E" />
      <rect x={790} y={300} width={340} height={500} rx={6} fill="#1A1220" stroke="#121019" strokeWidth={4} />
      <Glow x={960} y={550} r={300} o={0.4} />
      <Mascot pose={{ ...standPose(960, -0.1, 0.4), expr: 'shock', scale: 1.2 }} shadow={0} rimId="rimR" />
      <rect x={0} y={0} width={1920} height={1080} fill="#000000" opacity={fade * 0.95} />
      <text x={960} y={540} textAnchor="middle" fontFamily="monospace" fontSize={40} fill="#FFF3DC" letterSpacing={6} opacity={1 - fade * 0.5}>
        PART 1 OF 2
      </text>
    </g>
  );
};

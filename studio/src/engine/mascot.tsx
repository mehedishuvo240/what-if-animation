import React from 'react';

// The mascot rig: one original character drawn in code, in the same style as the Hero rig
// (flat fills, a darker shade on the side away from the light, a warm rim line on the lit edge,
// a contact shadow). Every view draws the same body, clothes and colours so the character never
// drifts between shots.
//
// Design: chubby, short, rounded body. Large rounded head. Big bright white expressive eyes.
// Always wears an oversized orange hoodie. Dark navy trousers. Large white sneakers. Small rounded
// hands and feet. Cinematic 2D cartoon animation style.

export const MASCOT = {
  skin: '#F6EFE3',
  skinShade: '#E2D3BE',
  ink: '#1D2033',
  // oversized orange hoodie
  hoodie: '#FF7A3D',
  hoodieShade: '#E85A2A',
  hoodieLining: '#FFB46A',
  // dark navy trousers
  trousers: '#1E2A44',
  trousersShade: '#151F34',
  // large white sneakers
  shoe: '#FFFFFF',
  shoeSole: '#EDE5D8',
  shoeLace: '#1D2033',
  // drawstrings match the hoodie's bright side
  drawstring: '#FFD96A',
  line: '#121019',
  // big bright white eyes
  eye: '#FFFFFF',
  eyeShade: '#E8E2D6',
  pupil: '#1D2033',
};

export type MascotExpr =
  | 'neutral'
  | 'happy'
  | 'shock'
  | 'worried'
  | 'smug'
  | 'oops'
  | 'cool'
  | 'tired'
  | 'dizzy';

export type MascotPose = {
  x: number;
  y: number; // hip point
  scale: number;
  facing: 1 | -1; // which way legs swing forward
  tilt: number; // torso lean around the hips, degrees, + leans screen-right
  spin: number; // whole-body rotation about the chest
  headTilt: number;
  armL: { a: number; b: number }; // upper arm angle, lower arm bend (degrees)
  armR: { a: number; b: number };
  legL: { a: number; b: number };
  legR: { a: number; b: number };
  expr: MascotExpr;
  blink: number; // 0 open, 1 shut
  look: number; // -1..1 eye direction
  yaw: number; // -1 profile facing screen-left, 0 front, 1 profile facing screen-right
  squash: number; // + squashes (landing), - stretches (jump), about the feet
  handL: 'open' | 'point';
  handR: 'open' | 'point';
  sway: number; // loose things (drawstrings) swing, degrees-ish
  glint?: number; // 0..1 eyes light up
  glintColor?: string;
};

export const baseMascotPose: MascotPose = {
  x: 960,
  y: 700,
  scale: 1,
  facing: 1,
  tilt: 0,
  spin: 0,
  headTilt: 0,
  armL: { a: 10, b: -8 },
  armR: { a: 10, b: -8 },
  legL: { a: 5, b: 0 },
  legR: { a: -5, b: 0 },
  expr: 'neutral',
  blink: 0,
  look: 0,
  yaw: 0,
  squash: 0,
  handL: 'open',
  handR: 'open',
  sway: 0,
};

// body measurements (local space: hips at 0,0, y down). Chubby and short:
// big head (r 80), short legs (LEG_LEN 120), wide torso.
export const MHEAD = { x: 0, y: -150, r: 80 };
export const MLEG_LEN = 115;
export const MSHOULDER = { x: 46, y: -102 };
export const MHIP = { x: 16, y: 0 };
export const MUPPER_ARM = 56;
export const MFORE_ARM = 52;
export const MTHIGH = 62;
export const MSHIN = 53;

const rad = (d: number) => (d * Math.PI) / 180;
type P = { x: number; y: number };
const rot = (p: P, deg: number, c: P = { x: 0, y: 0 }): P => {
  const r = rad(deg);
  const dx = p.x - c.x;
  const dy = p.y - c.y;
  return { x: c.x + dx * Math.cos(r) - dy * Math.sin(r), y: c.y + dx * Math.sin(r) + dy * Math.cos(r) };
};

export const mascotJoints = (pose: MascotPose) => {
  const side = (s: 1 | -1, limb: { a: number; b: number }, root: P, l1: number, l2: number, isLeg: boolean) => {
    const dir = isLeg ? pose.facing : s;
    const d1 = { x: dir * Math.sin(rad(limb.a)), y: Math.cos(rad(limb.a)) };
    const mid = { x: root.x + d1.x * l1, y: root.y + d1.y * l1 };
    const a2 = limb.a + limb.b;
    const d2 = { x: dir * Math.sin(rad(a2)), y: Math.cos(rad(a2)) };
    return { root, mid, end: { x: mid.x + d2.x * l2, y: mid.y + d2.y * l2 } };
  };
  const torsoRot = (p: P) => rot(p, pose.tilt);
  const sp = 1 - 0.85 * Math.min(1, Math.abs(pose.yaw));
  const shL = { x: -MSHOULDER.x * sp + pose.yaw * 6, y: MSHOULDER.y };
  const shR = { x: MSHOULDER.x * sp + pose.yaw * 6, y: MSHOULDER.y };
  const armL = side(-1, pose.armL, shL, MUPPER_ARM, MFORE_ARM, false);
  const armR = side(1, pose.armR, shR, MUPPER_ARM, MFORE_ARM, false);
  const legL = side(-1, pose.legL, { x: -MHIP.x * sp, y: 0 }, MTHIGH, MSHIN, true);
  const legR = side(1, pose.legR, { x: MHIP.x * sp, y: 0 }, MTHIGH, MSHIN, true);
  const r = (o: { root: P; mid: P; end: P }) => ({ root: torsoRot(o.root), mid: torsoRot(o.mid), end: torsoRot(o.end) });
  return { armL: r(armL), armR: r(armR), legL, legR, head: torsoRot(MHEAD) };
};

export const mascotTurnWidth = (yaw: number) => 1 - 0.4 * Math.min(1, Math.abs(yaw));
export const mascotLimbSpread = (yaw: number) => 1 - 0.85 * Math.min(1, Math.abs(yaw));

export const mascotFaceAt = (f: number, keys: [number, MascotExpr][]): { expr: MascotExpr; blink: number } => {
  let expr = keys[0][1];
  let blink = 0;
  for (let i = 0; i < keys.length; i++) {
    const [k, e] = keys[i];
    if (f >= k) expr = e;
    if (i > 0 && f >= k - 2 && f < k + 1) blink = 1;
  }
  return { expr, blink };
};

export const mascotToWorld = (pose: MascotPose, p: P): P => {
  const spun = rot(p, pose.spin, { x: 0, y: -90 });
  return { x: pose.x + spun.x * pose.scale, y: pose.y + spun.y * pose.scale };
};

// Face: big bright white eyes, small pupils, brows and mouth per expression.
const MascotFace: React.FC<{
  expr: MascotExpr;
  blink: number;
  look: number;
  yaw?: number;
  ink?: string;
  glint?: number;
  glintColor?: string;
}> = ({ expr, blink, look, yaw = 0, ink = MASCOT.ink, glint = 0, glintColor = '#8FF0FF' }) => {
  const ex = look * 7;
  const ay = Math.min(1, Math.abs(yaw));
  const farHidden = ay > 0.72;
  const farSide = yaw > 0 ? -1 : 1;
  const eyeY = MHEAD.y - 2;
  const lid = expr === 'smug' || expr === 'cool' ? 0.45 : expr === 'tired' ? 0.58 : 0;
  const open = Math.max(0.08, 1 - Math.max(blink, lid));
  const eye = (cx: number) => {
    if (farHidden && Math.sign(cx) === farSide) return null;
    if (expr === 'happy')
      return (
        <path d={`M ${cx - 10} ${eyeY + 3} Q ${cx} ${eyeY - 9} ${cx + 10} ${eyeY + 3}`} stroke={ink} strokeWidth={6} fill="none" strokeLinecap="round" />
      );
    if (expr === 'oops')
      return (
        <path
          d={`M ${cx - 9} ${eyeY - 6} L ${cx + 4} ${eyeY} L ${cx - 9} ${eyeY + 6}`}
          transform={cx > 0 ? `translate(${2 * cx},0) scale(-1,1)` : undefined}
          stroke={ink}
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    if (expr === 'dizzy')
      return (
        <g stroke={ink} strokeWidth={5} strokeLinecap="round">
          <path d={`M ${cx - 7} ${eyeY - 7} L ${cx + 7} ${eyeY + 7} M ${cx + 7} ${eyeY - 7} L ${cx - 7} ${eyeY + 7}`} />
        </g>
      );
    if (blink >= 0.95)
      return (
        <g>
          <path d={`M ${cx - 12} ${eyeY + 1} Q ${cx} ${eyeY + 8} ${cx + 12} ${eyeY + 1}`} stroke={ink} strokeWidth={5} fill="none" strokeLinecap="round" />
          {expr === 'tired' ? (
            <path d={`M ${cx - 12} ${eyeY + 15} Q ${cx} ${eyeY + 22} ${cx + 12} ${eyeY + 15}`} stroke="#8C7AA6" strokeWidth={4.5} fill="none" strokeLinecap="round" opacity={0.85} />
          ) : null}
        </g>
      );
    const big = expr === 'shock';
    const rx = big ? 13 : 9;
    const ry = (big ? 16 : 13) * open;
    return (
      <g>
        {/* bright white eye whites */}
        <ellipse cx={cx + ex} cy={eyeY + (lid ? 3 : 0)} rx={rx} ry={ry} fill={MASCOT.eye} />
        <ellipse cx={cx + ex} cy={eyeY + (lid ? 3 : 0)} rx={rx * 0.9} ry={ry * 0.85} fill={MASCOT.eyeShade} opacity={0.35} />
        {/* small pupil */}
        <circle cx={cx + ex} cy={eyeY} r={big ? 4.5 : 3.2} fill={MASCOT.pupil} />
        {big && open > 0.5 ? <circle cx={cx + ex + 3.5} cy={eyeY - 4} r={3.4} fill="#fff" /> : null}
        {lid ? (
          <path d={expr === 'tired' ? `M ${cx - 13} ${eyeY - 1} Q ${cx} ${eyeY - 5} ${cx + 13} ${eyeY - 1}` : `M ${cx - 12} ${eyeY - 4} L ${cx + 12} ${eyeY - 2}`} stroke={ink} strokeWidth={4} strokeLinecap="round" fill="none" />
        ) : null}
        {expr === 'tired' ? (
          <path d={`M ${cx - 12} ${eyeY + 14} Q ${cx} ${eyeY + 21} ${cx + 12} ${eyeY + 14}`} stroke="#8C7AA6" strokeWidth={4.5} fill="none" strokeLinecap="round" opacity={0.85} />
        ) : null}
      </g>
    );
  };
  const brows: Record<MascotExpr, string> = {
    neutral: '',
    happy: '',
    smug: `M -34 ${eyeY - 22} L -12 ${eyeY - 20} M 12 ${eyeY - 26} L 34 ${eyeY - 30}`,
    shock: `M -32 ${eyeY - 28} Q -21 ${eyeY - 36} -10 ${eyeY - 29} M 10 ${eyeY - 29} Q 21 ${eyeY - 36} 32 ${eyeY - 28}`,
    worried: `M -32 ${eyeY - 18} L -12 ${eyeY - 26} M 12 ${eyeY - 26} L 32 ${eyeY - 18}`,
    oops: `M -32 ${eyeY - 20} L -12 ${eyeY - 16} M 12 ${eyeY - 16} L 32 ${eyeY - 20}`,
    cool: '',
    tired: `M -33 ${eyeY - 17} Q -22 ${eyeY - 21} -11 ${eyeY - 19} M 11 ${eyeY - 19} Q 22 ${eyeY - 21} 33 ${eyeY - 17}`,
    dizzy: `M -33 ${eyeY - 17} Q -22 ${eyeY - 21} -11 ${eyeY - 19} M 11 ${eyeY - 19} Q 22 ${eyeY - 21} 33 ${eyeY - 17}`,
  };
  const mY = MHEAD.y + 34;
  const mouth: Record<MascotExpr, React.ReactNode> = {
    neutral: <path d={`M -12 ${mY} Q 0 ${mY + 5} 12 ${mY}`} stroke={ink} strokeWidth={5} fill="none" strokeLinecap="round" />,
    happy: <path d={`M -20 ${mY - 4} Q 0 ${mY + 24} 20 ${mY - 4} Z`} fill={ink} />,
    smug: <path d={`M -14 ${mY + 2} Q 4 ${mY + 10} 18 ${mY - 6}`} stroke={ink} strokeWidth={5} fill="none" strokeLinecap="round" />,
    shock: <ellipse cx={0} cy={mY + 4} rx={12} ry={16} fill={ink} />,
    worried: <path d={`M -18 ${mY + 4} Q -9 ${mY - 4} 0 ${mY + 4} Q 9 ${mY + 14} 18 ${mY + 4}`} stroke={ink} strokeWidth={5} fill="none" strokeLinecap="round" />,
    oops: (
      <g>
        <rect x={-20} y={mY - 6} width={40} height={18} rx={7} fill={ink} />
        <path d={`M -16 ${mY + 3} L 16 ${mY + 3}`} stroke="#fff" strokeWidth={3} />
      </g>
    ),
    cool: <path d={`M -14 ${mY + 2} Q 4 ${mY + 10} 18 ${mY - 6}`} stroke={ink} strokeWidth={5} fill="none" strokeLinecap="round" />,
    dizzy: <path d={`M -16 ${mY + 4} Q -8 ${mY - 4} 0 ${mY + 4} Q 8 ${mY + 14} 16 ${mY + 4}`} stroke={ink} strokeWidth={5} fill="none" strokeLinecap="round" />,
    tired: <path d={`M -12 ${mY + 4} Q 0 ${mY} 12 ${mY + 4}`} stroke={ink} strokeWidth={5} fill="none" strokeLinecap="round" />,
  };
  return (
    <g transform={`translate(${yaw * 30} 0) scale(${1 - 0.28 * ay} 1)`}>
      {eye(-24)}
      {eye(24)}
      {brows[expr] ? <path d={brows[expr]} stroke={ink} strokeWidth={5} fill="none" strokeLinecap="round" /> : null}
      {mouth[expr]}
      {glint > 0.01 && blink < 0.95
        ? [-24, 24].map((cx) =>
            farHidden && Math.sign(cx) === farSide ? null : (
              <g key={`gl${cx}`} opacity={Math.min(1, glint)}>
                <circle cx={cx + ex} cy={eyeY} r={19} fill={glintColor} opacity={0.2} />
                <circle cx={cx + ex} cy={eyeY} r={14} fill={glintColor} opacity={0.28} />
                <ellipse cx={cx + ex} cy={eyeY} rx={9} ry={Math.max(2, 12 * open)} fill={glintColor} />
                <circle cx={cx + ex + 2.5} cy={eyeY - 3} r={2.6} fill="#FFFFFF" />
              </g>
            ),
          )
        : null}
    </g>
  );
};

const MascotLimb = ({ root, mid, end, w }: { root: P; mid: P; end: P; w: number }) => {
  const d = `M ${root.x} ${root.y} L ${mid.x} ${mid.y} L ${end.x} ${end.y}`;
  return (
    <g>
      <path d={d} stroke={MASCOT.line} strokeWidth={w + 6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke={MASCOT.skinShade} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

const MascotShoe = ({ root, mid, end }: { root: P; mid: P; end: P }, side: 1 | -1) => {
  const ang = (Math.atan2(end.x - mid.x, end.y - mid.y) * 180) / Math.PI;
  return (
    <g transform={`translate(${end.x} ${end.y}) rotate(${side * -90 - ang})`}>
      {/* large white sneaker, rounded, sole below */}
      <ellipse cx={0} cy={4} rx={26} ry={14} fill={MASCOT.shoeSole} stroke={MASCOT.line} strokeWidth={3} />
      <ellipse cx={0} cy={2} rx={22} ry={11} fill={MASCOT.shoe} stroke={MASCOT.line} strokeWidth={3} />
      <rect x={-10} y={-9} width={20} height={3} rx={1} fill={MASCOT.shoeSole} />
      <path d={`M -6 0 Q 0 4 6 0`} stroke={MASCOT.line} strokeWidth={2} fill="none" strokeLinecap="round" opacity={0.5} />
    </g>
  );
};

const MascotHand = ({ mid, end, side, kind }: { mid: P; end: P; side: 1 | -1; kind: 'open' | 'point' }) => {
  const ang = (Math.atan2(end.x - mid.x, end.y - mid.y) * 180) / Math.PI;
  return (
    <g transform={`translate(${end.x} ${end.y}) rotate(${-ang})`}>
      {kind === 'point' ? (
        <g>
          <rect x={-4} y={10} width={7} height={22} rx={3} fill={MASCOT.skin} stroke={MASCOT.line} strokeWidth={3} />
          <path d="M -9 -2 Q -12 12 -5 16 L 6 16 Q 12 12 9 -2 Z" fill={MASCOT.skin} stroke={MASCOT.line} strokeWidth={3.5} strokeLinejoin="round" />
          <ellipse cx={side * 9} cy={5} rx={4} ry={6} fill={MASCOT.skin} stroke={MASCOT.line} strokeWidth={3} />
        </g>
      ) : (
        <g>
          <ellipse cx={side * 9} cy={2} rx={5} ry={8} transform={`rotate(${side * -28} ${side * 9} 2)`} fill={MASCOT.skin} stroke={MASCOT.line} strokeWidth={3.5} />
          <ellipse cx={0} cy={9} rx={9} ry={13} fill={MASCOT.skin} stroke={MASCOT.line} strokeWidth={3.5} />
          <path d="M -3 15 L -3 21 M 2 16 L 2 22" stroke={MASCOT.line} strokeWidth={2} opacity={0.45} strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

// Hood: oversized orange hoodie that drapes over the shoulders and head, with drawstrings.
const MascotHood = ({ tilt, headTilt, sway }: { tilt: number; headTilt: number; sway: number }) => {
  const sw = sway * 0.7 - tilt * 0.6;
  return (
    <g transform={`rotate(${tilt}) rotate(${headTilt * 0.5} 0 ${MHEAD.y + 40})`}>
      {/* the hood shell, oversized, rounded, extends past the shoulders */}
      <path d={`M -78 ${MHEAD.y + 18} Q -90 ${MHEAD.y - 78} 0 ${MHEAD.y - 86} Q 90 ${MHEAD.y - 78} 78 ${MHEAD.y + 18} Q 58 -104 0 -110 Q -58 -104 -78 ${MHEAD.y + 18} Z`} fill={MASCOT.hoodie} stroke={MASCOT.line} strokeWidth={4} />
      <path d={`M -10 ${MHEAD.y - 80} Q -16 ${MHEAD.y - 100} 0 ${MHEAD.y - 106} Q 16 ${MHEAD.y - 100} 10 ${MHEAD.y - 80} Z`} fill={MASCOT.hoodieShade} opacity={0.5} />
      {/* face opening, dark inside the hood */}
      <path d={`M -56 ${MHEAD.y + 14} Q -60 ${MHEAD.y - 64} 0 ${MHEAD.y - 68} Q 60 ${MHEAD.y - 64} 56 ${MHEAD.y + 14} Q 42 ${MHEAD.y - 30} 14 ${MHEAD.y - 38} Q 0 ${MHEAD.y - 44} -14 ${MHEAD.y - 38} Q -42 ${MHEAD.y - 30} -56 ${MHEAD.y + 14} Z`} fill="#121019" />
      {/* drawstrings: bright, hang from the hood, swing with sway */}
      <g>
        <path d={`M -13 ${MHEAD.y - 104} Q ${-15 + sw * 0.3} ${MHEAD.y - 84} ${-17 + sw} ${MHEAD.y - 62}`} stroke={MASCOT.drawstring} strokeWidth={5} strokeLinecap="round" fill="none" />
        <circle cx={-17 + sw} cy={MHEAD.y - 60} r={5} fill={MASCOT.drawstring} />
        <path d={`M 13 ${MHEAD.y - 104} Q ${15 + sw * 0.3} ${MHEAD.y - 84} ${17 + sw} ${MHEAD.y - 62}`} stroke={MASCOT.drawstring} strokeWidth={5} strokeLinecap="round" fill="none" />
        <circle cx={17 + sw} cy={MHEAD.y - 60} r={5} fill={MASCOT.drawstring} />
      </g>
    </g>
  );
};

// Torso: chubby, rounded, under the oversized hoodie.
const MascotTorso = ({ tilt, yaw }: { tilt: number; yaw: number }) => {
  const kw = mascotTurnWidth(yaw);
  return (
    <g transform={`rotate(${tilt}) translate(${yaw * 6} 0) scale(${kw} 1)`}>
      {/* oversized hoodie body: wider than the torso, rounded bottom */}
      <path d="M -56 -102 Q 0 -116 56 -102 L 50 4 Q 0 16 -50 4 Z" fill={MASCOT.hoodie} stroke={MASCOT.line} strokeWidth={4} strokeLinejoin="round" />
      <path d="M 12 -106 Q 34 -104 56 -102 L 50 4 Q 30 12 14 13 Z" fill={MASCOT.hoodieShade} opacity={0.5} />
      <path d="M 0 -102 L 0 4" stroke={MASCOT.hoodieShade} strokeWidth={4} />
      {/* hoodie hem / drawstring channel across the chest */}
      <path d="M -26 -104 Q 0 -88 26 -104" stroke={MASCOT.hoodieLining} strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>
  );
};

// Trousers: dark navy, rounded, short legs.
const MascotTrousers = ({ tilt }: { tilt: number }) => {
  return (
    <g transform={`rotate(${tilt})`}>
      <path d="M -34 0 Q 0 8 34 0 L 32 62 Q 0 70 -32 62 Z" fill={MASCOT.trousers} stroke={MASCOT.line} strokeWidth={3} strokeLinejoin="round" />
      <path d="M 10 0 Q 24 6 34 0 L 32 62 Q 22 68 12 4 Z" fill={MASCOT.trousersShade} opacity={0.5} />
      <path d="M 0 0 L 0 62" stroke={MASCOT.trousersShade} strokeWidth={3} />
    </g>
  );
};

export const Mascot: React.FC<{ pose: MascotPose; shadow?: number; rimId?: string }> = ({ pose, shadow = 1, rimId = 'rimR' }) => {
  const j = mascotJoints(pose);
  const L = MASCOT;
  const limb = (o: { root: P; mid: P; end: P }, w: number) => <MascotLimb root={o.root} mid={o.mid} end={o.end} w={w} />;
  const shoe = (o: { root: P; mid: P; end: P }) => MascotShoe(o, pose.facing);
  const hand = (o: { mid: P; end: P }, side: 1 | -1, kind: 'open' | 'point') => <MascotHand mid={o.mid} end={o.end} side={side} kind={kind} />;
  const kw = mascotTurnWidth(pose.yaw);
  const torso = <MascotTorso tilt={pose.tilt} yaw={pose.yaw} />;
  const head = (
    <g transform={`rotate(${pose.tilt}) rotate(${pose.headTilt} 0 ${MHEAD.y + 40})`}>
      <circle cx={MHEAD.x} cy={MHEAD.y} r={MHEAD.r} fill={MASCOT.skin} stroke={MASCOT.line} strokeWidth={4} />
      <path d={`M ${MHEAD.x + 16} ${MHEAD.y + 68} A ${MHEAD.r} ${MHEAD.r} 0 0 0 ${MHEAD.x + 72} ${MHEAD.y + 16} A 82 82 0 0 1 ${MHEAD.x + 16} ${MHEAD.y + 68} Z`} fill={MASCOT.skinShade} />
      <MascotFace expr={pose.expr} blink={pose.blink} look={pose.look} yaw={pose.yaw} ink={MASCOT.ink} glint={pose.glint} glintColor={pose.glintColor} />
    </g>
  );
  return (
    <g>
      {shadow > 0 ? (
        <ellipse cx={pose.x} cy={pose.y + MLEG_LEN * pose.scale + 10} rx={70 * pose.scale} ry={12 * pose.scale} fill="#000" opacity={0.25 * shadow} />
      ) : null}
      <g transform={`translate(${pose.x} ${pose.y}) scale(${pose.scale}) rotate(${pose.spin} 0 -90)`} filter={`url(#${rimId})`}>
        <g transform={`translate(0 ${MLEG_LEN}) scale(${1 + 0.6 * pose.squash} ${1 - pose.squash}) translate(0 ${-MLEG_LEN})`}>
          {pose.yaw < 0 ? (
            <>
              {limb(j.legR, 12)}{shoe(j.legR)}{limb(j.legL, 12)}{shoe(j.legL)}
              {limb(j.armR, 11)}{hand(j.armR, -1, pose.handR)}
            </>
          ) : (
            <>
              {limb(j.legL, 12)}{shoe(j.legL)}{limb(j.legR, 12)}{shoe(j.legR)}
              {limb(j.armL, 11)}{hand(j.armL, 1, pose.handL)}
            </>
          )}
          <MascotTrousers tilt={pose.tilt} />
          {torso}
          {pose.yaw < 0 ? (
            <>
              {limb(j.armL, 11)}{hand(j.armL, 1, pose.handL)}
            </>
          ) : (
            <>
              {limb(j.armR, 11)}{hand(j.armR, -1, pose.handR)}
            </>
          )}
          <MascotHood tilt={pose.tilt} headTilt={pose.headTilt} sway={pose.sway} />
          {head}
        </g>
      </g>
    </g>
  );
};

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { connections, people, photoFor, type Person, type PersonCategory } from "../people";

/**
 * AMI orbital community, in the style of the ping network visualization:
 * a flat solar system of concentric rings, one ring per group, with each
 * person as a photo-and-name node sitting on their ring. Click a person
 * and the camera eases in; a demo toggle previews connection lines for
 * the future shared-gatherings integration.
 */

const CATEGORY_ORDER: PersonCategory[] = ["team", "board", "fellow", "speaker", "member", "newcomer"];

const CATEGORY_META: Record<PersonCategory, { label: string; color: string }> = {
  team:     { label: "AMI team",  color: "#f6c84c" },
  board:    { label: "Board",     color: "#d96b3a" },
  fellow:   { label: "Fellows",   color: "#2fa3a3" },
  speaker:  { label: "Speakers",  color: "#a06bc9" },
  member:   { label: "Members",   color: "#5b9fc9" },
  newcomer: { label: "Newcomers", color: "#e05d84" },
};

// One ring per group, inner to outer
const RING_RADII: Record<PersonCategory, number> = {
  team: 2.6,
  board: 4.3,
  fellow: 6.2,
  speaker: 8.0,
  member: 9.9,
  newcomer: 12.0,
};

const SPRITE_W = 256;
const SPRITE_H = 316;
const PHOTO_R = 104;
const NODE_SCALE = 1.32;

// State/province expansion so "california" finds everyone in CA
const STATE_NAMES: Record<string, string> = {
  AL: "alabama", AK: "alaska", AZ: "arizona", AR: "arkansas", CA: "california",
  CO: "colorado", CT: "connecticut", DE: "delaware", FL: "florida", GA: "georgia",
  HI: "hawaii", ID: "idaho", IL: "illinois", IN: "indiana", IA: "iowa",
  KS: "kansas", KY: "kentucky", LA: "louisiana", ME: "maine", MD: "maryland",
  MA: "massachusetts", MI: "michigan", MN: "minnesota", MS: "mississippi", MO: "missouri",
  MT: "montana", NE: "nebraska", NV: "nevada", NH: "new hampshire", NJ: "new jersey",
  NM: "new mexico", NY: "new york", NC: "north carolina", ND: "north dakota", OH: "ohio",
  OK: "oklahoma", OR: "oregon", PA: "pennsylvania", RI: "rhode island", SC: "south carolina",
  SD: "south dakota", TN: "tennessee", TX: "texas", UT: "utah", VT: "vermont",
  VA: "virginia", WA: "washington", WV: "west virginia", WI: "wisconsin", WY: "wyoming",
  DC: "washington dc district of columbia",
  BC: "british columbia canada", ON: "ontario canada", QC: "quebec canada", AB: "alberta canada",
};

interface NodePos { person: Person; x: number; y: number; z: number; }

interface SpriteEntry {
  person: Person;
  sprite: THREE.Sprite;
  texture: THREE.CanvasTexture;
  baseScale: number;
  targetScale: number;
  targetOpacity: number;
}

/** Photo circle with the person's name baked underneath. */
function makeNodeTexture(person: Person, ringColor: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = SPRITE_W;
  canvas.height = SPRITE_H;
  const ctx = canvas.getContext("2d")!;
  const cx = SPRITE_W / 2;
  const cy = PHOTO_R + 10;

  const displayName = person.name.replace(/"[^"]+"\s?/g, "").trim();

  function drawName() {
    ctx.font = "600 30px 'PT Sans', -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    // Soft plate behind the name for readability
    const tw = Math.min(SPRITE_W - 8, ctx.measureText(displayName).width + 26);
    const ty = cy + PHOTO_R + 14;
    ctx.fillStyle = "rgba(8, 15, 28, 0.72)";
    ctx.beginPath();
    ctx.roundRect(cx - tw / 2, ty - 6, tw, 46, 23);
    ctx.fill();
    ctx.fillStyle = "#f6f1e7";
    ctx.fillText(displayName, cx, ty + 2, SPRITE_W - 34);
  }

  function drawFallback() {
    const initials = displayName.split(" ").map((s) => s[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
    ctx.fillStyle = ringColor;
    ctx.beginPath();
    ctx.arc(cx, cy, PHOTO_R, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fffaf0";
    ctx.font = "600 84px 'Cormorant Garamond', Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(initials, cx, cy + 6);
  }

  drawFallback();
  drawName();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    ctx.clearRect(0, 0, SPRITE_W, SPRITE_H);
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, PHOTO_R, 0, Math.PI * 2);
    ctx.clip();
    const ratio = img.width / img.height;
    const d = PHOTO_R * 2;
    let dw = d, dh = d, dx = cx - PHOTO_R, dy = cy - PHOTO_R;
    if (ratio > 1) { dw = d * ratio; dx = cx - dw / 2; }
    else           { dh = d / ratio; dy = cy - dh / 2; }
    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.restore();
    // Category-colored rim
    ctx.strokeStyle = ringColor;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(cx, cy, PHOTO_R - 2, 0, Math.PI * 2);
    ctx.stroke();
    drawName();
    texture.needsUpdate = true;
  };
  img.src = photoFor(person.id);

  return texture;
}

export default function Community() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<Person | null>(null);
  const [filter, setFilter] = useState<"all" | PersonCategory>("all");
  const [search, setSearch] = useState("");
  const [showLines, setShowLines] = useState(false);

  // Refs shared between the one-time scene effect and the update effects
  const spritesRef = useRef<SpriteEntry[]>([]);
  const linesGroupRef = useRef<THREE.Group | null>(null);
  const ringMatsRef = useRef<Map<PersonCategory, { ring: THREE.MeshBasicMaterial; halo: THREE.MeshBasicMaterial }>>(new Map());
  const filterRef = useRef<"all" | PersonCategory>("all");
  const onRingClickRef = useRef<(c: PersonCategory) => void>(() => {});
  const focusRef = useRef<{
    focusOn: (id: string) => void;
    release: () => void;
  } | null>(null);

  filterRef.current = filter;
  onRingClickRef.current = (c) => setFilter((f) => (f === c ? "all" : c));

  const positioned = useMemo<NodePos[]>(() => {
    const byCat: Record<string, Person[]> = {};
    for (const p of people) (byCat[p.category] ??= []).push(p);
    const out: NodePos[] = [];
    CATEGORY_ORDER.forEach((cat, ci) => {
      const list = byCat[cat] ?? [];
      const radius = RING_RADII[cat];
      const n = list.length || 1;
      list.forEach((p, i) => {
        const a = (i / n) * Math.PI * 2 + ci * 0.55;
        // Flat, holistic plane: everyone sits on the disc
        out.push({ person: p, x: Math.cos(a) * radius, y: 0, z: Math.sin(a) * radius });
      });
    });
    return out;
  }, []);

  // Full-text haystack per person: name, role, org, city, expanded state,
  // email, and group label, so "california", "aerospace", or a company name all work
  const haystacks = useMemo(() => {
    const m = new Map<string, string>();
    for (const p of people) {
      const abbr = (p.city?.match(/,\s*([A-Z]{2})\s*$/) || [])[1];
      const stateFull = abbr ? STATE_NAMES[abbr] ?? "" : "";
      m.set(
        p.id,
        [p.name, p.role, p.org, p.city, stateFull, p.email, CATEGORY_META[p.category].label]
          .filter(Boolean)
          .join(" ")
          .toLowerCase(),
      );
    }
    return m;
  }, []);

  const filtered = useMemo(() => {
    const tokens = search.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return positioned.filter(({ person }) => {
      if (filter !== "all" && person.category !== filter) return false;
      if (!tokens.length) return true;
      const hay = haystacks.get(person.id) || "";
      return tokens.every((t) => hay.includes(t));
    });
  }, [positioned, filter, search, haystacks]);

  const filteredIds = useMemo(() => new Set(filtered.map((n) => n.person.id)), [filtered]);

  // ── Build the scene ONCE ─────────────────────────────
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const node = mount;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0b1626");

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 200);
    camera.position.set(0, 20.5, 17.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;";
    node.appendChild(renderer.domElement);

    // Star dust for depth
    {
      const N = 260;
      const pos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 120;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 120;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const m = new THREE.PointsMaterial({ color: 0x9fd8c0, size: 0.16, transparent: true, opacity: 0.35, sizeAttenuation: true });
      scene.add(new THREE.Points(g, m));
    }

    // Concentric rings, one per group, tinted with the group color.
    // Each ring is clickable: hover glows it, click filters to that group.
    const ringHitsGroup = new THREE.Group();
    scene.add(ringHitsGroup);
    ringMatsRef.current = new Map();
    CATEGORY_ORDER.forEach((cat) => {
      const r = RING_RADII[cat];
      const color = new THREE.Color(CATEGORY_META[cat].color);
      const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.32, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(new THREE.RingGeometry(r - 0.02, r + 0.02, 160), ringMat);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
      // Faint halo band under each ring for the holistic disc feel
      const haloMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.05, side: THREE.DoubleSide });
      const halo = new THREE.Mesh(new THREE.RingGeometry(r - 0.34, r + 0.34, 160), haloMat);
      halo.rotation.x = Math.PI / 2;
      scene.add(halo);
      ringMatsRef.current.set(cat, { ring: ringMat, halo: haloMat });
      // Invisible fat torus for easy ring hit-testing
      const hit = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.5, 8, 96),
        new THREE.MeshBasicMaterial({ visible: false }),
      );
      hit.rotation.x = Math.PI / 2;
      (hit as any).userData.category = cat;
      ringHitsGroup.add(hit);
    });

    // AMI core: additive glow + the round mark on a cream disk
    const coreGlow = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0xf6c84c,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    scene.add(coreGlow);

    const logoCanvas = document.createElement("canvas");
    logoCanvas.width = logoCanvas.height = 256;
    const lctx = logoCanvas.getContext("2d")!;
    lctx.fillStyle = "#f6f1e7";
    lctx.beginPath();
    lctx.arc(128, 128, 122, 0, Math.PI * 2);
    lctx.fill();
    const logoTex = new THREE.CanvasTexture(logoCanvas);
    logoTex.colorSpace = THREE.SRGBColorSpace;
    const logoImg = new Image();
    logoImg.onload = () => {
      const ratio = logoImg.width / logoImg.height;
      const size = 168;
      const dw = ratio >= 1 ? size : size * ratio;
      const dh = ratio >= 1 ? size / ratio : size;
      lctx.drawImage(logoImg, 128 - dw / 2, 128 - dh / 2, dw, dh);
      logoTex.needsUpdate = true;
    };
    logoImg.src = "/ami/logo.png";
    const logoSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: logoTex, transparent: true, depthTest: false }));
    logoSprite.scale.setScalar(1.9);
    scene.add(logoSprite);

    // People nodes
    const nodesGroup = new THREE.Group();
    scene.add(nodesGroup);
    const sprites: SpriteEntry[] = [];
    positioned.forEach(({ person, x, y, z }) => {
      const meta = CATEGORY_META[person.category];
      const texture = makeNodeTexture(person, meta.color);
      const mat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
      const sprite = new THREE.Sprite(mat);
      sprite.center.set(0.5, 0.62); // photo centers on the ring; name hangs below
      sprite.position.set(x, y, z);
      sprite.scale.set(NODE_SCALE, NODE_SCALE * (SPRITE_H / SPRITE_W), 1);
      (sprite as any).userData.personId = person.id;
      nodesGroup.add(sprite);
      sprites.push({ person, sprite, texture, baseScale: NODE_SCALE, targetScale: NODE_SCALE, targetOpacity: 1 });
    });
    spritesRef.current = sprites;

    // Connection lines live in their own group; hidden until the demo toggle
    const posById = new Map<string, THREE.Vector3>();
    positioned.forEach((n) => posById.set(n.person.id, new THREE.Vector3(n.x, n.y, n.z)));
    const linesGroup = new THREE.Group();
    linesGroup.visible = false;
    connections.forEach(([a, b]) => {
      const va = posById.get(a);
      const vb = posById.get(b);
      if (!va || !vb) return;
      // Gentle arc lifting off the disc so lines read as orbit transfers
      const mid = va.clone().add(vb).multiplyScalar(0.5);
      mid.y += va.distanceTo(vb) * 0.16;
      const curve = new THREE.QuadraticBezierCurve3(va, mid, vb);
      const geom = new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
      const mat = new THREE.LineBasicMaterial({ color: 0x58d0a8, transparent: true, opacity: 0.55 });
      linesGroup.add(new THREE.Line(geom, mat));
    });
    scene.add(linesGroup);
    linesGroupRef.current = linesGroup;

    // Controls: damped orbit like ping
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 5;
    controls.maxDistance = 46;
    controls.minPolarAngle = 0.35;
    controls.maxPolarAngle = 1.35;
    controls.rotateSpeed = 0.55;
    controls.autoRotate = !reduced;
    controls.autoRotateSpeed = 0.35;

    // Camera focus animation state
    let anim: {
      t0: number; dur: number;
      fromPos: THREE.Vector3; toPos: THREE.Vector3;
      fromTarget: THREE.Vector3; toTarget: THREE.Vector3;
    } | null = null;
    const homeTarget = new THREE.Vector3(0, 0, 0);
    let savedPos: THREE.Vector3 | null = null;

    const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    function animateTo(toPos: THREE.Vector3, toTarget: THREE.Vector3, dur = 900) {
      anim = {
        t0: performance.now(), dur,
        fromPos: camera.position.clone(), toPos,
        fromTarget: controls.target.clone(), toTarget,
      };
      controls.autoRotate = false;
    }

    function focusOn(id: string) {
      const entry = sprites.find((s) => s.person.id === id);
      if (!entry) return;
      if (!savedPos) savedPos = camera.position.clone();
      const nodePos = entry.sprite.position.clone();
      // Ease the camera part-way in: sit above and back from the node,
      // looking at it. "Zooms in a little", not a hard cut.
      const dir = nodePos.clone().sub(camera.position).normalize();
      const camTo = nodePos.clone().sub(dir.multiplyScalar(5.2));
      camTo.y = Math.max(camTo.y, nodePos.y + 2.6);
      animateTo(camTo, nodePos, reduced ? 0 : 900);
    }

    function release() {
      const backPos = savedPos ?? new THREE.Vector3(0, 20.5, 17.5);
      animateTo(backPos.clone(), homeTarget.clone(), reduced ? 0 : 800);
      savedPos = null;
      // Resume the slow idle rotation shortly after the camera settles
      window.setTimeout(() => { if (!reduced) controls.autoRotate = true; }, 900);
    }
    focusRef.current = { focusOn, release };

    // Hover + click (faces first, then rings)
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hoveredId: string | null = null;
    let hoveredRing: PersonCategory | null = null;
    let downAt = 0;

    function setHovered(id: string | null) {
      if (hoveredId === id) return;
      hoveredId = id;
      sprites.forEach((s) => {
        s.targetScale = s.baseScale * (s.person.id === id ? 1.32 : 1);
      });
    }
    function setHoveredRing(cat: PersonCategory | null) {
      if (hoveredRing === cat) return;
      // Restore the previous ring unless it is the active filter
      if (hoveredRing && filterRef.current !== hoveredRing) {
        const m = ringMatsRef.current.get(hoveredRing);
        if (m) { m.ring.opacity = 0.32; m.halo.opacity = 0.05; }
      }
      hoveredRing = cat;
      if (cat) {
        const m = ringMatsRef.current.get(cat);
        if (m) { m.ring.opacity = 0.85; m.halo.opacity = 0.14; }
      }
    }
    function onPointerMove(e: PointerEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const faceHits = raycaster.intersectObjects(nodesGroup.children, false);
      if (faceHits.length) {
        setHovered((faceHits[0].object as any).userData.personId);
        setHoveredRing(null);
      } else {
        setHovered(null);
        const ringHits = raycaster.intersectObjects(ringHitsGroup.children, false);
        setHoveredRing(ringHits.length ? (ringHits[0].object as any).userData.category : null);
      }
      node.style.cursor = hoveredId || hoveredRing ? "pointer" : "grab";
    }
    function onPointerDown() { downAt = performance.now(); }
    function onClick() {
      // Ignore clicks that were really drags
      if (performance.now() - downAt > 260) return;
      if (hoveredId) {
        const found = people.find((p) => p.id === hoveredId);
        if (found) {
          focusOn(found.id);
          setActive(found);
        }
        return;
      }
      if (hoveredRing) onRingClickRef.current(hoveredRing);
    }
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("click", onClick);

    function resize() {
      const w = node.clientWidth || 1;
      const h = node.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(node);

    let raf = 0;
    function tick(now: number) {
      // Camera focus animation
      if (anim) {
        const t = Math.min((now - anim.t0) / anim.dur, 1);
        const k = easeInOut(t);
        camera.position.lerpVectors(anim.fromPos, anim.toPos, k);
        controls.target.lerpVectors(anim.fromTarget, anim.toTarget, k);
        if (t >= 1) anim = null;
      }
      controls.update();

      // Smooth node scale + opacity toward targets
      sprites.forEach((s) => {
        const cur = s.sprite.scale.x;
        const next = cur + (s.targetScale - cur) * 0.18;
        s.sprite.scale.set(next, next * (SPRITE_H / SPRITE_W), 1);
        const mat = s.sprite.material as THREE.SpriteMaterial;
        mat.opacity += (s.targetOpacity - mat.opacity) * 0.15;
      });

      const pulse = 1 + Math.sin(now * 0.0016) * 0.1;
      coreGlow.scale.setScalar(pulse);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("click", onClick);
      controls.dispose();
      sprites.forEach((s) => { s.texture.dispose(); s.sprite.material.dispose(); });
      linesGroup.children.forEach((l) => {
        const line = l as THREE.Line;
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
      logoTex.dispose();
      renderer.dispose();
      node.removeChild(renderer.domElement);
      spritesRef.current = [];
      linesGroupRef.current = null;
      focusRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positioned]);

  // ── Filter / search: update in place, no scene rebuild ──
  useEffect(() => {
    spritesRef.current.forEach((s) => {
      const shown = filteredIds.has(s.person.id);
      s.targetOpacity = shown ? 1 : 0.16;
      s.baseScale = NODE_SCALE * (shown ? 1 : 0.82);
      s.targetScale = s.baseScale;
    });
    // Light up the active group's ring
    ringMatsRef.current.forEach((m, cat) => {
      const activeRing = filter === cat;
      m.ring.opacity = activeRing ? 0.85 : 0.32;
      m.halo.opacity = activeRing ? 0.14 : 0.05;
    });
  }, [filteredIds, filter]);

  // ── Demo lines toggle ──
  useEffect(() => {
    if (linesGroupRef.current) linesGroupRef.current.visible = showLines;
  }, [showLines]);

  function closeCard() {
    setActive(null);
    focusRef.current?.release();
  }

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of people) c[p.category] = (c[p.category] || 0) + 1;
    return c;
  }, []);

  return (
    <section className="community">
      <div ref={mountRef} className="community__canvas community__canvas--full" aria-label="Orbital visualization of the AMI community">
        <div className="community__topbar">
          <div className="community__pills" role="group" aria-label="Filter by group">
            <button
              className={`community__pill ${filter === "all" ? "is-active" : ""}`}
              style={{ "--pill": "#f6f1e7" } as React.CSSProperties}
              onClick={() => setFilter("all")}
            >
              All <span>{people.length}</span>
            </button>
            {CATEGORY_ORDER.map((c) => (
              <button
                key={c}
                className={`community__pill ${filter === c ? "is-active" : ""}`}
                style={{ "--pill": CATEGORY_META[c].color } as React.CSSProperties}
                onClick={() => setFilter((f) => (f === c ? "all" : c))}
              >
                <span className="dot" />
                {CATEGORY_META[c].label} <span>{counts[c] || 0}</span>
              </button>
            ))}
          </div>

          <label className="community__searchDark">
            <span className="visually-hidden">Search the community</span>
            <input
              type="search"
              placeholder="Search anything: name, company, state, industry…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          <button
            type="button"
            className={`community__toggle community__toggle--inline ${showLines ? "is-on" : ""}`}
            onClick={() => setShowLines((v) => !v)}
            title="Preview of connection lines. Coming soon: who has attended the same gatherings."
          >
            <span className="community__toggleTrack" aria-hidden><span className="community__toggleThumb" /></span>
            Connections
            <em>demo</em>
          </button>
        </div>

        <p className="community__status">
          {filtered.length} {filtered.length === 1 ? "person" : "people"} highlighted · drag to orbit · click a face or a ring
        </p>
      </div>

      {active && <PersonCard person={active} onClose={closeCard} />}
    </section>
  );
}

function PersonCard({ person, onClose }: { person: Person; onClose: () => void }) {
  const meta = CATEGORY_META[person.category];
  const [imgFailed, setImgFailed] = useState(false);
  const initials = person.name.replace(/"[^"]+"\s?/g, "").split(" ").map((s) => s[0]).filter(Boolean).slice(0, 2).join("");

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__card personCard" onClick={(e) => e.stopPropagation()}>
        <header>
          <span className="chip" style={{ background: `${meta.color}1f`, color: meta.color }}>
            {meta.label}
          </span>
          <button className="modal__close" onClick={onClose} aria-label="Close">×</button>
        </header>
        <div className="personCard__body">
          <div className="personCard__avatar" style={{ background: meta.color, borderColor: meta.color }}>
            {!imgFailed ? (
              <img src={photoFor(person.id)} alt={person.name} onError={() => setImgFailed(true)} />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <div>
            <h3>{person.name}</h3>
            {person.role && <p className="personCard__role">{person.role}</p>}
            {person.org && <p className="personCard__org">{person.org}</p>}
            {person.city && <p className="personCard__city">📍 {person.city}</p>}
            {person.email && (
              <a className="personCard__email" href={`mailto:${person.email}`}>
                ✉ {person.email}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

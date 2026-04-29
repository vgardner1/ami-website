import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { connections, people, photoFor, type Person, type PersonCategory } from "../people";

const CATEGORY_ORDER: PersonCategory[] = ["board", "fellow", "speaker", "member", "newcomer", "team"];

const CATEGORY_META: Record<PersonCategory, { label: string; ring: number; color: string; }> = {
  board:    { label: "Board",     ring: 0, color: "#d96b3a" },
  fellow:   { label: "Fellows",   ring: 1, color: "#0e6b6b" },
  speaker:  { label: "Speakers",  ring: 1, color: "#7b3f9c" },
  member:   { label: "Members",   ring: 2, color: "#1f6f8b" },
  newcomer: { label: "Newcomers", ring: 3, color: "#c2185b" },
  team:     { label: "AMI team",  ring: 0, color: "#f6c84c" },
};

const RING_RADII = [3.0, 5.6, 8.4, 11.2];
const NODE_RADIUS = 0.42;

interface NodePos { person: Person; x: number; y: number; z: number; }

function makeRoundCanvas(personId: string, ring: number, ringColor: string, onReady: () => void): { canvas: HTMLCanvasElement; texture: THREE.CanvasTexture } {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Default background = ring color (used while photo loads / if missing)
  ctx.fillStyle = ringColor;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
    ctx.clip();
    // Cover-fit
    const ratio = img.width / img.height;
    let dw = size, dh = size, dx = 0, dy = 0;
    if (ratio > 1) { dw = size * ratio; dx = -(dw - size) / 2; }
    else           { dh = size / ratio; dy = -(dh - size) / 2; }
    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.restore();
    // Ring border
    ctx.strokeStyle = ringColor;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
    ctx.stroke();
    texture.needsUpdate = true;
    onReady();
  };
  img.onerror = () => {
    // Show initials fallback
    const initials = personId.replace(/^p-/, "").slice(0, 2).toUpperCase();
    ctx.fillStyle = "#fffaf0";
    ctx.font = "bold 96px Playfair Display, Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(initials, size / 2, size / 2 + 6);
    ctx.strokeStyle = ringColor;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 5, 0, Math.PI * 2);
    ctx.stroke();
    texture.needsUpdate = true;
    onReady();
  };
  img.src = photoFor(personId);

  // Suppress unused-var lint
  void ring;
  return { canvas, texture };
}

export default function Community() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<Person | null>(null);
  const [filter, setFilter] = useState<"all" | PersonCategory>("all");
  const [search, setSearch] = useState("");

  const positioned = useMemo<NodePos[]>(() => {
    const byRing: Record<number, Person[]> = { 0: [], 1: [], 2: [], 3: [] };
    for (const p of people) {
      byRing[CATEGORY_META[p.category].ring].push(p);
    }
    const out: NodePos[] = [];
    for (let r = 0; r < 4; r++) {
      const list = byRing[r] ?? [];
      const radius = RING_RADII[r];
      const n = list.length || 1;
      list.forEach((p, i) => {
        const offset = r * 0.37;
        const a = (i / n) * Math.PI * 2 + offset;
        const y = Math.sin(i * 1.7 + r * 0.5) * 0.4;
        out.push({ person: p, x: Math.cos(a) * radius, y, z: Math.sin(a) * radius });
      });
    }
    return out;
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return positioned.filter(({ person }) => {
      if (filter !== "all" && person.category !== filter) return false;
      if (!q) return true;
      return (
        person.name.toLowerCase().includes(q) ||
        (person.role || "").toLowerCase().includes(q) ||
        (person.org || "").toLowerCase().includes(q) ||
        (person.city || "").toLowerCase().includes(q)
      );
    });
  }, [positioned, filter, search]);

  const filteredIds = useMemo(() => new Set(filtered.map((n) => n.person.id)), [filtered]);

  useEffect(() => {
    const mount: HTMLDivElement | null = mountRef.current;
    if (!mount) return;
    const node = mount; // narrowed alias for callbacks

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0e1828");

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 9, 19);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const rotGroup = new THREE.Group();
    scene.add(rotGroup);

    // Concentric guide rings
    RING_RADII.forEach((r) => {
      const geom = new THREE.RingGeometry(r - 0.012, r + 0.012, 128);
      const mat = new THREE.MeshBasicMaterial({ color: 0x223349, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(geom, mat);
      ring.rotation.x = Math.PI / 2;
      rotGroup.add(ring);
    });

    // AMI core
    const coreGeom = new THREE.SphereGeometry(0.5, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xfffaf0 });
    const core = new THREE.Mesh(coreGeom, coreMat);
    rotGroup.add(core);
    const coreGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.95, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xffd6a5, transparent: true, opacity: 0.22 }),
    );
    rotGroup.add(coreGlow);

    // Position lookup
    const posById = new Map<string, THREE.Vector3>();
    positioned.forEach((n) => posById.set(n.person.id, new THREE.Vector3(n.x, n.y, n.z)));

    // Connections (lines)
    const linesGroup = new THREE.Group();
    rotGroup.add(linesGroup);
    connections.forEach(([a, b]) => {
      const va = posById.get(a);
      const vb = posById.get(b);
      if (!va || !vb) return;
      const aShown = filteredIds.has(a);
      const bShown = filteredIds.has(b);
      const opacity = aShown && bShown ? 0.5 : aShown || bShown ? 0.18 : 0.06;
      const geom = new THREE.BufferGeometry().setFromPoints([va, vb]);
      const mat = new THREE.LineBasicMaterial({ color: 0x6aa1c4, transparent: true, opacity });
      linesGroup.add(new THREE.Line(geom, mat));
    });

    // Headshot nodes — billboard sprites with circular textures
    const nodesGroup = new THREE.Group();
    rotGroup.add(nodesGroup);
    const sprites: { person: Person; sprite: THREE.Sprite; baseScale: number; targetScale: number; texture: THREE.CanvasTexture }[] = [];

    let pendingTextures = 0;
    const onTextureReady = () => {
      pendingTextures = Math.max(0, pendingTextures - 1);
    };

    positioned.forEach(({ person, x, y, z }) => {
      const meta = CATEGORY_META[person.category];
      pendingTextures += 1;
      const { texture } = makeRoundCanvas(person.id, meta.ring, meta.color, onTextureReady);
      const mat = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(mat);
      sprite.position.set(x, y, z);
      const isShown = filteredIds.has(person.id);
      const base = NODE_RADIUS * 2 * (isShown ? 1 : 0.6);
      sprite.scale.setScalar(base);
      mat.opacity = isShown ? 1 : 0.4;
      (sprite as any).userData.personId = person.id;
      nodesGroup.add(sprite);
      sprites.push({ person, sprite, baseScale: base, targetScale: base, texture });
    });

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hoveredId: string | null = null;

    function setHovered(id: string | null) {
      if (hoveredId === id) return;
      hoveredId = id;
      node.style.cursor = id ? "pointer" : "grab";
      sprites.forEach((s) => {
        const hover = s.person.id === id;
        s.targetScale = s.baseScale * (hover ? 1.7 : 1);
      });
    }

    function onPointer(e: PointerEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(nodesGroup.children, false);
      setHovered(hits.length ? (hits[0].object as any).userData.personId : null);
    }
    function onClick() {
      if (!hoveredId) return;
      const found = people.find((p) => p.id === hoveredId);
      if (found) setActive(found);
    }

    renderer.domElement.addEventListener("pointermove", onPointer);
    renderer.domElement.addEventListener("click", onClick);

    // Drag rotate
    let isDragging = false;
    let lastX = 0; let lastY = 0;
    let rotY = 0;  let rotX = 0;
    function onDown(e: PointerEvent) {
      isDragging = true; lastX = e.clientX; lastY = e.clientY;
      node.style.cursor = "grabbing";
    }
    function onMove(e: PointerEvent) {
      if (!isDragging) return;
      rotY += (e.clientX - lastX) * 0.005;
      rotX += (e.clientY - lastY) * 0.005;
      rotX = Math.max(-1.0, Math.min(1.0, rotX));
      lastX = e.clientX; lastY = e.clientY;
      rotGroup.rotation.y = rotY;
      rotGroup.rotation.x = rotX;
    }
    function onUp() {
      isDragging = false;
      node.style.cursor = hoveredId ? "pointer" : "grab";
    }
    renderer.domElement.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    function resize() {
      const w = node.clientWidth;
      const h = node.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let raf = 0;
    let lastTime = performance.now();
    function tick() {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      if (!isDragging) {
        rotY += dt * 0.04;
        rotGroup.rotation.y = rotY;
      }
      // Smooth scale animation toward target
      sprites.forEach((s) => {
        const cur = s.sprite.scale.x;
        const next = cur + (s.targetScale - cur) * 0.2;
        s.sprite.scale.setScalar(next);
      });
      const pulse = 1 + Math.sin(now * 0.002) * 0.08;
      coreGlow.scale.setScalar(pulse);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointermove", onPointer);
      renderer.domElement.removeEventListener("click", onClick);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      mount.removeChild(renderer.domElement);
      sprites.forEach((s) => { s.texture.dispose(); s.sprite.material.dispose(); });
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredIds]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of people) c[p.category] = (c[p.category] || 0) + 1;
    return c;
  }, []);

  return (
    <section className="community">
      <div className="community__layout">
        <aside className="community__legend">
          <div className="community__filters">
            <button
              className={filter === "all" ? "is-active" : ""}
              onClick={() => setFilter("all")}
            >
              <span className="dot" style={{ background: "#fffaf0" }} />
              <span>All</span>
              <span className="count">{people.length}</span>
            </button>
            {CATEGORY_ORDER.map((c) => (
              <button
                key={c}
                className={filter === c ? "is-active" : ""}
                onClick={() => setFilter(c)}
              >
                <span className="dot" style={{ background: CATEGORY_META[c].color }} />
                <span>{CATEGORY_META[c].label}</span>
                <span className="count">{counts[c] || 0}</span>
              </button>
            ))}
          </div>

          <label className="community__search">
            <span className="visually-hidden">Search the community</span>
            <input
              type="search"
              placeholder="Search by name, org, city…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          <p className="community__hint">
            {filtered.length} {filtered.length === 1 ? "person" : "people"} highlighted · drag to rotate
          </p>
        </aside>

        <div ref={mountRef} className="community__canvas" aria-label="Network visualization of the AMI community">
          <div className="community__hud">
            <span>Board · Team</span>
            <span>Fellows · Speakers</span>
            <span>Members</span>
            <span>Newcomers</span>
          </div>
        </div>
      </div>

      {active && <PersonCard person={active} onClose={() => setActive(null)} />}
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

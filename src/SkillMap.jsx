import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Single-file React component for a skill-map UI inspired by Ori / Star Wars / Path of Exile
// - Uses SVG for nodes & links
// - Simple pan/zoom
// - Side detail panel, filters, minimap, search
// - Tailwind utility classes assumed available

export default function SkillMap() {
  // mock nodes inspired by different game styles
  const initialNodes = [
    { id: "n1", x: 100, y: 100, title: "Basics", type: "core", tier: 1, desc: "Fundamentals of the course." },
    { id: "n2", x: 260, y: 70, title: "Flow", type: "movement", tier: 2, desc: "Smooth problem solving patterns." },
    { id: "n3", x: 260, y: 140, title: "Branches", type: "branch", tier: 2, desc: "Specialized topics." },
    { id: "n4", x: 420, y: 40, title: "Advanced A", type: "special", tier: 3, desc: "Deep technical skill A." },
    { id: "n5", x: 420, y: 160, title: "Advanced B", type: "special", tier: 3, desc: "Deep technical skill B." },
    { id: "n6", x: 600, y: 100, title: "Mastery", type: "master", tier: 4, desc: "Capstone mastery skill." },
  ];

  const initialEdges = [
    { from: "n1", to: "n2" },
    { from: "n1", to: "n3" },
    { from: "n2", to: "n4" },
    { from: "n3", to: "n5" },
    { from: "n4", to: "n6" },
    { from: "n5", to: "n6" },
  ];

  const svgRef = useRef(null);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges] = useState(initialEdges);
  const [selected, setSelected] = useState(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [filter, setFilter] = useState("all");
  const panStart = useRef(null);

  // pan/zoom handlers
  function onWheel(e) {
    e.preventDefault();
    const delta = -e.deltaY;
    const s = Math.max(0.4, Math.min(2.5, scale + (delta / 1000)));
    setScale(s);
  }

  function onMouseDown(e) {
    setDragging(true);
    panStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  }
  function onMouseMove(e) {
    if (!dragging) return;
    setOffset({ x: e.clientX - panStart.current.x, y: e.clientY - panStart.current.y });
  }
  function onMouseUp() {
    setDragging(false);
  }

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mouseup", onMouseUp);
  }, []);

  function nodeColor(type) {
    switch (type) {
      case "core": return "bg-indigo-500";
      case "movement": return "bg-emerald-400";
      case "branch": return "bg-yellow-400";
      case "special": return "bg-pink-500";
      case "master": return "bg-red-600";
      default: return "bg-gray-400";
    }
  }

  const filteredNodes = nodes.filter(n => filter === "all" || n.type === filter);

  // simple search
  const [query, setQuery] = useState("");
  const searchResults = nodes.filter(n => n.title.toLowerCase().includes(query.toLowerCase()));

  // Example: small algorithm to create organic curved paths for 'Ori-like' feel
  function edgePath(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const cx1 = a.x + dx * 0.3;
    const cy1 = a.y + dy * 0.1 - 20;
    const cx2 = a.x + dx * 0.7;
    const cy2 = a.y + dy * 0.9 + 20;
    return `M ${a.x} ${a.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${b.x} ${b.y}`;
  }

  // minimap rendering dims
  const miniScale = 0.12;
  const mapW = 220;
  const mapH = 120;

  return (
    <div className="h-screen flex gap-4 p-4 bg-slate-50">
      {/* Left: Controls */}
      <aside className="w-72 bg-white rounded-2xl shadow p-4 flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Skill Map Controls</h3>
        <div>
          <label className="block text-sm">Search</label>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search skills..." className="mt-1 w-full px-3 py-2 border rounded" />
          {query && (
            <div className="mt-2 max-h-32 overflow-auto">
              {searchResults.map(r => (
                <button key={r.id} onClick={() => { setSelected(r); setOffset({ x: -r.x + 200, y: -r.y + 150 }); setScale(1.2); }} className="text-left w-full py-1 px-2 rounded hover:bg-slate-100">{r.title} — tier {r.tier}</button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm">Filter by type</label>
          <div className="mt-2 flex gap-2 flex-wrap">
            {['all','core','movement','branch','special','master'].map(t => (
              <button key={t} onClick={() => setFilter(t)} className={`px-3 py-1 rounded ${filter===t? 'bg-slate-800 text-white':'bg-slate-100'}`}>{t}</button>
            ))}
          </div>
        </div>

        <div className="mt-2">
          <label className="block text-sm">Zoom</label>
          <input type="range" min="0.5" max="2" step="0.05" value={scale} onChange={(e)=>setScale(Number(e.target.value))} className="w-full" />
        </div>

        <div className="mt-auto text-xs text-gray-500">
          Inspired design: organic branches (Ori), compact grid (Star Wars tech-tree), expansive passive-tree (Path of Exile).
        </div>
      </aside>

      {/* Center: SVG canvas */}
      <div className="flex-1 relative bg-gradient-to-b from-slate-50 to-white rounded-2xl shadow overflow-hidden">
        <div className="absolute top-4 left-4 p-2 bg-white/80 rounded backdrop-blur-sm z-10">
          <div className="text-sm">Scale: {scale.toFixed(2)}</div>
          <div className="text-xs text-gray-500">Offset: {Math.round(offset.x)}x {Math.round(offset.y)}y</div>
        </div>

        <svg ref={svgRef} onWheel={onWheel} onMouseDown={onMouseDown} onMouseMove={onMouseMove} className="w-full h-full" viewBox={`0 0 ${1000} ${600}`} preserveAspectRatio="xMidYMid meet">
          <rect width="100%" height="100%" fill="transparent" />

          {/* apply pan/zoom transform to a grouping element */}
          <g transform={`translate(${offset.x}, ${offset.y}) scale(${scale})`}>
            {/* edges */}
            <g>
              {edges.map((e, i) => {
                const a = nodes.find(n => n.id === e.from);
                const b = nodes.find(n => n.id === e.to);
                if (!a || !b) return null;
                return (
                  <path key={i} d={edgePath(a,b)} stroke="#cbd5e1" strokeWidth={3} fill="none" className="opacity-90" />
                );
              })}
            </g>

            {/* nodes */}
            <g>
              {filteredNodes.map(n => (
                <g key={n.id} transform={`translate(${n.x}, ${n.y})`} className="cursor-pointer" onClick={() => setSelected(n)}>
                  <motion.circle r={28} whileHover={{ scale: 1.06 }} className={`${nodeColor(n.type)} stroke-white stroke-2`} />
                  <text x={0} y={40} textAnchor="middle" fontSize={12} fill="#0f172a">{n.title}</text>
                  {/* small tier indicator */}
                  <circle cx={26} cy={-26} r={10} fill="#0b1220" opacity={0.7} />
                  <text x={26} y={-22} textAnchor="middle" fontSize={9} fill="#fff">{n.tier}</text>
                </g>
              ))}
            </g>

          </g>
        </svg>

        {/* minimap */}
        <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded shadow text-xs">
          <div className="font-semibold mb-1">Minimap</div>
          <svg width={mapW} height={mapH} viewBox={`0 0 1000 600`} className="block">
            <rect width="100%" height="100%" fill="#0f172a" opacity={0.03} rx={8} />
            {nodes.map(n => (
              <circle key={n.id} cx={n.x} cy={n.y} r={3} transform={`scale(${miniScale})`} fill="#0b1220" />
            ))}
            {/* viewport rectangle (approx) */}
            <rect x={-offset.x/ (1/miniScale) } y={-offset.y/ (1/miniScale)} width={1000 * (miniScale/scale)} height={600 * (miniScale/scale)} fill="transparent" stroke="#111827" strokeWidth={1} />
          </svg>
        </div>

        {/* detail panel */}
        <div className="absolute top-4 right-4 w-80 bg-white rounded-2xl shadow p-4">
          <AnimatePresence>
            {selected ? (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y:0 }} exit={{ opacity: 0, y: -8 }}>
                <h4 className="text-lg font-semibold">{selected.title}</h4>
                <p className="text-sm text-gray-600 mt-2">{selected.desc}</p>
                <div className="mt-3 flex gap-2">
                  <button className="px-3 py-1 rounded bg-indigo-600 text-white">Start lesson</button>
                  <button onClick={() => { setSelected(null); }} className="px-3 py-1 rounded border">Close</button>
                </div>
                <div className="mt-3 text-xs text-gray-500">Type: {selected.type} • Tier {selected.tier}</div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="text-sm text-gray-600">Select a skill node to see details and actions</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Right: Inspiration + legend */}
      <aside className="w-64 bg-white rounded-2xl shadow p-4 flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Legend & Inspiration</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-indigo-500" /> Core (Ori-style hub)</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-400" /> Movement / Flow (Star Wars tech-tree feel)</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-400" /> Branches (specializations)</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-600" /> Master / Capstone
          </div>
        </div>

        <div className="mt-4 text-sm">
          <strong>Export</strong>
          <div className="text-xs text-gray-500 mt-1">This component renders as SVG so it's easy to export snapshots or integrate with a backend to persist unlocked nodes.</div>
        </div>

        <div className="mt-auto text-xs text-gray-400">Tips: swap edgePath() to sharp polylines for PoE grid heavy look, or apply glow filters for Ori vibes.</div>
      </aside>
    </div>
  );
}

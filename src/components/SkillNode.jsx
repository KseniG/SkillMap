import { motion } from "framer-motion"

export default function SkillNode({ x, y, label, unlocked, onClick, scale = 1 }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <motion.circle
        r={40 * scale} // Масштабируем радиус
        fill={unlocked ? "rgba(0,255,255,0.3)" : "rgba(100,100,100,0.3)"}
        stroke={unlocked ? "cyan" : "gray"}
        strokeWidth="2"
        className="cursor-pointer hover:stroke-cyan-400 transition"
        onClick={onClick}
        whileHover={{ scale: 1.1 * scale }}
        whileTap={{ scale: 0.95 * scale }}
      />
      <text
        textAnchor="middle"
        dy="0.3em"
        fill="white"
        fontSize={14 * scale} // Масштабируем шрифт
        className="pointer-events-none"
      >
        {label}
      </text>
    </g>
  )
}

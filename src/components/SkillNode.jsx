export default function SkillNode({ x, y, label, unlocked, onClick }) {
  return (
    <g transform={`translate(${x}, ${y})`} onClick={unlocked ? onClick : null} className="cursor-pointer">
      <circle
        r="20"
        fill={unlocked ? "url(#glow)" : "#555"}
        stroke={unlocked ? "#0ff" : "#777"}
        strokeWidth="3"
      />
      <text
        textAnchor="middle"
        y="4"
        fill={unlocked ? "white" : "#aaa"}
        fontSize="8"
        style={{ pointerEvents: "none" }}
      >
        {label}
      </text>
    </g>
  )
}

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

/**
 * Skill Map — базовая визуальная карта умений
 * v1: анимация, зум, подсветка и ветки между узлами
 */

export default function SkillMap() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const controls = useAnimation();

  // Список умений (можно будет расширить)
  const skills = [
    { id: 1, name: "Действия с дробями", x: 0, y: 0, desc: "Базовое умение. Даёт видение пути." },
    { id: 2, name: "Текстовые задачи", x: 150, y: -100, desc: "Позволяет двигаться быстрее." },
    { id: 3, name: "Координаты", x: -150, y: -100, desc: "Увеличивает радиус восприятия." },
    { id: 4, name: "Вход", x: 0, y: 150, desc: "Усиливает базовые атаки." },
  ];

  // Линии между умениями
  const links = [
    [1, 2],
    [1, 3],
    [1, 4],
  ];

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-indigo-900 via-blue-900 to-cyan-800 overflow-hidden">
      {/* SVG-карта */}
      <svg viewBox="-200 -200 400 400" className="w-full h-full">
  <defs>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="rgba(0,255,255,1)" />
      <stop offset="100%" stopColor="rgba(0,255,255,0)" />
    </radialGradient>
  </defs>
        {/* Линии */}
        {links.map(([a, b]) => {
          const sa = skills.find(s => s.id === a);
          const sb = skills.find(s => s.id === b);
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={sa.x}
              y1={sa.y}
              x2={sb.x}
              y2={sb.y}
              stroke="url(#glow)"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1.5 }}
            />
          );
        })}

        {/* Градиент свечения */}
        <defs>
          <radialGradient id="glow">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Узлы умений */}
        {skills.map(skill => (
          <motion.circle
            key={skill.id}
            cx={skill.x}
            cy={skill.y}
            r={selectedSkill?.id === skill.id ? 24 : 18}
            fill="url(#glow)"
            stroke="#7dd3fc"
            strokeWidth="2"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedSkill(skill)}
          />
        ))}

        {/* Текст умений */}
        {skills.map(skill => (
          <text
            key={`label-${skill.id}`}
            x={skill.x}
            y={skill.y + 40}
            fill="#bae6fd"
            textAnchor="middle"
            fontSize="14"
            fontFamily="sans-serif"
          >
            {skill.name}
          </text>
        ))}
      </svg>

      {/* Панель описания */}
      {selectedSkill && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-slate-800/80 backdrop-blur-md border border-sky-500/50 rounded-2xl p-6 w-80 text-center text-sky-100 shadow-xl"
        >
          <h2 className="text-xl font-bold mb-2">{selectedSkill.name}</h2>
          <p className="text-sm text-sky-200">{selectedSkill.desc}</p>
        </motion.div>
      )}
    </div>
  );
}

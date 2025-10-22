import { useState } from "react"
import { motion } from "framer-motion"
import SkillNode from "./components/SkillNode.jsx"

export default function SkillMap({ onGoToCourse }) {
  const [unlocked, setUnlocked] = useState({
    entrance: true,
    fractions: false,
    coordinates: false,
    wordProblems: false,
  })
  const [showTest, setShowTest] = useState(false)
  const [answers, setAnswers] = useState({ q1: "", q2: "" })
  const [unlockAnim, setUnlockAnim] = useState(false)

  const handleEntranceClick = () => setShowTest(true)

  const handleSubmit = () => {
    if (answers.q1 === "8" && answers.q2 === "12") {
      setShowTest(false)
      setUnlockAnim(true)
      setTimeout(() => {
        setUnlocked({ ...unlocked, fractions: true })
        setUnlockAnim(false)
      }, 1200)
    } else {
      alert("Проверь ответы 😅")
    }
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="-250 -200 500 230" className="w-full h-full">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,255,255,1)" />
            <stop offset="100%" stopColor="rgba(0,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Анимированная линия */}
        {unlocked.fractions && (
          <motion.line
            x1="0"
            y1="0"
            x2="75"
            y2="-50"
            stroke="url(#glow)"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        )}

        <SkillNode x={0} y={0} label="Вход" unlocked={unlocked.entrance} onClick={handleEntranceClick} />
        <SkillNode x={75} y={-50} label="Действия с дробями" unlocked={unlocked.fractions} onClick={onGoToCourse} />
        <SkillNode x={75} y={-150} label="Координаты на числовом луче" unlocked={unlocked.coordinates} />
        <SkillNode x={0} y={-100} label="Текстовые задачи" unlocked={unlocked.wordProblems} />
        <SkillNode x={150} y={-100} label="Рациональные числа" unlocked={unlocked.wordProblems} />
        <SkillNode x={-75} y={-50} label="Площади фигур" unlocked={unlocked.wordProblems} />
      </svg>

      {/* Кнопка “Курс” */}
      {unlocked.fractions && (
        <motion.button
          onClick={onGoToCourse}
          className="absolute bottom-8 px-6 py-2 bg-cyan-600 text-white rounded-xl shadow-lg hover:bg-cyan-500 transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Курс
        </motion.button>
      )}

      {/* Модальное окно теста */}
      {showTest && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white/70 z-50">
          <div className="bg-gray-900 bg-opacity-90 p-6 rounded-xl shadow-xl text-white w-80 text-center">
            <h2 className="text-xl mb-4 font-semibold">Входное тестирование</h2>
            <p>1️⃣ 3 + 5 = ?</p>
            <input
              className="w-full mb-3 p-2 bg-gray-800 border border-gray-600 rounded"
              style={{ color: 'black', WebkitTextFillColor: 'black' }}
              value={answers.q1}
              onChange={(e) => setAnswers({ ...answers, q1: e.target.value })}
            />
            <p>2️⃣ 6 × 2 = ?</p>
            <input
              className="w-full mb-4 p-2 bg-gray-800 border border-gray-600 rounded"
              style={{ color: 'black', WebkitTextFillColor: 'black' }}
              value={answers.q2}
              onChange={(e) => setAnswers({ ...answers, q2: e.target.value })}
            />
            <button
              id="CheckBtn"
              onClick={handleSubmit}
              className="w-full bg-cyan-600 hover:bg-cyan-500 rounded py-2 transition"
              style={{ color: 'black', WebkitTextFillColor: 'black' }}
            >
              Проверить
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

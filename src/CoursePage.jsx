import { useState } from "react"
import TestModal from "./components/TestModal.jsx"
import TheoryModal from "./components/TheoryModal.jsx"

export default function CoursePage() {
  const [tests, setTests] = useState({
    fractions: { unlocked: true, score: null, date: "21.10.2025" },
    wordProblems: { unlocked: false, score: null, date: "21.10.2025" },
  })
  const [showTest, setShowTest] = useState(false)
  const [showTheory, setShowTheory] = useState(false)

  const handleTestComplete = (score) => {
    const updated = { ...tests }
    updated.fractions.score = score

    if (score >= 80) {
      updated.wordProblems.unlocked = true
    } else {
      setShowTheory(true)
    }
    setTests(updated)
    setShowTest(false)
  }

  return (
    <div className="flex flex-col items-center justify-start w-full h-full p-8 text-white bg-gradient-to-b from-blue-900 via-indigo-800 to-cyan-900">
      <h1 className="text-4xl font-bold mb-6">📘 Математика</h1>

      {/* Плашка теста 1 */}
      <div
        onClick={() => setShowTest(true)}
        className={`w-full max-w-md p-4 mb-4 rounded-xl shadow-lg flex justify-between items-center cursor-pointer transition ${
          tests.fractions.unlocked ? "bg-cyan-700 hover:bg-cyan-600" : "bg-gray-700 cursor-not-allowed"
        }`}
      >
        <div>
          <p className="font-semibold">Обыкновенные дроби</p>
          <p className="text-sm text-gray-300">{tests.fractions.date}</p>
        </div>
        <span>{tests.fractions.score !== null ? `${tests.fractions.score}%` : "—"}</span>
      </div>

      {/* Плашка теста 2 */}
      <div
        className={`w-full max-w-md p-4 mb-4 rounded-xl shadow-lg flex justify-between items-center transition ${
          tests.wordProblems.unlocked ? "bg-cyan-700 hover:bg-cyan-600 cursor-pointer" : "bg-gray-700 cursor-not-allowed"
        }`}
      >
        <div>
          <p className="font-semibold">Текстовые задачи</p>
          <p className="text-sm text-gray-300">{tests.wordProblems.date}</p>
        </div>
        <span>{tests.wordProblems.score !== null ? `${tests.wordProblems.score}%` : "—"}</span>
      </div>

      {showTest && <TestModal onComplete={handleTestComplete} />}
      {showTheory && <TheoryModal onClose={() => setShowTheory(false)} />}
    </div>
  )
}

import { useState } from "react"

export default function TestModal({ onComplete }) {
  const [answers, setAnswers] = useState(["", "", "", "", ""])

  const correct = ["1/2", "3/4", "2/3", "5/6", "7/8"]

  const handleSubmit = () => {
    let score = 0
    answers.forEach((a, i) => {
      if (a === correct[i]) score++
    })
    const percent = Math.round((score / correct.length) * 100)
    onComplete(percent)
  }

  const questions = [
    "1️⃣ Какая дробь меньше: 1/2 или 3/4?",
    "2️⃣ Сократи дробь 6/8",
    "3️⃣ Найди сумму 1/3 + 1/3",
    "4️⃣ Какая дробь больше: 4/5 или 5/6?",
    "5️⃣ Что больше: 7/8 или 3/4?",
  ]

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70">
      <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-96 text-white">
        <h2 className="text-xl font-semibold mb-4 text-center">Тест: Обыкновенные дроби</h2>
        {questions.map((q, i) => (
          <div key={i} className="mb-3">
            <p>{q}</p>
            <input
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded mt-1"
              style={{ color: 'black', WebkitTextFillColor: 'black' }}
              value={answers[i]}
              onChange={(e) => {
                const newA = [...answers]
                newA[i] = e.target.value
                setAnswers(newA)
              }}
            />
          </div>
        ))}
        <button
          onClick={handleSubmit}
          style={{ color: 'black', WebkitTextFillColor: 'black' }}
          className="w-full bg-cyan-600 hover:bg-cyan-500 py-2 rounded mt-4"
        >
          Проверить
        </button>
      </div>
    </div>
  )
}

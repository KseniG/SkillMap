import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export default function TheoryModal({ onClose }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < 3 ? prev + 1 : prev))
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const explanations = [
    "Когда мы делим круг пополам, получаем 1/2. Это значит, что весь круг разделён на две равные части.",
    "Если делим на три части — это 1/3. Чем больше частей, тем меньше каждая доля.",
    "3/4 означает, что взяли 3 части из 4 возможных — почти весь круг!",
    "Теперь попробуй снова тест — уверен, получится лучше!",
  ]

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <motion.div
        className="bg-gray-900 p-6 rounded-2xl shadow-2xl text-white w-[480px] flex flex-col items-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-cyan-300">Теория: Обыкновенные дроби</h2>

        {/* СЦЕНА */}
        <div className="relative w-64 h-64 mb-4 flex items-center justify-center">
          <svg width="256" height="256" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="rgba(255,255,255,0.05)" stroke="white" strokeWidth="1" />

            {/* Половина круга */}
            <AnimatePresence>
              {step >= 0 && (
                <motion.path
                  d="M50,50 L50,10 A40,40 0 0,1 90,50 Z"
                  fill="rgba(0,255,255,0.3)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2 }}
                />
              )}
            </AnimatePresence>

            {/* Треть круга */}
            <AnimatePresence>
              {step >= 1 && (
                <motion.path
                  d="M50,50 L50,10 A40,40 0 0,1 80,84 Z"
                  fill="rgba(0,255,100,0.3)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2 }}
                />
              )}
            </AnimatePresence>

            {/* 3/4 круга */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.path
                  d="M50,50 L50,10 A40,40 0 1,1 10,60 Z"
                  fill="rgba(255,200,0,0.3)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2 }}
                />
              )}
            </AnimatePresence>
          </svg>

          {/* Подписи */}
          {step >= 0 && (
            <motion.span
              className="absolute top-4 left-1/2 -translate-x-1/2 text-lg text-cyan-300 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {["1/2", "1/3", "3/4"][Math.min(step, 2)]}
            </motion.span>
          )}
        </div>

        {/* Текстовое объяснение */}
        <motion.p
          key={step}
          className="text-center text-gray-200 mb-6 min-h-[80px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {explanations[step]}
        </motion.p>

        {step >= 3 && (
          <motion.button
            onClick={onClose}
            className="bg-cyan-600 hover:bg-cyan-500 px-8 py-2 rounded-xl text-white font-semibold shadow-lg transition"
            style={{ color: 'black', WebkitTextFillColor: 'black' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Понятно!
          </motion.button>
        )}
      </motion.div>
    </div>
  )
}

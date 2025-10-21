export default function GradientCard({ children, className = "" }) {
  return (
    <div
      className={`relative bg-white dark:bg-slate-900 text-slate-900 dark:text-gray-100 rounded-2xl p-[2px] shadow-xl ${className}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-75 blur-[4px]" />
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6">
        {children}
      </div>
    </div>
  )
}

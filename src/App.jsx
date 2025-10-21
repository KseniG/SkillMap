import { useState } from "react"
import SkillMap from "./SkillMap.jsx"
import CoursePage from "./CoursePage.jsx"

export default function App() {
  const [page, setPage] = useState("map") // "map" | "course"

  return (
    <div className="w-full h-screen bg-gradient-to-b from-indigo-900 via-blue-900 to-cyan-800 overflow-hidden">
      {page === "map" && <SkillMap onGoToCourse={() => setPage("course")} />}
      {page === "course" && <CoursePage />}
    </div>
  )
}

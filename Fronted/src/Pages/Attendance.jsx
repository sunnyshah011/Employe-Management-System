import { useCallback, useEffect, useState } from "react"
import { dummyAttendanceData } from "../assets/assets"
import LoadingAnimation from "../Component/LoadingAnimation"

const Attendance = () => {

  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDeleted, setIsDeleted] = useState(false)

  const fetchData = useCallback(async () => {
    setHistory(dummyAttendanceData)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <LoadingAnimation />

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayRecord = history.find((r) => new Date(r.date).toDateString() === today.toDateString())

  return (
    <div>Attendance</div>
  )
}

export default Attendance

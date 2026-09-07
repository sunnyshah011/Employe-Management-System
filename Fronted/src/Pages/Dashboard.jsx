import { useEffect, useState } from "react"
import { dummyAdminDashboardData, dummyEmployeeDashboardData } from "../assets/assets"
import AdminDashboard from "../Component/AdminDashboard"
import EmployeeDashboard from "../Component/EmployeeDashboard"

const Dashboard = () => {

  const [data, setData] = useState(null)
  const [loading, Setloading] = useState(true)

  useEffect(() => {
    setData(dummyAdminDashboardData)
    setTimeout(() => {
      Setloading(false)
    }, 100);
  }, [])

  if (loading) return <p>loading</p>
  if (!data) return <p>failed to load data</p>
  if (data.role === "ADMIN") {
    return <AdminDashboard data={data} />
  } else {
    return <EmployeeDashboard data={data} />
  }
}

export default Dashboard



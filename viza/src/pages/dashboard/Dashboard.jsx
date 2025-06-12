
import { Card, Row, Col, Statistic, Typography } from "antd"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { UserOutlined, FileTextOutlined, TeamOutlined, CalendarOutlined } from "@ant-design/icons"
import {  useEffect, useState } from "react"
import { currentMonthDataAPI, getAllUserStatusApi, totalApplicationSubmitRejectAPI, totalOfficerApi } from "../../api/dashboardApi"

const { Title } = Typography

// const userStatusData = [
//   { name: "Active Users", value: 1250, color: "#52c41a" },
//   { name: "Inactive Users", value: 350, color: "#ff4d4f" },
// ]

// const applicationStatusData = [
//   { name: "Submitted", value: 890 },
//   { name: "Pending", value: 210 },
// ]

const monthlyApplications2025 = [
  { month: "Jan", applications: 45 },
  { month: "Feb", applications: 52 },
  { month: "Mar", applications: 38 },
  { month: "Apr", applications: 61 },
  { month: "May", applications: 49 },
  { month: "Jun", applications: 55 },
]

export default function Dashboard() {
  // const totalOfficers = 25
  const [userStatusData,setUserStatusData] = useState([])
  const [applicationStatusData,setApplicationStatusData] = useState([])
  const getStatusDetail = async ()=>{
    try{
      const res = await getAllUserStatusApi()
      setUserStatusData(res?.data || [])
    }
    catch(error){
      console.log(error)
    }
  }
  const getApplicationSubmitRejected  = async () =>{
    try{
      const res = await totalApplicationSubmitRejectAPI()
      setApplicationStatusData(res?.data||[])
      console.log(res,'getting the repossss')
    }
    catch(error){
      console.log(error)
    }
  }
  const [totalOfficers,setTotalOfficer] = useState(0)
  const getOfficer = async () =>{
    try{
      const res =await totalOfficerApi()
      setTotalOfficer(res?.totalOfficers||0)
    }
    catch(error){
      console.log(error)
    }
  }
  const [monthlyApplications2025,setMonthlyApplications2025] = useState([])
  const [total2025Applications,setTotal2025Applications] = useState(0)

  const getCurrentmonthDataGet = async ()=>{
    try{
      const res = await currentMonthDataAPI()
      setMonthlyApplications2025(res?.data ||[])
      setTotal2025Applications(res?.data?.reduce((sum, item) => sum + item.applications, 0))
    }
    catch(error){
      console.log(error)
    }
  }
useEffect(()=>{
getStatusDetail()
getApplicationSubmitRejected()
getOfficer()
getCurrentmonthDataGet()
},[])
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Title level={2} className="mb-8 text-center">
          Dashboard Analytics
        </Title>

        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
              <Statistic
                title="Total Officers"
                value={totalOfficers}
                prefix={<TeamOutlined className="text-blue-500" />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
              <Statistic
                title="Applications Approved"
                value={applicationStatusData?.[0]?.value}
                prefix={<FileTextOutlined className="text-green-500" />}
                valueStyle={{ color: "#52c41a" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
              <Statistic
                title="Applications Pending"
                value={applicationStatusData?.[1]?.value}
                prefix={<FileTextOutlined className="text-yellow-500" />}
                valueStyle={{ color: "#e8df2a" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
              <Statistic
                title="Applications Rejected"
                value={applicationStatusData?.[2]?.value}
                prefix={<FileTextOutlined className="text-red-500" />}
                valueStyle={{ color: "#f2070f" }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card
              title={
                <div className="flex items-center gap-2">
                  <UserOutlined className="text-blue-500" />
                  <span>User Status Distribution</span>
                </div>
              }
              className="shadow-md hover:shadow-lg transition-shadow"
            >
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userStatusData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, "Users"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  Total Users:{" "}
                  <span className="font-semibold text-blue-600">
                    {userStatusData?.reduce((sum, item) => sum + item.value, 0)}
                  </span>
                </p>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title={
                <div className="flex items-center gap-2">
                  <CalendarOutlined className="text-purple-500" />
                  <span>2025 Monthly Applications</span>
                </div>
              }
              className="shadow-md hover:shadow-lg transition-shadow"
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyApplications2025}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, "Applications"]} />
                  <Bar dataKey="applications" fill="#722ed1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  Average per month:{" "}
                  <span className="font-semibold text-purple-600">
                    {Math.round(total2025Applications / monthlyApplications2025.length)}
                  </span>
                </p>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 24]} className="mt-8">
          <Col xs={24}>
            <Card
              title={
                <div className="flex items-center gap-2">
                  <FileTextOutlined className="text-orange-500" />
                  <span>Application Status Summary</span>
                </div>
              }
              className="shadow-md hover:shadow-lg transition-shadow"
            >
              <Row gutter={[16, 16]} className="text-center">
                <Col xs={24} sm={8}>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{applicationStatusData?.[0]?.value}</div>
                    <div className="text-green-700">Submitted</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {(
                        (applicationStatusData?.[0]?.value /
                          (applicationStatusData?.[0]?.value + applicationStatusData?.[1]?.value)) *
                        100
                      ).toFixed(1)}
                      % Success Rate
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={8}>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{applicationStatusData?.[1]?.value}</div>
                    <div className="text-yellow-700">Pending</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {(
                        (applicationStatusData?.[1]?.value /
                          (applicationStatusData?.[0]?.value + applicationStatusData?.[1]?.value)) *
                        100
                      ).toFixed(1)}
                      % Rejection Rate
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={8}>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {applicationStatusData?.[0]?.value + applicationStatusData?.[1]?.value}
                    </div>
                    <div className="text-blue-700">Total Processed</div>
                    <div className="text-sm text-gray-500 mt-1">All Applications</div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

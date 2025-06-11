import { useEffect, useState } from "react"
import { Steps, Card, Alert, Button, Modal, Tag, Divider } from "antd"
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { getUserStatusActiveAPI } from "../../api/userApi"

const { Step } = Steps

export default function VisaStatusPage({open,onCancel}) {

  const[statusInfo,setStatusInfo] = useState("")
  const [showRejectionModal, setShowRejectionModal] = useState(false)

  // Sample application data - you can modify this to test different statuses
  const applicationDataStatus = {
    applicationId: "VS2024001234",
    applicantName: "John Doe",
    visaType: "Tourist Visa",
    submissionDate: "2024-01-15",
    status: "rejected", // Can be: "pending", "under_review", "approved", "rejected"
    rejectionReasons: [
      "Insufficient financial documentation",
      "Travel itinerary not detailed enough",
      "Missing employment verification letter",
    ],
  }

  const [applicationData,setApplicationData] = useState({})
  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return {
          current: 0,
          status: "process",
          color: "yellow",
          text: "Application Pending",
        }
      case "under_review":
        return {
          current: 1,
          status: "process",
          color: "orange",
          text: "Under Review",
        }
      case "approved":
        return {
          current: 2,
          status: "finish",
          color: "green",
          text: "Application Accepted",
        }
      case "rejected":
        return {
          current: 2,
          status: "error",
          color: "red",
          text: "Application Rejected",
        }
      default:
        return {
          current: 0,
          status: "wait",
          color: "gray",
          text: "Unknown Status",
        }
    }
  }

  // const statusInfo = getStatusInfo(applicationData.status)

  const steps = [
    {
      title: "Form Applied",
      description: "Application submitted successfully",
      icon: <FileTextOutlined />,
    },
    {
      title: "Officer Checking",
      description: "Under review by visa officer",
      icon: <UserOutlined />,
    },
    {
      title: applicationData?.status === "approved" ? "Accepted" : "Decision Made",
      description:
        applicationData?.status === "approved"
          ? "Visa application approved"
          : applicationData.status === "rejected"
            ? "Application has been reviewed"
            : "Awaiting final decision",
      icon:
        applicationData?.status === "approved" ? (
          <CheckCircleOutlined />
        ) : applicationData?.status === "rejected" ? (
          <CloseCircleOutlined />
        ) : (
          <ClockCircleOutlined />
        ),
    },
  ]
  const [img,setImage] = useState("")

  const getStatus = async()=>{
    try{
      const id = localStorage.getItem("token")
      const res = await getUserStatusActiveAPI(id)
      if(res?.userDetails?.length){
          const data =   getStatusInfo(res?.userDetails?.[0]?.status||{})
      setStatusInfo(data||{})
      setApplicationData(res?.userDetails[0])
      }
      else{
  const statusInfo = getStatusInfo(applicationDataStatus.status)

        //  const data =   getStatusInfo(res?.userDetails?.[0]?.status||{})
      setStatusInfo(statusInfo)
      setApplicationData(applicationDataStatus)
      }
  
    }
    catch(error){
      console.log(error)
    }
  }
useEffect(()=>{
  getStatus()
},[open])

  return (
<Modal
        title={
          <div style={{ textAlign: "center" }}>
            <h2 style={{ margin: 0, color: "black" ,fontSize:"19px"}}>
              View Application Status 
            </h2>
           
          </div>
        }
        open={open}
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        width={1000}
        onCancel={onCancel}
        footer={false}
      >
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        <Card className="mb-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Application Details</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Application ID:</span> {applicationData?._id}
                </p>
               
                <p>
                  <span className="font-medium">Visa Type:</span> {applicationData?.visaType}
                </p>
                <p>
                  <span className="font-medium">Submission Date:</span> {applicationData?.createdAt}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Current Status</h3>
              <div className="flex items-center gap-3">
                <Tag color={statusInfo.color} className="text-sm px-3 py-1">
                  {statusInfo.text}
                </Tag>
                {applicationData?.status === "rejected" && (
                  <Button
                    type="text"
                    icon={<ExclamationCircleOutlined />}
                    onClick={() => setShowRejectionModal(true)}
                    className="text-red-500 hover:text-red-700"
                    title="Click to see rejection reasons"
                  >
                    View Details
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Divider />

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Application Progress</h3>
            <Steps current={statusInfo.current} status={statusInfo.status} className="mb-4">
              {steps.map((step, index) => (
                <Step key={index} title={step.title} description={step.description} icon={step.icon} />
              ))}
            </Steps>
          </div>

          {applicationData?.status === "rejected" && (
            <Alert
              message="Application Rejected"
              description="Your visa application has been rejected. Click the details button above to see the specific reasons."
              type="error"
              showIcon
              className="mb-4"
            />
          )}

          {applicationData?.status === "approved" && (
            <Alert
              message="Application Approved"
              description="Congratulations! Your visa application has been approved. You will receive your visa documents soon."
              type="success"
              showIcon
              className="mb-4"
            />
          )}

          {(applicationData?.status === "pending" || applicationData?.status === "under_review") && (
            <Alert
              message="Application in Progress"
              description="Your application is being processed. We will notify you once a decision is made."
              type="info"
              showIcon
              className="mb-4"
            />
          )}
        </Card>

        <Card className="shadow-lg">
          <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
          <div className="space-y-3">
            {applicationData?.status === "pending" && (
              <p className="text-gray-600">
                • Your application is in queue for review
                <br />• Processing time: 5-10 business days
                <br />• You will be notified via email of any updates
              </p>
            )}
            {applicationData?.status === "under_review" && (
              <p className="text-gray-600">
                • A visa officer is currently reviewing your application
                <br />• Additional documents may be requested
                <br />• Decision expected within 3-5 business days
              </p>
            )}
            {applicationData?.status === "approved" && (
              <p className="text-gray-600">
                • Your visa will be processed and mailed to you
                <br />• Expected delivery: 3-5 business days
                <br />• Track your visa delivery using the tracking number sent to your email
              </p>
            )}
            {applicationData?.status === "rejected" && (
              <p className="text-gray-600">
                • Review the rejection reasons by clicking the details button
                <br />• You may reapply after addressing the mentioned issues
                <br />• Contact our support team if you need clarification
              </p>
            )}
          </div>
        </Card>

        {/* Rejection Details Modal */}
        <Modal
          title="Application Rejection Details"
          open={showRejectionModal}
          onCancel={() => setShowRejectionModal(false)}
          footer={[
            <Button key="close" onClick={() => setShowRejectionModal(false)}>
              Close
            </Button>,
          ]}
        >
          <div className="space-y-4">
            <Alert message="Your application was rejected for the following reasons:" type="error" showIcon />
            <div className="space-y-2">
              {/* {applicationData.rejectionReasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CloseCircleOutlined className="text-red-500 mt-1" />
                  <span>{reason}</span>
                </div>
              ))} */}
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Next Steps:</h4>
              <p className="text-blue-800 text-sm">
                Please address the above issues and submit a new application. Make sure to include all required
                documents and information.
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
    </Modal>
  )
}

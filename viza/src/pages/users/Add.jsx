"use client"

import { Card, Form, Input, Select, Button, message } from "antd"
import { createUserAPI } from "../../api/userApi"
import { useNavigate } from "react-router-dom"
import Btn from "../../component/Button"

const { Option } = Select

const Add = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onFinish = async(values) => {
    try{
const res = await createUserAPI({...values,isActive:true})
if(res?.status==="OK"){
  navigate("/users")
  message.success(res?.message)
}
    }
    catch(error){
  message.error(error?.message)
      console.log(error)
    }
  }

  const onFinishFailed = (errorInfo) => {
    message.error("Please check the form fields")
  }

  return (
    <Card title="Add User" style={{ maxWidth: 800, margin: "0 " }}>
      <Form
        form={form}
        name="addUser"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input the name!" },
            { min: 2, message: "Name must be at least 2 characters long!" },
            { max: 50, message: "Name cannot exceed 50 characters!" },
          ]}
        >
          <Input placeholder="Enter full name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input the email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item label="Role" name="role" rules={[{ required: true, message: "Please select a role!" }]}>
          <Select placeholder="Select a role">
            <Option value="user">User</Option>
            <Option value="officer">Officer</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>

        <Form.Item>
           <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input the Password!" },
            { min: 2, message: "Password must be at least 2 characters long!" },
            { max: 50, message: "Password cannot exceed 50 characters!" },
          ]}
        >
          <Input placeholder="Enter Password" />
        </Form.Item>
            <div className="flex gap-2 items-center">
          <Btn type="subPrimary" label={"Reset"} className={"px-2"} onClick={()=>form.resetFields()} />
           <Btn label={"Add User"} type="primary" htmlType="submit" />
            </div>
         
        </Form.Item>
      </Form>
    </Card>
  )
}

export default Add

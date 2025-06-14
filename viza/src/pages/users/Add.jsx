

import { Card, Form, Input, Select, Button, message } from "antd"
import { createUserAPI, editUserApi, getUserDetailInAdd } from "../../api/userApi"
import { useNavigate, useParams } from "react-router-dom"
import Btn from "../../component/Button"
import { useEffect } from "react"

const { Option } = Select

const Add = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onFinish = async(values) => {
    try{
const res = id?await editUserApi(id,values) : await createUserAPI({...values,isActive:true})
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
    message.error("Please check the form ")
  }

  const getUserData  = async () =>{
    try{
      const res = await getUserDetailInAdd(id)
      const Response = res?.user
            console.log(res?.user,'get the response of user here ')

      form.setFieldsValue({
        name:Response?.name,
        role:Response?.role,
        email:Response?.email
      })
    }
    catch(error){
      console.log(error)
    }
  }


  useEffect(()=>{
if(id){
  getUserData()
}
  },[id])

  return (
    <Card title={id?"Edit User":"Add User" } style={{ maxWidth: 800, margin: "0 " }}>
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
        {
          !id && (
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
          )
        }

        <Form.Item>
         
            <div className="flex gap-2 items-center">
          <Btn type="subPrimary" label={"Reset"} className={"px-2"} onClick={()=>form.resetFields()} />
           <Btn label={id?"Edit User":"Add User"} type="primary" htmlType="submit" />
            </div>
         
        </Form.Item>
      </Form>
    </Card>
  )
}

export default Add

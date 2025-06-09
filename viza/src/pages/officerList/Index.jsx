import { Card, message, Popover, Switch, Table } from "antd";
import React, { useEffect, useState } from "react";
import Btn from "../../component/Button";
import { AddNew, Edit, OptionsIcon, Trash } from "../../assets/Images";
import CommonTable from "../../component/CommonTable";
import LabelIcon from "../../component/LabelIcon";
import { closePopup, setPopupProps } from "../../redux/common";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activateUserApi, deactivateUserAPI, deleteUserAPI, getAllFormSubmitUser, getAllUsersAPI } from "../../api/userApi";
import dayjs from "dayjs";
function capitalizeFirstLetter(str) {
  if (!str) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const OfficerList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { popupProps } = useSelector((state) => state);
const getAllUserData = async()=>{
  try{
    const res= await getAllFormSubmitUser()
    setUserData({data:res?.applications ,totalRecords:res?.users?.length})
    console.log(res,'get response here ')
  }
  catch(error){
    console.log(error)
  }
}
  const [userData, setUserData] = useState({
    data: [],
    totalRecords: 0,
  });
  const deleteUser  = async (id)=>{
    try{
       const res = await deleteUserAPI(id)
    // if(res?.status===200){
      message.success("User delete Successfully")
     
    // }
     dispatch(closePopup())
    }
    catch(error){
      console.log(error)
    }
   finally{
      getAllUserData()

   }

    
  }
  const [searchParams, setSearchParams] = useState({
    limit: 25,
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  const deactivateUser  = async (id)=>{
    try{
      const res = deactivateUserAPI(id)
      message.success("User has deactivated")
    }
    catch(error){
      console.log(error)
    }
    finally{
      getAllUserData()

    }
  }
  const activateUser  = async(id)=>{
     try{
      const res = await activateUserApi(id)
      console.log(res,'redd')
      message.success("User has activated")
    }
    catch(error){
      console.log(error)
    }
    finally{
      getAllUserData()

    }
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width:"60",
      key: "name",
      render:(data,record)=>{
        return (
            <>
                <div>
                    {record?.user?.name||"-"}
                </div>
            </>
        )
      }
    },
    {
      title: "Email",
      dataIndex: "email",
      width:"60",
      key: "email",
       render:(data,record)=>{
        return (
            <>
                <div>
                    {record?.user?.email||"-"}
                </div>
            </>
        )
      }
    },
   ,
    {
      title: "Status",
      dataIndex: "isActive",
      width:"120",
      key: "isActive",
      render: (status,record) => (
       <>
      {
        record?.user?.isActive===true?(<div className="text-green-400">Active</div>):(<div className="text-red-500">Inactive</div>)
      }
       </>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      width:"120",
      key: "createdAt",
      render: (data,record) => (
       <>
      <div>
        {
            dayjs(data).format('MMMM D, YYYY h:mm A')
        }
      </div>
       
       </>
      ),
    },
  
  ];

  useEffect(()=>{
getAllUserData()
  },[])
  return (
    <Card
      // title="Users"
      title={
        <>
          <div>Users</div>
          {
            <div className="list-title">{`(Total ${
              userData?.totalRecords > 0 ? userData.totalRecords : "0"
            } Users)`}</div>
          }
        </>
      }
      extra={
        <div className="flex gap-2">
            <Btn
              listing={true}
              label="Add User"
              type="primary"
              icon={AddNew}
              onClick={() => navigate("/users/add")}
            />
        </div>
      }
    >
      <CommonTable
        columns={columns}
        data={userData?.data}
        loading={loading}
        
        totalRecords={userData?.totalRecords}
        setSearchParams={setSearchParams}
      />
    </Card>
  );
};

export default OfficerList;

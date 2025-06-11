import { Card, message, Popover, Switch, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import Btn from "../../component/Button";
import { AddNew, Edit, OptionsIcon, Trash, View } from "../../assets/Images";
import CommonTable from "../../component/CommonTable";
import LabelIcon from "../../component/LabelIcon";
import { closePopup, setPopupProps } from "../../redux/common";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activateUserApi, deactivateUserAPI, deleteUserAPI, getAllFormSubmitUser, getAllUsersAPI, handleDownload } from "../../api/userApi";
import dayjs from "dayjs";
import DetailCard from "./DetailUser";
function capitalizeFirstLetter(str) {
  if (!str) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const OfficerList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const[detailedUser,setDetailedUser] = useState({
    open:false,
    data:{}
  })
  const { popupProps } = useSelector((state) => state);
const getAllUserData = async()=>{
  try{
    const res= await getAllFormSubmitUser()
    setUserData({data:res?.applications ,totalRecords:res?.applications?.length})
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
  const downloadExcel = async()=>{
    try{
      handleDownload()
    }
    catch(error){
      console.log(error)
    }
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width:60,
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
      width:60,
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
      width:120,
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
      title: "Application Status",
      dataIndex: "status",
      width:120,
      key: "status",
      render: (status,record) => (
       <>
      {
        status==="approved"?(<>
       <Tag color="green">Approved</Tag>
        </>):
        status==="pending"?
       <Tag color="yellow">Pending</Tag>

        
       : (<>
       <Tag color="red">Rejecte</Tag>
       </>)
      }
       </>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
     width:120,
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
    {
      title: "Visa Type",
      dataIndex: "visaType",
      width:120,
      key: "visaType",
    },
     {
      title: "Actions",
      key: "actions",
      width:120,
      render: (record, txt) => {
        // console.log(record, 'dddd', txt, 'asdfasdfasdfas')
        return (
          <>
          {
            txt?.user?.email?.length && (<>
             <Popover
              trigger="hover"
              content={
                <div className="w-28">
                   
                    <LabelIcon
                      icon={View}
                      label="View"
                     onClick={()=>{
                      setDetailedUser({
                        open:true,
                        data:txt
                      })
                     }}
                    />
                </div>
              }
              placement="bottomLeft"
            >
              <img src={OptionsIcon} alt="Options" className="cursor-pointer" />
            </Popover>
            
            </>)
          }
           
          </>
        );
      },
    },
  ];

  useEffect(()=>{
getAllUserData()
  },[])
  return (
    <>
    <Card
      title={
        <>
          <div>Application Listing</div>
          {
            <div className="list-title">{`(Total ${
              userData?.totalRecords > 0 ? userData.totalRecords : "0"
            } Users)`}</div>
          }
        </>
      }
      extra={(<>
      
                <Btn type="primary" label={"Download Detail"} className={"px-2"} onClick={()=>downloadExcel()} />

      </>)}
      
    >
      <CommonTable
        columns={columns}
        data={userData?.data}
        loading={loading}
        
        totalRecords={userData?.totalRecords}
        setSearchParams={setSearchParams}
      />
    </Card>
    {
      detailedUser?.open && (
<DetailCard data={detailedUser?.data} open={detailedUser?.open}
onCancel={()=>setDetailedUser({
  open:false,
  data:{}
})}

/>
      )
    }
    
    </>
  );
};

export default OfficerList;

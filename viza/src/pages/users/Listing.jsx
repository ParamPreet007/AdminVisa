import { Card, message, Popover, Switch, Table } from "antd";
import React, { useEffect, useState } from "react";
import Btn from "../../component/Button";
import { AddNew, Edit, OptionsIcon, Trash } from "../../assets/Images";
import CommonTable from "../../component/CommonTable";
import LabelIcon from "../../component/LabelIcon";
import { closePopup, setPopupProps } from "../../redux/common";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activateUserApi, deactivateUserAPI, deleteUserAPI, getAllUsersAPI } from "../../api/userApi";
function capitalizeFirstLetter(str) {
  if (!str) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const Listing = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [statusActive,setStatusActive] = useState(false)

  const { popupProps } = useSelector((state) => state);
const getAllUserData = async()=>{
  try{
    const res= await getAllUsersAPI()
    setUserData({data:res?.users ,totalRecords:res?.users?.length})
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
    },
    {
      title: "Email",
      dataIndex: "email",
      width:"60",

      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      width:"60",
      key: "role",
      render:(data)=>{
        return(
          <>
          <div>
            {capitalizeFirstLetter(data )}
          </div>
          
          </>
        )
      }
    },
    {
      title: "Status",
      dataIndex: "isActive",
      width:"120",
      key: "isActive",
      render: (status,record) => (
       <>
       <Switch size="small" checked={status} onChange={(e)=>{
        if(e===false){
          deactivateUser(record?._id)
        }
        else{
          activateUser(record?._id)
        }
        setStatusActive(e)
       }} />
       </>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record, txt) => {
        // console.log(record, 'dddd', txt, 'asdfasdfasdfas')
        return (
          <>
            <Popover
              trigger="click"
              content={
                <div className="w-28">
                    <LabelIcon
                      icon={Edit}
                      label="Edit"
                      onClick={() => navigate("/users/edit/" + record?._id)}
                    />
                    <LabelIcon
                      icon={Trash}
                      label="Delete"
                      // crudPermission={true}
                      onClick={() =>
                        dispatch(
                          setPopupProps({
                            ...popupProps,
                            open: true,
                            onCancel: () => dispatch(closePopup()),
                            msg: (
                              <div>
                                Are you sure you want to delete this{" "}
                                <span className="font-bold">{txt?.name}</span>{" "}
                                User ?
                              </div>
                            ),
                            onOk: () => deleteUser(record?._id),
                            okText: "Yes",
                            icon: Trash,
                          })
                        )
                      }
                    />
                </div>
              }
              placement="bottomLeft"
            >
              <img src={OptionsIcon} alt="Options" className="cursor-pointer" />
            </Popover>
          </>
        );
      },
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

export default Listing;

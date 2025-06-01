import { Card, Popover, Table } from "antd";
import React, { useState } from "react";
import Btn from "../../component/Button";
import { AddNew, Edit, OptionsIcon, Trash } from "../../assets/Images";
import CommonTable from "../../component/CommonTable";
import LabelIcon from "../../component/LabelIcon";
import { closePopup, setPopupProps } from "../../redux/common";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Listing = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { popupProps } = useSelector((state) => state);

  const [userData, setUserData] = useState({
    data: [],
    totalRecords: 0,
  });
  const deleteUser  = async ()=>{
    console.log("Delete user her e")
  }
  const [searchParams, setSearchParams] = useState({
    limit: 25,
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "Active" ? "green" : "red" }}>
          {status}
        </span>
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
                      onClick={() => navigate("/user/edit/" + record?._id)}
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
        searchParams={searchParams}
        totalRecords={userData?.totalRecords}
        setSearchParams={setSearchParams}
      />
    </Card>
  );
};

export default Listing;

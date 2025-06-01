import { Drawer, Popover } from "antd";
import {
  Avatar,
  Logout,
} from "../assets/Images";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closePopup, setPopupLoading, setPopupProps } from "../redux/common";
import { useEffect, useState } from "react";

const Header = () => {

  const [openChange, setOpenChange] = useState(false);
  const userName = localStorage.getItem("name");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAdmin = async () => {
    try {
      dispatch(setPopupLoading(true));
      // const res = await authLogut({ message: true });
      // if (res?.status === 200 || res?.status === 201) {
      //   dispatch(setLogout());
      //   localStorage.clear();
      //   dispatch(closePopup());
      // }
    } catch (error) {
    } finally {
      dispatch(setPopupLoading(false));
      dispatch(closePopup());
    }
  };
  return (
    <div className="py-0 px-8 bg-[var(--headerbg)] border-b h-12 flex items-center justify-between">
      <div className="flex items-center justify-between gap-4 ">
        <div className="flex border-l pl-4">
          <div className="flex items-center text-white text-xs pr-2 font-semibold">Hi ! {userName}</div>
          <Popover
            open={openChange}
            onOpenChange={(data) => setOpenChange(data)}
            showArrow={false}
            lablel
            placement="bottomLeft"
            trigger="click"
            content={(
              <>
                <button
                  className="flex w-40 cursor-pointer my-2 border-solid border-b-2"
                  onClick={() =>
                    dispatch(
                      setPopupProps({
                        open: true,
                        icon: ModalLogout,
                        onCancel: () => dispatch(closePopup()),
                        msg: "Are you sure you want to Logout ?",
                        onOk: logoutAdmin,
                        okText: "Logout",
                        cancelText: "Cancel",
                      })
                    )
                  }
                >
                  <div className="h-6 w-6">
                    <img src={Logout} alt="logout " className="h-full w-full" />
                  </div>
                  <div className="ml-2">Logout</div>
                </button>
              </>
            )

            }
          >
            <img
              src={Avatar}
              alt="Profile"
              className="w-10 h-10 rounded-full border cursor-pointer"
            />
          </Popover>
        </div>
      </div>
    </div >
  );
};

export default Header;
import { Drawer, Popover } from "antd";
import {
  Avatar,
  Bell,
  CalendarIcon,
  Logout,
  Mail,
  ModalLogout,
  Star,
  EventIcon,
  changePass,
  userProfile,
} from "../../assets/SvgExport";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { setLogout } from "../../redux/auth";
import { useNavigate } from "react-router-dom";
import { closePopup, setPopupLoading, setPopupProps } from "../../redux/common";
import { authLogut } from "../../api/auth";
import { useEffect, useState } from "react";
import { fetchImageUrlInS3 } from "../../utils/constant";

const Header = () => {

  const [openChange, setOpenChange] = useState(false);
  const [imageUrl, setImageUrl] = useState(`${Avatar}`);
  const userName = localStorage.getItem("name");
  const userImg = localStorage.getItem("image");

  const fetchUserImage = async (img) => {
    try {
      const imageDetails = await fetchImageUrlInS3(img, 'user');
      if (imageDetails) {
        setImageUrl(imageDetails);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userImg) {
      fetchUserImage(userImg);
    }
  }, [userImg]);



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAdmin = async () => {
    try {
      dispatch(setPopupLoading(true));
      const res = await authLogut({ message: true });
      if (res?.status === 200 || res?.status === 201) {
        dispatch(setLogout());
        localStorage.clear();
        dispatch(closePopup());
      }
    } catch (error) {
    } finally {
      dispatch(setPopupLoading(false));
      dispatch(closePopup());
    }
  };
  return (
    // <div className="py-0 px-8 bg-white border-b h-12 z-50 flex items-center justify-between">
    <div className="py-0 px-8 bg-[var(--headerbg)] border-b h-12 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Icon src={Mail} />
        {/* <Icon src={CalendarIcon} /> */}
        <Icon src={Star} />
        <div onClick={() => navigate("/header/events")}>
          <Icon src={EventIcon} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 ">
        <div onClick={() => navigate("/header/notification")}>
          <Icon src={Bell} size={20} />
        </div>

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
                  onClick={() => { navigate("/userDetail/"); setOpenChange(false) }}
                >
                  <div className="h-6 w-6">
                    <img src={userProfile} alt={userProfile} className="h-full w-full" />
                  </div>
                  <div className="ml-2">
                    My Profile
                  </div>
                </button>

                {/* <button
                  className="flex w-40 cursor-pointer my-2 border-solid border-b-2"
                  onClick={() => { navigate("/change-password/"); setOpenChange(false) }}
                >
                  <div className="h-6 w-6">
                    <img src={changePass} alt={changePass} className="h-full w-full" />
                  </div>
                  <div className="ml-2">
                    Change Password
                  </div>
                </button> */}

                <button
                  className="flex w-40 cursor-pointer my-2 border-solid border-b-2"
                  onClick={() =>
                    dispatch(
                      setPopupProps({
                        open: true,
                        icon: ModalLogout,
                        // logoutBtn: true,
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
              src={imageUrl}
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
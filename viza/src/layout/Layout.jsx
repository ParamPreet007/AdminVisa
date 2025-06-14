import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Layout, Menu, message } from "antd";
import { menus, routes } from "./Routes";
import Header from "./Header";
import SubMenu from "antd/es/menu/SubMenu";
import PrivateRoute from "../component/PrivatePage";
import DotIcon from "../assets/SvgElement/DotIcon";
import Popup from "../component/Popover";
import { Logo } from "../assets/Images";
import { useSelector } from "react-redux";

const AppLayout = () => {
  const navigate = useNavigate();
  const { Sider, Content } = Layout;
  const location = useLocation();
  const [slectedMenu, setSlectedMenu] = useState([""]);
  const [slectedSubMenu, setSlectedSubMenu] = useState([""]);
  const { authLogin } = useSelector((value) => value);
  const role = localStorage.getItem("role"); // e.g., "admin" or "officer"
  const filteredRoutes =
    role === "admin"
      ? routes
      : routes.filter((route) => route.path.includes("Officer"));
  const filteredMenus =
    role === "admin" ? menus : menus.filter((menu) => menu.key === "Officer");
  useEffect(() => {
    setSlectedMenu([location?.pathname?.split("/")?.[1]]);
    setSlectedSubMenu([location?.pathname?.split("/")?.[2] || ""]);
  }, [location?.pathname]);
  useEffect(() => {
    if (!authLogin?.isAuthenticate) navigate("/login");
  }, [authLogin]);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Sider
          trigger={null}
          width={240}
          className="h-screen shadow top-0 overflow-auto mainSider sideScrollBar"
          style={{
            position: "sticky",
            maxHeight: "calc(100vh)",
            overflow: "auto",
            backgroundColor: "var(--primary)",
          }}
        >
          <div
            className="flex font-semibold text-base  h-12  border-r  bg-[var(--headerbg)]"
            style={{
              position: "fixed",
              zIndex: 100,
              top: 0,
              width: "241px",
            }}
          >
            <div className="ml-2 w-48 h-12 text-white flex items-center justify-center text-3xl">
              VIZA VERIFY
            </div>
          </div>

          <Menu
            className=" m-0 p-2 text-xs mt-12"
            style={{
              background: "var(--primary)",
            }}
            theme="light"
            mode="inline"
          >
            {filteredMenus.map(({ key, Icon, child, name, auth }) => {
              return child?.length ? (
                <SubMenu
                  key={"child" + key}
                  icon={
                    <>
                      <div>
                        <Icon
                          fill={
                            slectedMenu.includes(key) ? "#ffffff" : "#ffffff"
                          }
                        />
                      </div>
                    </>
                  }
                  title={
                    <div
                      className={`ml-2 w-24`}
                      style={{
                        color: slectedMenu.includes(key)
                          ? "#ffffff"
                          : "#ffffff",
                        fontWeight: "600",
                        // wordBreak: "break-word",
                      }}
                    >
                      {name}
                    </div>
                  }
                >
                  {child?.map((Element) => (
                    <Link
                      key={`/${key}/${Element.key}`}
                      to={`/${key}/${Element.key}`}
                      className={`my-1 flex items-center py-2 px-8 gap-2 rounded hoverBg`}
                      style={{
                        background: slectedSubMenu.includes(Element.key)
                          ? "#ffffff"
                          : "var(--primary)",
                      }}
                    >
                      <div
                        className="ml-1"
                        style={{
                          color: slectedSubMenu.includes(Element.key)
                            ? "var(--primary)"
                            : "#ffffff",
                        }}
                      >
                        <div className="flex">
                          <div
                            style={{ fontWeight: "800", fontSize: "20px" }}
                            className="flex justify-center' items-center"
                          >
                            <DotIcon
                              fill={
                                slectedSubMenu.includes(Element.key)
                                  ? "var(--primary)"
                                  : "white"
                              }
                            />
                          </div>
                          <div className="ml-2 flex items-end justify-end">
                            {Element.name}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </SubMenu>
              ) : (
                // <></>
                <Link
                  key={`/${key}`}
                  to={`/${key}`}
                  className={`flex items-center my-2  py-2 px-3 gap-2 rounded  ${
                    slectedMenu.includes(key) ? "bg-white" : "bg-transparent"
                  } `}
                >
                  <div>
                    <Icon
                      fill={slectedMenu.includes(key) ? "#737375" : "#fffff"}
                    />
                  </div>
                  <div
                    className="font-bold text-[15px]"
                    style={{
                      color: slectedMenu?.includes(key) ? "#737375" : "#fffff",
                    }}
                  >
                    {name}
                  </div>
                </Link>
              );
            })}
          </Menu>
        </Sider>
        <Layout>
          <Header />
          <Content
            className="site-layout-background bg-[#F8F8F8] p-4 "
            style={{ margin: 0, minHeight: 280 }}
          >
            <Routes>
              {filteredRoutes.map(({ path, Element }) => (
                <Route
                  key={path}
                  path={path}
                  element={<PrivateRoute component={Element} />}
                />
              ))}
            </Routes>
          </Content>
        </Layout>
        <Popup />
      </Layout>
    </Layout>
  );
};

export default AppLayout;

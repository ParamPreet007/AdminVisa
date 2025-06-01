import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import { menus, routes } from "./Routes";
import Header from "./Header";
import SubMenu from "antd/es/menu/SubMenu";
import PrivateRoute from "../component/PrivatePage"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import DotIcon from "../assets/SvgElement/DotIcon"

const AppLayout = () => {
  const navigate = useNavigate();
  const { Sider, Content } = Layout;
  const location = useLocation();
  const [slectedMenu, setSlectedMenu] = useState([""]);
  const [slectedSubMenu, setSlectedSubMenu] = useState([""]);

  useEffect(() => {
    setSlectedMenu([location?.pathname?.split("/")?.[1]]);
    setSlectedSubMenu([location?.pathname?.split("/")?.[2] || ""]);
  }, [location?.pathname]);
  useEffect(() => {
    if (!authLogin?.isAuthenticate) navigate("/login");
  }, [authLogin]);

  return (
    <Layout style={{ minHeight: "100vh", }}>
      <Layout>
        <Sider

          trigger={null}
          collapsed={collapsed}
          collapsible
          width={240}
          className="h-screen shadow top-0 overflow-auto mainSider sideScrollBar"
          style={{
            position: "sticky",
            maxHeight: "calc(100vh)",
            overflow: "auto",
            backgroundColor: "var(--primary)",
            // border: '1px solid red',
            // color: "var(--primary)"
          }}
        >
          <div
            className="flex font-semibold text-base  h-12  border-r  bg-[var(--headerbg)]"
            style={{
              position: "fixed",
              zIndex: 100,
              top: 0,
              width: !collapsed ? "241px" : "81px",

            }}
          >
            {!collapsed && (
              <>
                {/* <div className="text-left ml-5 ">
                    Shree Shyam&nbsp;
                    <span className="text-[var(--primary)]">Apparels</span>
                  </div>
                  <div className="ml-5">
                    {React.createElement(
                      collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                      {
                        className: "trigger",
                        onClick: () => setCollapsed(!collapsed),
                      }
                    )}
                  </div> */}
                <div className="ml-2 w-48 h-12 text-white flex items-center justify-center text-2xl">
                  <img src={cyberVison} alt={cyberVison} style={{ width: "100%", height: "100%" }} />
                 {/* Cyber Vision */}
                </div>
                <div className="ml-3 my-2 flex justify-center items-center">
                  {collapsed
                    ? <MenuUnfoldOutlined className="trigger" onClick={() => setCollapsed(!collapsed)} style={{ color: "white" }} />
                    : <MenuFoldOutlined className="trigger" onClick={() => setCollapsed(!collapsed)} style={{ color: "white" }} />}
                </div>
              </>
            )}
            {collapsed && (
              <div className="ml-5 my-2 flex justify-center items-center">
                {/* {React.createElement(
                    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                      className: "trigger",
                      onClick: () => setCollapsed(!collapsed),
                    }
                  )} */}
                {collapsed
                  ? <MenuUnfoldOutlined className="trigger" onClick={() => setCollapsed(!collapsed)} style={{ color: "white" }} />
                  : <MenuFoldOutlined className="trigger" onClick={() => setCollapsed(!collapsed)} style={{ color: "white" }} />}
              </div>
            )}
          </div>
          <Menu
            className=" m-0 p-2 text-xs mt-12"
            style={{
              background: "var(--primary)",
            }}
            theme="light"
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
          >
            {filteredMenus.map(({ key, Icon, child, name, auth }) => {
              // const hasAccess = auth && auth?.includes(roleName);
              // const hasChildAccess = child?.some(
              //   (item) => item?.auth && item?.auth?.includes(roleName)
              // );
              // if (hasAccess || hasChildAccess)
              return child?.length ? (
                <SubMenu
                  key={"child" + key}
                  icon={
                    <>
                      <div>
                        {!collapsed && (
                          <Icon
                            fill={
                              slectedMenu.includes(key)
                                ? "#ffffff"
                                : "#ffffff"
                            }
                          />
                        )}
                      </div>
                      <div className="mt-2">
                        {collapsed && (
                          <Icon
                            fill={
                              slectedMenu.includes(key)
                                ? "#ffffff"
                                : "#ffffff"
                            }
                          />
                        )}
                      </div>
                    </>
                  }
                  title={
                    !collapsed && (
                      <div
                        className={`ml-2 w-24`}
                        style={{
                          color: slectedMenu.includes(key)
                            ? "#ffffff"
                            : "#ffffff",
                          fontWeight: "600"
                          // wordBreak: "break-word",
                        }}
                      >
                        {name}
                      </div>
                    )
                  }
                >

                  {child?.map(
                    (Element) =>
                    (
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
                        {/* <div>
                                <Element.Icon
                                  fill={
                                    slectedSubMenu.includes(Element.key)
                                      ? "var(--primary)"
                                      : "var(--gray)"
                                  }
                                />
                              </div> */}
                        {!collapsed && (
                          <div
                            className="ml-1"
                            style={{
                              color: slectedSubMenu.includes(Element.key)
                                ? "var(--primary)"
                                : "#ffffff",

                            }}
                          >
                            <div className="flex">
                              <div style={{ fontWeight: "800", fontSize: "20px" }} className="flex justify-center' items-center">
                                <DotIcon fill={slectedSubMenu.includes(Element.key) ? "var(--primary)" : "white"} />
                              </div>
                              <div className="ml-2 flex items-end justify-end" >
                                {Element.name}
                              </div>
                            </div>

                          </div>
                        )}
                        {collapsed && (
                          <div
                            className="mx-2 my-3"
                            style={{
                              color: slectedSubMenu.includes(Element.key)
                                ? "#ffff"
                                : "#ADAAC2",
                            }}
                          >
                            {Element.name}
                          </div>
                        )}
                      </Link>
                    )
                  )}
                </SubMenu>
              ) : (
                // <></>
                <Link
                  key={`/${key}`}
                  to={`/${key}`}
                  className={`flex items-center py-2 px-3 gap-2 rounded hoverBg`}
                  // style={{
                  //   backgroundImage: slectedMenu.includes(key) ? "linear-gradient(180deg, #cfffe5, #0ba465)" : "#ffffff"
                  // }}
                  style={{
                    background: slectedMenu.includes(key)
                      ? "#fffff"
                      : "#fffff",
                  }}
                >
                  <div>
                    <Icon
                      fill={
                        slectedMenu.includes(key)
                          ? "#fffff"
                          : "#fffff"
                      }
                    />
                  </div>
                  <div
                    style={{
                      color: "#ffff"
                    }}
                  >
                    {!collapsed && name}
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
            {/* {console.log(routes, 'routes')} */}
            <Routes>
              {routes.map(({ path, Element }) => (
                <Route
                  key={path}
                  path={path}
                  element={<PrivateRoute component={Element} />}
                />
              ))}
              {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
              <Route path="*" element={<ErrorPage />} />
              {/* <Route path="*" element={<Navigate to="/errorPage" replace />} /> */}
            </Routes>

          </Content>
        </Layout>
        <Popup />
      </Layout>
    </Layout>
  );
};

export default AppLayout;

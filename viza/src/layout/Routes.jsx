import UserIcon from "../assets/SvgElement/UserIcon"
import Dashboard from "../pages/dashboard/Dashboard"
import Users from "../pages/users/Index"
export const routes = [

  {
    path: "/users/*",
    Element: Users,
  },
  {
    path:"/Dashboard/*",
    Element:Dashboard
  }

]

export const menus =[
 {
    Icon: UserIcon,
    name: "Users",
    key: "users",
  },
  {
    Icon: UserIcon,
    name: "Dashboard",
    key: "Dashboard",
  },
]
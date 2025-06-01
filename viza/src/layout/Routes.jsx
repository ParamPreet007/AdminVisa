import UserIcon from "../assets/SvgElement/UserIcon"
import Users from "../pages/users/Index"
export const routes = [

  {
    path: "/users/*",
    Element: Users,
  }
]

export const menus =[
 {
    Icon: UserIcon,
    name: "Users",
    key: "user",
  },
]
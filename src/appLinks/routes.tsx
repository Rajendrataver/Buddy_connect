import Dashboard from "../components/dashboard";
import UserList from "../components/userlist";
import CreateUser from "../components/creatUser";
import FormerUsers from "../components/formerUsers";
import UnkonownPage from "../components/404";
import User from "../components/user";
import UpdateUser from "../components/updateUserDetails";
const routes = [
  {
    name: "Dashboard",
    path: "/",
    element: <Dashboard />,
  },
  {
    name: "Users",
    path: "/users",
    element: <UserList />,
  },
  {
    name: "Create User",
    path: "/createuser",
    element: <CreateUser />,
  },
  {
    name: "Former Users",
    path: "/formerusers",
    element: <FormerUsers />,
  },
  {
    name: "Update User",
    path: "/updateuser/:id",
    element: <UpdateUser />,
  },
  {
    name: "User",
    path: "/user/:id",
    element: <User />,
  },
  {
    name: "Unknown",
    path: "*",
    element: <UnkonownPage />,
  },
];
export default routes;

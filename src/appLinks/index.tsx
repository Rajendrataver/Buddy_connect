import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import Dashboard from "../components/dashboard";
import UserList from "../components/userlist";
import CreateUser from "../components/creatUser";
import FormerUsers from "../components/formerUsers";
const links = [
  {
    title: "Dashboard",
    url: "/",
    icon: <HomeOutlinedIcon sx={{ fontSize: 30 }} />,
    component: <Dashboard />,
  },
  {
    title: "Users",
    url: "/users",
    icon: <ReceiptOutlinedIcon />,
    component: <UserList />,
  },
  {
    title: "Create User",
    url: "/createuser",
    icon: <PersonAddAltIcon />,
    component: <CreateUser />,
  },
  {
    title: "Former Users",
    url: "/formerusers",
    icon: <PersonOffOutlinedIcon />,
    component: <FormerUsers />,
  },
];
export default links;

import "./index.css";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, NavLink } from "react-router-dom";
import LogoutButton from "../logOutButton";
import links from "../../appLinks";
const SideBar = () => {
  return (
    <>
      <Sidebar
        // backgroundColor="rgb(0, 249, 249)"
        style={{
          height: "100vh",
          width: 100 + "%",
          maxWidth: 250,
          position: "fixed",
        }}
      >
        <Menu>
          <MenuItem style={{ textAlign: "center", marginTop: 10 }}>
            <Link to={"/dashboard"} className="sidebar-link">
              <h2>Buddy Connect</h2>
            </Link>
          </MenuItem>{" "}
          {links.map((item, i) => {
            return (
              <NavLink
                key={i}
                to={item.url}
                className={({ isActive }) =>
                  isActive ? "sidebar-link-active" : "sidebar-link"
                }
              >
                <MenuItem icon={item.icon}>{item.title}</MenuItem>
              </NavLink>
            );
          })}
          <MenuItem className="sidebar-link">
            <LogoutButton fullWidth={true} />
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
};

export default SideBar;

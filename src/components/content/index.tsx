import { Route, Routes, useNavigate } from "react-router";
import Header from "../Header";
import { useEffect } from "react";
import UserList from "../userlist";
import Dashboard from "../dashboard";
import CreateUser from "../creatUser";
const Content = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"));

      navigate("/");
    }
  });
  return (
    <>
      <Header />
      <Routes>
        <Route path="/dashbord" element={<Dashboard />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/createuser" element={<CreateUser />} />
      </Routes>
    </>
  );
};
export default Content;

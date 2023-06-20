import { Switch } from "@mui/material";
import * as API from "../../apiURL";
import { useEffect, useState } from "react";
import useFetch from "../../customHook/useFetch";
const ToggelStatus = ({
  id,
  status,
}: {
  id: string | undefined;
  status: string;
}) => {
  const [state, setState] = useState<string>();
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const fetch = useFetch();
  const changeStatus = () => {
    const token = localStorage.getItem("token");
    setOnLoad(true);
   
    var status = state;
    if (state === "active") {
      status = "deActive";
    } else {
      status = "active";
    }

    const response = fetch(API.SET_USER_STATUS_URL + id, "patch", token, {
      status,
    });
    response
      .then((res) => {
        
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOnLoad(false);
        setState(status);
      });
  };
  useEffect(() => {
    setState(status);
  }, [status]);
  return (
    <Switch
      color="success"
      checked={state === "active" ? true : false}
      onChange={changeStatus}
      disabled={onLoad}
    />
  );
};

export default ToggelStatus;

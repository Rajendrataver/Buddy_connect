import { Button } from "@mui/material";
import { useState } from "react";
import ConfirmBox from "../confirmBox";
import PopUp from "../popUp";
import papa from "papaparse";
import { ADD_CSV_FILE_URL } from "../../apiURL";
import axios from "axios";
const UploadFileButton = ({
  setFileAdded,
}: {
  setFileAdded: (v: boolean) => void;
}) => {
  const token = localStorage.getItem("token");
  const [file, setFile] = useState<any>(null);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openUpload, setOpenUpload] = useState<boolean>(false);
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const extension = file.name.split(".").pop();
      if (extension === "csv") {
        setFile(file);
        setOpenUpload(true);
      } else {
        setOpenAlert(true);
        setFile(null);
      }
    }
  };
  const uploadFile = () => {
    const formData = new FormData();

    formData.append("users_list", file);
    console.log(file);

    axios({
      url: ADD_CSV_FILE_URL,
      method: "post",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res);
        setFileAdded(true);
      })
      .catch((err) => {
        console.log(err);
      });
    papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        // formData.append("users_list", file);
        // axios({
        //   url: ADD_CSV_FILE_URL,
        //   method: "post",
        //   headers: {
        //     Authorization: "Bearer " + token,
        //     "Content-Type": "multipart/form-data",
        //   },
        // })
        //   .then((res) => {
        //     console.log(res);
        //     setFileAdded(true);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      },
    });

    setOpenUpload(false);
  };
  return (
    <>
      <ConfirmBox
        msg={"Upload  File ?"}
        open={openUpload}
        handleOk={uploadFile}
        setOpen={setOpenUpload}
      />
      {openAlert && (
        <PopUp
          msg="Invalid File Type Select CSV file"
          setOpenAlert={setOpenAlert}
        />
      )}
      <Button sx={{ ta: "center", bgcolor: "primary" }} variant="outlined">
        <label style={{ textAlign: "center" }}>
          Upload File
          <input
            type="file"
            title="Upload File"
            alt="Upload File"
            accept=".csv"
            className="file-ipload-input"
            onChange={(e) => handleFileChange(e)}
          />
        </label>
      </Button>
    </>
  );
};

export default UploadFileButton;

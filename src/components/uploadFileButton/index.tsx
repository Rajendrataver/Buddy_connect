import { Alert, Box, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import ConfirmBox from "../confirmBox";
import PopUp from "../popUp";
import LinearProgress from "@mui/material/LinearProgress";
import { ADD_CSV_FILE_URL } from "../../apiURL";
import axios from "axios";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
const UploadFileButton = () => {
  const token = localStorage.getItem("token");
  const [file, setFile] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
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
    setOpen(true);
    const formData = new FormData();
    formData.append("users_list", file);
    axios({
      url: ADD_CSV_FILE_URL,
      method: "post",
      data: formData,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {});

    setOpenUpload(false);
  };
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => {
          setOpen(false);
          setFile(null);
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
            setFile(null);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          Uploading {file && file.name}...
          <LinearProgress />
        </Alert>
      </Snackbar>

      <ConfirmBox
        msg={"Upload  File ?"}
        open={openUpload}
        handleOk={uploadFile}
        handleClose={() => {
          setOpenUpload(false);
          setFile(null);
        }}
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

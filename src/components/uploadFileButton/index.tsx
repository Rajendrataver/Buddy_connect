import { Alert, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import ConfirmBox from "../confirmBox";
import PopUp from "../popUp";
import LinearProgress from "@mui/material/LinearProgress";
import { ADD_CSV_FILE_URL } from "../../apiURL";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import axios from "axios";

const UploadFileButton = () => {
  const token = localStorage.getItem("token");
  const [success, setSuccess] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [addedUser, setAddedUser] = useState(0);
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
      .then((res) => {
       
        const newsuccessfullRegistered = res.data.response.filter(
          (item: any) => {
            if (typeof item === "string") {
              if (item.includes("Registered successfully")) return item;
            }
          }
        );
        setAddedUser(newsuccessfullRegistered.length);
      })
      .catch((err) => {})
      .finally(() => {});

    setOpenUpload(false);
  };
  return (
    <>
      <PopUp
        open={success}
        title={
          addedUser !== 0 ? (
            <CheckCircleOutlineIcon sx={{ fontSize: 45 }} />
          ) : (
            <PriorityHighIcon sx={{ fontSize: 45 }} />
          )
        }
        msg={
          addedUser === 0
            ? "Users Not Added"
            : addedUser + " Users added Successfully"
        }
        handleClose={() => setSuccess(false)}
      />

      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={() => {
          setOpen(false);
          setSuccess(true);
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
            setSuccess(true);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          Uploading {file && file.name}...
          <LinearProgress />
        </Alert>
      </Snackbar>

      <ConfirmBox
        msg={file && "Do you want to Upload  ( " + file.name + " ) ?"}
        open={openUpload}
        handleOk={uploadFile}
        handleClose={() => {
          setOpenUpload(false);
          setFile(null);
        }}
      />

      <PopUp
        msg="Invalid File Type Select CSV file"
        handleClose={() => setOpenAlert(false)}
        open={openAlert}
      />

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

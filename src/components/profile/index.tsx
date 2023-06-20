import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Loader from "../loader";
import { useEffect, useState } from "react";
import axios from "axios";
import * as API from "../../apiURL";
import PopUp from "../popUp";
const Profile = ({
  imageName,
  id,
}: {
  imageName: string | null;
  id: string | undefined;
}) => {
  const [src, setSrc] = useState<string>();
  const [image, setImage] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  console.log(imageName);
  const selectedImage = (e: any) => {
    const image = e.target.files[0];
    console.log(image);

    if (image) {
      const extension = image.name.split(".").pop();
      if (
        extension === "png" ||
        extension === "jpeg" ||
        extension === "gif" ||
        extension === "jpg"
      ) {
        setOpen(true);
        setImage(image);
        setImageSrc(URL.createObjectURL(image));
      } else {
        setOpenAlert(true);
      }
    }
  };

  const handleUploadImage = () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    setLoading(true);
    formData.append("image", image);
    axios({
      url: API.UPLOAD_USER_PROFILE_URL + id,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        console.log("upload");
        console.log(res.data.response);
        setSrc(API.IMAGE_SRC_URL + res.data.response);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpen(false);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (imageName) {
      setSrc(API.IMAGE_SRC_URL + imageName);
    } else {
      setSrc(API.DEFUALT_USER_AVATAR_URL);
    }
  }, [imageName]);

  return (
    <>
      {openAlert && (
        <PopUp
          msg="Invalid File Type !!!"
          path={"/user/" + id}
          setOpenAlert={setOpenAlert}
        />
      )}
      <Dialog open={open} fullWidth sx={{ textAlign: "center" }}>
        <Loader open={loading} />
        <DialogTitle id="alert-dialog-title">Upload Profile</DialogTitle>
        <Avatar
          src={imageSrc}
          sx={{ width: 200, height: 200, margin: "auto" }}
        />
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setImage(null);
            }}
          >
            Cancel
          </Button>
          <Button onClick={() => handleUploadImage()}>Upload</Button>
        </DialogActions>
      </Dialog>
      <Box className={"avatar-profile"}>
        <img
          src={src}
          alt={"My Avatar"}
          className="avatar-male"
        
        />
        <EditIcon className="edit" sx={{ fontSize: 40, color: " #607d8b" }} />
        <input
          type="file"
          className="avatar-input"
          onChange={(e) => {
            selectedImage(e);
          }}
        />
      </Box>
    </>
  );
};

export default Profile;

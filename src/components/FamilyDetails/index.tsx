import { useEffect, useState } from "react";
import { Button, Dialog, Grid, useStepContext } from "@mui/material";
import useAxios from "../../customHook/useAxios";
import * as API from "../../apiURL";
import AddFamilyDetail from "../addFamilyDetails";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useFetch from "../../customHook/useFetch";
import { useNavigate } from "react-router";

import DialogBox from "../dialog";
import PopUpform from "../PopUpForm";
import { familyDetails } from "../../InterFaces";
const FamilyDetails = ({ id }: { id: string | undefined }) => {
  const [added, setAdded] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const fetch = useFetch();
  const [familyList, setFamilyList] = useState<Array<familyDetails>>([]);

  const getFamilyList = () => {
    fetch(API.GET_FAMILY_DETAILS_URL + id, "get", token).then((res) => {
      setFamilyList(res.data.response);
    });
  };
  useEffect(() => {
    getFamilyList();
  }, [added]);

  const deleteMember = (member: familyDetails) => {
    const response = fetch(
      API.DELETE_FAMILY_DETAILS_URL + id + "&&family_id=" + member.id,
      "delete",
      token
    );
    response.then((res) => {
     
      getFamilyList();
    });
  };

  return (
    <>
      <DialogBox
        open={added}
        msg="Family Memeber Added Successfully"
        handleClose={() => setAdded(false)}
      />
      <PopUpform
        open={open}
        element={
          <AddFamilyDetail id={id} setOpen={setOpen} setAdded={setAdded} />
        }
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ marginTop: 3 }}
      >
        Add Memeber
      </Button>
      <Grid container sx={{ marginTop: 5 }} style={{maxWidth:700}}>
        <Grid item xs={12} md={12}>
          <TableContainer>
            <Table
             
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                {familyList.map((member, i) => {
                  return (
                    <TableRow>
                      <TableCell>{i + 1} .</TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell align="left">{member.relation}</TableCell>
                      <TableCell align="left">{member.contact}</TableCell>
                      <TableCell align="left">
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => deleteMember(member)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableHead>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default FamilyDetails;

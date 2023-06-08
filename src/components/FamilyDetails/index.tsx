import { useEffect, useState } from "react";
import { Button, Grid, useStepContext } from "@mui/material";
import useAxios from "../../customHook/useAxios";
import * as API from "../../apiURL";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useFetch from "../../customHook/useFetch";
import { useNavigate } from "react-router";
import ConfirmBox from "../confirmBox";
interface family {
  name: string;
  gender: string;
  relation: string;
  contact: string;
  id: number;
}
const FamilyDetails = ({ id }: { id: string | undefined }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const fetch = useFetch();
  const [familyList, setFamilyList] = useState<Array<family>>([]);

  const getFamilyList = () => {
    fetch(API.GET_FAMILY_DETAILS_URL + id, "get", token).then((res) => {
      setFamilyList(res.data.response);
    });
  };
  useEffect(() => {
    getFamilyList();
  }, []);

  const deleteMember = (member: family) => {
    console.log(member.id);
    const response = fetch(
      API.DELETE_FAMILY_DETAILS_URL + id + "&&family_id=" + member.id,
      "delete",
      token
    );
    response.then((res) => {
      console.log(res);
      getFamilyList();
    });
  };

  return (
    <>
      <h4>Family Details</h4>
      <Grid container>
        <Grid item xs={12} md={12}>
          <TableContainer>
            <Table
              sx={{ maxWidth: 650, width: 100 + "%" }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                {familyList.map((member, i) => {
                  return (
                    <TableRow>
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/add-family-details/" + id)}
          sx={{ marginTop: 3 }}
        >
          Add Memeber
        </Button>
      </Grid>
    </>
  );
};

export default FamilyDetails;

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router";
import useFetch from "../../customHook/useFetch";
import * as API from "../../apiURL";
import { useEffect, useState } from "react";

const bankData = {
  account_number: "",
  bank_name: "",
  bank_branch: "",
  ifsc_code: "",
  micr_code: "",
  cif_code: "",
  type_account: "",
  id: "",
};

interface bank {
  account_number: string;
  bank_name: string;
  bank_branch: string;
  ifsc_code: string;
  id: string;
  cif_code: string;
  micr_code: string;
}

const BankDetails = ({ id }: { id: string | undefined }) => {
  const [bankInfo, setBankInfo] = useState<bank>(bankData);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const fetch = useFetch();
  const getBankdetails = () => {
    const response = fetch(API.GET_BANK_DETAILS_URL + id, "get", token);
    response.then((res) => {
      setBankInfo(res.data.response[0]);
      console.log("bank details:", res.data.response[0]);
    });
  };
  useEffect(() => {
    getBankdetails();
  }, []);
  return (
    <>
      <h4>Bank Details :</h4>
      <Grid container>
        <Grid item xs={12} md={12}>
          {bankInfo.account_number === "" && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/add-bank-details/" + id)}
            >
              Add Bank Details
            </Button>
          )}

          {bankInfo.account_number !== "" && (
            <TableContainer>
              <Table
                sx={{ maxWidth: 650, width: 100 + "%" }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Bank Name</TableCell>
                    <TableCell align="left">{bankInfo.bank_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Account Number</TableCell>
                    <TableCell align="left">
                      {bankInfo.account_number}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Branch Name</TableCell>
                    <TableCell align="left">{bankInfo.bank_branch}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>IFSC CODE</TableCell>
                    <TableCell align="left">{bankInfo.ifsc_code}</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <Button variant="contained" color="primary" sx={{ marginTop: 3 }}>
                Update Details
              </Button>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default BankDetails;

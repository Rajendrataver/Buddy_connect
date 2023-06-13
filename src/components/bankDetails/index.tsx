import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
import ConfirmBox from "../confirmBox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

interface bankInterface {
  account_number: string;
  bank_name: string;
  bank_branch: string;
  ifsc_code: string;
  id: string;
  cif_code: string;
  micr_code: string;
  type_account: string;
}

const BankDetails = ({ id }: { id: string | undefined }) => {
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [bank_id, setBank_id] = useState<string>();
  const [accountList, setBankInfo] = useState<Array<bankInterface>>([bankData]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const fetch = useFetch();
  const getBankdetails = () => {
    const response = fetch(API.GET_BANK_DETAILS_URL + id, "get", token);
    response.then((res) => {
      if (res.data.response.length) {
        setBankInfo(res.data.response);
       
      }
    });
  };
  useEffect(() => {
    getBankdetails();
  }, []);
  const setPrimary = (bank_id: string, type_account: string) => {
    setOnLoad(true);
   

    if (type_account === "secondary") {

      type_account = "primary";
    } else if (type_account === "primary") {
    
      type_account = "secondary";
    }

    const response = fetch(
      API.SET_ACCOUNT_TYPE_URL + id + "&&bank_id=" + bank_id,
      "patch",
      token,
      { type_account }
    );
    response
      .then((res) => {
      
        getBankdetails();
      })
      .catch((err) => {
      
      })
      .finally(() => {
        setOnLoad(false);
      });
  };
  const confirmRemove = () => {
    const response = fetch(
      API.DELETE_BANK_DETAILS_URL + id + "&&bank_id=" + bank_id,
      "delete",
      token
    );
    response
      .then((res) => {
    
        getBankdetails();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpen(false);
      });
  };
  const removeBankDetails = (id: string) => {
    setOpen(true);
    setBank_id(id);
  };
  return (
    <>
      <ConfirmBox
        msg="Do you want to Remove Details ?"
        open={open}
        setOpen={setOpen}
        handleOk={confirmRemove}
      />

      <Grid container>
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/add-bank-details/" + id)}
            sx={{ marginTop: 3, marginBottom: 3 }}
            disabled={onLoad}
          >
            Add Bank Details
          </Button>
        </Grid>
        {accountList[0].bank_name !== "" && (
          <Grid item xs={12} md={12}>
            <Button variant="outlined" color="success">
              <Typography variant="h6">Primary Account</Typography>
            </Button>
            <TableContainer>
              <Table
                sx={{ maxWidth: 650, width: 100 + "%" }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Bank Name</TableCell>
                    <TableCell align="left">
                      {accountList[0].bank_name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Account Number</TableCell>
                    <TableCell align="left">
                      {accountList[0].account_number}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Branch Name</TableCell>
                    <TableCell align="left">
                      {accountList[0].bank_branch}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>IFSC CODE</TableCell>
                    <TableCell align="left">
                      {accountList[0].ifsc_code}
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>
        )}
        {accountList[0].bank_branch != "" && (
          <Grid item xs={12} md={8} sx={{ marginTop: 5 }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Other Account</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid item xs={12} md={12} sx={{ marginTop: 2 }}>
                  {accountList.map((bankInfo: bankInterface, i) => {
                    if (i === 0) {
                      return null;
                    }
                    return (
                      <TableContainer key={i} sx={{ marginTop: 1 }}>
                        <Typography sx={{ marginLeft: 2 }}>{i}.</Typography>
                        <Table
                          sx={{ maxWidth: 650, width: 100 + "%" }}
                          size="small"
                          aria-label="a dense table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>Bank Name</TableCell>
                              <TableCell align="left">
                                {bankInfo.bank_name}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Account Number</TableCell>
                              <TableCell align="left">
                                {bankInfo.account_number}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Branch Name</TableCell>
                              <TableCell align="left">
                                {bankInfo.bank_branch}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>IFSC CODE</TableCell>
                              <TableCell align="left">
                                {bankInfo.ifsc_code}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <Button
                                  disabled={onLoad}
                                  color="primary"
                                  variant="outlined"
                                  onClick={() =>
                                    setPrimary(
                                      bankInfo.id,
                                      bankInfo.type_account
                                    )
                                  }
                                >
                                  Set Primary
                                </Button>
                              </TableCell>
                              <TableCell align="left">
                                <Button
                                  disabled={onLoad}
                                  variant="contained"
                                  color="error"
                                  onClick={() => removeBankDetails(bankInfo.id)}
                                >
                                  Remove
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                      </TableContainer>
                    );
                  })}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default BankDetails;

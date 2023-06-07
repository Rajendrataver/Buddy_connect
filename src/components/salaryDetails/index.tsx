import {
  Button,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router";
import useFetch from "../../customHook/useFetch";
import * as API from "../../apiURL";
import { useEffect, useState } from "react";
import ConfirmBox from "../confirmBox";

interface salaryInterface {
  basic_salary: string;
  home_rent_allowances: string;
  conveyance_allowance: string;
  pf_amount: string;
  esic_amount: string;
  pt_amount: string;
  income_tax: string;
  appraisal_date: string;
  id: string;
}

const salaryData = {
  basic_salary: "",
  home_rent_allowances: "",
  conveyance_allowance: "",
  pf_amount: "",
  esic_amount: "",
  pt_amount: "",
  income_tax: "",
  appraisal_date: "",
  id: "",
};

const SalaryDetails = ({ id }: { id: string | undefined }) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const fetch = useFetch();
  const [salary, setSalary] = useState<salaryInterface>(salaryData);
  const token = localStorage.getItem("token");
  const getSalaryDetails = () => {
    const response = fetch(API.GET_SALARY_DETAILS_URL + id, "get", token);
    response
      .then((res) => {
        if (res.data.response.length) {
          setSalary(res.data.response[0]);
        }
      })
      .catch((err) => {
        console.log("Salary", err);
      });
  };
  useEffect(() => {
    getSalaryDetails();
  }, []);
  const removeSalrydetails = () => {
    const response = fetch(
      API.DELETE_BANK_DETAILS_URL + id + "&&salary_id=" + salary.id,
      "delete",
      token
    );
    response
      .then((res) => {
        console.log(res.data);
        setSalary(salaryData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpen(false);
      });
  };
  return (
    <>
      <ConfirmBox
        msg="Do you want to Remove Details"
        open={open}
        handleOk={removeSalrydetails}
        setOpen={setOpen}
      />
      <h4>Salary Details :</h4>
      <Grid container>
        <Grid item xs={12} md={12}>
          {salary.basic_salary === "" && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/add-salary-details/" + id)}
              sx={{ marginTop: 3 }}
            >
              Add Salary Details
            </Button>
          )}
          {salary.basic_salary !== "" && (
            <TableContainer>
              <Table
                sx={{ maxWidth: 650, width: 100 + "%" }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Basic Salary</TableCell>
                    <TableCell align="left">{salary.basic_salary}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Provident Fund</TableCell>
                    <TableCell align="left">{salary.pf_amount}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ESIC Amount</TableCell>
                    <TableCell align="left">{salary.esic_amount}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Income Tax</TableCell>
                    <TableCell align="left">{salary.income_tax}</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <Button variant="contained" color="primary" sx={{ marginTop: 3 }}>
                Update Details
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpen(true)}
                sx={{ marginTop: 3, marginLeft: 3 }}
                disabled={open}
              >
                Remove Details
              </Button>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default SalaryDetails;

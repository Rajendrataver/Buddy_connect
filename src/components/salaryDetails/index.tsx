import {
  Button,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import useFetch from "../../customHook/useFetch";
import * as API from "../../apiURL";
import { useEffect, useState } from "react";

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


const SalaryDetails = ({ id }: { id: string | undefined }) => {
  const navigate = useNavigate();
  const fetch = useFetch();
  const [salaryList, setSalary] = useState<Array<salaryInterface>>([]);
  const token = localStorage.getItem("token");
  const getSalaryDetails = () => {
    const response = fetch(API.GET_SALARY_DETAILS_URL + id, "get", token);
    response
      .then((res) => {
        if (res.data.response) {
          setSalary(res.data.response);
        }
      })
      .catch((err) => {
        console.log("Salary", err);
      });
  };
  useEffect(() => {
    getSalaryDetails();
  }, []);

  return (
    <>
      <h4>Salary Details :</h4>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/add-salary-details/" + id)}
            sx={{ marginTop: 3 }}
          >
            Add Salary Details
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        {salaryList.map((salary: salaryInterface, i) => {
          return (
            <Grid item xs={6} md={6} pr={8} sx={{ marginTop: 2 }}>
              <Typography variant="h5" sx={{marginLeft:2}}>{i + 1}.</Typography>
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
              </TableContainer>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default SalaryDetails;

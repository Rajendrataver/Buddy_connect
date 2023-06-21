import {
  Backdrop,
  Button,
  Dialog,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useFetch from "../../customHook/useFetch";
import * as API from "../../apiURL";
import { useEffect, useState } from "react";
import AddSalaryDetails from "../addSalaryDetails";
import DialogBox from "../dialog";
import PopUpform from "../PopUpForm";
import { salaryDetails } from "../../InterFaces";

const SalaryDetails = ({ id }: { id: string | undefined }) => {
  const [openAddSalary, setOpenAddSalary] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);
  const fetch = useFetch();
  const [salaryList, setSalary] = useState<Array<salaryDetails>>([]);
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
  }, [added]);

  return (
    <>
      <DialogBox
        msg="SalaryDetails Added SuccessFully."
        open={added}
        handleClose={() => setAdded(false)}
      />
      {/* Add Salary Details  */}
      <PopUpform
        open={openAddSalary}
        element={
          <AddSalaryDetails
            id={id}
            setOpenAddSalary={setOpenAddSalary}
            setAdded={setAdded}
          />
        }
      />
      {/* Add Salary Details  */}
      <Grid container>
        <Grid item xs={12} md={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenAddSalary(true)}
            sx={{ marginTop: 3 }}
          >
            Add Salary Details
          </Button>
        </Grid>
      </Grid>
      <Grid container style={{ maxWidth: 700 }}>
        <Grid item xs={12} md={12} sx={{ marginTop: 2 }}>
          {salaryList.length !== 0 && (
            <TableContainer>
              <Table
                sx={{ width: 100 + "%" }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Sno.</TableCell>
                    <TableCell>Basic Salary</TableCell>
                    <TableCell>Provident Fund</TableCell>
                    <TableCell>ESIC Amount</TableCell>
                    <TableCell>Income Tax</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salaryList.map((salary, i) => {
                    return (
                      <TableRow>
                        <TableCell align="left" sx={{ padding: 2 }}>
                          {i + 1}
                        </TableCell>
                        <TableCell align="left">
                          {salary.basic_salary}
                        </TableCell>{" "}
                        <TableCell align="left">{salary.pf_amount}</TableCell>{" "}
                        <TableCell align="left">{salary.esic_amount}</TableCell>
                        <TableCell align="left">{salary.income_tax}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default SalaryDetails;

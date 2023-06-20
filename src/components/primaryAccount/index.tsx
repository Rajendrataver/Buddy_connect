import {
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { bankDetails } from "../../InterFaces";

const PrimaryAccount = ({ account }: { account: bankDetails }) => {
  return (
    <>
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
              <TableCell align="left">{account.bank_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Account Number</TableCell>
              <TableCell align="left">{account.account_number}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Branch Name</TableCell>
              <TableCell align="left">{account.bank_branch}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>IFSC CODE</TableCell>
              <TableCell align="left">{account.ifsc_code}</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </>
  );
};

export default PrimaryAccount;

import { Grid, Tab, Tabs } from "@mui/material";
import FamilyDetails from "../FamilyDetails";
import SalaryDetails from "../salaryDetails";
import BankDetails from "../bankDetails";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import { useState } from "react";
const tabs = {
  BANK_DETAILS: "Bank Details",
  SALARY_DETAILS: "Salary Details",
  FAMILY_DETAILS: "Family Details",
};
const UserOtherDetails = ({ id }: { id: string | undefined }) => {
  const [tab, setTab] = useState(tabs.BANK_DETAILS);
  return (
    <Grid container>
      <Grid item xs={0} md={1} sm={0}></Grid>
      <Grid item xs={12} md={11} sm={12}>
        <Tabs
          sx={{ maxWidth: 500 + "px" }}
          value={tab}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            label={tabs.BANK_DETAILS}
            icon={<AccountBalanceIcon />}
            value={tabs.BANK_DETAILS}
            onClick={() => setTab(tabs.BANK_DETAILS)}
          />
          <Tab
            label={tabs.SALARY_DETAILS}
            icon={<CurrencyRupeeIcon />}
            value={tabs.SALARY_DETAILS}
            onClick={() => setTab(tabs.SALARY_DETAILS)}
          />
          <Tab
            label={tabs.FAMILY_DETAILS}
            icon={<FamilyRestroomIcon />}
            value={tabs.FAMILY_DETAILS}
            onClick={() => setTab(tabs.FAMILY_DETAILS)}
          />
        </Tabs>
      </Grid>
      <Grid item xs={0} md={1} sm={0}></Grid>
      <Grid item xs={12} md={11} sm={12}>
        {tab === tabs.BANK_DETAILS && <BankDetails id={id} />}
        {tab === tabs.SALARY_DETAILS && <SalaryDetails id={id} />}
        {tab === tabs.FAMILY_DETAILS && <FamilyDetails id={id} />}
      </Grid>
    </Grid>
  );
};

export default UserOtherDetails;

export default interface userDetails {
    first_name: string;
    last_name: string;
    status: string;
    token: string;
    id: string;
    email: string;
    contact: string;
    designation: string;
    role: string;
    image: string;
    city: string
}
export const userInitialSate = {
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    gender: "",
    address: "",
    contact: "",
    dob: "",
    zip_code: "",
    pan_card: "",
    designation: "",
    role: "",
    joining_date: "",
    country: "",
    state: "",
};
export const userData = {
    id: "",
    token: '',
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    city: "",
    designation: "",
    role: "",
    contact: "",
    gender: "",
    image: "",
    status: "",
};

export interface bankDetails {

    account_number: string;
    bank_name: string;
    bank_branch: string;
    ifsc_code: string;
    id: string;
    cif_code: string;
    micr_code: string;
    type_account: string;
}
export const bankData = {
    id: '',
    account_number: "",
    bank_name: "",
    bank_branch: "",
    ifsc_code: "",
    micr_code: "",
    cif_code: "",
    type_account: "",
}


export interface familyDetails {
    name: string;
    gender: string;
    relation: string;
    contact: string;
    id: string;
    dob: string
}
export const familyData = {
    name: "",
    contact: "",
    dob: "",
    gender: "",
    relation: "",
    address: "",
    id: ''
};
export interface salaryDetails {
    basic_salary: string;
    home_rent_allowances: string;
    conveyance_allowance: string;
    pf_amount: string;
    esic_amount: string;
    pt_amount: string;
    income_tax: string;
    appraisal_date: string;
    id: string;
    utility_allowance: string,
    loan: string,
    health_insurance: string
}
export const salaryData = {
    id: '',
    basic_salary: "",
    pf_amount: "",
    esic_amount: "",
    pt_amount: "",
    income_tax: "",
    appraisal_date: "",
    home_rent_allowances: "",
    conveyance_allowance: "",
    utility_allowance: "",
    loan: "",
    health_insurance: "",
};
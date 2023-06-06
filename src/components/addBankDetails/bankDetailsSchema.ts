import * as Yup from 'yup';
const bankDetailsSchema = Yup.object({
    account_number: Yup.string().
        matches(/^[0-9]{9,12}$/, 'Invalid Account').
        required('Account Number Required').
        min(9, 'Minimum 9 Digit').
        max(12, 'Max 12 Digit'),
    bank_name: Yup.string().
        required('Bank Name Required').
        matches(/^[A-Za-z ]+$/, 'Only Alphabatic Character').
        min(3, 'Minimum 3 Character').
        max(255, 'Max 255 Character'),
    bank_branch: Yup.string().
        required('Branch Name Required').
        matches(/^[A-Za-z ]+$/, 'Only Alphabatic Character').
        min(3, 'Minimum 3 Character').
        max(255, 'Max 255 Character'),
    micr_code: Yup.string().
        required('MIRC Code is Required').
        matches(/^[0-9]+$/, 'Only Digit Allowed').
        length(9, 'Code Must be 9 Digit'),
    cif_code: Yup.string().
        required('CIF Code is Required').
        matches(/^[0-9]+$/, 'Only Digit Allowed').
        length(11, 'Code Must be 11 Digit'),
    ifsc_code: Yup.string().
        required('IFSC Code is Required').
        matches(/^([a-zA-Z]){4}([0-9]){7}$/, 'Invalid IFSC Code')
    ,
    type_account: Yup.string().
        required('Account Type Is Required')
})
export default bankDetailsSchema;
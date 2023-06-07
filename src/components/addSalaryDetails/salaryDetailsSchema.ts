import * as Yup from 'yup';
const salaryDetailsSchema = Yup.object({
    basic_salary: Yup.string().required('Basic Salary is Required').matches(/^[0-9]+$/, 'Only Numeric Value Allowed'),
    home_rent_allowances: Yup.string().required('Home Rent is Required').matches(/^[0-9]+$/, 'Only Numeric Value Allowed'),
    conveyance_allowance: Yup.string().required('Conveyance is Required').matches(/^[0-9]+$/, 'Only Numeric Value Allowed'),
    esic_amount: Yup.string().required('ESIC Amount is Required').matches(/^[0-9]+$/, 'Only Numeric Value Allowed'),
    pf_amount: Yup.string().required('Provident Fund is Required').matches(/^[0-9]+$/, 'Only Numeric Value Allowed'),
    income_tax: Yup.string().required('Income Tax is Required').matches(/^[0-9]+$/, 'Only Numeric Value Allowed'),
    pt_amount: Yup.string().required('Proffesional Tax is Required').matches(/^[0-9]+$/, 'Only Numeric Value Allowed'),
    appraisal_date: Yup.string().required('Appraisal Date is Required')
})
export default salaryDetailsSchema;
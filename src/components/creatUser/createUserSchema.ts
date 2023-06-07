import * as Yup from 'yup'
const validationSchema = Yup.object({
  first_name: Yup.string()
    .matches(/^[A-Za-z]+$/, 'First Name can be Alphabetic')
    .min(3, 'Enter 3 character')
    .max(255, 'First Name max 255 character')
    .required('First Name is required'),
  last_name: Yup.string()
    .matches(/^[A-Za-z]+$/, 'Last Name can be Alphabetic')
    .min(3, 'Enter 3 character')
    .max(255, 'Last Name max 255 character')
    .required('Last Name is required'),
  contact: Yup.string()
    .matches(/^((0)|([+]91 ))\d{10}$/, 'Enter valid Number')
    .required('number is Required'),
  dob: Yup.string()
    .required('Date of Birth is required')
    .test('dob_date', 'Age Must Be Above 18 years', (value) => {
      var my_dob = new Date(value).getTime()
      var today = new Date()
      var max_dob = new Date(today.getFullYear() - 19, today.getMonth(), today.getDate()).getTime()
      return max_dob > my_dob
    }),
  joining_date: Yup.string().required('Joining date is required'),
  address: Yup.string()
    .min(6, 'Enter At least 6 character')
    .max(255, 'Address max 255 character')
    .required('Address is required'),
  city: Yup.string()
    .min(6, 'Enter At least 6 character')
    .max(100, 'City max 100 character')
    .required('City is required'),
  state: Yup.string()
    .min(2, 'Enter At least 2 character')
    .max(100, 'State max 100 character')
    .required('State is required'),
  country: Yup.string()
    .min(2, 'Enter At least 2 character')
    .max(100, 'country max 100 character')
    .required('country is required'),
  zip_code: Yup.string()
    .matches(/^[0-9]{6}$/, 'Enter valid Zip code')
    .required('Zip Code is required'),
  designation: Yup.string().required('Designation required'),
  role: Yup.string().required('Role required'),
  gender: Yup.string().required('Gender required'),
  pan_card: Yup.string().matches(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/, 'Enter Correct Number'),
  email: Yup.string()
    .required('Email is Required')
    .matches(/^[a-zA-Z0-9.]+@+[a-zA-Z0-9]+.+[A-z]/, 'Enter A valid Email'),
})
export default validationSchema

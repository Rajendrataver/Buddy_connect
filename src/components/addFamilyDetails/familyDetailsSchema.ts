import * as Yup from 'yup'
const familyDetailsSchema = Yup.object({
    name: Yup.string().
        matches(/^[A-Za-z ]+$/, 'Only Alphabatic Character').
        min(3, 'Minimum 3 Character').
        max(255, "maximum 255 character").
        required('Name is required'),
    relation: Yup.string().
        required('Relation is Required'),
    contact: Yup.string().
        required("Conatact is Required").
        matches(/^((0)|([+]91 ))\d{10}$/, 'Enter valid Number'),
    dob: Yup.string().
        required('Date of Birth is Required'),
    gender: Yup.string().required('Gender is Required'),
    address: Yup.string().min(6, 'Icoreect Address  ')

})
export default familyDetailsSchema;
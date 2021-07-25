import DOCTORS from '../constants/doctors'

const getDoctorById = (doctorId) => DOCTORS[doctorId] || DOCTORS['default']
export default getDoctorById

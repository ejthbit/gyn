const routingPaths = {
    login: '/login',
    services: '/#services',
    employees: '/#personnel',
    officeHours: '/#ordinacni-hodiny',
    ambulations: '/ordinace',
    reservation: '/rezervace',
    contact: '/#contact',
    admin: '/admin',
}
export const adminPaths = {
    orders: `${routingPaths.admin}/orders`,
    doctorServices: `${routingPaths.admin}/doctorsServices`,
}
export default routingPaths

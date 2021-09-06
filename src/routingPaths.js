const routingPaths = {
    login: '/login',
    services: '/#sluzby',
    employees: '/#zamestnanci',
    officeHours: '/#ordinacni-hodiny',
    ambulations: '/ordinace',
    reservation: '/rezervace',
    contact: '/#kontakt',
    admin: '/admin',
}
export const adminPaths = {
    orders: `${routingPaths.admin}/orders`,
    doctorServices: `${routingPaths.admin}/doctorsServices`,
}
export default routingPaths

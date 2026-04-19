const routingPaths = {
    login: '/login',
    services: '/#services',
    employees: '/#personnel',
    reservation: '/rezervace',
    contact: '/#contact',
    admin: '/admin',
}

export const adminPaths = {
    orders: `${routingPaths.admin}/orders`,
    doctorServices: `${routingPaths.admin}/doctorsServices`,
    calendar: `${routingPaths.admin}/calendar`,
}

export default routingPaths

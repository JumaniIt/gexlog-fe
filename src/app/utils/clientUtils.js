export const getNameAndCuit = client => {
    return `${client?.name} - ${client?.cuit}`
}

export const getCuitAndName = client => {
    return `${client?.cuit} - ${client?.name}`
}

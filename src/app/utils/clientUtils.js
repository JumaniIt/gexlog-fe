export const getNameAndCuit = client => {
    const cuit = client?.cuit || "(sin cuit)";
    return `${client?.name} - ${cuit}`
}

export const getCuitAndName = client => {
    const cuit = client?.cuit || "(sin cuit)";
    return `${cuit} - ${client?.name}`
}

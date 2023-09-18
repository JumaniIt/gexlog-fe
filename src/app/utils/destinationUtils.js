export const formatDestinations = (destinations) => {
    const formattedList = destinations.map(d => `${d.code}`).join(', ');
    return formattedList;
}
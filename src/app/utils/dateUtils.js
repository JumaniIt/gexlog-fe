export const trimToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(":");

  const hoursInt = parseInt(hours, 10);
  const minutesInt = parseInt(minutes, 10);

  const roundedMinutes = Math.round(minutesInt / 30) * 30;

  const formattedTime = `${hoursInt
    .toString()
    .padStart(2, "0")}:${roundedMinutes.toString().padStart(2, "0")}`;

  return formattedTime;
};

export const getHalfHourOptions = () => {
  const options = [];
  for (let hour = 0; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      options.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  return options;
};

export const toLocalDateTimeString = (date) => {
  const inputDate = new Date(date);

  const gmtMinus3Offset = 3 * 60 * 60 * 1000;

  const gmtMinus3Date = new Date(inputDate.getTime() - gmtMinus3Offset);

  const year = gmtMinus3Date.getUTCFullYear().toString().substring(2);
  const month = String(gmtMinus3Date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(gmtMinus3Date.getUTCDate()).padStart(2, "0");
  const hours = String(gmtMinus3Date.getUTCHours()).padStart(2, "0");
  const minutes = String(gmtMinus3Date.getUTCMinutes()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

  return formattedDate;
}

export const toLocalDateString = (date) => {
  return toLocalDateTimeString(date).substring(0, 8);
}
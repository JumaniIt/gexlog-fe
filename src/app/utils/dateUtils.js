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

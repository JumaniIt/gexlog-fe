export const trimToMinutes = timeString => {
    const [hours, minutes] = timeString.split(':');
  
    const hoursInt = parseInt(hours, 10);
    const minutesInt = parseInt(minutes, 10);
    
    const roundedMinutes = Math.round(minutesInt / 30) * 30;
  
    const formattedTime = `${hoursInt.toString().padStart(2, '0')}:${roundedMinutes.toString().padStart(2, '0')}`;
  
    return formattedTime;
  }
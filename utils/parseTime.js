export default function parseTime(timeObj) {
  let hourString = "";
  let minuteString = null;

  if (timeObj?.minutes === 0) {
    if (timeObj?.hours === 1) {
      hourString = `${timeObj?.hours} hour`;
      return hourString;
    } else {
      hourString = `${timeObj?.hours} hours`;
      return hourString;
    }
  } else {
    hourString = `${timeObj?.hours}H`;
    minuteString = `+${timeObj?.minutes}M`;
  }

  if (!timeObj.hours || !timeObj.minutes) {
    return null;
  }

  return `${hourString}${minuteString}`;
}

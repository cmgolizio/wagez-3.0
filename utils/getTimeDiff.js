const handleSplitTimes = (time) => {
  const result = { hours: 0, minutes: 0 };

  result.hours = Number(time.split(":")[0]);
  result.minutes = Number(time.split(":")[1]);

  if (result.hours === 0) {
    result.hours = 24;
  }

  return result;
};

const timeDifference = (timeStart, timeEnd) => {
  const result = { hours: null, minutes: null };
  const startObj = handleSplitTimes(timeStart);
  const endObj = handleSplitTimes(timeEnd);

  result.hours = endObj.hours - startObj.hours;
  result.minutes = endObj.minutes - startObj.minutes;

  if (result.minutes < 0) {
    result.minutes = 60 + result.minutes;
    result.hours = result.hours - 1;
  }

  if (result.minutes === 60) {
    result.minutes = 0;
    result.hours = result.hours + 1;
  }

  return result;
};

function calculateEarnings(timeObj, hourlyRate) {
  const { hours, minutes } = timeObj;
  const result = { moneyHours: 0, moneyMins: 0 };
  const hourly = Number(hourlyRate);
  const partialHour = minutes / 60;
  result.moneyHours = hours * hourly;
  result.moneyMins = partialHour * hourly;

  const total = result.moneyHours + result.moneyMins;
  return Number.parseFloat(total).toFixed(2);
}

export default function getTimeDiff(values) {
  const { times, breakTimes, hourly } = values;
  const { startTime, endTime } = times.value;
  const { breakStart, breakEnd } = breakTimes.value;

  const shiftTimesDifference = timeDifference(startTime, endTime);
  const breakTimesDifference = timeDifference(breakStart, breakEnd);
  const finalResult = {
    shiftTimeLength: shiftTimesDifference,
    breakTimeLength: breakTimesDifference,
    shiftMinusBreak: { hours: 0, minutes: 0 },
    hourlyEarnings: 0,
  };
  const { shiftTimeLength, breakTimeLength, shiftMinusBreak } = finalResult;
  shiftMinusBreak.hours = shiftTimeLength.hours - breakTimeLength.hours;

  if (breakStart && breakEnd) {
    if (breakTimeLength.minutes > shiftTimeLength.minutes) {
      const mins = breakTimeLength.minutes - shiftTimeLength.minutes;
      shiftMinusBreak.minutes = 60 - mins;
      shiftMinusBreak.hours = shiftMinusBreak.hours - 1;
    } else {
      shiftMinusBreak.minutes =
        shiftTimeLength.minutes - breakTimeLength.minutes;
    }

    if (shiftMinusBreak.minutes < 0) {
      shiftMinusBreak.minutes = shiftMinusBreak.minutes * -1;
    }
  } else {
    finalResult.shiftMinusBreak = { ...shiftTimeLength };
  }
  const moneyEarned = breakStart
    ? calculateEarnings(shiftMinusBreak, hourly.value)
    : calculateEarnings(shiftTimeLength, hourly.value);
  finalResult.hourlyEarnings = moneyEarned;

  if (shiftMinusBreak.minutes === 60) {
    shiftMinusBreak.minutes = 0;
    shiftMinusBreak.hours = shiftMinusBreak.hours + 1;
  }

  return finalResult;
}

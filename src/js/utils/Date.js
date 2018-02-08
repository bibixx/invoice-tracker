import moment from "moment";
import green from "material-ui/colors/green";
import red from "material-ui/colors/red";
import amber from "material-ui/colors/amber";

export const initMoment = () => {
  moment.locale("pl");
};

export const calculateRemainingWarrany = (startingDate, warrantyLength) => {
  const startingMoment = moment.unix(startingDate);
  const endingMoment = moment(startingMoment).add(warrantyLength, "years");

  const diff = endingMoment.diff(moment(), "months");
  let formatted = moment.duration(diff, "months").humanize();
  if (diff < 0) {
    formatted = `-${formatted}`;
  }

  const color = (diff > 4) ? green[500] : (diff >= 0) ? amber[700] : red[400];
  return [formatted, diff, color];
};

export const displayDate = timestamp => moment.unix(timestamp).format("L");

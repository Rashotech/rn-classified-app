import moment from "moment";

const Time = (timestamp) => {
  let now = moment();
  let year = now.diff(timestamp, "years", true);
  let month = now.diff(timestamp, "months", true);
  let day = now.diff(timestamp, "days", true);
  if (year > 1 && year - Math.floor(year) !== 0) {
    return moment(timestamp).format("MMM D, YYYY");
  } else if (month > 1 && month - Math.floor(month) !== 0) {
    if (moment(timestamp).year() !== moment().year()) {
      return moment(timestamp).format("MMM D, YYYY");
    }
    return moment(timestamp).format("MMM D");
  } else if (day > 7 && day - Math.floor(day) !== 0) {
    return moment(timestamp).format("MMM D");
  }
  return moment(timestamp).startOf().fromNow();
};

export default Time;

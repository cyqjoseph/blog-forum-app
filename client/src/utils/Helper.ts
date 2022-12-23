// Helper functions here
import moment from "moment";

const getMonths = function (data: string) {
  const months = Math.floor(moment.duration(moment().diff(data)).asMonths());
  if (months > 1) {
    return months + " months ";
  } else if (months === 1) {
    return "1 month ";
  } else {
    return "";
  }
};

const getHours = function (data: string) {
  const hours = Math.floor(moment.duration(moment().diff(data)).asHours());
  if (hours > 1) {
    return hours + " hours ";
  } else if (hours === 1) {
    return "1 hour ";
  } else {
    return "";
  }
};

const getMinutes = function (data: string) {
  const minutes = Math.floor(
    moment.duration(moment().diff(data)).asMinutes() % 60
  );
  if (minutes > 1) {
    return minutes + " minutes ";
  } else if (minutes === 1) {
    return "1 minute ";
  } else {
    return "";
  }
};

const getDays = function (data: string) {
  const days = Math.floor(moment.duration(moment().diff(data)).asDays() % 30);
  if (days > 1) {
    return days + " days ";
  } else if (days === 1) {
    return "1 day ";
  } else {
    return "";
  }
};
const getYears = function (data: string) {
  const years = Math.floor(moment.duration(moment().diff(data)).asYears());
  if (years > 1) {
    return years + " year ";
  } else if (years === 1) {
    return "1 year ";
  } else {
    return "";
  }
};

export const calculateElapsed = function (data: string): string {
  if (getYears(data) !== "") {
    return getYears(data) + "ago";
  }
  if (getMonths(data) !== "") {
    return getMonths(data) + "ago";
  }
  if (getDays(data) !== "") {
    return getDays(data) + "ago";
  }
  if (getHours(data) !== "") {
    return getHours(data) + "ago";
  }
  if (getMinutes(data) !== "") {
    return getMinutes(data) + "ago";
  }
  return "Just Posted";
};

export const getFormattedDate = function (data: string): string {
  return moment(data).format("MMMM D, YYYY");
};

export const truncateBlog = function (data: string): string {
  const dataArr = data.split(" ");
  const length = dataArr.length;
  if (length <= 100) {
    return data;
  } else {
    return dataArr.splice(0, 100).join(" ") + "...";
  }
};

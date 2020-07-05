import moment from "moment";

export function formatDate(date, format = "") {
  return moment(date, format).format("DD/MM/YYYY");
}

export function formatDateTime(date) {
  return moment(date).format("DD/MM/YYYY HH:mm");
}

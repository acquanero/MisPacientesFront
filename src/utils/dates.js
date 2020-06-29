import moment from "moment";

export function formatDate(date) {
  return moment(date).format("DD/MM/YYYY");
}

export function formatDateTime(date) {
  return moment(date).format("DD/MM/YYYY HH:mm");
}

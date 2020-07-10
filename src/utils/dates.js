import moment from "moment";

const FORMAT_DATE = "DD/MM/YYYY";
const FORMAT_DATE_TIME = "DD/MM/YYYY HH:mm";
const FORMAT_DATE_RAW = "YYYY-MM-DD";
const FORMAT_DATE_SHIFT = "DD-MM-YYYY";

export function formatDate(date, format = "") {
  return moment(date, format).format(FORMAT_DATE);
}

export function formatDateTime(date) {
  return moment(date).format(FORMAT_DATE_TIME);
}

export function formatDateShift(date = null) {
  if (date) {
    // Si nos envian la fecha la formateamos
    return moment(date, FORMAT_DATE_RAW).format(FORMAT_DATE_SHIFT);
  }
  // si no, devolvemos formateado el dia de hoy
  return moment().format(FORMAT_DATE_SHIFT);
}

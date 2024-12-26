import { Timestamp } from "firebase/firestore";
import { notify_info, notify_warning } from "./Notifications";

export function validateInvoice(company, client) {
  if (!company.name || !company.seller || !company.address || !company.phone) {
    notify_warning("Por favor complete todos los campos");
    return false;
  }

  if (!client.name || !client.document || !client.address || !client.phone) {
    notify_warning("Por favor complete todos los campos");
    return false;
  }

  return true;
}

export function timestampToDate(timestamp) {
  if(!timestamp) return '';
  const date = new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate().toLocaleDateString();;
  return date;
}

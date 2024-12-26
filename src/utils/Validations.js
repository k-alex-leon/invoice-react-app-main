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
  if (!timestamp) return "";
  const date = new Timestamp(timestamp.seconds, timestamp.nanoseconds)
    .toDate()
    .toLocaleDateString();
  return date;
}

// it gets product atributtes and validates them
export function validateProduct({
  name,
  boxPrice,
  boxQuantity,
  price,
  quantity,
}) {
  if (!name || name === "") {
    notify_warning("Por favor ingrese un nombre de producto");
    return false;
  }
  if ((!boxQuantity || boxQuantity <= 0) && (!quantity || quantity <= 0)) {
    notify_warning("Por favor ingrese una cantidad válida");
    return false;
  }

  if (boxQuantity > 0 && (!boxPrice || boxPrice <= 0)) {
    notify_warning("Por favor ingrese un precio de caja válido");
    return false;
  }

  if (quantity > 0 && (!price || price <= 0)) {
    notify_warning("Por favor ingrese un precio válido");
    return false;
  }

  return true;
}

export const numberFormat = (value) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(value);
};

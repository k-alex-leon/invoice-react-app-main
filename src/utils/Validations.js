import { notify_info, notify_warning } from "./Notifications";

export function validateInvoice({ company, client }) {
  switch (company) {
    case Object.keys(company).length === 0:
      return notify_warning("No existen datos de la empresa!");
    case Object.keys(company).length < 5:
      return notify_info("La informacion puede estar incompleta!");
    case company.seller === "":
      return notify_warning("No existe nombre del vendedor");
    default:
      break;
  }

  switch (client) {
    case client === undefined || client === null:
      return notify_warning("Datos nulos!");
    case Object.keys(client).length === 0:
      return notify_warning("No existen datos de la empresa!");
    case Object.keys(client).length < 5:
      return notify_info("La informacion puede estar incompleta!");
    default:
      break;
  }
}

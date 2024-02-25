import React from "react";
import ClientForm from "../Forms/ClientForm";
import ItemForm from "../forms/ItemForm";
import CompanyForm from "../forms/CompanyForm";

const BodyModal = ({ form, onDataChange }) => {
  
  if (form) {
    if (form.name === "company") {
      return <CompanyForm onCompanyChange={onDataChange} />;
    } else if (form.name === "client") {
      return <ClientForm onClientChange={onDataChange} />;
    } else {
      return <ItemForm onItemChange={onDataChange} />;
    }
  }
};

export default BodyModal;

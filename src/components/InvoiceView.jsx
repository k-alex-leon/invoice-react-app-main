import React, { useEffect, useState, useRef } from "react";
import { FaPrint } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiOutlineClear } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";
import { TableItemsView } from "./TableItemsView";
import PropTypes from "prop-types";
import { getTotal } from "../services/InvoiceService";
import FabAddData from "./FabAddData";
import OptionsModal from "./modals/OptionsModal";
import BaseModal from "./modals/BaseModal";
import { notify_success } from "../utils/Notifications";
import useData from "../hooks/useData";
import { Timestamp } from "firebase/firestore";
import { numberFormat, timestampToDate } from "../utils/Validations";

const InvoiceView = () => {
  // DATA STUFF
  const [thisCompany, setCompany] = useState({});
  const [thisClient, setClient] = useState({});
  const [itemsList, setItemsList] = useState([]);
  const { invoiceProducts, currentInvoiceData } = useData();
  const [date, setDate] = useState("");

  useEffect(() => {
    if (!invoiceProducts) return;
    setItemsList(invoiceProducts);
  }, [invoiceProducts]);

  useEffect(() => {
    if (!currentInvoiceData) return;
    let { company, client, date } = currentInvoiceData;
    setCompany(company);
    setClient(client);
    // can found this function in src/utils/Validations.js
    let invoiceDate = timestampToDate(date);
    setDate(invoiceDate);
  }, [currentInvoiceData]);

  let boxRef = useRef();

  let total = getTotal(itemsList);

  // BUTTONS INVOICE ACTIONS
  const handleDeleteProducts = (e) => {
    e.preventDefault();
  };

  const handleDeleteInvoice = (e) => {
    e.preventDefault();
  };

  const generatePdf = useReactToPrint({
    content: () => boxRef.current,
    documentTitle: date,
  });

  // MODALS!!!

  // form option selected
  let [selected, setOptionSelected] = useState({});
  const handleOptionSelected = (option) => {
    setOptionSelected(option);
    setBaseOpen(!baseOpenModal);
  };

  // options list modal
  let [open, setOpen] = useState(false);
  const handleModalVisible = () => {
    setOpen(!open);
  };

  // other modals -company-client-products
  let [baseOpenModal, setBaseOpen] = useState(false);
  const handleModalBaseVisible = () => {
    // setOpen(!open)
    setBaseOpen(!baseOpenModal);
  };

  // set to invoice
  const handleDataToInvoice = (data) => {
    console.log(data);
    if (selected.name === "company") {
      setCompany(data);
    } else if (selected.name === "client") {
      setClient(data);
    } else {
      setItemsList((itemList) => [...itemList, data]);
      notify_success(`Producto ${data.name} agregado!`);
    }
  };

  return (
    <div className="h-full md:border overflow-y-auto">
      <div className="flex h-full flex-col p-4 items-center justify-center">
        <div className="flex justify-end mb-10 w-full space-x-2">
          {/* <button
            title="Quitar productos"
            onClick={handleDeleteProducts}
            className=" p-2 bg-orange-500 text-white rounded hover:scale-110 duration-100"
          >
            <AiOutlineClear />
          </button>

          <button
            title="Eliminar"
            onClick={handleDeleteInvoice}
            className=" p-2 bg-rose-500 text-white rounded hover:scale-110 duration-100"
          >
            <MdDelete />
          </button> */}

          <button
            title="Imprimir"
            onClick={generatePdf}
            className="absolute p-2 bg-emerald-500 text-white rounded hover:scale-110 duration-100"
          >
            <FaPrint />
          </button>
        </div>

        <div className="w-full h-full">
          <div
            ref={boxRef}
            className="w-full h-auto min-h-full border p-4 rounded bg-white z-40"
          >
            <div>
              <h1 className="text-center font-bold">
                {(thisCompany && thisCompany.name) || "Nombre de la empresa"}
              </h1>
              <div className="flex flex-col w-full text-center">
                <p>
                  {(thisCompany && thisCompany.phone) || "Telefono"} -{" "}
                  {(thisCompany && thisCompany.address) || "Dirección"}
                </p>
                <p>{thisCompany && thisCompany.email}</p>
              </div>

              <table className="w-full justify-around">
                <tbody>
                  <tr>
                    <td>Fecha</td>
                    <td className="text-end font-bold flex flex-col justify-end">
                      {`${date}`}
                    </td>
                  </tr>

                  <tr>
                    <td>Vendedor</td>
                    <td className="text-end font-bold flex flex-col justify-end">
                      {thisCompany && thisCompany.seller}
                    </td>
                  </tr>

                  <tr className="border-t border-black">
                    <td>
                      <p>Comprador</p>
                      <p className="font-bold">
                        {thisClient && thisClient.name}
                      </p>
                    </td>
                    <td className="text-end flex flex-col justify-end">
                      <p>Documento</p>
                      <p className="font-bold">
                        {thisClient && thisClient.document}
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td>Dirección</td>
                    <td className="text-end font-bold flex flex-col justify-end">
                      {thisClient && thisClient.address}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p>Telefono</p>
                      <p className="font-bold">
                        {thisClient && thisClient.phone}
                      </p>
                    </td>
                    <td className="text-end flex flex-col justify-end">
                      <p>Email</p>
                      <p className="font-bold">
                        {thisClient && thisClient.email}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <TableItemsView itemsList={itemsList} />

            <h3 className="w-full text-end mt-4">
              <b>Total :</b>{" "}
              <b className="rounded bg-black px-2 text-center text-white">
                {numberFormat(total)}
              </b>
            </h3>
          </div>
        </div>

        <FabAddData isClicked={handleModalVisible} />
      </div>

      <OptionsModal
        isVisible={open}
        onClose={handleModalVisible}
        onOptionSelected={handleOptionSelected}
      />

      <BaseModal
        isVisible={baseOpenModal}
        form={selected}
        onDataChange={handleDataToInvoice}
        onClose={handleModalBaseVisible}
      />
    </div>
  );
};

export default InvoiceView;

// ayuda a validar el tipo de props que llega al componenete
InvoiceView.propTypes = {
  client: PropTypes.object,
  company: PropTypes.object,
  items: PropTypes.array,
};

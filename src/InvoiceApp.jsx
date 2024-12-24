import React, { useEffect, useState } from "react";
import CompanyView from "./components/CompanyView";
import ClientView from "./components/ClientView";
import ItemView from "./components/ItemView";
import InvoiceView from "./components/InvoiceView";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpModal from "./components/modals/signUp/SignUpModal";
import useAuth from "./auth/hooks/useAuth";
import Loading from "./components/Loading";
import {
  notify_error,
  notify_success,
  notify_warning,
} from "./utils/Notifications";
import useData from "./hooks/useData";

export default function InvoiceApp() {
  const { user, loading } = useAuth();
  const { createInvoice, addProduct } = useData();

  const [thisCompany, setCompany] = useState(null);
  const [thisClient, setClient] = useState(null);
  const [itemList, setItemList] = useState([]);

  // useEffect(() => {
  //   console.log("user: " + JSON.stringify(user));
  // }, [user]);

  // validates the company data
  const handleCompany = (company) => {
    if (
      !company.name ||
      !company.seller ||
      !company.address ||
      !company.phone
    ) {
      return notify_warning("Por favor complete todos los campos");
    }
    setCompany(company);
  };

  // validates the client data
  const handleClient = (client) => {
    if (!client.name || !client.document || !client.address || !client.phone) {
      return notify_warning("Por favor complete todos los campos");
    }
    setClient(client);
  };

  // creates a first version with some basic data
  const initInvoice = () => {
    if (!thisCompany || !thisClient) return;

    createInvoice(
      {
        company: thisCompany,
        client: thisClient,
        makerId: user.currentUser.uid,
      },
      (msg) => {
        notify_success(msg);
      },
      (msg) => {
        notify_error(msg);
      }
    );
  };

  // waits for the company and client to be set
  useEffect(() => {
    initInvoice();
  }, [thisCompany, thisClient]);

  const handleItem = (item) => {
    // const product = new ProductNode(item);
    addProduct(
      item,
      (msg) => {
        notify_success(msg);
      },
      (msg) => {
        notify_error(msg);
      }
    );
  };

  const handleClearAll = () => {
    setCompany(null);
    setClient(null);
    setItemList([]);
  };

  const handleClearList = () => {
    setItemList([]);
  };

  return (
    <div className="w-full h-full bg-zinc-400">
      {!user && <SignUpModal isVisible={true} />}
      {loading && <Loading />}
      <div className="gap-4 h-full grid grid-cols-2 grid-rows-1 justify-center items-center p-4 ">
        <div className="w-full h-full grid grid-cols-2 grid-rows-2 md:block">
          <CompanyView onCompanyChange={handleCompany} />
          <ClientView onClientChange={handleClient} />

          <ItemView onItemChange={handleItem} />
        </div>

        <div className="h-full md:border md:border-gray-200">
          <InvoiceView
            company={thisCompany}
            client={thisClient}
            items={itemList}
            onClearList={handleClearList}
            onClear={handleClearAll}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

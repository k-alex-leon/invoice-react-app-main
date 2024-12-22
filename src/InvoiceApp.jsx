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

export default function InvoiceApp() {
  const [thisCompany, setCompany] = useState({});
  const [thisClient, setClient] = useState({});
  const [itemList, setItemList] = useState([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log("user: " + JSON.stringify(user));
  }, [user]);

  const handleCompany = (company) => {
    setCompany(company);
  };

  const handleClient = (client) => {
    setClient(client);
  };

  const handleItem = (item) => {
    console.log("item get: " + JSON.stringify(item));
    setItemList((itemList) => [...itemList, item]);
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
    <>
      {!user && <SignUpModal isVisible={true} />}
      {loading && <Loading />}
      <div className="gap-4 p-4 md:flex h-screen over overflow-hidden bg-zinc-500">
        <div className="h-full grid grid-cols-2 grid-rows-2 md:block md:w-1/2 bg-white">
          <CompanyView onCompanyChange={handleCompany} />
          <ClientView onClientChange={handleClient} />

          <ItemView onItemChange={handleItem} />
        </div>

        <div className="md:w-1/2 w-full h-full md:h-auto md:border md:border-gray-200">
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
    </>
  );
}

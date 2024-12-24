import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../../firebase.config";

let DataContext = createContext(null);

function DataProvider({ children }) {
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const invoiceCollection = collection(db, "invoices");
  const [invoiceProducts, setInvoiceProducts] = useState([]);

  const createInvoice = async (
    { company, client, makerId },
    onSuccess,
    onError
  ) => {
    let invoice = {
      makerId: makerId,
      company: company,
      client: client,
      list: {},
    };

    try {
      // let invoiceRef = doc(invoiceCollection);
      let res = await addDoc(invoiceCollection, invoice);

      if (res) {
        setCurrentInvoice(res);
        console.log("Invoice created: " + JSON.stringify(res));
        return onSuccess("Factura creada correctamente");
      }

      return onError("Error creando factura");
    } catch (error) {
      onError("Error creando factura: " + error);
    }
  };

  const addProduct = async (product, onSuccess, onError) => {
    if (!currentInvoice) return onError("No hay factura seleccionada");

    try {
      // const productsCollection = collection(invoiceCollection, "products");
      let productCollectionRef = collection(currentInvoice, "products");
      // let productRef = doc(productCollectionRef);
      let res = await addDoc(productCollectionRef, product);

      if (res) {
        // getInvoiceProducts();
        return onSuccess("Producto agregado correctamente");
      }
    } catch (error) {
      onError("Error creando producto: " + error);
    }
  };

  const getInvoiceProducts = async () => {
    // if (!currentInvoice) return console.error("No hay factura seleccionada");
    // try {
    //   let itemRef = doc(db, "invoices", currentInvoice.id);
    //   const productsCollection = collection(itemRef, "products");
    //   const q = query(productsCollection);
    //   let res = await getDocs(q);

    //   if (res) {
    //     // return onSuccess(res.data());
    //     const products = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //     return setInvoiceProducts(products);
    //   }
    // } catch (error) {
    //   console.error("Error obteniendo los productos: " + error);
    // }

    const itemRef = doc(db, "invoices", currentInvoice.id);
    const productsCollection = collection(itemRef, "products");
    const q = query(productsCollection);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInvoiceProducts(products);
      },
      (error) => {
        console.error("Error obteniendo los productos: " + error);
      }
    );

    return unsubscribe;
  };

  useEffect(() => {
    if(!currentInvoice) return;
    const unsubscribe = getInvoiceProducts();
    return () => unsubscribe();
  }, [currentInvoice]);

  const deleteAllProducts = async (onSuccess, onError) => {
    if (!currentInvoice) return onError("No hay factura seleccionada");
    try {
      let itemRef = doc(db, "invoices", currentInvoice);
      let res = await updateDoc(itemRef, { list: {} });

      if (res) {
        return onSuccess("Productos eliminados correctamente");
      }
    } catch (error) {
      onError("Error eliminando los productos: " + error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        invoiceProducts,
        createInvoice,
        addProduct,
        deleteAllProducts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
export { DataContext };

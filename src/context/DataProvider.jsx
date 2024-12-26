import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../../firebase.config";

let DataContext = createContext(null);

function DataProvider({ children }) {
  const [currentInvoiceId, setCurrentInvoiceId] = useState(null);
  const [currentInvoiceData, setCurrentInvoiceData] = useState(null);
  const invoiceCollection = collection(db, "invoices");
  const [invoiceProducts, setInvoiceProducts] = useState([]);

  const createInvoice = async (
    { company, client, makerId, date },
    onSuccess,
    onError
  ) => {
    // let invoice
    let invoiceData = {
      makerId: makerId,
      date,
      company,
      client,
    };

    try {
      // let invoiceRef = doc(invoiceCollection);
      let res = await addDoc(invoiceCollection, invoiceData);

      if (res) {
        console.log("Factura ref: ", res);
        setCurrentInvoiceId(res.id);
        setCurrentInvoiceData(invoiceData);

        return onSuccess("Factura creada correctamente");
      }

      return onError("Error creando factura");
    } catch (error) {
      onError("Error creando factura: " + error);
    }
  };

  const addProduct = async (product, onSuccess, onError) => {
    if (!currentInvoiceId) return onError("No hay factura seleccionada");

    try {
      const invoiceRef = doc(db, "invoices", currentInvoiceId);
      // const productsCollection = collection(invoiceCollection, "products");
      let productCollectionRef = collection(invoiceRef, "products");
      // let productRef = doc(productCollectionRef);
      let res = await addDoc(productCollectionRef, product);

      if (res) {
        return onSuccess("Producto agregado correctamente");
      }
    } catch (error) {
      onError("Error creando producto: " + error);
    }
  };

  // subscribe to the products sub-collection
  const getInvoiceProducts = () => {
    const itemRef = doc(invoiceCollection, currentInvoiceId);
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

  // listen for changes in the current invoice
  useEffect(() => {
    if (!currentInvoiceId) return;
    const unsubscribe = getInvoiceProducts();
    return () => unsubscribe();
  }, [currentInvoiceId]);

  const getInvoicesByUser = async (userId, onSuccess, onError) => {
    if (!userId)
      return onError("No hay usuario seleccionado para obtener facturas");

    try {
      // Create a query with a filter
      const q = query(invoiceCollection, where("makerId", "==", userId), orderBy("date"));

      const querySnapshot = await getDocs(q);
      const invoices = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return onSuccess(invoices);
    } catch (error) {
      console.error("Error getting invoices:", error);
      return [];
    }
  };

  const deleteProductSelected = async (productId, onSuccess, onError) => {
    if (!currentInvoiceId) return onError("No hay factura seleccionada");
    try {
      const productRef = doc(
        invoiceCollection,
        currentInvoiceId,
        "products",
        productId
      );

      const res = await deleteDoc(productRef);

      if (res) return onError("Error eliminando producto");
      return onSuccess("Producto eliminado correctamente");
    } catch (error) {
      onError("Error eliminando producto: " + error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        invoiceProducts,
        currentInvoiceData,
        createInvoice,
        addProduct,
        getInvoicesByUser,
        deleteProductSelected,
        setCurrentInvoiceData,
        setCurrentInvoiceId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
export { DataContext };

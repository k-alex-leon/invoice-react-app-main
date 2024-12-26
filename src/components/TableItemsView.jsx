import { toast } from "react-toastify";
import useData from "../hooks/useData";
import { notify_error, notify_success } from "../utils/Notifications";
import { numberFormat } from "../utils/Validations";

export const TableItemsView = ({ itemsList }) => {
  const { deleteProductSelected } = useData();

  function deleteAlert(productId) {
    const deleteProduct = () => {
      deleteProductSelected(
        productId,
        (msg) => {
          notify_success(msg);
        },
        (error) => {
          notify_error(error);
        }
      );
    };

    return (
      <div className="grid grid-cols-5 items-center w-full">
        <span className="col-span-3">¿Deseas eliminar este producto?</span>
        <button
          className="border col-span-2 border-purple-400 hover:bg-purple-400 hover:text-white ml-auto px-2 rounded-md text-purple-400"
          onClick={deleteProduct}
        >
          Borrar
        </button>
      </div>
    );
  }

  const handleDeleteProduct = (id) => {
    if (!id) return;
    toast.info(deleteAlert(id));
  };
  return (
    <table className="w-full mt-4 border-t">
      <thead className="font-bold">
        <tr className="grid grid-cols-6 w-full">
          <td>Producto</td>
          <td>Cajas.</td>
          <td>Precio.</td>
          <td>Unidad</td>
          <td>Precio U.</td>
          <td className="w-full text-end">Total</td>
        </tr>
      </thead>
      <tbody>
        {itemsList &&
          itemsList.map((item, index) => {
            return (
              <tr key={index} className="grid grid-cols-6 w-full border-b-2">
                <td
                  onClick={() => handleDeleteProduct(item.id)}
                  className="hover:text-blue-600 hover:cursor-pointer"
                >
                  {item.name}
                </td>
                <td>{item.boxQuantity}</td>
                <td>{item.boxPrice}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td className="text-end flex flex-col">
                  {numberFormat(
                    item.quantity * item.price +
                      item.boxQuantity * item.boxPrice
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

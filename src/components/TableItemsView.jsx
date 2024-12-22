export const TableItemsView = ({ itemsList }) => {
  return (
    <table className="w-full mt-4 border-t">
      <thead className="font-bold">
        <tr className="grid grid-cols-7 w-full">
          <td className="col-span-2">Producto</td>
          <td>Cajas.</td>
          <td>Precio.</td>
          <td>Unidad</td>
          <td>Precio U.</td>
          <td className="text-end">Total</td>
        </tr>
      </thead>
      <tbody>
        {itemsList &&
          itemsList.map((item, index) => {
            return (
              <tr key={index} className="grid grid-cols-7 w-full">
                <td className="col-span-2">{item.name}</td>
                <td>{item.boxQuantity}</td>
                <td>{item.boxPrice}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td className="text-end flex flex-col">
                  {item.quantity * item.price +
                    item.boxQuantity * item.boxPrice}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

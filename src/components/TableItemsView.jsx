
export const TableItemsView = ({itemsList}) => {
  return (
    <table className="w-full mt-4 border-t">
            <thead>
              <tr>
                <td className="mx-[5px] font-bold">Cant.</td>
                <td className="w-2/4 font-bold">Producto</td>
                <td className="mx-[5px] font-bold">Unidad</td>
                <td className="text-end font-bold flex flex-col justify-end">
                  Total
                </td>
              </tr>
            </thead>
            <tbody>
              {itemsList &&
                itemsList.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="mx-[5px]">{item.quantity}</td>
                      <td className="w-2/4 font-bold">{item.name}</td>
                      <td className="mx-[5px]">{item.price}</td>
                      <td className="text-end font-bold flex flex-col justify-end">
                        {item.quantity * item.price}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
  )
}

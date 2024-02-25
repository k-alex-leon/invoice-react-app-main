import ItemForm from "./forms/ItemForm";

const ItemView = ({ onItemChange }) => {

  return (
    <div className="shadow bg-zinc-100 h-1/3">
      <div className="flex justify-between font-bold px-4 py-2 text-2xl text-white bg-slate-800">
        <h1>Agregar producto</h1>
      </div>
      <ItemForm onItemChange={onItemChange} />
    </div>
  );
};

export default ItemView;

import { MdAdd } from "react-icons/md";

const FabAddData = ({isClicked}) => {
  return (
    <div className="absolute md:hidden flex bottom-20 right-20 drop-shadow-lg">
      <button
      onClick={isClicked}
       className="absolute mb-10 rounded-full shadow bg-emerald-900 text-white p-4 duration-150 hover:rotate-180 hover:scale-110">
        <MdAdd />
      </button>
    </div>
  );
};

export default FabAddData;

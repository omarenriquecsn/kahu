const OfferCard = () => {
  return (
    <div className="flex flex-col items-center rounded-2xl shadow-md p-4 w-48">
      <div className="bg-white-100 border border-black rounded-md p-4 rounded-1xl shadow-md h-20 w-fit flex items-center justify-center ">
        Foto
      </div>
      <p className="mt-2 font-semibold">nombre</p>
      <p className="text-black font-bold">$000</p>
      <button className="mt-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
        Comprar
      </button>
    </div>
  );
};

export default OfferCard;

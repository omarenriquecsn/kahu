import MarcasCard from "../components/UI/MarcasCard";

const GatosPage = () => {
  return (
    <section className="py-5 bg-gray-50 w-full">
      <h2 className="mb-5">Marcas de Gatos:</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <MarcasCard></MarcasCard>
      </div>
    </section>
  );
};

export default GatosPage;

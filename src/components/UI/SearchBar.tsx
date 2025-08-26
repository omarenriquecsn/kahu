import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="hidden md:flex flex-1 max-w-lg mx-8">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Buscar alimentos para tu mascota..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;

import { useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { GoogleAutocompleteInput } from '../../google/index';

const SearchBar = () => {
  //const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();


  const handleSearch = () => {
    console.log("Searching for:", location, dates);
  };

  function handlePlaceChange(location) {
    const { lat, lng, city } = location;
    console.log(location);
    setSearchParams({ city, page: 0, lat, lng });
  }

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-4xl p-2  shadow-lg rounded-lg">
        <div className="flex space-x-4">
          {/* Campo de búsqueda */}
          <GoogleAutocompleteInput className="mb-3" onPlaceChange={handlePlaceChange} />
          {/* Campo de ubicación */}
          <input
            type="text"
            className="w-1/4 px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ubicación"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {/* Campo de fechas */}
          <input
            type="text"
            className="w-1/4 px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Fechas"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
          />
          {/* Botón de búsqueda */}
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold focus:outline-none hover:bg-blue-600 transition duration-200"
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;


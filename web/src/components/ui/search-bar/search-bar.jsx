import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRangePicker } from "rsuite";
import dayjs from "../../../lib/dayjs";


const SearchBar = () => {
  //const [searchTerm, setSearchTerm] = useState('');
  const [country, setCountry] = useState('');
  const [dates, setDates] = useState('');
  const navigate = useNavigate();
  

  const handleDateChange = (selectedDates) => {
    setDates(selectedDates);
  };

  const handleSearch = () => {
    const checkIn = dayjs(dates[0]).format('YYYY-MM-DD');
    const checkOut = dayjs(dates[1]).format('YYYY-MM-DD');
    navigate(`/search?checkIn=${checkIn}&checkOut=${checkOut}&country=${country.toLocaleLowerCase()}`);

  };

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-4xl p-2  shadow-lg rounded-lg">
        <div className="flex space-x-4">
          {/* Campo de ubicación */}
          <input
            type="text"
            className="w-1/4 px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ubicación"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          {/* Campo de fechas */}
          <DateRangePicker
            value={dates}
            onChange={handleDateChange}
            format="yyyy-MM-dd"
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


import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DateRangePicker } from "rsuite";
import dayjs from "../../../lib/dayjs";
import { IconSearch, IconMapPin } from "@tabler/icons-react";

const SearchBar = () => {
  const [country, setCountry] = useState("");
  const [dates, setDates] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleDateChange = (selectedDates) => {
    setDates(selectedDates);
  };

  const handleSearch = () => {
    if (dates && dates[0] && dates[1]) {
      const checkIn = dayjs(dates[0]).format("YYYY-MM-DD");
      const checkOut = dayjs(dates[1]).format("YYYY-MM-DD");
      navigate(
        `/search?checkIn=${checkIn}&checkOut=${checkOut}&country=${country.toLocaleLowerCase()}`
      );
    }
  };

  const shouldDisableDate = (date) => {
    const tomorrow = dayjs().add(1, "day").startOf("day").toDate();
    return date < tomorrow; 
  };

  // Clean input if we change route
  useEffect(() => {
    setCountry("");
    setDates(null);
  }, [location.pathname]); 

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-wrap sm:flex-nowrap items-center bg-[var(--white)] border border-[var(--light-gray)] rounded-full shadow-sm px-3 py-1 w-full max-w-full lg:max-w-3xl">
        {/* Country */}
        <IconMapPin className="text-[var(--dark-gray)]" size={20} />
        <input
          type="text"
          className="flex-grow bg-transparent focus:outline-none min-w-0"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <div className="w-px bg-[var(--light-gray)] h-6 mx-2" />

        {/* Date */}
        <div className="flex-grow min-w-0">
          <DateRangePicker
            value={dates}
            onChange={handleDateChange}
            format="yyyy-MM-dd"
            placeholder="Dates"
            className="w-full"
            style={{ border: "none", width: "100%" }}
            shouldDisableDate={shouldDisableDate} 
          />
        </div>
        <button
          className="flex items-center bg-[var(--purple)] hover:bg-[var(--purple)] text-[var(--white)] rounded-full px-4 py-2 font-semibold focus:outline-none transition duration-200 mt-2 sm:mt-0 sm:ml-4 cursor-pointer"
          onClick={handleSearch}
        >
          <IconSearch size={18} className="mr-1" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

import { useState } from "react";
import { DateRangePicker } from "rsuite";

function BookingItem({ checkIn, checkOut, onDates }) {
  const [dates, setDates] = useState([new Date(checkIn), new Date(checkOut)]);

  const handleDateChange = (selectedDates) => {
    setDates(selectedDates);
    onDates(selectedDates); 
  };

  return (
    <div className="mt-4 lg:row-span-3 lg:mt-0">
      <h2 className="sr-only">Product information</h2>

      <form className="mt-10">
        {/* Dates */}
        <div>
          <h3 className="text-sm font-medium text-gray-900">Date</h3>
          <DateRangePicker
            value={dates}
            onChange={handleDateChange}
            format="yyyy-MM-dd"
          />
        </div>

        {/* Sizes */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <a
              href="#"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Size guide
            </a>
          </div>
        </div>

        <button
          type="submit"
          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
        >
          Add to bag
        </button>
      </form>
    </div>
  );
}

export default BookingItem;

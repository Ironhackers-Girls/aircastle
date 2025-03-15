import { useState } from "react";
import { DateRangePicker } from "rsuite";
import { useAuthContext } from "../../../contexts/auth-context";
import * as AirCastleAPI from "../../../services/aircastle-service";
import { useNavigate } from "react-router-dom";

function BookingItem({
  checkIn,
  checkOut,
  onDates,
  availability,
  totalPrice,
  castle,
}) {
  const [dates, setDates] = useState([new Date(checkIn), new Date(checkOut)]);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleDateChange = (selectedDates) => {
    setDates(selectedDates);
    onDates(selectedDates);
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }
    if (user && user.role === "host") {
      console.info("Denied");
      return;
    }
    if (user && user.role === "guest") {
      const booking = {
        castle,
        checkIn: dates[0].toISOString(),
        checkOut: dates[1].toISOString(),
        totalPrice
      };

      try {
        await AirCastleAPI.createBooking(booking);
        console.info("Booking successful!");
        navigate("/bookings");
      } catch (error) {
        console.error("Booking failed:", error);
      }
    }
  };

  return (
    <div className="mt-4 lg:row-span-3 lg:mt-0">
      <h2 className="sr-only">Product information</h2>

      <form className="mt-10" onSubmit={handleBooking}>
        {/* Dates */}
        <div>
          <h3 className="text-sm font-medium text-gray-900">Date</h3>
          <DateRangePicker
            value={dates}
            onChange={handleDateChange}
            format="yyyy-MM-dd"
          />
        </div>

        <button
          type="submit"
          className={`mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden
            }`}
          disabled={availability}
        >
          {availability ? "Not available" : "Book Castle"}
        </button>
      </form>
    </div>
  );
}

export default BookingItem;
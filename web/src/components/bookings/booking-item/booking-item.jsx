import { useState } from "react";
import { DateRangePicker } from "rsuite";
import { useAuthContext } from "../../../contexts/auth-context";
import * as AirCastleAPI from "../../../services/aircastle-service";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import dayjs from "../../../lib/dayjs";
import bookingAnimation from "../../../assets/booking-done-animation";

function BookingItem({ checkIn, checkOut, onDates, castle }) {
  const [dates, setDates] = useState([
    dayjs(checkIn).toDate(),
    dayjs(checkOut).toDate(),
  ]);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isHostPopupVisible, setIsHostPopupVisible] = useState(false);

  const handleDateChange = (selectedDates) => {
    setDates(selectedDates);
    onDates(selectedDates);
  };

  const nights = dayjs(dates[1]).diff(dayjs(dates[0]), "day");
  const basePrice = nights * (castle?.pricePerNight || 0);
  const cleaningFee = 102;
  const totalPriceCalculated = basePrice + cleaningFee;

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role === "host") {
      setIsHostPopupVisible(true);
      return;
    }

    const booking = {
      castle,
      checkIn: dayjs(dates[0]).toISOString(),
      checkOut: dayjs(dates[1]).toISOString(),
      totalPrice: totalPriceCalculated,
    };

    try {
      await AirCastleAPI.createBooking(booking);
      setIsPopupVisible(true);
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setIsHostPopupVisible(false);
  };

  const lottieOptions = {
    loop: false,
    autoplay: true,
    animationData: bookingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const shouldDisableDate = (date) => {
    const tomorrow = dayjs().add(1, "day").startOf("day").toDate();
    return date < tomorrow;
  };

  return (
    <div>
      <div className="border border-[var(--light-gray)] rounded-lg p-4 shadow-lg w-full max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-900">
            €{castle?.pricePerNight ?? 0}{" "}
            <span className="text-sm font-normal">/ night</span>
          </div>
          <div className="text-sm text-gray-600">
            Check-in: {dayjs(dates[0]).format("DD/MM/YYYY")} <br />
            Check-out: {dayjs(dates[1]).format("DD/MM/YYYY")}
          </div>
        </div>

        <form className="mt-6" onSubmit={handleBooking}>
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">Date</h3>
            <DateRangePicker showOneCalendar
              value={dates}
              onChange={handleDateChange}
              format="yyyy-MM-dd"
              className="w-full"
              shouldDisableDate={shouldDisableDate}
              cleanable={false}
              placeholder="Select Dates"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full flex items-center justify-center rounded-md border border-transparent bg-[var(--purple)] px-8 py-3 text-base font-medium text-white hover:brightness-90 focus:ring-2 focus:ring-[var(--purple)] focus:ring-offset-2 focus:outline-none cursor-pointer"
          >
            Book Castle
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-2">
          You will not be charged yet
        </p>

        <div className="mt-4 border-t pt-4 space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>
              €{castle?.pricePerNight ?? 0} x {nights} nights
            </span>
            <span>€{basePrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Cleaning fee</span>
            <span>€{cleaningFee}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between font-semibold text-gray-900">
          <span>Total</span>
          <span>€{totalPriceCalculated}</span>
        </div>

        <div className="mt-2 text-xs text-gray-500 underline cursor-pointer">
          Report this listing
        </div>
      </div>

      {/* Popup for Guest */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-gray-300/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-3/4 md:w-1/3 text-center relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-[var(--dark-gray)] hover:text-[var(--black)] cursor-pointer"
            >
              ✖
            </button>
            <h3 className="text-xl font-semibold mb-4">Booking Done!</h3>
            <Lottie
              options={lottieOptions}
              height={200}
              width={200}
              className="mx-auto mb-4"
              style={{ cursor: "default" }}
            />
            <button
              onClick={() => navigate("/bookings")}
              className="mt-4 px-6 py-3 bg-[var(--purple)] text-white font-semibold rounded-full hover:brightness-90 transition-all cursor-pointer"
            >
              Go to Bookings
            </button>
          </div>
        </div>
      )}

      {/* Popup for Host */}
      {isHostPopupVisible && (
        <div className="fixed inset-0 bg-gray-300/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-3/4 md:w-1/3 text-center relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-[var(--dark-gray)] hover:text-[var(--black)] cursor-pointer"
            >
              ✖
            </button>
            <h3 className="text-xl font-semibold mb-4 text-red-500">
              You must be a guest to book!
            </h3>
            <button
              onClick={closePopup}
              className="mt-4 px-6 py-3 bg-[var(--purple)] text-white font-semibold rounded-full hover:brightness-90 transition-all cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingItem;

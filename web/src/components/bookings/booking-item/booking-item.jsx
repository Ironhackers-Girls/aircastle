// import PrivateRoute from "../../../guards/private-route";
// import * as AirCastleAPI from "../services/aircastle-service";
// import { useAuthContext } from "../../../contexts/auth-context";
// import { useForm } from "react-hook-forms"
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BookingItem({ checkIn, checkOut, pricePerNight, onDates }) {

    const [startDate, setStartDate] = useState(checkIn);
    const [endDate, setEndDate] = useState(checkOut);

    useEffect(() => {
        const dates = {
            startDate,
            endDate
        }

        onDates(dates);
    }, [startDate, endDate, onDates]);

    return (
        <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{pricePerNight}</p>

            <form className="mt-10">
                {/* Dates*/}
                <div>
                    <h3 className="text-sm font-medium text-gray-900">Date</h3>

                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />


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

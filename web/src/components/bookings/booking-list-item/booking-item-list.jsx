import dayjs from "dayjs";
import { Link } from "react-router-dom";

function BookingListItem({ booking }) {

    const { castle, checkIn, checkOut, totalPrice, id } = booking;

    const formattedCheckIn = dayjs(checkIn).format("DD/MM/YYYY");
    const formattedCheckOut = dayjs(checkOut).format("DD/MM/YYYY");

    return (
        <Link to={`/bookings/${id}`}>
            <div className="flex flex-col justify-center">  
                <div
                    className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-full mx-auto border hover:border-[var(--purple)] border-gray-200 bg-white w-full">
                    <div className="flex-shrink-0">
                         {/* <img className="w-[270px] h-[257px] rounded-lg object-cover" src={castle?.images?[0]} alt={castle?.title?} />  */}
                    </div>
                    <div className="w-full md:w-2/3 bg-white flex flex-col gap-2 space-y-2 p-3">
                        <div className="flex justify-between items-center">
                            <p className="font-montserrat font-semibold text-[var(--purple)] hidden md:block">Booking Confirmed</p>
                            <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium font-montserrat capitalize text-gray-800 hidden md:block">
                                {castle?.address?.country}
                            </div>
                        </div>
                        <h3 className="font-black font-montserrat text-gray-800 md:text-3xl text-xl">{castle?.title}</h3>
                        <p className="md:text-lg font-montserrat text-gray-500 text-base">
                            {formattedCheckIn} - {formattedCheckOut}
                        </p>
                        <p className="text-xl font-black text-gray-800 font-montserrat">
                            {totalPrice}
                            <span className="font-normal text-gray-600 text-base">/night</span>
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default BookingListItem;

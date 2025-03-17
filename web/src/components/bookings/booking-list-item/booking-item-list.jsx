import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/auth-context";


function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("es-ES");
}

function BookingListItem({ booking }) {
    const { user } = useAuthContext();

    const { castle, checkIn, checkOut, totalPrice, id } = booking;

    console.log(checkIn, checkOut);

    const formattedCheckIn = formatDate(checkIn);
    const formattedCheckOut = formatDate(checkOut);

    // Compara la fecha de checkout con la fecha actual
    const isBookingCompleted = dayjs().isAfter(dayjs(checkOut));

    // Verifica si hay una reseña
    const hasReview = booking.review != null;

    // Determina el texto que debe mostrarse
    let statusText = "";
    let statusColor = "";

    if (!isBookingCompleted) {
        statusText = "Booking Confirmed";
        statusColor = "text-[var(--purple)]";
    } else if (!hasReview) {
        statusText = "Make a review";
        statusColor = "text-amber-600";
    } else {
        statusText = "Old Booking";
        statusColor = "text-gray-600";
    }

    return (
        <>
            {user.role === "guest" && (
                <Link to={`/bookings/${id}`}>
                    <div className="flex flex-col justify-center">
                        <div
                            className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-full mx-auto border hover:border-[var(--purple)] border-gray-200 bg-white w-full">
                            <div className="flex-shrink-0">
                                <img className="w-[270px] h-[257px] rounded-lg object-cover" src={castle?.images[0]} alt={castle?.title} />
                            </div>
                            <div className="w-full md:w-2/3 bg-white flex  flex-col gap-2 space-y-2 p-3">
                                <div className="flex justify-between items-center">
                                    <p className={`font-montserrat font-semibold ${statusColor} hidden md:block`}>
                                        {statusText}
                                    </p>
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
            )
            }
            {user.role === "host" && (
                <div className="flex flex-col justify-center">
                    <div
                        className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-full mx-auto border hover:border-[var(--purple)] border-gray-200 bg-white w-full">
                            <div className="flex flex-col gap-4 justify-center w-[180px] md:justify-start items-center space-x-4 py-4">
                                <img
                                    src={booking.user?.avatar}
                                    alt="avatar"
                                    className="rounded-full w-[80px]"
                                />
                                <div className="flex justify-start items-start flex-col space-y-2">
                                    <p className="text-base font-semibold leading-4 text-left text-gray-800">
                                        {booking.user?.name || "Host Name Unavailable"}
                                    </p>
                                </div>
                            </div>
                        <div className="w-full md:w-2/3 bg-white flex  flex-col gap-1 space-y-2 p-3">
                            <div className="flex justify-between items-center">
                                <p className={`font-montserrat font-semibold ${statusColor} hidden md:block`}>
                                    {statusText}
                                </p>
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
            )
            }
        </>

    );
}

export default BookingListItem;

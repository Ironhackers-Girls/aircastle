import { useParams } from "react-router-dom";
import * as AirCastleAPI from "../services/aircastle-service";
import { useEffect, useState } from "react";
import dayjs from "../lib/dayjs";

function BookingDetailPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [review, setReview] = useState({
        title: "",
        rating: 0,
        text: ""
    });

    useEffect(() => {
        AirCastleAPI.getBooking(id)
            .then((bookingData) => {
                setBooking(bookingData);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [id]);

    // Calcular si la fecha de checkOut ha pasado
    const hasPassedCheckOut = booking ? dayjs().isAfter(dayjs(booking.checkOut)) : false;

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        
        const { title, rating, text } = review;
        
        AirCastleAPI.createReview(id, { title, rating, text })
            .then((response) => {
                console.log("Reseña creada:", response);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview((prevReview) => ({
            ...prevReview,
            [name]: value
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!booking) {
        return <div>No booking found</div>;
    }

    return (
        <div className="py-10 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col">
                <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                    Booking #{id}
                </h1>
                <p className="text-base font-medium leading-6 text-gray-600">
                    {formatDate(booking.createdAt)}
                </p>
            </div>

            {/* Booking Details */}
            <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                            Booking Details
                        </p>
                        <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                            <div className="pb-4 md:pb-8 w-full md:w-40">
                                <img
                                    className="w-full hidden md:block"
                                    src={booking.castle?.images?.[0] || "/fallback-image.jpg"} // Fallback for missing image
                                    alt="castle"
                                />
                            </div>
                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                                        {booking.castle?.title || "Castle Title Unavailable"}
                                    </h3>
                                    <div className="flex justify-start items-start flex-col space-y-2">
                                        <p className="text-sm leading-none text-gray-800">
                                            <span className="text-gray-300">Check In: </span> {formatDate(booking.checkIn)}
                                        </p>
                                        <p className="text-sm leading-none text-gray-800">
                                            <span className="text-gray-300">CheckOut: </span> {formatDate(booking.checkOut)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div className="flex justify-between w-full">
                                    <p className="text-base leading-4 text-gray-800">Subtotal</p>
                                    <p className="text-base leading-4 text-gray-600">{booking.totalPrice}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                                <p className="text-base font-semibold leading-4 text-gray-600">{booking.totalPrice}</p>
                            </div>
                        </div>

                        {/* GPS Section */}
                        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800">GPS</h3>
                            <div className="w-full flex justify-center items-center">
                                <a
                                    href={`https://www.google.com/maps?q=${booking.castle.address.location.lat},${booking.castle.address.location.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white flex items-center justify-center"
                                >
                                    View in Google Maps
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Add Review Form */}
                    {hasPassedCheckOut && !booking.review && (
                        <div className="bg-gray-50 w-full p-5">
                            <div className="mt-10 flex flex-col space-y-4">
                                <h3 className="text-xl font-semibold leading-5 text-gray-800">Add Your Review</h3>
                                <form onSubmit={handleReviewSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={review.title}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
                                        <input
                                            type="number"
                                            id="rating"
                                            name="rating"
                                            value={review.rating}
                                            onChange={handleInputChange}
                                            min="1"
                                            max="5"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="text" className="block text-sm font-medium text-gray-700">text</label>
                                        <textarea
                                            id="text"
                                            name="text"
                                            value={review.text}
                                            onChange={handleInputChange}
                                            rows="4"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none"
                                    >
                                        Submit Review
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

                {/* Host Information */}
                <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                    <h3 className="text-xl font-semibold leading-5 text-gray-800">Your Host</h3>
                    <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                        <div className="flex flex-col justify-start items-start flex-shrink-0">
                            <div className="flex justify-center w-[80px] md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                <img
                                    src={booking.user?.avatar || "/fallback-avatar.jpg"}  // Fallback for missing avatar
                                    alt="avatar"
                                    className="rounded-full"
                                />
                                <div className="flex justify-start items-start flex-col space-y-2">
                                    <p className="text-base font-semibold leading-4 text-left text-gray-800">
                                        {booking.user?.name || "Host Name Unavailable"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-center md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="cursor-pointer text-sm leading-5 text-gray-800">
                                    {booking.user?.phone || "Phone Unavailable"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingDetailPage;

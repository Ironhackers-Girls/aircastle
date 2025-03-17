import { useEffect, useState } from "react";
import * as AirCastleApi from "../../../services/aircastle-service"
import BookingListItem from "../booking-list-item/booking-item-list";
import animationData from '../../../assets/castle-animation.json';
import Lottie from 'react-lottie';


function BookingList() {
    const [bookingsList, setBookingsList] = useState([]);


    useEffect(() => {
        AirCastleApi.listBookings()
            .then((bookings) => setBookingsList(bookings))
            .catch((error) => console.log(error))
    }, [])

     const defaultOptions = {
            loop: true, 
            autoplay: true, 
            animationData: animationData, 
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bookingsList.length === 0 ? (
                <div className="col-span-1 sm:col-span-2 text-center h-screen text-gray-500">
                    <Lottie options={defaultOptions} height={200} width={200} />
                    No bookings available.
                </div>
            ) : (
                bookingsList.map((booking) => (
                    <BookingListItem key={booking.id} booking={booking} />
                ))
            )}
        </div>
    )
}

export default BookingList;
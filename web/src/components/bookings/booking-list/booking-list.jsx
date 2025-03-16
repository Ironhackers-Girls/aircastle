import { useEffect, useState } from "react";
import * as AirCastleApi from "../../../services/aircastle-service"
import BookingListItem from "../booking-list-item/booking-item-list";

function BookingList () {
    const [ bookingsList, setBookingsList ] = useState([]);

    useEffect(() => {
        AirCastleApi.listBookings()
            .then((bookings) => setBookingsList(bookings))
            .catch((error) => console.log(error))
    }, [])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bookingsList.length === 0 ? (
                <div className="col-span-1 sm:col-span-2 text-center text-gray-500">
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
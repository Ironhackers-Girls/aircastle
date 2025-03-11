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
        <div className="gap-4">
           {bookingsList.map((booking) => (
            <BookingListItem key={booking.id} booking={booking}/>
            ))} 
        </div>
    )
}

export default BookingList;
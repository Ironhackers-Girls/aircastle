import BookingList from "../components/bookings/booking-list/booking-list";

function BookingsPage () {
    return (
        <div className="flex flex-col min-w-0 gap-2 p-4">
            <h1 className="text-2xl/7 font-bold font-poppins text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            My bookings
            </h1>
            <BookingList />
        </div>
    )
}

export default BookingsPage;
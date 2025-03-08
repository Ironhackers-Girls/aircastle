import { useEffect, useState } from "react";
import * as AirCastleAPI from "../services/aircastle-service";
import BookingItem from "../components/bookings/booking-item/booking-item";
import { useNavigate, useParams } from "react-router-dom";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function CastleDetail() {
  const { id, checkIn, checkOut } = useParams();
  const [castle, setCastle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AirCastleAPI.getCastle(id, checkIn, checkOut) 
      .then((castle) => setCastle(castle))
      .catch((error) => console.log(error));
  }, [id, checkIn, checkOut]);  

  const handleDates = (dates) => {
    const checkIn = formatDate(dates[0]); 
    const checkOut = formatDate(dates[1]);

    navigate({
      pathname: `/castles/${id}`,  
      search: `?checkIn=${checkIn}&checkOut=${checkOut}`,  
    });
  };

  if (!castle) {
    return (
      <div className="animate-pulse pt-5">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="h-screen bg-gray-200 rounded-lg"></div>
          <div className="h-screen bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="pt-6">

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-2 lg:px-2">
          <img
            src={castle.images[0].url}
            className="hidden size-full rounded-lg object-cover lg:block"
          />
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-2">
            <img
              src={castle.images[1].url}
              className="aspect-3/2 w-full rounded-lg object-cover"
            />
            <img
              src={castle.images[2].url}
              className="aspect-3/2 w-full rounded-lg object-cover"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-2">
            <img
              src={castle.images[3].url}
              className="aspect-3/2 w-full rounded-lg object-cover"
            />
            <img
              src={castle.images[4].url}
              className="aspect-3/2 w-full rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{castle.title}</h1>
          </div>

          <div>
            <BookingItem 
              totalPrice={castle.pricePerNight} 
              checkIn={castle.checkIn} 
              checkOut={castle.checkOut}  
              onDates={handleDates}
              availability={castle.availability}
              castle={castle._id} />
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{castle.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CastleDetail;

import { useEffect, useState } from "react";
import * as AirCastleAPI from "../services/aircastle-service";
import BookingItem from "../components/bookings/booking-item/booking-item";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "../lib/dayjs";
import {
  IconMapPin,
  IconBed,
  IconBath,
  IconUsers,
  IconCheck,
  IconWifi,
  IconThermometer,
  IconCoffee,
  IconDog,
  IconMicrowave,
  IconFridge,
  IconGrillFork,
  IconCooker,
  IconAsterisk,
  IconDeviceCctv,
  IconWashDry,
  IconSunset2,
  IconFlame,
  IconAirConditioning,
  IconMeat,
  IconCarGarage,
  IconBarbell,
  IconPool,
  IconFlower,
  IconMusic,
} from "@tabler/icons-react";

const amenityIcons = {
  Wifi: IconWifi,
  Heating: IconThermometer,
  Breakfast: IconCoffee,
  Towels: IconBath,
  Sheets: IconBed,
  Microwave: IconMicrowave,
  Fridge: IconFridge,
  "Cooking Utensils": IconGrillFork,
  Oven: IconCooker,
  Dishwasher: IconAsterisk,
  TV: IconDeviceCctv,
  Washingmachine: IconWashDry,
  "Patio or balcony": IconSunset2,
  "Indoor fireplace": IconFlame,
  "Air Conditioner": IconAirConditioning,
  Barbecue: IconMeat,
  "Free Parking": IconCarGarage,
  Gym: IconBarbell,
  Pool: IconPool,
  Garden: IconFlower,
  "Pet-Friendly": IconDog,
  Piano: IconMusic,
};

function AmenityItem({ amenity }) {
  const IconComponent = amenityIcons[amenity] || IconCheck;
  return (
    <div className="flex items-center space-x-2">
      <IconComponent className="h-5 w-5 text-[var(--black)]" />
      <span className="text-sm text-[var(--black)]">{amenity}</span>
    </div>
  );
}

function ServiceItem({ service }) {
  return (
    <div className="flex items-center space-x-2">
      <IconCheck className="h-5 w-5 text-[var(--black)]" />
      <span className="text-sm text-[var(--black)]">{service}</span>
    </div>
  );
}

function CastleDetail() {
  const { id } = useParams();
  const [castle, setCastle] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  
  useEffect(() => {
    AirCastleAPI.getCastle(id, checkIn, checkOut)
      .then((castle) => {setCastle(castle)})
      .catch((error) => console.log(error));
  }, [id, checkIn, checkOut]);

  const handleDates = (dates) => {
    const newCheckIn = dayjs(dates[0]).format("YYYY/MM/DD");
    const newCheckOut = dayjs(dates[1]).format("YYYY/MM/DD");

    navigate({
      pathname: `/castles/${id}`,
      search: `?checkIn=${newCheckIn}&checkOut=${newCheckOut}`,
    });
  };

  if (!castle) {
    return (
      <div className="animate-pulse pt-5">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="h-screen bg-[var(--soft-gray)] rounded-lg"></div>
          <div className="h-screen bg-[var(--soft-gray)] rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-[var(--white)]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Images */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 hidden lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-2 lg:px-2">
          <img
            src={castle.images[0]}
            className="hidden size-full rounded-lg object-cover lg:block"
            alt="Main"
          />
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-2">
            <img
              src={castle.images[1]}
              className="aspect-3/2 w-full rounded-lg object-cover"
              alt="Gallery 1"
            />
            <img
              src={castle.images[2]}
              className="aspect-3/2 w-full rounded-lg object-cover"
              alt="Gallery 2"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-2">
            <img
              src={castle.images[3]}
              className="aspect-3/2 w-full rounded-lg object-cover"
              alt="Gallery 3"
            />
            <img
              src={castle.images[4]}
              className="aspect-3/2 w-full rounded-lg object-cover"
              alt="Gallery 4"
            />
          </div>
        </div>
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:hidden">
          <img
            src={castle.images[0]}
            className="w-full rounded-lg object-cover"
            alt="Main"
          />
          <div className="grid grid-cols-2 gap-2 mt-2">
            {castle.images.slice(1, 5).map((img, index) => (
              <img
                key={index}
                src={img}
                className="w-full rounded-lg object-cover"
                alt={`Gallery ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {/* Left */}
          <div className="lg:col-span-2 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--black)] sm:text-3xl">
              {castle.title}
            </h1>
            {castle.address && (
              <div className="mt-2 flex items-center space-x-2 text-sm text-[var(--black)]">
                <IconMapPin className="h-5 w-5 text-[var(--black)]" />
                <span>
                  {castle.address.city.toUpperCase()},{" "}
                  {castle.address.country.toUpperCase()}
                </span>
              </div>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-[var(--black)]">
              <div className="flex items-center space-x-1">
                <IconUsers className="h-5 w-5 text-[var(--black)]" />
                <p>{castle.capacity} guests</p>
              </div>
              <div className="flex items-center space-x-1">
                <IconBed className="h-5 w-5 text-[var(--black)]" />
                <p>{castle.rooms} rooms</p>
              </div>
              <div className="flex items-center space-x-1">
                <IconBath className="h-5 w-5 text-[var(--black)]" />
                <p>{castle.bathrooms} bathrooms</p>
              </div>
            </div>
            <div className="mx-auto mt-8">
              {/* About */}
              <h2 className="text-2xl font-bold text-[var(--black)] mb-3">
                About this Castle
              </h2>
              <p className="text-base text-[var(--black)]">
                {castle.description}
              </p>
              {/* Divider */}
              <hr className="my-6 border-[var(--light-gray)]" />
              {/* Amenities & Services */}
              <div>
                <h3 className="text-2xl font-bold text-[var(--black)]">
                  Amenities
                </h3>
                {castle.amenities && castle.amenities.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                    {castle.amenities.map((amenity, idx) => (
                      <AmenityItem key={idx} amenity={amenity} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[var(--black)]">
                    No amenities listed.
                  </p>
                )}
                <h3 className="text-2xl font-bold text-[var(--black)] mt-6">
                  Services
                </h3>
                {castle.services && castle.services.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                    {castle.services.map((service, idx) => (
                      <ServiceItem key={idx} service={service} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[var(--black)]">
                    No services listed.
                  </p>
                )}
              </div>
              {/* Divider */}
              <hr className="my-8 border-[var(--light-gray)]" />
              {/* Host */}
              {castle.user && (
                <>
                  <h3 className="text-2xl font-bold text-[var(--black)] mb-3">
                    Meet Your Host
                  </h3>
                  <div className="mt-6 border border-[var(--light-gray)] p-6 rounded-lg shadow-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={castle.user.avatar}
                        alt={castle.user.username}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-lg font-semibold text-[var(--black)]">
                          {castle.user.name}
                        </p>
                        <Link
                          to={`/profile/${castle.user.username}`}
                          className="text-[var(--purple)] text-base hover:underline"
                        >
                          View host profile
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Booking Item */}
          <div className="mt-6 lg:mt-0 lg:col-span-1">
            <BookingItem
              totalPrice={castle.pricePerNight}
              checkIn={castle.checkIn}
              checkOut={castle.checkOut}
              onDates={handleDates}
              availability={castle.available}
              castle={castle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CastleDetail;

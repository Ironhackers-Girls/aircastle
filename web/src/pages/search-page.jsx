import { useEffect, useState } from "react";
import * as AirCastleAPI from "../services/aircastle-service";
import { useLocation } from "react-router-dom";
import CastleItem from "../components/castles/castle-item/castle-item";
import dayjs from "../lib/dayjs";
import Lottie from "react-lottie";
import animationEmpty from "../assets/empty-castles-animation.json";

function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const checkIn = queryParams.get("checkIn");
  const checkOut = queryParams.get("checkOut");
  const [search, setSearch] = useState([]);
  const country = queryParams.get("country");

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationEmpty,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const checkInS = dayjs(checkIn).format('YYYY-MM-DD');
    const checkOutS = dayjs(checkOut).format('YYYY-MM-DD');

    AirCastleAPI.searchCastle({ checkIn: checkInS, checkOut: checkOutS, country })
      .then((search) => setSearch(search))
      .catch((error) => console.log(error));
  }, [country, checkIn, checkOut]);

  return (
    <div>
      {search.length > 0 ? (
        search.map((castle) => (
          <CastleItem key={castle.id} castle={castle} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <Lottie options={lottieOptions} height={300} width={300} />
          <p className="text-[var(--dark-gray)] text-center mt-4">
            No castles available right now.
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchPage;

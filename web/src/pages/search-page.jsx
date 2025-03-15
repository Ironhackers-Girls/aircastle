import { useEffect, useState } from "react";
import * as AirCastleAPI from "../services/aircastle-service";
import { useLocation } from "react-router-dom";
import CastleItem from "../components/castles/castle-item/castle-item";
import dayjs from "../lib/dayjs";

function SearchPage() {
    const location = useLocation();
    //const [searchParams, setSearchParams] = useSearchParams();
    const queryParams = new URLSearchParams(location.search);
    const checkIn = queryParams.get("checkIn");
    const checkOut = queryParams.get("checkOut");
    const [search, setSearch] = useState([]);
    const country = queryParams.get("country");


    useEffect(() => {
        const checkInS = dayjs(checkIn).format('YYYY-MM-DD');
        const checkOutS = dayjs(checkOut).format('YYYY-MM-DD');

        AirCastleAPI.searchCastle(({ checkInS, checkOutS, country }))
            .then((search) => setSearch(search))
            .catch((error) => console.log(error))
    }, [country, checkIn, checkOut])

    return (
        <div>
            {search.length > 0 ? (
                search.map((castle) => (
                    <CastleItem key={castle.id} castle={castle} />
                ))
            ) : (
                <p>No se encontraron castillos para los criterios seleccionados.</p>
            )}
        </div>
    )
}

export default SearchPage;
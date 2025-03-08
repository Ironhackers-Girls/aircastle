import { useEffect, useState } from "react";
import * as AirCastleApi from "../../../services/aircastle-service"
import CastleItem from "../castle-item/castle-item";

function CastleList ({ city, lat, lng }) {

    const [castles, setCastles] = useState([])

    useEffect(() => {
        AirCastleApi.listCastles({city, lat, lng})
        .then((castles) => setCastles(castles))
        .catch((error) => console.error(error))
    }, [city, lat, lng])

    return (
        <div>
           {castles.map((castle) => (
            <CastleItem key={castle.id} castle={castle}/>
            ))} 
        </div>
  );
    
}

export default CastleList
import { useEffect, useState } from "react";
import * as AirCastleApi from "../../../services/aircastle-service"
import CastleItem from "../castle-item/castle-item";

function CastleList ({ city }) {

    const [castles, setCastles] = useState([])

    useEffect(() => {
        AirCastleApi.listCastles({city})
        .then((castles) => setCastles(castles))
        .catch((error) => console.error(error))
    }, [city])

    return (
        <div>
           {castles.map((castle) => (
            <CastleItem key={castle.id} castle={castle}/>
            ))} 
        </div>
  );
    
}

export default CastleList
import { useEffect, useState } from "react";
import * as AirCastleApi from "../../../services/aircastle-service";
import CastlePageItem from "../castle-page-item/castle-page-item";
import { useAuthContext } from "../../../contexts/auth-context";

function CastlePageList() {
  const [castles, setCastles] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    AirCastleApi.listCastles(user.id)
      .then((castles) => {
        setCastles(castles);
      })
      .catch((error) => console.error(error));
  }, [user]);

  const handleDelete = (id) => {
    AirCastleApi.deleteCastle(id)
      .then(() => {
        setCastles((prevCastles) =>
          prevCastles.filter((castle) => castle.id !== id)
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {castles.map((castle) => (
        <CastlePageItem
          key={castle.id}  
          castle={castle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default CastlePageList;

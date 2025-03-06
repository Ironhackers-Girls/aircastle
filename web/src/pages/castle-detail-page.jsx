import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as AirCastleAPI from "../services/aircastle-service";

function CastleDetail() {
  const { id } = useParams();
  const [castle, setCastle] = useState();

  useEffect(() => {
    AirCastleAPI.getCastle(id)
      .then((castle) => setCastle(castle))
      .catch((error) => console.log(error));
  }, [id]);

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
    <div className="max-w-5xl mx-auto">
      <div className="pl-5 pr-5">
        <div className="flex flex-col space-y-4">
          <div>
            <div className="text-center">
              <h1 className="text-2xl font-semibold">{castle.title}</h1>
            </div>
          </div>
          <div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {castle.images?.map((image, index) => (
                  <div key={index}>
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src={image.url}
                      alt={`Image ${index}`}
                    />
                  </div>
                ))}
              </div>            
          </div>
        </div>
      </div>
    </div>
  );
}

export default CastleDetail;

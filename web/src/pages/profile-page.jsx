import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as AirCastleAPI from "../services/aircastle-service";
import CastleItem from "../components/castles/castle-item/castle-item";

function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [host, setHost] = useState(null);
  const [castles, setCastles] = useState([]); 
  
  useEffect(() => {
    const userHost = async () => {
      const data = await AirCastleAPI.profile(username);
      if (data && data.role === "host") {
        setHost(data);
        const castlesData = await AirCastleAPI.listCastles(data.id); 
        setCastles(castlesData);
      } else {
        navigate("/not-found"); 
      }
    };

    userHost();
  }, [username, navigate]);

  if (host === null) return null;
  

  return (
    <div className="max-w-4xl mx-auto mt-5">
      <h2 className="text-2xl font-semibold mb-4">{host.name} Profile</h2>

      <div className="bg-white shadow-md rounded-lg p-6">
        {host.avatar ? (
          <div className="flex justify-center mb-5">
            <img
              src={host.avatar}
              alt={host.username}
              className="w-32 h-32 rounded-full border border-gray-300 shadow-md"
            />
          </div>
        ) : (
          <p className="text-gray-500 text-center">No avatar</p>
        )}

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={host.username}
            className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
            disabled
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={host.name}
            className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
            disabled
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            value={host.phone}
            className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
            disabled
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <input
            type="text"
            value={host.role}
            className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
            disabled
          />
        </div>

        
        <div>
          <h3 className="text-xl font-semibold mt-6">Castles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {castles.length > 0 ? (
            castles.map(castle => <CastleItem key={castle.id} castle={castle} />)
          ) : (
            <p className="text-gray-500">No castles found.</p>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

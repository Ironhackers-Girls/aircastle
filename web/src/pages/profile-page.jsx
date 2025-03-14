import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as AirCastleAPI from "../services/aircastle-service";
import CastleItem from "../components/castles/castle-item/castle-item";
import {
  IconBriefcase,
  IconLanguage,
  IconFocus,
  IconStar,
  IconCheck,
} from "@tabler/icons-react";

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
    <div className="max-w-7xl mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          {/* Profile Info */}
          <div className="bg-[var(--white)] p-6 rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              {host.avatar ? (
                <img
                  src={host.avatar}
                  alt={host.username}
                  className="w-40 h-40 rounded-full border border-[var(--light-gray)] mb-4"
                />
              ) : (
                <p className="text-[var(--dark-gray)]">No avatar</p>
              )}
              <h2 className="text-2xl font-semibold">{host.name}</h2>
              <p className="text-[var(--dark-gray)]">{host.role}</p>
              <p className="text-[var(--light-gray)] mt-2">{host.phone}</p>
            </div>
          </div>

          {/* Confirmed Information */}
          <div className="bg-[var(--white)] p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Confirmed Information
            </h3>
            <ul className="text-sm text-[var(--black)] space-y-3">
              <li className="flex items-center gap-2">
                <IconCheck size={16} /> <span>Identity</span>
              </li>
              <li className="flex items-center gap-2">
                <IconCheck size={16} /> <span>Email address</span>
              </li>
              <li className="flex items-center gap-2">
                <IconCheck size={16} /> <span>Phone number</span>
              </li>
              <li className="flex items-center gap-2">
                <IconCheck size={16} /> <span>Work email</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          {/* About Box */}
          <div className="p-6">
            <h3 className="text-3xl font-semibold mb-10">About {host.name}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[var(--black)] mb-20">
              <div className="flex items-start gap-2 mb-5">
                <div className="w-8 flex-shrink-0">
                  <IconFocus size={25} />
                </div>
                <p className="leading-relaxed">
                  Curating exceptional stays in distinctive homes.
                </p>
              </div>
              <div className="flex items-start gap-2 mb-5">
                <div className="w-8 flex-shrink-0">
                  <IconLanguage size={25} />
                </div>
                <p className="leading-relaxed">Multilingual communication.</p>
              </div>
              <div className="flex items-start gap-2 mb-5">
                <div className="w-8 flex-shrink-0">
                  <IconBriefcase size={25} />
                </div>
                <p className="leading-relaxed">
                  Proven track record in hospitality management ensuring quality
                  service.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-8 flex-shrink-0">
                  <IconStar size={25} />
                </div>
                <p className="leading-relaxed">
                  Creating memorable experiences for every guest that make each
                  stay truly unique.
                </p>
              </div>
            </div>

            <p className="text-[var(--black)]">
              Welcome to this host profile. Our platform empowers dedicated hosts
              from all over to deliver outstanding hospitality to guests
              worldwide.
            </p>
          </div>

          {/* Castles */}
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-10">Castles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {castles.length > 0 ? (
                castles.map((castle) => (
                  <CastleItem key={castle.id} castle={castle} />
                ))
              ) : (
                <p className="text-[var(--dark-gray)]">No castles found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

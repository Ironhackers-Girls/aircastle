import { IconBed, IconBath } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

function CastlePageItem({ castle, onDelete }) {
  const formatDate = (date) => dayjs(date).format("DD/MM/YYYY");

  return (
    <div className="bg-[var(--white)] border border-[var(--light-gray)] rounded-2xl shadow-md overflow-hidden max-w-sm">
      <Link to={`/castles/${castle.id}`}>
        <img
          src={castle.images[0]?.url}
          alt={castle.title}
          className="w-full h-48 object-cover"
        />
      </Link>

      <div className="p-5">
        <Link to={`/castles/${castle.id}`}>
          <h5 className="text-2xl font-bold text-[var(--black)] mb-2">
            {castle.title}
          </h5>
        </Link>
        <p className="text-[var(--dark-gray)] mb-3">
          {castle.address?.city}, {castle.address?.country}
        </p>
        <div className="flex items-center gap-4 text-[var(--dark-gray)] mb-3">
          <span className="flex items-center gap-1">
            <IconBed size={20} /> {castle.rooms || 0} Bed
          </span>
          <span className="flex items-center gap-1">
            <IconBath size={20} /> {castle.bathrooms || 0} Bath
          </span>
        </div>
        <p className="text-[var(--black)] font-semibold text-lg mb-3">
          {castle.pricePerNight} € / night
        </p>

        <div className="text-[var(--dark-gray)] text-sm">
          <p>
            Created: {castle.createdAt ? formatDate(castle.createdAt) : "N/A"}
          </p>
          <p>
            Updated: {castle.updatedAt ? formatDate(castle.updatedAt) : "N/A"}
          </p>
        </div>

        <div className="flex space-x-2 mt-4">
          <Link
            to={`/castles/${castle.id}/update`}
            className="bg-[var(--purple)] text-[var(--white)] px-3 py-2 rounded-md text-sm"
          >
            Update
          </Link>
          <button
            onClick={() => onDelete(castle.id)}
            className="bg-red-500 text-[var(--white)] px-3 py-2 rounded-md text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CastlePageItem;

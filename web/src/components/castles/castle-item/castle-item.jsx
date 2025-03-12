import { Link } from "react-router-dom";

function CastleItem({ castle }) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Link to={`castles/${castle.id}`}>
        <img
          className="rounded-t-lg w-full h-48 object-cover"
          src={castle.images[0]?.url}
          alt={castle.title}
        />
      </Link>
      <div className="p-5">
        <Link to={`castles/${castle.id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {castle.title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Price per night; {castle.pricePerNight} €
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {castle.address?.city}, {castle.address?.country}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Host: {castle.user?.name}
        </p>
        <Link to={`castles/${castle.id}`}>
          View Details
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default CastleItem;

import { Link } from "react-router-dom";
import { IconArrowUpRight, IconStar } from "@tabler/icons-react"

function CastleItem({ castle }) {

  const ratings = castle.reviews?.map(review => review.rating) || [];
  const averageRating = ratings.length > 0
    ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1)
    : 0;

  return (
    <Link to={`/castles/${castle.id}`} className="relative w-[270px] group">
      {/* Imagen con el botón de la flecha que aparece en hover */}
      <div className="relative">
        <img
          className="w-[270px] h-[257px] rounded-lg object-cover"
          src={castle.images[0]}
          alt={castle.title}
        />
        {/* El botón de la flecha solo aparece al hacer hover sobre la tarjeta */}
        <button className="absolute bottom-2 right-2 bg-[var(--purple)] text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white  hover:text-[var(--purple)]">
          <IconArrowUpRight size={24} />
        </button>
      </div>

      <div className="py-3 flex flex-col gap-0.5">
        <div className="flex flex-wrap justify-between items-start" >
          <p className="max-w-[calc(100%-30px)] text-[15px] font-semibold font-montserrat text-gray-900 dark:text-white group-hover:text-[var(--purple)] transition-colors duration-200  capitalize">
            {castle.address?.city}, {castle.address?.country}
          </p>
          <div className="flex items-center text-sm font-semibold text-gray-600">
            <IconStar size={16} className="text-yellow-500" />
            <span className="ml-1">{averageRating}</span>
          </div>
        </div>
        <p className="text-[15px] font-medium font-montserrat text-gray-600 dark:text-whitecapitalize">
          By {castle.user?.name}
        </p>
        <p className="text-sm font-medium font-montserrat">
          <span className="font-semibold text-base">{castle.pricePerNight} €</span> night
        </p>
      </div>
    </Link>
  );
}

export default CastleItem;




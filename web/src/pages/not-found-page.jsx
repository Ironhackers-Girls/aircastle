import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="font-montserrat flex flex-col items-center justify-center p-10 sm:p-40 md:p-50 lg:p-60 xl:p-70 text-my-black text-center">
      <h1 className="text-4xl font-bold mb-5">404 - Not Found</h1>
      <p className="text-lg font-semibold mb-5">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-2 px-6 py-3 bg-lime-green text-dark-green text-xs sm:text-sm font-semibold rounded-full hover:bg-dark-green hover:text-white transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../assets/not-found-animation.json";

const NotFoundPage = () => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 sm:p-20 md:p-32 lg:p-40 xl:p-48 text-[var(--black)] text-center">
      <div className="flex justify-center items-center mb-5 w-full max-w-[500px]">
        <Lottie
          options={lottieOptions}
          height={250}
          width="300px"
          style={{ cursor: "default" }}
        />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold mb-5 text-[var(--black)]">
        404 - Not Found
      </h1>
      <p className="text-lg font-semibold mb-5 text-[var(--dark-gray)]">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-2 px-6 py-3 bg-[var(--purple)] text-[var(--white)] text-xs sm:text-sm font-semibold rounded-full transform hover:scale-105 hover:shadow-xl transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

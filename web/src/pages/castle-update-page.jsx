import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as AirCastleApi from "../services/aircastle-service";
import { useForm } from "react-hook-form";
import {
  IconInfoCircle,
  IconMapPin,
  IconList,
  IconPhoto,
} from "@tabler/icons-react";
import { Snackbar, Alert } from "@mui/material";

function CastleUpdatePage() {
  const { id } = useParams();
  const [castle, setCastle] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        const castle = await AirCastleApi.getCastle(id);
        setCastle(castle);
      })();
    }
  }, [id]);

  const onSubmit = async (data) => {
    if (!castle?._id) {
      console.error("Castle ID is missing");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("pricePerNight", data.pricePerNight);
    formData.append("rooms", data.rooms);
    formData.append("bathrooms", data.bathrooms);
    formData.append("capacity", data.capacity);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("amenities", data.amenities.split(","));
    formData.append("services", data.services.split(","));
    // formData.append("images1", data.images[0]);

    console.log(data.images);

    try {
      await AirCastleApi.updateCastle(castle._id, formData);
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-8 mt-12 bg-[var(--white)] rounded-2xl shadow-lg border border-[var(--dark-gray)]">
      <h1 className="text-2xl font-bold text-[var(--black)] text-center mb-8">
        Edit Castle Info
      </h1>

      {castle ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* General Information */}
          <div>
            <div className="flex items-center mb-4">
              <IconInfoCircle className="mr-2" />
              <h2 className="text-xl font-bold text-[var(--black)]">
                General Information
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[var(--black)]">
                  Title
                </label>
                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  defaultValue={castle?.title}
                  className="w-full rounded-md bg-[var(--white)] px-3 py-2 text-[var(--black)] border border-[var(--dark-gray)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--black)]">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  defaultValue={castle?.description}
                  className="w-full rounded-md bg-[var(--white)] px-3 py-2 text-[var(--black)] border border-[var(--dark-gray)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--black)]">
                  Price Per Night (€)
                </label>
                <input
                  type="number"
                  {...register("pricePerNight", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be at least 1" },
                  })}
                  defaultValue={castle?.pricePerNight}
                  className="w-full rounded-md bg-[var(--white)] px-3 py-2 text-[var(--black)] border border-[var(--dark-gray)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                />
                {errors.pricePerNight && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.pricePerNight.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--black)]">
                  Rooms
                </label>
                <input
                  type="number"
                  {...register("rooms", {
                    required: "Rooms are required",
                    min: { value: 1, message: "Rooms must be at least 1" },
                  })}
                  defaultValue={castle?.rooms}
                  className="w-full rounded-md bg-[var(--white)] px-3 py-2 text-[var(--black)] border border-[var(--dark-gray)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                />
                {errors.rooms && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.rooms.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--black)]">
                  Bathrooms
                </label>
                <input
                  type="number"
                  {...register("bathrooms", {
                    required: "Bathrooms are required",
                    min: { value: 1, message: "Bathrooms must be at least 1" },
                  })}
                  defaultValue={castle?.bathrooms}
                  className="w-full rounded-md bg-[var(--white)] px-3 py-2 text-[var(--black)] border border-[var(--dark-gray)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                />
                {errors.bathrooms && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.bathrooms.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Location & Capacity */}
          <div>
            <div className="flex items-center mb-4">
              <IconMapPin className="mr-2" />
              <h2 className="text-xl font-bold text-[var(--black)]">
                Location & Capacity
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-[var(--black)]">
                  Country
                </label>
                <input
                  type="text"
                  {...register("country", { required: "Country is required" })}
                  defaultValue={castle?.address?.country || ""}
                  className="w-full rounded-md bg-[var(--white)] px-3 py-2 text-[var(--black)] border border-[var(--dark-gray)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                />
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--black)]">
                  City
                </label>
                <input
                  type="text"
                  {...register("city", { required: "City is required" })}
                  defaultValue={castle?.address?.city || ""}
                  className="w-full rounded-md bg-[var(--white)] px-3 py-2 text-[var(--black)] border border-[var(--dark-gray)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--black)]">
                  Capacity
                </label>
                <input
                  type="number"
                  {...register("capacity", {
                    required: "Capacity is required",
                    min: { value: 1, message: "Capacity must be at least 1" },
                  })}
                  defaultValue={castle?.capacity || ""}
                  className="w-full rounded-md bg-[var(--white)] px-3 py-2 text-[var(--black)] border border-[var(--dark-gray)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                />
                {errors.capacity && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.capacity.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Amenities & Services */}
          <div>
            <div className="flex items-center mb-4">
              <IconList className="mr-2" />
              <h2 className="text-xl font-bold text-[var(--black)]">
                Amenities & Services
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[var(--black)]">
                  Amenities (comma-separated)
                </label>
                <input
                  type="text"
                  {...register("amenities")}
                  defaultValue={castle?.amenities?.join(",") || ""}
                  className="w-full rounded-md bg-[var(--white)] px-3 py-2 text-[var(--black)] border border-[var(--dark-gray)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--black)]">
                  Services (comma-separated)
                </label>
                <input
                  type="text"
                  {...register("services")}
                  defaultValue={castle?.services?.join(",") || ""}
                  className="w-full rounded-md bg-[var(--white)] px-3 py-2 text-[var(--black)] border border-[var(--dark-gray)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <div className="flex items-center mb-4">
              <IconPhoto className="mr-2" />
              <h2 className="text-xl font-bold text-[var(--black)]">Images</h2>
            </div>
            <div className="grid grid-cols-1 gap-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--black)]">
                  Image 1
                </label>
                <input
                  type="file"
                  {...register("image1")}
                  className="w-full rounded-md bg-[var(--white)] px-3 py-2 text-[var(--black)] border border-[var(--dark-gray)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                  accept="image/*"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--black)]">
                  Image 2
                </label>
                <input
                  type="file"
                  {...register("image2")}
                  className="w-full rounded-md bg-[var(--white)] px-3 py-2 text-[var(--black)] border border-[var(--dark-gray)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                  accept="image/*"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--black)]">
                  Image 3
                </label>
                <input
                  type="file"
                  {...register("image3")}
                  className="w-full rounded-md bg-[var(--white)] px-3 py-2 text-[var(--black)] border border-[var(--dark-gray)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                  accept="image/*"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--black)]">
                  Image 4
                </label>
                <input
                  type="file"
                  {...register("image4")}
                  className="w-full rounded-md bg-[var(--white)] px-3 py-2 text-[var(--black)] border border-[var(--dark-gray)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                  accept="image/*"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--black)]">
                  Image 5
                </label>
                <input
                  type="file"
                  {...register("image5")}
                  className="w-full rounded-md bg-[var(--white)] px-3 py-2 text-[var(--black)] border border-[var(--dark-gray)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[var(--purple)] text-[var(--white)] font-bold hover:opacity-90 active:scale-95 active:shadow-inner transition-all duration-150 cursor-pointer"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <p className="text-center text-[var(--dark-gray)]">Castle not found.</p>
      )}

      <div className="flex justify-center mt-6">
        <Link
          to="/castles"
          className="px-4 py-2 bg-gray-200 text-[var(--black)] border border-[var(--dark-gray)] rounded-md hover:bg-gray-300 transition-colors"
        >
          Go Back
        </Link>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setOpenSnackbar(false)}
        sx={{ top: "80px" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Castle updated!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CastleUpdatePage;

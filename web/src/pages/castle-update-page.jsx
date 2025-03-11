import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as AirCastleApi from "../services/aircastle-service";
import { useForm } from "react-hook-form";

function CastleUpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [castle, setCastle] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

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
      console.log(castle._id)
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

    try {
      await AirCastleApi.updateCastle(castle._id, formData);
      navigate("/castles");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Edit Castle Info</h1>
      {castle ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                defaultValue={castle?.title}
                className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                defaultValue={castle?.description}
                className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700">Price Per Night (€)</label>
              <input
                type="number"
                {...register("pricePerNight", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be at least 1" },
                })}
                defaultValue={castle?.pricePerNight}
                className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
              />
              {errors.pricePerNight && (
                <p className="text-red-500 text-sm">{errors.pricePerNight.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">Rooms</label>
                <input
                  type="number"
                  {...register("rooms", { required: "Rooms are required" })}
                  defaultValue={castle?.rooms}
                  className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
                />
                {errors.rooms && (
                  <p className="text-red-500 text-sm">{errors.rooms.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
                <input
                  type="number"
                  {...register("bathrooms", { required: "Bathrooms are required" })}
                  defaultValue={castle?.bathrooms}
                  className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
                />
                {errors.bathrooms && (
                  <p className="text-red-500 text-sm">{errors.bathrooms.message}</p>
                )}
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700">Capacity</label>
              <input
                type="number"
                {...register("capacity", { required: "Capacity is required" })}
                defaultValue={castle?.capacity}
                className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
              />
              {errors.capacity && (
                <p className="text-red-500 text-sm">{errors.capacity.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  {...register("city")}
                  defaultValue={castle?.address?.city}
                  className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  {...register("country")}
                  defaultValue={castle?.address?.country}
                  className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700">Amenities (separate with commas)</label>
              <input
                type="text"
                {...register("amenities")}
                defaultValue={castle?.amenities?.join(",")}
                className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700">Services (separate with commas)</label>
              <input
                type="text"
                {...register("services")}
                defaultValue={castle?.services?.join(",")}
                className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
              />
            </div>

            <div className="mb-5">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p className="text-center text-gray-500">Castle not found.</p>
      )}
    </div>
  );
}

export default CastleUpdatePage;

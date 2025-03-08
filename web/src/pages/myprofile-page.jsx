import { useAuthContext } from "../contexts/auth-context.jsx";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as AirCastleAPI from "../services/aircastle-service";

function MyProfile() {
  const { login } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    AirCastleAPI.myProfile()
      .then((user) => {
        setProfile(user);
        setValue("name", user.name || "");
        setValue("phone", user.phone || "");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setValue]);

  const onSubmit = (data) => {
    const formData = new FormData();

    if (data.name !== user.name) formData.append("name", data.name);
    if (data.phone !== user.phone) formData.append("phone", data.phone);
    if (data.avatar?.length) formData.append("avatar", data.avatar[0]);

    AirCastleAPI.updateProfile(formData)
      .then((updatedData) => {
        setProfile(updatedData);
        login(updatedData);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-5">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      <div className="bg-white shadow-md rounded-lg p-6">
        {profile?.avatar ? (
          <div className="flex justify-center mb-5">
            <img
              src={profile.avatar}
              alt="Avatar del usuario"
              className="w-32 h-32 rounded-full border border-gray-300 shadow-md"
            />
          </div>
        ) : (
          <p className="text-gray-500 text-center">No avatar</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={profile?.username || ""}
              className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
              disabled
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              {...register("name")} 
              value={watch("name") || ""}
              onChange={(e) => setValue("name", e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              {...register("phone")} 
              value={watch("phone") || ""}
              onChange={(e) => setValue("phone", e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">Avatar</label>
            <input
              type="file"
              {...register("avatar")}
              className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              value={profile?.role || ""}
              className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
              disabled
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyProfile;

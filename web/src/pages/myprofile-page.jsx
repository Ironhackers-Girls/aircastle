import { useAuthContext } from "../contexts/auth-context.jsx";
import { useForm } from "react-hook-form";
import * as AirCastleAPI from "../services/aircastle-service";

function MyProfile() {
  const {
    register,
    handleSubmit,
    formState,
    setError
  } = useForm();

  const { user } = useAuthContext();
  const errors = formState.errors;

  const handleUpdateProfile = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("avatar", data.avatar[0]);

    try {
      await AirCastleAPI.updateProfile(formData)
      window.location.reload();
    } catch (error) {
      setError("api", { message: error.message });
    }
  }


  return (
    <div className="max-w-4xl mx-auto mt-5">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      <div className="bg-white shadow-md rounded-lg p-6">
        {user?.avatar ? (
          <div className="flex justify-center mb-5">
            <img
              src={user.avatar}
              alt="Avatar del usuario"
              className="w-32 h-32 rounded-full border border-gray-300 shadow-md"
            />
          </div>
        ) : (
          <p className="text-gray-500 text-center">No avatar</p>
        )}

        <form onSubmit={handleSubmit(handleUpdateProfile)}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={user?.username || ""}
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
              {...register("name")}
              defaultValue={user.name}
              className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              {...register("phone")}
              defaultValue={user.phone}
              className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Avatar
            </label>
            <input
              type="file"
              {...register("avatar")}
              className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-700"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              value={user?.role || ""}
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
          {errors.api && (
            <p className="text-red-500 text-sm mt-3">{errors.api.message}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default MyProfile;

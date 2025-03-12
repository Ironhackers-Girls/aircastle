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
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl border border-[var(--light-gray)]">
      <h2 className="text-3xl font-bold text-black mb-6">My Profile</h2>

      <div className="flex justify-center mb-6">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-[var(--light-gray)] shadow-lg object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-[var(--light-gray)] flex items-center justify-center text-[var(--dark-gray)] text-sm">
            No Avatar
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-black">
            Username
          </label>
          <input
            type="text"
            value={user?.username || ""}
            className="w-full mt-2 px-4 py-3 border border-[var(--light-gray)] rounded-lg text-black bg-[var(--light-gray)] cursor-not-allowed"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-black">
            Full Name
          </label>
          <input
            type="text"
            {...register("name")}
            defaultValue={user.name}
            className="w-full mt-2 px-4 py-3 border border-[var(--light-gray)] rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[var(--purple)]"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-black">
            Phone
          </label>
          <input
            type="text"
            {...register("phone")}
            defaultValue={user.phone}
            className="w-full mt-2 px-4 py-3 border border-[var(--light-gray)] rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[var(--purple)]"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-black">
            Avatar
          </label>
          <input
            type="file"
            {...register("avatar")}
            className="w-full mt-2 px-4 py-3 border border-[var(--light-gray)] rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[var(--purple)]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-black">
            Role
          </label>
          <input
            type="text"
            value={user?.role || ""}
            className="w-full mt-2 px-4 py-3 border border-[var(--light-gray)] rounded-lg text-black bg-[var(--light-gray)] cursor-not-allowed"
            disabled
          />
        </div>

        <button
          type="submit"
          className="w-64 mx-auto bg-[var(--purple)] text-white py-3 rounded-lg font-bold shadow-md hover:opacity-90 transition cursor-pointer"
        >
          Update Profile
        </button>
        {errors.api && (
          <p className="text-red-500 text-sm mt-3">{errors.api.message}</p>
        )}
      </form>
    </div>
  );
}

export default MyProfile;

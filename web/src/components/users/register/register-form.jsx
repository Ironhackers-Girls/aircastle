import { useForm } from "react-hook-form";
import { useAuthContext } from "../../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import * as AirCastleAPI from "../../../services/aircastle-service";
import { UserCircleIcon } from "@heroicons/react/24/solid";

function RegisterForm() {
  const { register, handleSubmit, formState, setError } = useForm();
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const errors = formState.errors;

  const handleRegister = async (user) => {
    const formData = new FormData();
    formData.append("role", user.role);
    formData.append("username", user.username);
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("phone", user.phone);
    formData.append("avatar", user.avatar[0]);
    try {
      await AirCastleAPI.register(formData);
      const loggedInUser = await AirCastleAPI.login(user);
      login(loggedInUser);
      navigate("/");
    } catch (error) {
      const { data } = error.response;
      Object.keys(data.errors).forEach((inputName) =>
        setError(inputName, { message: data.error[inputName] })
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[var(--white)] rounded-2xl shadow-lg border border-[var(--dark-gray)]">
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-12">
        <div className="border-b border-[var(--dark-gray)] pb-12">
          <h2 className="text-2xl font-bold text-[var(--black)] text-center">
            Register
          </h2>
          <p className="mt-1 text-sm text-[var(--dark-gray)] text-center">
            Create your account in just a few seconds and start enjoying the
            perks.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[var(--black)]"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="janesmith"
                  {...register("username", { required: "Mandatory field" })}
                  className="block w-full rounded-md bg-[var(--white)] px-3 py-2 text-[var(--black)] border border-[var(--dark-gray)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                />
                {errors.username && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.username.message}
                  </div>
                )}
              </div>
            </div>

            {/* Avatar Section */}
            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-[var(--black)]"
              >
                Avatar
              </label>
              <div className="mt-2 flex items-center gap-x-3 w-full flex-wrap">
                <UserCircleIcon
                  aria-hidden="true"
                  className="text-[var(--dark-gray)] w-12 h-12"
                />
                <input
                  id="file_input"
                  type="file"
                  {...register("avatar")}
                  className="w-full sm:w-auto px-4 py-3 border border-[var(--light-gray)] rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[var(--purple)] cursor-pointer"
                />
                {errors.avatar && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.avatar.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="border-b border-[var(--dark-gray)] pb-12">
          <h2 className="text-base font-semibold text-[var(--black)]">
            Personal Information
          </h2>
          <p className="mt-1 text-sm text-[var(--dark-gray)]">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-[var(--black)]"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  {...register("name", { required: "Mandatory field" })}
                  className="block w-full rounded-md bg-[var(--white)] px-3 py-2 text-[var(--black)] border border-[var(--dark-gray)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                />
                {errors.name && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </div>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--black)]"
              >
                Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", { required: "Mandatory field" })}
                  className="block w-full rounded-md bg-[var(--white)] px-3 py-2 text-[var(--black)] border border-[var(--dark-gray)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                />
                {errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </div>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[var(--black)]"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  {...register("password", { required: "Mandatory field" })}
                  className="block w-full rounded-md bg-[var(--white)] px-3 py-2 text-[var(--black)] border border-[var(--dark-gray)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                />
                {errors.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </div>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-[var(--black)]"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="phone"
                  autoComplete="phone"
                  {...register("phone", { required: "Mandatory field" })}
                  className="block w-full rounded-md bg-[var(--white)] px-3 py-2 text-[var(--black)] border border-[var(--dark-gray)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                />
                {errors.phone && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Role Selection */}
        <div className="border-b border-[var(--dark-gray)] pb-12">
          <fieldset>
            <legend className="text-sm font-semibold text-[var(--black)]">
              Your Role
            </legend>
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-x-3">
                <select
                  id="role"
                  name="role"
                  {...register("role", { required: "Mandatory field" })}
                  className="block w-3/4 rounded-md border border-[var(--dark-gray)] bg-[var(--white)] py-2 text-[var(--black)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
                >
                  <option value="host">Host</option>
                  <option value="guest">Guest</option>
                </select>
                {errors.role && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.role.message}
                  </div>
                )}
              </div>
            </div>
          </fieldset>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[var(--purple)] text-[var(--white)] font-bold hover:opacity-90 active:scale-95 active:shadow-inner transition-all duration-150 cursor-pointer"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;

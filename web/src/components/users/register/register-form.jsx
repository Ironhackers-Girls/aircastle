import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../../contexts/auth-context';
import { useNavigate } from 'react-router-dom';
import * as AirCastleAPI from "../../../services/aircastle-service";
import { UserCircleIcon } from '@heroicons/react/24/solid'


function RegisterForm() {
    const { register, handleSubmit, formState, setError } = useForm()
    const { login } = useAuthContext();
    const navigate = useNavigate()
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
            login(loggedInUser)
            navigate("/")
        } catch (error) {
            const { data } = error.response;

            Object.keys(data.errors).forEach((inputName) =>
                setError(inputName, { message: data.error[inputName] })
            )
        }
    };

    return (
        <form onSubmit={handleSubmit(handleRegister)}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Register</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="janesmith"
                                        {...register("username", { required: "Mandatory field" })}
                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                    />
                                </div>
                                {errors.username && (
                                    <div className="invalid-feedback">{errors.username.message}</div>
                                )}
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">
                                Photo
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                <UserCircleIcon aria-hidden="true" className="size-12 text-gray-300" />
                                <input
                                    id="file_input"
                                    type="file"
                                    {...register("avatar")}
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                                />
                                {errors.avatar && (
                                    <div className="text-red-500 text-xs mt-1">{errors.avatar.message}</div>
                                )}
                            </div>
                        </div>


                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                Full name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="first-name"
                                    name="first-name"
                                    type="text"
                                    autoComplete="given-name"
                                    {...register("name", { required: "Mandatory field" })}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">{errors.name.message}</div>
                                )}
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    {...register("email", { required: "Mandatory field" })}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">{errors.email.message}</div>
                                )}
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="passsword"
                                    {...register("password", { required: "Mandatory field" })}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">{errors.password.message}</div>
                                )}
                            </div>
                        </div>


                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Phone
                            </label>
                            <div className="mt-2">
                                <input
                                    id="phone"
                                    name="phone"
                                    type="phone"
                                    autoComplete="phone"
                                    {...register("phone", { required: "Mandatory field" })}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.phone && (
                                    <div className="invalid-feedback">{errors.phone.message}</div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 space-y-10">
                        <fieldset>
                            <legend className="text-sm/6 font-semibold text-gray-900">Your role</legend>
                            <p className="mt-1 text-sm/6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                    <label htmlFor="role" className="block text-sm/6 font-medium text-gray-900">
                                        Your Role
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        {...register("role", { required: "Mandatory field" })}
                                        className="relative block w-full rounded-md border border-gray-300 bg-white py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                    >
                                        <option value="host">Host</option>
                                        <option value="guest">Guest</option>
                                    </select>
                                    {errors.role && (
                                        <div className="invalid-feedback">{errors.role.message}</div>
                                    )}
                                </div>
                            </div>

                        </fieldset>
                    </div>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Sign in
                </button>
            </div>
        </form>
    )
}

export default RegisterForm;
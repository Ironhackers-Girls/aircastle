import { useAuthContext } from "../../../contexts/auth-context";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import * as AirCastleAPI from "../../../services/aircastle-service";

function LoginForm() {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handleLogin = async (user) => {
    try {
      user = await AirCastleAPI.login(user);
      login(user);
      navigate("/");
    } catch (error) {
      if (error.response?.status === 401) {
        const { data } = error.response;
        Object.keys(data.errors).forEach((inputName) =>
          setError(inputName, { message: data.errors[inputName] })
        );
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[var(--white)] rounded-2xl shadow-lg border border-[var(--dark-gray)]">
      <h2 className="text-2xl font-bold text-[var(--black)] text-center">Sign in to your account</h2>
      <hr className="my-4 border-[var(--dark-gray)]" />
      <form className="mt-6 space-y-6" onSubmit={handleSubmit(handleLogin)}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--black)]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            {...register("email", { required: "Mandatory field" })}
            className="block w-full rounded-md border border-[var(--dark-gray)] px-3 py-2 text-[var(--black)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[var(--black)]">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            {...register("password", { required: "Mandatory field"  })}
            className="block w-full rounded-md border border-[var(--dark-gray)] px-3 py-2 text-[var(--black)] outline-none focus:ring-2 focus:ring-[var(--purple)]"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-[var(--purple)] text-[var(--white)] font-bold hover:opacity-90 active:scale-95 active:shadow-inner transition-all duration-150 cursor-pointer"
        >
          Continue
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-[var(--dark-gray)]">
        Not a member?{' '}
        <Link to="/register" className="text-[var(--purple)] font-semibold hover:underline cursor-pointer">
          Register here
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
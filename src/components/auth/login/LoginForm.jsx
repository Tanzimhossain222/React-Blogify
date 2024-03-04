import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../api/axiosInstance";
import Field from "../../../common/Field";
import useAuth from "../../../hooks/useAuth";

const LoginForm = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();

  const handleSubmitForm = async (formData) => {
    try {
      const response = await axiosInstance.post("/auth/login", formData);

      if (response.status !== 200) {
        throw new Error("An error occurred");
      }

      const { token, user } = response.data;

      if (token) {
        login({ token, user });
      }

      toast.success("Login successful", {
        position: "top-right",
        autoClose: 500,
      });

      // Redirect to home page after 1200ms
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      setError("root.random", {
        type: "manual",
        message: `User with email ${formData.email} does not exist or password is incorrect. Please try again.`,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Field label="Email" htmlFor="email" error={errors.email}>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
        </Field>

        <Field label="Password" htmlFor="password" error={errors.password}>
          <input
            type={"password"}
            id="password"
            name="password"
            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password should be at least 6 characters",
              },
            })}
          />
        </Field>

        {errors.root?.random && (
          <p className="text-red-500 text-xs mt-2">
            {errors.root.random.message}
          </p>
        )}

        <Field>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
          >
            Login
          </button>
        </Field>

        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginForm;

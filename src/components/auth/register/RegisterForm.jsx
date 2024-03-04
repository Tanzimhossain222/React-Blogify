import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../api/axiosInstance";
import Field from "../../../common/Field";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();

  const handleSubmitForm = async (formData) => {
    try {
      const res = await axiosInstance.post("/auth/register", formData);
      console.log(res);

      if (res.status !== 201) {
        throw new Error("An error occurred");
      }

      toast.success("Account created successfully", {
        position: "top-right",
        autoClose: 500,
      });

      // Redirect to login page after 1 second
      setTimeout(() => {
        navigate("/login");
      }, 1400);
    } catch (err) {
      setError("root.random", {
        type: "manual",
        message: `An error occurred. Please try again.`,
      });
    }
  };

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit(handleSubmitForm)}>
        <Field label="First Name" htmlFor="firstName" error={errors.firstName}>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
            {...register("firstName", {
              required: "First Name is required",
            })}
          />
        </Field>

        <Field label="Last Name" htmlFor="lastName" error={errors.lastName}>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
            {...register("lastName", {
              required: "Last Name is required",
            })}
          />
        </Field>

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
            Create Account
          </button>
        </Field>

        <p className="text-center">
          Already have account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export default RegisterForm;

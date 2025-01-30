import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const [token, setToken] = useState<string | null>(null);

  const onSubmit = async (formData: LoginFormInputs) => {
    try {
      const response = await login({ variables: formData });
      const token = response.data.login.token;
      setToken(token);
      localStorage.setItem("token", token);
      alert("Login Successful");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              {...register("password")}
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all "
          >
            {loading ? (
              <>
                <CircularProgress color="inherit" size={20} sx={{ mx: 1 }} />
                Loading...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {error && <p className="text-red-600 mt-4">{error.message}</p>}
      </div>
    </div>
  );
};

export default Login;

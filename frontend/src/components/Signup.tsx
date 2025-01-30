import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../graphql/mutations";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@mui/material";

interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION);
  const { register, handleSubmit } = useForm<SignupFormInputs>();

  const onSubmit = async (formData: SignupFormInputs) => {
    try {
      await signup({ variables: formData });
      alert("Signup Successful");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Signup
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              {...register("name")}
              id="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
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
            className="w-full flex items-center justify-center bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all "
          >
            {loading ? (
              <>
                <CircularProgress color="inherit" size={20} sx={{ mx: 1 }} />
                Signing up...
              </>
            ) : (
              "Signup"
            )}
          </button>
        </form>

        {error && <p className="text-red-600 mt-4">{error.message}</p>}
        {data && <p className="text-green-600 mt-4">Signup Successful!</p>}
      </div>
    </div>
  );
};

export default Signup;

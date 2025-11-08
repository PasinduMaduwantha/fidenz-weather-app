import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Cloud } from "lucide-react";

const LoginPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 max-w-md w-full border border-white/20 shadow-2xl">
        <div className="flex items-center justify-center">
          <Cloud className="w-12 h-12 text-white mr-3" />
          <h1 className="text-3xl font-bold text-white">Weather App</h1>
        </div>
        <p className="text-white/80 text-center mb-4 p-4">
          Sign in to access real-time weather information for cities around the
          world.
        </p>
        <button
          onClick={() => loginWithRedirect()}
          className="p-12 text-lg w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-lg"
        >
          Sign In with Auth0
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

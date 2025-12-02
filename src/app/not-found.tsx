"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400 px-4 text-center">
      <div className="max-w-md">
        {/* Illustration */}
        <div className="mb-6">
          <svg
            className="w-48 h-48 mx-auto animate-bounce"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4l3 3m6 3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! The page you are looking for does not exist.
        </p>

        {/* Button */}
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-blue-600 cursor-pointer text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}

import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-screen">
      <h1 className="text-3xl font-bold text-red-400 mb-4">User not found</h1>
      <p className="text-lg text-gray-400 mb-6">
        The user you are looking for does not exist.
      </p>
      <Link className="text-blue-500 hover:underline text-2xl " href="/auth">
        Return to login page
      </Link>
    </div>
  );
};

export default ErrorPage;

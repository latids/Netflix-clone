import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import UserProfiles from "../components/UserProfiles";
import serverAuth from "@/libs/serverAuth";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/auth");
    return null;
  }

  const userData = await serverAuth();
  const userName = userData.currentUser.name;

  return (
    <header className="h-screen overflow-hidden">
      <h1 className="text-3xl md:text-5xl text-white text-center mt-12">
        Who&apos;s watching?
      </h1>
      <div className="flex justify-center items-center h-full sm:h-screen">
        <UserProfiles userName={userName} />
      </div>
    </header>
  );
};

export default Page;

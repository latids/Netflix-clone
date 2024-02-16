"use client";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Watch = ({ params }: { params: { movieId: string } }) => {
  const router = useRouter();
  const { data } = useMovie(params.movieId);

  return (
    <div className="h-screen w-screen bg-black relative">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          onClick={() => router.push("/")}
          className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition"
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {data?.title}
        </p>
      </nav>
      <video
        className="h-full w-full object-cover"
        autoPlay
        controls
        src={data?.videoUrl}
      ></video>
      <div className="absolute bottom-0 left-0 w-full text-white p-4 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export default Watch;

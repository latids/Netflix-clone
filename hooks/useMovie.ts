"use client";

import useSwr from "swr";
import fetcher from "@/libs/fetcher";
import { ParsedUrlQuery } from "querystring";

const useMovie = (movieId: string | ParsedUrlQuery) => {
  const { data, error, isLoading } = useSwr(
    `/api/movies/${movieId}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    data,
    error,
    isLoading,
  };
};

export default useMovie;

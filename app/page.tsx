import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import Navbar from "./components/Navbar";
const Billboard = React.lazy(
  async () => await import("./components/Billboard")
);
import Movies from "./components/Movies";
import InfoModalWrapper from "./components/InfoModalWrapper";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/auth");
    return null;
  }

  return (
    <>
      <InfoModalWrapper></InfoModalWrapper>
      <Navbar></Navbar>
      <Billboard></Billboard>
      <Movies></Movies>
    </>
  );
}

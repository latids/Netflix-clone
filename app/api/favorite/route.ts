import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { without } from "lodash";

export async function POST(request: Request) {
  try {
    const { currentUser } = await serverAuth();
    const { movieId } = await request.json();
    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!existingMovie) throw new Error("Invalid ID");
    const user = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { currentUser } = await serverAuth();
    const { movieId } = await request.json();
    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!existingMovie) throw new Error("Invalid ID");
    const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);
    const updatedUser = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      },
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

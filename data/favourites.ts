import { auth, firestore } from "@/firebase/server";
import { cookies } from "next/headers";
import "server-only";
import { UserFavourites } from "@/types/favourites";

export const getUserFavourites = async (): Promise<UserFavourites> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("firebaseAuthToken")?.value;

    if (!token) {
      return {};
    }

    const verifiedToken = await auth.verifyIdToken(token);
    const favouritesSnapshot = await firestore
      .collection("favourites")
      .doc(verifiedToken.uid)
      .get();

    return favouritesSnapshot.data() as UserFavourites || {};
  } catch (error) {
    console.error('Error getting user favourites:', error);
    return {};
  }
};

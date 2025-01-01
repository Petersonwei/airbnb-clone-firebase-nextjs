import { auth, firestore } from "@/firebase/server";
import { cookies } from "next/headers";
import "server-only";

export const getUserFavourites = async () => {
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

    return favouritesSnapshot.data() || {};
  } catch (error) {
    console.error('Error getting user favourites:', error);
    return {};
  }
};

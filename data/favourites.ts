import { auth, firestore } from "@/firebase/server";
import { cookies } from "next/headers";
import { UserFavourites } from "@/types/favourites";

export const getUserFavourites = async (): Promise<UserFavourites> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("firebaseAuthToken")?.value;

    if (!token) {
      return {};
    }

    try {
      const verifiedToken = await auth.verifyIdToken(token);
      const favouritesSnapshot = await firestore
        .collection("favourites")
        .doc(verifiedToken.uid)
        .get();

      return favouritesSnapshot.data() as UserFavourites || {};
    } catch (authError) {
      console.error('Auth verification error:', authError);
      return {};
    }
  } catch (error) {
    console.error('Error getting user favourites:', error);
    return {};
  }
};

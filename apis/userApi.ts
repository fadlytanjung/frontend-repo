import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import env from "@/lib/env";

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_API_KEY,
  authDomain: env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_SENDER_ID,
  appId: env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  if (user) {
    const token = await user.getIdToken();
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_BASE_URL}/user/fetch-id-by-email/${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const res = await response.json();

      return { token, ...res };
    } else {
      throw new Error("User not found in Firestore");
    }
  }

  throw new Error("Login failed");
};

export const logoutUser = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("uid");
  await signOut(auth);
};

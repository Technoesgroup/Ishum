import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../FireBaseAuth/FireBase_auth";
import { useAuth } from "../../../ContextApiCart/LoginContextApi";

const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log('base url', baseURL);

export const useGoogleLogin = (onClose) => {
  const { setToken, setUser } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google User:", result.user);

      const response = await fetch(`${baseURL}/api/user/social-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: result.user.email,
          name: result.user.displayName,
          provider: "google",
          socialId: result.user.uid,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token); // ✅ save token
        localStorage.setItem("user", JSON.stringify(data.user)); // ✅ save user
        toast.success("Logged in with Google!");
        onClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Google login failed!");
    }
  };

  return { handleGoogleLogin };
};

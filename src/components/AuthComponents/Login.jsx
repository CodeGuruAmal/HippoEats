import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../../config/firebase";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import toast from "react-hot-toast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { addUserData } from "../../utils/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
      toast.success("Logged In Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  }

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "user", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        dispatch(addUserData(data));
      }
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Fetch user data
      const docRef = doc(db, "user", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        dispatch(addUserData(data));
      } else {
        await setDoc(doc(db, "user", user.uid), {
          name: user.displayName,
          email: user.email,
        });
        dispatch(addUserData({ name: user.displayName, email: user.email }));
      }

      navigate("/");
      toast.success("Logged In with Google Successfully");
    } catch (error) {
      toast.error("Google Sign-In failed");
    }
  };

  return (

    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[95%] md:w-[75%] xl:w-[60%] h-[92vh]">
      <button
        onClick={() => navigate("/")}
        className="text-xl duration-200 cursor-pointer hover:bg-neutral-100 mt-2 p-2 rounded-xl"
      >
        <IoArrowBack />
      </button>

      <div
        className={`sm:w-[25rem] sm:h-[35rem] w-[95%] h-[32rem] p-4 fixed top-1/2 -translate-y-1/2 left-1/2 rounded-xl -translate-x-1/2 z-[1001] duration-300 ease-in-out bg-neutral-100 shadow-lg border`}
      >
        <div className="flex flex-col sm:text-sm h-full w-[85%] mx-auto items-center justify-center gap-5 font-[Gilroy-Medium]">
          <h1 className=" text-2xl font-[Gilroy-Bold]">Login</h1>
          <form
            onSubmit={handleLogin}
            className="mt-7 flex flex-col justify-center gap-3 w-full"
          >
            <input
              type="email"
              className="p-2 border outline-none border-neutral-300 w-full rounded-md"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="p-2 border outline-none border-neutral-300 w-full rounded-md"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <input
            onClick={fetchUserData}
              type="submit"
              value="Login"
              className="p-2 rounded-md bg-secondaryFont cursor-pointer"
            />
          </form>

          <div className="flex w-full text-sm text-neutral-500 items-center gap-2">
            <span className="h-[.5px] w-full bg-neutral-500"></span>
            <span>or</span>
            <span className="h-[.5px] w-full bg-neutral-500"></span>
          </div>

          <div className="w-full">
            <button  onClick={handleGoogleSignIn} className="flex gap-2 justify-center border outline-none border-neutral-300 rounded-md bg-white p-2 w-full">
              <FcGoogle />
              Login with Google
            </button>
          </div>

          <span className="text-neutral-600 mt-10">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600"
            >
              SignUp
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
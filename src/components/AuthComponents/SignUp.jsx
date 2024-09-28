import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../../config/firebase";
import toast from "react-hot-toast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "../../utils/authSlice";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userData = useSelector((state) => state.auth.userData);
  // console.log(userData)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      // dispatch(addUserData(auth.currentUser))

      if (user) {
        await setDoc(doc(db, "user", user.uid), {
          name: name,
          email: email,
        });
      }

      navigate("/");
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "user", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        dispatch(addUserData(data));
      }
    });
  }

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if the user exists
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
      toast.success("Signed Up with Google Successfully");
    } catch (error) {
      console.log(error)
      toast.error("Google Sign-Up failed");
    }
  };

  return (
    <div className="absolute top-14 left-1/2 -translate-x-1/2 w-[95%] md:w-[75%] xl:w-[60%] h-[92vh]">
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
          <h1 className="sm:text-xl text-2xl font-[Gilroy-Bold]">
            Create your account
          </h1>
          <form
            onSubmit={handleRegister}
            className="mt-7 flex flex-col justify-center gap-3 w-full"
          >
            <input
              type="text"
              className="p-2 border outline-none border-neutral-300 w-full rounded-md"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
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
              onClick={() => fetchUserData()}
              type="submit"
              value="Sign Up"
              className="p-2 rounded-md bg-secondaryFont cursor-pointer"
            />
          </form>

          <div className="flex w-full text-sm text-neutral-500 items-center gap-2">
            <span className="h-[.5px] w-full bg-neutral-500"></span>
            <span>or</span>
            <span className="h-[.5px] w-full bg-neutral-500"></span>
          </div>

          <div className="w-full">
            <button onClick={handleGoogleSignUp} className="flex gap-2 justify-center border outline-none border-neutral-300 rounded-md bg-white p-2 w-full">
              <FcGoogle />
              Sign up with Google
            </button>
          </div>

          <span className="text-neutral-600 mt-6">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600"
            >
              Login
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInFail,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import PATH_CONTANTS from "../routes/pathContants";

const OAuth: React.FC<object> = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state: any) => state.user);
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      dispatch(signInStart());
      const res = await fetch("/api/auth/googleSignIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result?.user?.displayName,
          email: result?.user?.email,
          photo: result?.user?.photoURL,
        }),
      });
      const data = await res.json();
      if (data?.error) {
        dispatch(signInFail(data));
      }
      dispatch(signInSuccess(data));
      navigate(PATH_CONTANTS.HOME);
    } catch (error) {
      dispatch(signInFail(error));
      console.log("Cannot Login with google ");
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 rounded-lg p-3 text-white uppercase hover:opacity-95 disabled:opacity-80"
    >
      {loading ? "Signing into the system" : "Continue With Google"}
    </button>
  );
};

export default OAuth;

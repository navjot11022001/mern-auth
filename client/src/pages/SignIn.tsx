/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PATH_CONTANTS from "../routes/pathContants";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFail,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import Loader from "../components/Loader";

type TFormData = {
  email: string;
  password: string;
};

const SignIn: React.FC<object> = () => {
  const [signInDetails, setSignInDetails] = useState<TFormData>({
    email: "",
    password: "",
  });
  const { error, loading } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignInDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { email, password } = signInDetails;
      if (!email || !password) {
        return alert("all fields are required");
      }
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data?.status > 299) {
        return dispatch(signInFail(data));
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFail(error));
    }
  };

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter email"
            id="email"
            value={signInDetails.email}
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter Password"
            id="password"
            value={signInDetails.password}
            className="bg-slate-100 p-3 rounded-lg "
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 "
          >
            Sign In
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-2">
          <p>Don't l an account?</p>
          <Link to={PATH_CONTANTS.SIGNUP}>
            <span className="text-blue-500">Sign Up</span>
          </Link>
        </div>
        <p className="text-red-700 mt-4">
          {error ? error.message || "Something went wrong!" : ""}
        </p>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default SignIn;

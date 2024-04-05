/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PATH_CONTANTS from "../routes/pathContants";

const Headers: React.FC<object> = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center p-3">
        <h1 className="font-bold">
          <Link to={PATH_CONTANTS.HOME}>Auth App</Link>
        </h1>
        <ul className="flex gap-4">
          <Link to={PATH_CONTANTS.HOME}>
            <li>Home</li>
          </Link>
          <Link to={PATH_CONTANTS.ABOUT}>
            <li>About</li>
          </Link>
          {currentUser ? (
            <Link to={PATH_CONTANTS.PROFILE}>
              <img
                src={currentUser?.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
            </Link>
          ) : (
            <Link to={PATH_CONTANTS.SIGNIN}>
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Headers;

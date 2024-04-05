import React, { useRef } from "react";
import { useSelector } from "react-redux";
const Profile: React.FC<object> = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.user);
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <div className="max-w-lg mx-auto p-3 mx-auto">
      <h1
        className="text-3xl font-semibold
      text-center my-7"
      >
        Profile
      </h1>
      <form className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden />
        <img
          src={currentUser?.profilePicture}
          alt="profile"
          onClick={() => fileRef?.current?.click()}
          className="h-23 w-23 rounded-full self-center cursor-pointer object-cover mt-2"
        />
        <input
          defaultValue={currentUser?.name}
          type="text"
          id="username"
          placeholder="username"
          className="bg-slate-100 rounded-lg p-3 "
        />
        <input
          defaultValue={currentUser?.email}
          type="email"
          id="email"
          placeholder="email "
          className="bg-slate-100 rounded-lg p-3 "
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="bg-slate-100 rounded-lg p-3 "
        />
        <button
          type="submit"
          className="bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-95 disabled:opacity-80"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account?</span>
        <span className="text-red-700 cursor-pointer">Sign out?</span>
      </div>
    </div>
  );
};

export default Profile;

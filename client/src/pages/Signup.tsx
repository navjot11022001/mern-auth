import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PATH_CONTANTS from "../routes/pathContants";
import OAuth from "../components/OAuth";
interface IFormData {
  username: string;
  email: string;
  password: string;
}
const SignUp: React.FC<object> = () => {
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { username, email, password } = formData;
      if (!username || !email || !password) {
        return alert("All fields are required");
      }
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email,
          password,
        }),
      });
      const data = await res.json();

      if (data?.message?.errors) {
        throw new Error("Something went wrong");
      }
      setLoading(false);
      setError(false);
      navigate("/signin");
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={formData.username}
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          value={formData.email}
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          value={formData.password}
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-600 text-white p-3 uppercase hover:opacity-95 disabled:opacity-80 rounded-lg"
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={PATH_CONTANTS.SIGNIN}>
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error ? "Something went Wrong" : ""}</p>
    </div>
  );
};

export default SignUp;

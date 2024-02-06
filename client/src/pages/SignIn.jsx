import { Alert, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "flowbite-react";
import { Button } from "flowbite-react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userslice.js";
import { useDispatch, useSelector } from "react-redux";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData(() => {
      return { ...formData, [e.target.id]: e.target.value.trim() };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.email) {
      return dispatch(signInFailure("please fill out all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className=" min-h-screen mt-20 ">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left div */}
        <div className="flex-1 flex-align-center">
          <Link className=" font-bold dark:text-white text-4xl">
            <span
              className="px-1 py-2 
        bg-gradient-to-r from-indigo-500 via-slate-500 to-red-500 rounded-lg text-white"
            >
              Vivek's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign in with your email and password
            or with Google.
          </p>
        </div>

        <div className="flex-1">
          {/* right div */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value=" Your email" />
              <TextInput
                type="email"
                placeholder="xyz@email.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="*******"
                id="password"
                onChange={handleChange}
              />
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span>Loading...</span>
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
          <div className=" flex gap-2 mt-4">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign-up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
        <div />
      </div>
    </div>
  );
}

import { Alert, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "flowbite-react";
import { Button } from "flowbite-react";
import OAuth from "../components/OAuth";
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(() => {
      return { ...formData, [e.target.id]: e.target.value.trim() };
    });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      return setErrorMessage("please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>

        <div className="flex-1">
          {/* right div */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
              />
            </div>
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
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className=" flex gap-2 mt-4">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign-in
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

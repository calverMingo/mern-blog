import { Textarea } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { Label } from "flowbite-react";
import { Button } from "flowbite-react";

export default function SignUp() {
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

          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your username" />
              <Textarea type="text" placeholder="username" id="username" />
            </div>
            <div>
              <Label value=" Your email" />
              <Textarea type="text" placeholder="xyz@email.com" id="email" />
            </div>
            <div>
              <Label value="Your password" />
              <Textarea type="text" placeholder="*******" id="password" />
            </div>

            <Button gradientDuoTone="purpleToPink" type="submit">
              SignUp
            </Button>
          </form>

          <div className=" flex gap-2 mt-4">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign-in
            </Link>
          </div>
        </div>
        <div />
      </div>
    </div>
  );
}

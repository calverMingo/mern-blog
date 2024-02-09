import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

      <form className="flex flex-col gap-4 ">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full object-cover border-8 border-[lightgray] h-full w-full"
          />
        </div>

        <TextInput
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          type="text"
        ></TextInput>

        <TextInput
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          type="email"
        ></TextInput>

        <TextInput
          id="password"
          placeholder="password"
          defaultValue="********"
          type="password"
        ></TextInput>
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>

        <span className="cursor-pointer">Delete Account</span>
      </div>
    </div>
  );
}

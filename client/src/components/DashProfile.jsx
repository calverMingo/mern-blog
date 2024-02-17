import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { app } from "../firebase";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
  updateStart,
  updateInSuccess,
  updateInFailure,
} from "../redux/user/userslice";

export default function DashProfile() {
  const [imageFile, setImageFile] = useState(null);

  const [imageFileUrl, setImageFileUrl] = useState(null);

  const [imageFileUploadProgress, setImageFileuploadProgress] = useState(null);

  const [imageFileUploaderror, setImageFileuploaderror] = useState(null);

  const filePickerRef = useRef();

  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});

  const [imageFileUploading, setImageFileUploading] = useState(false);

  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);

  const [updateUserError, setUpdateUserError] = useState(null);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);

    setImageFileuploaderror(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileuploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileuploaderror(
          "Could not upload the file(file must be less that 2MB"
        );
        setImageFileuploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formData).length === 0) {
      setUpdateUserError("no changes are made");
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError("please wait for image to upload");
      return;
    }
    try {
      dispatch(updateStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(updateInFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateInSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateInFailure(data.message));
      setUpdateUserError(data.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />

        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,142,199,${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}

          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full object-cover border-8 border-[lightgray] h-full w-full  ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>

        {imageFileUploaderror && (
          <Alert color="failure">{imageFileUploaderror}</Alert>
        )}

        <TextInput
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          type="text"
          onChange={handleChange}
        />

        <TextInput
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          type="email"
          onChange={handleChange}
        />

        <TextInput
          id="password"
          placeholder="password"
          defaultValue="********"
          type="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>

        <span className="cursor-pointer">Delete Account</span>
      </div>

      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}

      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
    </div>
  );
}

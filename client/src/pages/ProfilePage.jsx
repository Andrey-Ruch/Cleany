import { useState } from "react";
import { FormRow, SubmitBtn, UploadBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, redirect, useOutletContext } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import avatarPlaceHolder from "../assets/images/avatarPlaceHolder.png";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();

    // const file = formData.get("avatar");
    // if (file && file.size > 500000) {
    //   toast.error("Image size too large");

    //   return null;
    // }

    try {
      const res = await customFetch.patch("/users/updateUser", formData);
      queryClient.invalidateQueries(["user"]);
      toast.success(res.data.msg);

      return redirect("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      return null;
    }
  };

const ProfilePage = () => {
  const {
    user: { firstName, lastName, email, avatar },
  } = useOutletContext();

  // State to manage image preview
  const [imagePreview, setImagePreview] = useState(
    avatar?.url || avatarPlaceHolder
  );

  // Function to handle file change and update image preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Create a preview URL for the selected image
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Profile</h4>

        <div className="avatar-preview-container">
          <img
            src={imagePreview}
            alt="Image Preview"
            className="img avatar-preview"
          />

          <UploadBtn
            label="Upload image"
            name="avatar"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-center">
          <FormRow
            type="text"
            labelText="First name"
            name="firstName"
            required
            defaultValue={firstName}
          />

          <FormRow
            type="text"
            labelText="Last name"
            name="lastName"
            required
            defaultValue={lastName}
          />

          <FormRow type="email" name="email" required defaultValue={email} />
        </div>

        <SubmitBtn formBtn text="Save changes" />
      </Form>
    </Wrapper>
  );
};

export default ProfilePage;

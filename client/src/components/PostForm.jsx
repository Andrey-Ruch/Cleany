import { useState } from "react";
import {
  FormRow,
  FormRowSelect,
  FormRowTextArea,
  LocationContainer,
  SubmitBtn,
  UploadBtn,
} from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import {
  JOB_TAGS,
  JOB_SCOPES,
  EXPERIENCE,
  RATES,
  LANGUAGES,
} from "../utils/constants";
import { Form } from "react-router-dom";

const PostForm = ({ isJobRoute, title, obj = {} }) => {
  const experienceOptions = [
    isJobRoute
      ? { label: "Doesn't matter", value: "Doesn't matter" }
      : { label: "No experience", value: "No experience" },
    ...EXPERIENCE,
  ];

  // State to manage image preview
  const [imagePreview, setImagePreview] = useState(obj?.image?.url);

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
      <Form
        method="post"
        className="form"
        autoComplete="none"
        encType="multipart/form-data"
      >
        <h4 className="form-title">{title}</h4>

        <div className="form-center">
          {isJobRoute && (
            <FormRow
              type="text"
              name="title"
              required
              defaultValue={obj?.title}
            />
          )}

          <FormRowSelect
            name="scope"
            options={JOB_SCOPES}
            defaultValue={obj?.scope}
            closeMenuOnSelect={true}
            required
          />

          <FormRowSelect
            name="experience"
            options={experienceOptions}
            defaultValue={obj?.experience}
            closeMenuOnSelect={true}
            required
          />

          <FormRowSelect
            name="rate"
            options={RATES}
            defaultValue={obj?.rate}
            closeMenuOnSelect={true}
            required
          />
        </div>

        <div className="form-bottom">
          <FormRowSelect
            name="languages"
            options={LANGUAGES}
            defaultValue={obj?.languages}
            closeMenuOnSelect={false}
            isMulti
            required
          />

          <FormRowSelect
            name="tags"
            options={JOB_TAGS}
            defaultValue={obj?.tags}
            closeMenuOnSelect={false}
            isMulti
            required
          />

          <FormRowTextArea
            type="text"
            name="description"
            required
            defaultValue={obj?.description}
          />

          <LocationContainer
            fullAddress={obj?.address}
            latitude={obj?.latitude}
            longitude={obj?.longitude}
          />

          {isJobRoute && (
            <div className="job-image-container">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="img job-image-preview"
                />
              )}

              <UploadBtn
                label="Upload image"
                name="jobImage"
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>

        <SubmitBtn formBtn />
      </Form>
    </Wrapper>
  );
};

export default PostForm;

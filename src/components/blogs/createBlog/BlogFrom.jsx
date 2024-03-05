import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Field from "../../../common/Field";
import useBlogs from "../../../hooks/useBlogs";

const BlogForm = ({ EditBlog = null }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isEdit] = useState(EditBlog ? true : false);
  const { createBlog, editBlog } = useBlogs();

  const [imagePreview, setImagePreview] = useState(
    EditBlog ? EditBlog.thumbnail : null
  );

  const navigate = useNavigate();
  const fileUploadRef = useRef(null);

  const handleImageUpload = () => {
    fileUploadRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    fileUploadRef.current.value = "";
  };

  const handleFormSubmit = async (formData) => {
    let blogData = new FormData();
    let BlogInfo;
    // Add title, content, and tags to formData
    blogData.append("title", formData.title);
    blogData.append("content", formData.content);
    blogData.append("tags", formData.tags);

    // Add image to formData
    if (fileUploadRef.current.files[0]) {
      blogData.append("thumbnail", fileUploadRef.current.files[0]);
    }

    // check if it is edit or create
    if (!isEdit) {
      BlogInfo = await createBlog(blogData);
      reset();
      setImagePreview(null);
    } else {
      BlogInfo = await editBlog(blogData, EditBlog.id);
    }

    if (BlogInfo) {
      const id = BlogInfo.id;
      navigate(`/singleBlog/${id}`);
    }
  };

  return (
    <form className="createBlog" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4 relative">
        {imagePreview && (
          <>
            <img
              src={imagePreview}
              alt="Uploaded"
              className="absolute inset-0 w-full h-full object-cover rounded-md"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-white p-1 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </>
        )}

        <div
          className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer"
          onClick={handleImageUpload}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <p>Upload Your Image</p>
          <input
            type="file"
            id="file"
            ref={fileUploadRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
      </div>

      <Field label="Title" htmlFor="title" error={errors.title}>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter your blog title"
          defaultValue={isEdit ? EditBlog.title : ""}
          {...register("title", { required: "Title is required" })}
        />
      </Field>

      <Field label="Tags" htmlFor="tags" error={errors.tags}>
        <input
          type="text"
          className="w-full p-3 text-red-50 "
          id="tags"
          name="tags"
          defaultValue={isEdit ? EditBlog.tags : ""}
          placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
          {...register("tags", { required: "Tags are required" })}
        />
      </Field>

      <Field label="Content" htmlFor="content" error={errors.content}>
        <textarea
          id="content"
          name="content"
          placeholder="Write your blog content"
          rows="8"
          defaultValue={isEdit ? EditBlog.content : ""}
          {...register("content", { required: "Content is required" })}
        ></textarea>
      </Field>

      <Field>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
        >
          {isEdit ? "Update Blog" : "Create Blog"}
        </button>
      </Field>
    </form>
  );
};

BlogForm.propTypes = {
  EditBlog: PropTypes.object,
};

export default BlogForm;

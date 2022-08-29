import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useNavigate, useParams } from "react-router-dom";
const axios = require("axios").default;

const Form = () => {
  let { id } = useParams();
  const [imgPreview, setImgPreview] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    if (id) getPageData();
    if (!id) {
      formik.resetForm();
    }
  }, [id]);

  const getPageData = async () => {
    const my = new URL("http://localhost:8000/interview/" + id);
    axios({
      method: "get",
      url: my,
      responseType: "stream",
    })
      .then(function (response) {
        // handle success
        let data = response.data.data;
        console.log(response);
        formik.setFieldValue("name", data.name);
        formik.setFieldValue("email", data.email);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  let initialValues = {
    name: "",
    email: "",
    photo: "",
  };
  let validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter name"),
    email: Yup.string().required("Please enter email"),
    // photo: Yup.string().required("Please enter photo"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      Submit(values);
    },
  });
  const Submit = async (values) => {
    let postData = {
      name: values.name,
      email: values.email,
    };

    function addorudpate() {
      if (id) return `update/${id}`;
      else return "create";
    }

    const my = new URL(`http://localhost:8000/interview/${addorudpate()}`);
    axios({
      method: "POST",
      url: my,
      data: postData,
      responseType: "stream",
    })
      .then(function (response) {
        let data = response.data.data;
        console.log(data);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const imageFormik = useFormik({
    initialValues: {
      image: "",
    },
    validationSchema: Yup.object().shape({}),
    onSubmit: async (values) => {},
  });
  const handleImageChange = async (e) => {
    const imageFile = e?.target?.files[0];
    console.log(imageFile);

    var reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = async function () {
      setImgPreview(reader.result);
    };

    //image
    // const my = new URL(`http://localhost:8000/api/image`);
    // axios({
    //   method: "POST",
    //   url: my,
    //   data: { image: imageFile },
    //   responseType: "stream",
    // })
    //   .then(function (response) {
    //     let data = response.data.data;
    //     console.log(data);
    //     navigate("/");
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    let data;
    const formData = new FormData();
    formData.append("image", imageFile);
    const my = new URL(`http://localhost:8000/api/image`);
    // const my = new URL(`http://localhost:8000/myImg`);
    axios({
      method: "POST",
      url: my,
      data: formData,
      responseType: "stream",
    })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;

    //image

    await imageFormik.setFieldValue("userImage", imageFile);
    await imageFormik.handleSubmit();
  };

  return (
    <>
      <div className="row mb-4">
        <div className="col-sm-12">
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-header py-3 bg-transparent">
              {id ? "Edit" : "Add"}
            </div>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <label className="form-label">Name</label>
                  </div>
                  <div className="col-sm-9">
                    <input
                      {...formik.getFieldProps("name")}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  {formik?.touched?.name && formik.errors?.name ? (
                    <div className="errorMsg">{formik.errors?.name}</div>
                  ) : null}
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <label className="form-label">Email</label>
                  </div>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control"
                      {...formik.getFieldProps("email")}
                    />
                  </div>
                  {formik?.touched?.email && formik.errors?.email ? (
                    <div className="errorMsg">{formik.errors?.email}</div>
                  ) : null}
                </div>

                <div className="row mb-3">
                  <div className="col-sm-3">
                    <label className="form-label">Image</label>
                  </div>
                  <div className="col-sm-9">
                    <div className="bigImgUploader">
                      {imageFormik.values.userImage ? (
                        <img
                          src={`${imgPreview || imageFormik.values.userImage}`}
                          className="img-fluid"
                        />
                      ) : (
                        <img
                          src={`/assets/images/default.png`}
                          className="img-fluid"
                        />
                      )}
                      <i className="fa fa-pen"></i>
                      <input
                        onChange={(e) => handleImageChange(e)}
                        type="file"
                        className="form-control"
                      />
                    </div>
                    {formik?.touched?.email && formik.errors?.email ? (
                      <div className="errorMsg">{formik.errors?.email}</div>
                    ) : null}
                    {/* <ErrorMessage formik={imageFormik} name="userImage" />
                    <ErrorMessage formik={formik} name="image" /> */}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-3"></div>
                  <div className="col-sm-9">
                    <button type="submit" className="btn-theme btn-custom">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;

import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import React from "react";
import * as Yup from "yup";
import Alert from "./Alert";
import Spinner from "./Spinner";

const ClientForm = ({ client, loading }) => {
  const navigate = useNavigate();

  const newClientSchema = Yup.object().shape({
    names: Yup.string()
      .min(3, "The Name is too short")
      .max(30, "The Name is too long")
      .required("Client Name is Required"),
    company: Yup.string().required("Company Name is Required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    telephone: Yup.number()
      .positive("Invalid Number")
      .integer("Invalid Number")
      .typeError("Invalid Number"),
    notes: "",
  });

  const handleSubmit = async (values) => {
    try {
      let response;
      if (client.id) {
        // Edit Client
        const url = `${import.meta.env.VITE_API_URL}/${client.id}`;
        response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        // New Client
        const url = import.meta.env.VITE_API_URL;
        response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      await response.json();
      navigate("/clients");
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {client?.names ? "Edit Client" : "Add Client"}
      </h1>
      <Formik
        initialValues={{
          names: client?.names ?? "",
          company: client?.company ?? "",
          email: client?.email ?? "",
          telephone: client?.telephone ?? "",
          notes: client?.notes ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={newClientSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="names">
                  Name:
                </label>
                <Field
                  id="names"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Client Name"
                  name="names"
                />
                {errors.names && touched.names ? (
                  <Alert>{errors.names}</Alert>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="company">
                  Company:
                </label>
                <Field
                  id="company"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Company Name"
                  name="company"
                />
                {errors.company && touched.company ? (
                  <Alert>{errors.company}</Alert>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  Email:
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Client Email"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alert>{errors.email}</Alert>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="telephone">
                  Telephone:
                </label>
                <Field
                  id="telephone"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Client Telephone"
                  name="telephone"
                />
                {errors.telephone && touched.telephone ? (
                  <Alert>{errors.telephone}</Alert>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="notes">
                  Notes:
                </label>
                <Field
                  as="textarea"
                  id="notes"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  placeholder="Client Notes"
                  name="notes"
                />
              </div>
              <input
                type="submit"
                value={client?.names ? "Edit Client" : "Add Client"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

ClientForm.defaultProps = {
  client: {},
  loading: false,
};

export default ClientForm;

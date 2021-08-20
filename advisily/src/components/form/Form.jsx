import React from "react";
import { Formik, Form as FormikForm } from "formik";
import FormWrapper from "./FormWrapper";
import FormError from "./FormError";
function Form({
  initialValues,
  validationSchema,
  onSubmit,
  title,
  errorMessage,
  children,
  ...rest
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      {...rest}
    >
      <FormWrapper title={title}>
        <FormikForm>{children}</FormikForm>
        <FormError errorMessage={errorMessage} />
      </FormWrapper>
    </Formik>
  );
}

export default Form;

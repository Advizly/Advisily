import React from "react";
import { Formik, Form as FormikForm } from "formik";
import FormWrapper from "./FormWrapper";
function Form({
  initialValues,
  validationSchema,
  onSubmit,
  title,
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
      </FormWrapper>
    </Formik>
  );
}

export default Form;

import React, { useState } from "react";
import * as Yup from "yup";

import { Form, SubmitButton } from "../common/form";
import TakenCourses from "./TakenCourses";
import PreferencesInfo from "./PreferencesInfo";
import MajorInfo from "./MajorInfo";

function AdvisingForm(props) {
  const [step, setStep] = useState(1);

  const next = () => {
    setStep(step + 1);
  };
  const back = () => {
    setStep(step - 1);
  };

  const initialValues = {
    //MajorInfo
    major: "2",
    catalog: "1",
    isMinoring: "",
    minors: [],
    isDoubleMajoring: "",
    secondMajor: "",
    secondMajorCatalog: "",
    //Prefernces
    pace: "2",
    takingSummer: "",
    takingWinter: "",
    isOverloading: "",
    winterCredits: "",
    summerCredits: "",
    //takenCourses
    courseId: [],
  };

  const validationSchema = Yup.object({
    //Major Info
    major: Yup.string().required("You must select a major"),
    isMinoring: Yup.boolean(),
    minors: Yup.array().required(),
    isDoubleMajoring: Yup.boolean(),
    secondMajor: Yup.string()
      .notRequired()
      .when("isDoubleMajoring", {
        is: true,
        then: Yup.string().required("Select your second major"),
      }),
    secondMajorCatalog: Yup.string()
      .notRequired()
      .when("isDoubleMajoring", {
        is: true,
        then: Yup.string().required("Required"),
      }),
    //Preferences
    pace: Yup.string().required("You must select a pace for your plan"),
    takingSummer: Yup.boolean().required("Taking courses this summer?"),
    takingWinter: Yup.boolean().required("Taking courses this Winter?"),
    isOverloading: Yup.boolean().required("Are you overloading?"),
    winterCredits: Yup.number().when("takingWinter", {
      is: true,
      then: Yup.number()
        .required("how many credis are you taking?")
        .min(1)
        .max(4)
        .label("Number of credits in winter"),
    }),
    summerCredits: Yup.number()
      .min(0)
      .max(7)
      .when("takingSummer", {
        is: true,
        then: Yup.number()
          .required("how many credis are you taking?")
          .min(1)
          .max(7)
          .label("Number of credits"),
      }),
    //taken courses
    courseId: Yup.array().required(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    alert(JSON.stringify(values, null, 2));
    setInterval(() => {
      setSubmitting(false);
    }, 2000);
  };

  switch (step) {
    case 1:
      return (
        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          title={"Major Info"}
          onSubmit={handleSubmit}
        >
          <MajorInfo onNext={next} />
        </Form>
      );
    case 2:
      return (
        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          title={"Prefernces"}
          onSubmit={handleSubmit}
        >
          <PreferencesInfo onNext={next} onBack={back} />
        </Form>
      );
    case 3:
      return (
        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          title={"Courses Taken"}
          onSubmit={handleSubmit}
        >
          <TakenCourses onBack={back} />
        </Form>
      );
    default:
      return null;
  }
}

export default AdvisingForm;

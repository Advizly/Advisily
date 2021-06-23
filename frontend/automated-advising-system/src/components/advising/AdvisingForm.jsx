import React, { useState } from "react";
import * as Yup from "yup";

import { Form } from "../common/form";
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
    if (!window.confirm("Are you sure you want to submit this answer?")) return;
    console.log(values);
    alert(JSON.stringify(values, null, 2));
    setInterval(() => {
      setSubmitting(false);
    }, 2000);

    props.history.replace("/advising/results");
  };

  const getFormChild = () => {
    switch (step) {
      case 1:
        return <MajorInfo onNext={next} />;
      case 2:
        return <PreferencesInfo onNext={next} onBack={back} />;
      case 3:
        return <TakenCourses onBack={back} />;
      default:
        return null;
    }
  };
  const getFormTitle = () => {
    if (step === 1) return "Major Info";

    return step === 2 ? "Preferences" : "Finished Courses";
  };
  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      title={getFormTitle()}
      onSubmit={handleSubmit}
    >
      {getFormChild()}
    </Form>
  );
}

export default AdvisingForm;

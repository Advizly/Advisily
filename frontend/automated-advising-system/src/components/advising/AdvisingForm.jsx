import React, { useState } from "react";
import * as Yup from "yup";

import { Form } from "../common/form";
import FinishedCourses from "./FinishedCourses";
import PreferencesInfo from "./PreferencesInfo";
import MajorInfo from "./MajorInfo";
import CustomizationsInfo from "./CustomizationsInfo";

function AdvisingHome(props) {
  const [step, setStep] = useState(3);

  const next = () => {
    setStep(step + 1);
  };
  const back = () => {
    setStep(step - 1);
  };

  const initialValues = {
    //MajorInfo
    majorId: "2",
    catalogId: "1",
    isMinoring: "",
    minorsId: [],
    isDoubleMajoring: "",
    secondMajorId: "",
    secondMajorCatalogId: "",
    //Prefernces
    isOverloading: "",
    takingSummer: "",
    summerCredits: 0,
    takingWinter: "",
    winterCredits: 0,
    //takenCourses
    finishedCoursesId: [],
    //Customizations
    paceId: "2",
    semestersToPlan: "1",
  };

  const validationSchema = Yup.object({
    //Major Info
    majorId: Yup.string().required("Required"),
    catalogId: Yup.string().required("Required"),
    isMinoring: Yup.boolean().required("Required"),
    minorsId: Yup.array().required(),
    isDoubleMajoring: Yup.boolean().required("Required"),
    secondMajorId: Yup.string()
      .notRequired()
      .when("isDoubleMajoring", {
        is: true,
        then: Yup.string().required("Select your second major"),
      }),
    secondMajorCatalogId: Yup.string()
      .notRequired()
      .when("isDoubleMajoring", {
        is: true,
        then: Yup.string().required("Required"),
      }),
    //Preferences
    isOverloading: Yup.boolean().required("Are you overloading?"),
    takingSummer: Yup.boolean().required("Taking courses this summer?"),
    winterCredits: Yup.number().when("takingWinter", {
      is: true,
      then: Yup.number()
        .required("how many credits are you taking?")
        .min(1)
        .max(4)
        .label("Number of credits in winter"),
    }),
    takingWinter: Yup.boolean().required("Taking courses this Winter?"),
    summerCredits: Yup.number()
      .min(0)
      .max(7)
      .when("takingSummer", {
        is: true,
        then: Yup.number()
          .required("how many credits are you taking?")
          .min(1)
          .max(7)
          .label("Number of credits"),
      }),
    //taken courses
    finishedCoursesId: Yup.array().required(),
    //Customizations
    paceId: Yup.string().required("You must select a pace for your plan"),
    semestersToPlan: Yup.number().required("Required").min(1),
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
        return <FinishedCourses onNext={next} onBack={back} />;
      case 4:
        return <CustomizationsInfo onBack={back} />;
      default:
        return null;
    }
  };
  const getFormTitle = () => {
    switch (step) {
      case 1:
        return "Major Info";
      case 2:
        return "Preferences Info";
      case 3:
        return "Finished Courses";
      case 4:
        return "Customizations";
      default:
        return "Advising";
    }
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

export default AdvisingHome;

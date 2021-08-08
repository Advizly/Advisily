import React, { useState } from "react";
import * as Yup from "yup";

import { Form, SubmitButton } from "../common/form";
import FinishedCourses from "./FinishedCourses";
import PreferencesInfo from "./PreferencesInfo";
import MajorInfo from "./MajorInfo";
import CustomizationsInfo from "./CustomizationsInfo";

function AdvisingHome(props) {
  const [step, setStep] = useState(1);

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
    isMinoring: "false",
    minorsId: [],
    isDoubleMajoring: "true",
    secondMajorId: "3",
    secondMajorCatalogId: "1",
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
        return (
          <>
            <h5>
              We retrieved the data you entered while signing up, but you can
              change any of them!
            </h5>
            <br />
            <MajorInfo changeButton={true} />
          </>
        );
      case 2:
        return <PreferencesInfo />;
      case 3:
        return <FinishedCourses />;
      case 4:
        return <CustomizationsInfo />;
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

      <div className="d-flex justify-content-between ">
        {step > 1 && (
          <button className="btn my-3" onClick={back} type="button">
            Back
          </button>
        )}
        {step < 4 && (
          <button className="btn my-3 ms-auto" onClick={next} type="button">
            Next
          </button>
        )}
        {step === 4 && <SubmitButton label="Generate Plan" />}
      </div>
    </Form>
  );
}

export default AdvisingHome;

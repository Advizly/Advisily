import React, { useState } from "react";
import CoursesForm from "./CoursesForm";
import AdvisingQuestions from "./AdvisingQuestions";
import { Form } from "../common/form";
import * as Yup from "yup";

function AdvisingForm(props) {
  const [step, setStep] = useState(2);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleShowAdvanced = () => setShowAdvanced(!showAdvanced);
  const next = () => {
    setStep(step + 1);
  };
  const back = () => {
    setStep(step - 1);
  };

  const initialValues = {
    courseId: ["1000"],
    takingSummer: "",
    takingWinter: "",
    overloading: "",
    winterCredits: "",
    summerCredits: "",
    nextSemesterCrdits: 15,
    isMinoring: false,
    isDoubleMajoring: false,
    minors: [],
    doubleMajors: [],
  };
  const validationSchema = Yup.object({
    courseId: Yup.array().required(),
    takingSummer: Yup.boolean().required().label("This"),
    takingWinter: Yup.boolean().required().label("This"),
    overloading: Yup.boolean().required().label("This"),
    winterCredits: Yup.number().when("takingWinter", {
      is: true,
      then: Yup.number()
        .required()
        .min(1)
        .max(4)
        .label("Number of credits in winter"),
    }),
    summerCredits: Yup.number()
      .min(0)
      .max(7)
      .when("takingSummer", {
        is: true,
        then: Yup.number().required().min(1).max(7).label("Number of credits"),
      }),
    nextSemesterCrdits: Yup.number().min(12).max(21).label("Number of credits"),
    isMinoring: Yup.boolean(),
    isDoubleMajoring: Yup.boolean(),
    minorrs: Yup.array(),
    doubleMajors: Yup.array(),
  });

  const handleSubmit = (values, { setSubmitting, ...others }) => {
    console.log(values);

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
          title={"Advising"}
          onSubmit={handleSubmit}
        >
          <CoursesForm onNext={next} />
        </Form>
      );
    case 2:
      return (
        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          title={"Advising"}
          onSubmit={handleSubmit}
        >
          <AdvisingQuestions
            onBack={back}
            showSpecialOptions={showAdvanced}
            onShowAdvanced={handleShowAdvanced}
          />
        </Form>
      );
  }
}

export default AdvisingForm;

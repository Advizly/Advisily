import React from "react";

import { Form, SubmitButton } from "../../components/form";
import CoursesSubForm from "../../subforms/coursesSubForm/coursesSubForm";
import PreferencesInfo from "../../subforms/preferncesSubForm/PreferencesInfo";
import MajorInfo from "../../subforms/majorSubForm/MajorInfo";

//hooks
import { useUserMajorInfo, useFormStep, useUserCourses } from "../../hooks";

//services
import { authService } from "../../services";

//utils
import {
  updateUserMajor,
  updateUserMinors,
  updateStudentCourses,
  updateAdvisingInfo,
} from "../../utils/advisingSubmissionUtils";

import validationSchema from "./validationSchema";
import defaultValues from "./defaultValues";
function AdvisingForm(props) {
  const { step, back, next } = useFormStep();
  const userMajorInfo = useUserMajorInfo();

  const userCoursesInfo = useUserCourses();
  const { studentId } = authService.getCurrentUser();

  const initialValues = {
    ...defaultValues,
    ...userMajorInfo,
    ...userCoursesInfo,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (window.confirm("Are you sure you want to submit?")) {
      try {
        console.log("Submitting values: ", values);
        const {
          minorIds: oldMinorIds,
          majorId: oldMajorId,
          econdMajorId: oldSecondMajorId,
        } = userMajorInfo;
        console.log("student id: ", studentId);
        updateStudentCourses(
          studentId,
          values.coursesIds,
          userCoursesInfo.coursesIds
        );

        updateUserMajor(
          studentId,
          values.majorId,
          values.catalogId,
          oldMajorId
        );
        updateUserMajor(
          studentId,
          values.secondMajorId,
          values.secondCatalogId,
          oldSecondMajorId
        );

        updateUserMinors(studentId, values.minorIds, oldMinorIds);
        updateAdvisingInfo(studentId, values);
      } catch (e) {
        console.log(e);
      }

      props.history.replace("/advising/results");
    }

    setSubmitting(false);
  };

  const getFormChild = () => {
    switch (step) {
      case 1:
        return <MajorInfo />;
      case 2:
        return <PreferencesInfo />;
      case 3:
        return <CoursesSubForm />;

      default:
        return null;
    }
  };
  const getFormTitle = () => {
    switch (step) {
      case 1:
        return "Major Info";
      case 2:
        return "Preferences";
      case 3:
        return "Catalog Courses";
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
      enableReinitialize={true}
    >
      {getFormChild()}

      <div className="d-flex justify-content-between ">
        {step > 1 && (
          <button className="btn my-3" onClick={back} type="button">
            Back
          </button>
        )}
        {step < 3 && (
          <button className="btn my-3 ms-auto" onClick={next} type="button">
            Next
          </button>
        )}
        {step === 3 && <SubmitButton label="Generate Plan" />}
      </div>
    </Form>
  );
}

export default AdvisingForm;

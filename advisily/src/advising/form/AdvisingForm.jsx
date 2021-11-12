import React, { useEffect, useState } from "react";

import { Form, SubmitButton } from "../../components/form";
import CoursesSubForm from "../../subforms/coursesSubForm/coursesSubForm";
import PreferencesInfo from "../../subforms/preferncesSubForm/PreferencesInfo";
import MajorInfo from "../../subforms/majorSubForm/MajorInfo";

//hooks
import {
  useUserMajorInfo,
  useFormStep,
  useUserCourses,
  useAuth,
} from "../../hooks";

//services
import { advisingService, userService } from "../../services";

//utils
import {
  updateUserMajor,
  updateUserMinors,
  updateStudentCourses,
} from "../../utils/advisingSubmissionUtils";

import validationSchema from "./validationSchema";
import defaultValues from "./defaultValues";

function AdvisingForm(props) {
  const { step, back, next } = useFormStep(0);
  const userMajorInfo = useUserMajorInfo();

  const userCoursesInfo = useUserCourses();
  const { userId, standingId } = useAuth(true);

  const initialValues = {
    ...defaultValues,
    ...userMajorInfo,
    ...userCoursesInfo,
    standingId: standingId === null ? "" : standingId,
    semesterNumber: 1,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Submitting: ", values);

    if (window.confirm("Are you sure you want to submit?")) {
      try {
        const {
          minorIds: oldMinorIds,
          majorId: oldMajorId,
          secondMajorId: oldSecondMajorId,
          catalogId: oldCatalogId,
          secondCatalogId: oldSecondCatalogId,
        } = userMajorInfo;
        const { standingId } = values;

        userService.update(userId, { standingId });
        updateStudentCourses(
          userId,
          values.coursesIds,
          userCoursesInfo.coursesIds
        );
        updateUserMajor(
          userId,
          values.majorId,
          values.catalogId,
          oldCatalogId,
          oldMajorId
        );
        updateUserMajor(
          userId,
          values.secondMajorId,
          values.secondCatalogId,
          oldSecondCatalogId,
          oldSecondMajorId
        );

        updateUserMinors(userId, values.minorIds, oldMinorIds);
        // updateAdvisingInfo(userId, values);
        const { advisingSessionId } = await advisingService.addAdvisingSession({
          ...values,
          userId,
        });
        await advisingService.generatePlan(advisingSessionId);
        advisingService.saveAdvisingSession(advisingSessionId);
      } catch (e) {
        console.log("ERROR in submission: ", e);
      }

      props.history.replace("/advising/results");
    }

    setSubmitting(false);
  };

  const getFormChild = () => {
    switch (step) {
      case 0:
        return (
          <>
            <p className="h5">
              <strong className="h4 clr-danger">Important: </strong>
              This system is meant to help you with your advising but it is not
              perfect. You are still <strong>responsible</strong> to check your
              catalog and courses plan to ensure no issues will happen during
              registeration.
            </p>
            <br />
          </>
        );
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
      case 0:
        return "DISCLAIMER";
      case 1:
        return "Major Info";
      case 2:
        return "Preferences";
      case 3:
        return "Finished Courses";
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
        {step > 0 && (
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

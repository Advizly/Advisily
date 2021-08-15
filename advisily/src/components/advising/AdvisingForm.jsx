import React from "react";
import * as Yup from "yup";
import _ from "lodash";

import { Form, SubmitButton } from "../common/form";
import FinishedCourses from "./FinishedCourses";
import PreferencesInfo from "./PreferencesInfo";
import MajorInfo from "./MajorInfo";
import CustomizationsInfo from "./CustomizationsInfo";
import useStudentAcademicData from "../../hooks/useStudentAcademicData";
import useFormStep from "../../hooks/useFormStep";
import {
  addStudentCourse,
  deleteStudentCourse,
  addStudentMajor,
  addStudentMinor,
  deleteStudentMajor,
  deleteStudentMinor,
} from "../../services/userService";
import { getCurrentUser } from "../../services/authService";
import {
  addAdvisingSession,
  getAdvisingSession,
  updateAdvisingSessions,
} from "../../services/advisingService";

function AdvisingHome(props) {
  const { step, back, next } = useFormStep();
  const {
    firstMajor,
    minors,
    secondMajor,
    coursesIds,
    generalElectiveCredits,
  } = useStudentAcademicData();
  const academicInfo = {
    initialValues: {
      majorId: firstMajor.major_id,
      catalogId: firstMajor.catalog_id,
      isMinoring: minors.isMinoring,
      minorIds: minors.minorIds,
      isDoubleMajoring: secondMajor.isDoubleMajoring,
      secondMajorId: secondMajor.major_id,
      secondCatalogId: secondMajor.catalog_id,
      coursesIds: coursesIds,
      generalElectiveCredits: generalElectiveCredits,
    },
    schema: {
      majorId: Yup.string().required("Required"),
      catalogId: Yup.string().required("Required"),
      isMinoring: Yup.boolean().required("Required"),
      minorIds: Yup.array().required(),
      isDoubleMajoring: Yup.boolean().required("Required"),
      secondMajorId: Yup.string()
        .notRequired()
        .when("isDoubleMajoring", {
          is: true,
          then: Yup.string().required("Select your second major"),
        }),
      secondCatalogId: Yup.string()
        .notRequired()
        .when("isDoubleMajoring", {
          is: true,
          then: Yup.string().required("Required"),
        }),
      coursesIds: Yup.array().required(),
      generalElectiveCredits: Yup.number()
        .integer()
        .min(0)
        .required("Required")
        .label("Number of general electives"),
    },
  };
  const preferencesInfo = {
    initialValues: {
      overloading: "false",
      takingSummer: "false",
      takingWinter: "false",
      overloadingCredits: 0,
      summerCredits: 0,
      winterCredits: 0,
      paceId: "2",
      semestersPlanned: "1",
    },
    schema: {
      overloading: Yup.boolean().required("Are you overloading?"),
      overloadingCredits: Yup.number().when("overloading", {
        is: true,
        then: Yup.number()
          .min(1)
          .required("how many credits are you taking?")
          .label("Overloading credits"),
      }),
      takingSummer: Yup.boolean().required("Taking courses this summer?"),
      winterCredits: Yup.number().when("takingWinter", {
        is: true,
        then: Yup.number()
          .required("how many credits are you taking?")
          .min(1)
          .max(4)
          .label("Credits in winter"),
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
            .label("Credits in summer"),
        }),
      //Customizations
      paceId: Yup.string().required("You must select a pace for your plan"),
      semestersPlanned: Yup.number().required("Required").min(1),
    },
  };
  const initialValues = {
    ...academicInfo.initialValues,
    ...preferencesInfo.initialValues,
  };

  const validationSchema = Yup.object({
    ...academicInfo.schema,
    ...preferencesInfo.schema,
  });

  const updateStudentCourses = (values) => {
    const selectedCourses = values.coursesIds;
    const newCourses = selectedCourses.filter(
      (id) => coursesIds.indexOf(id) === -1
    );
    const deletedCourses = coursesIds.filter(
      (id) => selectedCourses.indexOf(id) === -1
    );
    newCourses.forEach((id) => addStudentCourse(900192237, id));
    deletedCourses.forEach((id) => deleteStudentCourse(900192237, id));
  };

  const updateMajorInfo = (values) => {
    const oldMinorIds = minors.minorIds;
    const oldMajorId = firstMajor.major_id;
    const oldSecondMajorId = secondMajor.major_id;
    const {
      majorId,
      catalogId,
      secondMajorId,
      secondCatalogId,
      minorIds: selectedMinorIds,
    } = _.pick(values, [
      "majorId",
      "catalogId",
      "minorIds",
      "secondMajorId",
      "secondCatalogId",
    ]);

    const { studentId } = getCurrentUser();

    //if no old major or old major is different from currently chosen major
    // add new major.
    //delete old major only if two majors(old and new) are different
    if (!oldMajorId && majorId) addStudentMajor(studentId, majorId, catalogId);
    else if (oldMajorId && majorId !== oldMajorId) {
      addStudentMajor(studentId, majorId, catalogId);
      deleteStudentMajor(studentId, oldMajorId);
    }

    if (!oldSecondMajorId && secondMajorId)
      addStudentMajor(studentId, secondMajorId, secondCatalogId);
    else if (oldSecondMajorId && secondMajorId !== oldSecondMajorId) {
      addStudentMajor(studentId, secondMajorId, secondCatalogId);
      deleteStudentMajor(studentId, oldSecondMajorId);
    }

    const newMinorIds = selectedMinorIds.filter(
      (id) => oldMinorIds.indexOf(id) === -1
    );
    const deleteMinorIds = oldMinorIds.filter(
      (id) => selectedMinorIds.indexOf(id) === -1
    );
    newMinorIds.forEach((id) => addStudentMinor(studentId, id));
    deleteMinorIds.forEach((id) => deleteStudentMinor(studentId, id));
  };
  const updateAdvisingInfo = async (values) => {
    const advisingData = _.pick(values, [
      "summerCredits",
      "winterCredits",
      "overloadingCredits",
      "paceId",
      "semestersPlanned",
      "generalElectiveCredits",
    ]);
    advisingData.studentId = getCurrentUser().studentId;

    const advisingSession = await getAdvisingSession(advisingData.studentId);
    console.log(
      "Advising data: ",
      advisingData,
      "\nadvisingSession",
      advisingSession
    );
    if (!advisingSession.length) addAdvisingSession(advisingData);
    else
      updateAdvisingSessions({
        sessionId: advisingSession[0].advising_session_id,
        ...advisingData,
      });
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (window.confirm("Are you sure you want to submit?")) {
      console.log("Submitted values: ", values);

      updateStudentCourses(values);
      updateMajorInfo(values);
      updateAdvisingInfo(values);
      props.history.replace("/advising/results");
    }

    setSubmitting(false);
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
      enableReinitialize={true}
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

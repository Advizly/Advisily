import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import useApi from "../../hooks/useApi";

import {
  getAllCourses,
  getPrefixes as getPrefixesApi,
} from "../../services/coursesService";
import { formatCourseData } from "../../utils/coursesUtils";
import { FormCheckbox } from "../../components/form";
import { COURSES_IDS } from "./fieldNames";
function CoursesModal({ show, onClose }) {
  const prefixesApi = useApi(getPrefixesApi);
  const coursesApi = useApi(getAllCourses, mapCoursestoPrefixes);

  useEffect(() => {
    prefixesApi.request();
    coursesApi.request();
  }, []);

  const handleClose = () => {
    setSelectedPrefix("");
    onClose();
  };
  const [selectedPrefix, setSelectedPrefix] = useState(null);

  const renderCourses = () => {
    const { data: prefixes } = prefixesApi;
    const { data: courses } = coursesApi;

    if (selectedPrefix)
      return courses[selectedPrefix].map((course) => {
        const { courseId, formatedTitle } = formatCourseData(course);
        return (
          <>
            <FormCheckbox
              label={formatedTitle}
              name={COURSES_IDS}
              value={JSON.stringify(courseId)}
            />

            <hr />
          </>
        );
      });

    return prefixes
      .sort((p1, p2) => {
        if (p1 < p2) return -1;
        if (p2 < p1) return 1;
        return 0;
      })

      .map((prefix) => {
        if (prefix === "XXXX") return null;

        return (
          <>
            <button key={prefix} onClick={() => setSelectedPrefix(prefix)}>
              {prefix}
            </button>
            <hr />
            <br />
          </>
        );
      });
  };

  const getTitle = () => (selectedPrefix ? "Courses" : "Prefix");

  return (
    <>
      <Modal
        size="xl"
        show={show}
        onHide={handleClose}
        scrollable
        dialogClassName="modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{getTitle()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderCourses()}</Modal.Body>
        <Modal.Footer>
          {selectedPrefix && (
            <Button
              variant="secondary"
              className="me-auto"
              onClick={() => setSelectedPrefix("")}
            >
              back
            </Button>
          )}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CoursesModal;
function mapCoursestoPrefixes(courses) {
  let prefixMap = {};

  courses.forEach((course) => {
    const { prefix } = course;
    if (prefix === "XXXX") return; //skip pseudo-courses

    if (prefixMap[prefix] !== undefined) prefixMap[prefix].push(course);
    else prefixMap[prefix] = [course];
  });

  return prefixMap;
}

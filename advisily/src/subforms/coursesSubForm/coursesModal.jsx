import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import {
  formatCourseData,
  mapCoursestoPrefixes,
} from "../../utils/coursesUtils";
import { FormCheckbox } from "../../components/form";
import { COURSES_IDS } from "./fieldNames";
function CoursesModal({ show, onClose, courses, prefixes }) {
  const handleClose = () => {
    setSelectedPrefix("");
    onClose();
  };
  const [selectedPrefix, setSelectedPrefix] = useState(null);
  const coursesPrefixMap = mapCoursestoPrefixes(courses);

  const renderCourses = () => {
    if (selectedPrefix)
      return coursesPrefixMap[selectedPrefix].map((course) => {
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

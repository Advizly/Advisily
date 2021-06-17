import React from "react";
import youssefPic from "../assets/youssef.jpg";
import sherifPic from "../assets/sherif.jpg";
import RoundedPicture from "./common/RoundedPicture";
import CardBody from "./common/card/CardBody";
import Card from "./common/card/Card";

import { Row, ColMedium } from "./common/grid";
function AboutUs(props) {
  return (
    <div className="text-center">
      <div>
        <h1>About</h1>
      </div>
      <Row className="d-flex justify-content-center">
        <ColMedium numOfCols="6" className="d-flex justify-content-center">
          <Card>
            <RoundedPicture src={sherifPic} alt="Sherif Aly" />
            <CardBody
              title="Sherif Aly"
              subtitle="Professor and Chair (American University in Cairo)"
            >
              Professor Sherif Aly is a professor and Chair of the Department of
              Computer Science, with significant industrial and governmental
              consultation experience.
            </CardBody>
          </Card>
        </ColMedium>
        <ColMedium numOfCols="6" className="d-flex justify-content-center">
          <Card>
            <RoundedPicture src={youssefPic} alt="Youssef Agiza" />
            <CardBody
              title="Youssef Agiza"
              subtitle="Undergraduate Student (American University in Cairo)"
            >
              Youssef Agiza is an undergraduate student at the American
              University in Cairo majoring in computer science and mathematics.
            </CardBody>
          </Card>
        </ColMedium>
      </Row>
    </div>
  );
}

export default AboutUs;

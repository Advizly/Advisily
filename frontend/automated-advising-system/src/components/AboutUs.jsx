import React from "react";
import youssefPic from "../assets/youssef.jpg";
import sherifPic from "../assets/sherif.jpg";
import RoundedPicture from "./common/RoundedPicture";
import CardBody from "./common/card/CardBody";
import Card from "./common/card/Card";
function AboutUs(props) {
  return (
    <>
      <h1>About</h1>
      <div className="row">
        <div className="col-md-6">
          <Card>
            <RoundedPicture src={sherifPic} />
            <CardBody
              title="Sherif Aly"
              subtitle="Professor and Chair (American University in Cairo)"
            >
              Sherif Aly is a professor and Chair of the Department of Computer
              Science, with significant industrial and governmental consultation
              experience.
            </CardBody>
          </Card>
        </div>
        <div className="col-md-6">
          <Card>
            <RoundedPicture src={youssefPic} />
            <CardBody
              title="Youssef Agiza"
              subtitle="Undergraduate Student (American University in Cairo)"
            >
              Youssef Agiza is an undergraduate student at the American
              University in Cairo majoring in computer science and mathematics.
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

export default AboutUs;

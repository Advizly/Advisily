import React from "react";

function ContactUs(props) {
  console.log("HIIIIIII");

  return (
    <div className=" text-center p-5">
      <h1>Contact Us</h1>
      <p>
        For inquiries or issues, contact us at{" "}
        <a href="youssefagiza@aucegypt.edu">youssefagiza@aucegypt.edu </a>
      </p>
      <p>
        For bugs and technical issues, please open an issue request on our{" "}
        <a href="https://github.com/Youssef-Agiza/AutomatedAdvisingSystem">
          github repository.
        </a>
      </p>
    </div>
  );
}

export default ContactUs;

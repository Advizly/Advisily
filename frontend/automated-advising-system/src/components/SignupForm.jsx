import React, { Component } from "react";
import Input from "./common/Input";
import Form from "./common/Form";

class SignUpForm extends Component {
  state = {};
  handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted");
  }
  render() {
    return (
      <>
        <Form title={"Sign Up"} onSubmit={this.handleSubmit}>
          <Input label="First Name" name="fname" />
          <Input label="Last Name" name="lname" />
          <Input label="AUC Email" name="email" type="email" />
          <Input label="Student ID" name="studentId" type="number" />
          <button className="btn m-2 " type="submit">
            Sign Up
          </button>
        </Form>
      </>
    );
  }
}

export default SignUpForm;

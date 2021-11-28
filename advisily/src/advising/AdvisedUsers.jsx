import React from "react";
import { useEffect } from "react";
import useApi from "../hooks/useApi";
import { advisingService } from "../services";
import { groupCourses } from "../utils/coursesUtils";
import AdvisedUserCard from "./AdvisedUserCard";
import useAuth from "../hooks/useAuth";
import { Redirect } from "react-router";

function AdvisedUsers(props) {
  const user = useAuth();

  // return <Redirect to={"/"} />;
  const {
    data: users,
    error,
    request: getAdvisedUsers,
  } = useApi(advisingService.getAdvisedUsers);

  useEffect(() => {
    getAdvisedUsers();
  }, []);

  const renderStudents = () => {
    if (!users || !users.length) return;
    // console.log(users);

    const groupedUsers = groupCourses(users, 2);
    console.log(groupedUsers);
    return users.map((user) => <AdvisedUserCard user={user} />);
  };
  return (
    <div>
      <h1>Students List</h1>
      {renderStudents()}
    </div>
  );
}

export default AdvisedUsers;

import React from "react";

import { useHistory, Link } from "react-router-dom";
import { ADVISING_RESULTS_ROUTE } from ".";
import Card from "../components/card/Card";
import CardBody from "../components/card/CardBody";

function AdvisedUserCard({ user, ...rest }) {
  // const history = useHistory();

  // const navigateToUserResults = () => {
  //   history.push(ADVISING_RESULTS_ROUTE, {
  //     nameeee: "name",
  //   });
  // };

  return (
    <Card extraClasses="card-wide">
      <CardBody title={user.firstName + " " + user.lastName}>
        <div className="d-flex flex-row justify-content-between">
          <div>
            <strong>ID: </strong> {user.userId}
            <br />
            <strong>Email: </strong>
            {user.email}
          </div>
          <div>
            {/* <Link
              to={{
                pathname: ADVISING_RESULTS_ROUTE,
                search: "helo",
                state: { user: user },
              }}
              state={{ name: "NAME" }}
            >
              <button
                className="btn btn-secondary"
                onClick={navigateToUserResults}
              >
                See Results
              </button>
            </Link> */}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default AdvisedUserCard;

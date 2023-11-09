import React from "react";

function Disclaimer(props) {
  return (
    <div className="w-100 mx-4 px-4">
      {/* <p className="h5">
        This system is meant to help you with your advising but it is not
        perfect. You are still <strong>responsible</strong> to check your
        catalog and courses plan to ensure no issues will happen during
        registeration.
      </p> */}
      <p className="h5 lh-base">
      This automated advising system is still in its <em><strong>trial</strong></em> phase,
       it helps you in the advising process, however, if you have any inquiries you can still meet with a professor. 
       You will be advised with courses to be taken next semester, the system will advise you for semesters ahead, however, seeing ahead in the future is less accurate.
       <br/>
        It is <em><strong>your responsibility</strong></em> to make sure you meet all necessary graduation requirements as per your 
        {" "}<a href="https://catalog.aucegypt.edu/">catalog</a>, and that you have covered the prerequisites of the advised courses accordingly.
        <br/>

        Please be aware that your results can be viewed by system admins and advisors to release the hold on your account. This doesn't not imply that they will be revised.
      </p>
      <br />
    </div>
  );
}

export default Disclaimer;

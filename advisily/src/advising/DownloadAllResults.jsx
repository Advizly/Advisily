import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import { formatCourseData, sortCourses } from "../utils/coursesUtils";
import { useEffect } from "react";
import { useApi } from "../hooks/";
import { getAllResults } from "../services/advisingService";

const DownloadAllResults = () => {
  const resultsApi = useApi(getAllResults);

  useEffect(() => {
    console.log("Use effect");
    resultsApi.request();
  }, []);

  const renderCoursesList = (courses) => {
    return courses.map((course) => {
      let { formatedTitle } = formatCourseData(course);

      return <Text style={[styles.text, styles.indent]}>{formatedTitle}</Text>;
    });
  };
  const renderResults = (results) => {
    if (!results || !results.semesters || !results.semesters.length)
      return null;

    const result = results.semesters.map(({ semesterNumber, courses }) => {
      const sortedCourses = sortCourses(courses);
      let totalCredits;
      if (sortedCourses.length)
        totalCredits = sortedCourses
          .map((c) => (c.credits !== null ? c.credits : 3))
          .reduce((c1, c2) => c1 + c2, 0);
      return (
        <View style={{ marginBottom: 5 }}>
          <Text style={styles.subtitle}>Semester Number {semesterNumber}</Text>
          {renderCoursesList(sortedCourses)}
          <Text style={styles.text}>
            <Text style={styles.textBold}>Total Credits:</Text>
            {totalCredits}
          </Text>
          <View style={styles.horizontalLine} />
        </View>
      );
    });
    return (
      <>
        <Text style={styles.title}>User Info</Text>
        <Text style={styles.textBold}>
          {`Name:`}
          <Text
            style={styles.text}
          >{`${results.firstName} ${results.lastName}`}</Text>
        </Text>
        <Text style={styles.textBold}>
          {`ID:`}
          <Text style={styles.text}>{`${results.userId}`}</Text>
        </Text>
        <Text style={styles.textBold}>
          {`Standing:`}
          <Text style={styles.text}>{`${results.standing}`}</Text>
        </Text>

        <Text style={styles.textBold}>
          {`Email:`}
          <Text style={styles.text}>{`${results.email}`}</Text>
        </Text>
        {!!results.finishedCourses && !!results.finishedCourses.length && (
          <>
            <Text style={styles.title}>Finished Courses</Text>
            {renderCoursesList(results.finishedCourses)}
          </>
        )}
        <View style={styles.horizontalLine} />
        {result}
      </>
    );
  };
  const ResultsDocument = () => {
    if (resultsApi.loading || resultsApi.failedToLoad) return null;
    console.log(resultsApi.data);

    return (
      <Document>
        <Page style={styles.body}>
          {resultsApi.data &&
            resultsApi.data.map((data) => (
              <View break>{renderResults(data)}</View>
            ))}

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    );
  };

  return (
    <>
      {resultsApi.loading && <p>Preparing the data...</p>}
      {!resultsApi.loading && !resultsApi.failedToLoad && resultsApi.data && (
        <>
          <div>
            <div>
              <PDFDownloadLink
                document={<ResultsDocument />}
                fileName="Student Advising Results.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Loading document..." : "Download now!"
                }
              </PDFDownloadLink>
            </div>
            <div>
              <PDFViewer width={"100%"} style={{ height: 900 }}>
                <ResultsDocument />
              </PDFViewer>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DownloadAllResults;

// Font.register({
//   family: "Comfortaa",
//   fonts: [
//     {
//       src: "../../assets/fonts/Comfortaa/static/Comfortaa-Regular.ttf",
//     },
//     {
//       src: "../../assets/fonts/Comfortaa/static/Comfortaa-SemiBold.ttf",
//       fontWeight: "600",
//     },
//     {
//       src: "../../assets/fonts/Comfortaa/static/Comfortaa-Bold.ttf",
//       fontWeight: "700",
//     },
//   ],
// });

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    // textAlign: "center",
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  text: {
    // margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  textBold: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  horizontalLine: {
    height: 1,
    width: "100%",
    backgroundColor: "grey",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
  },
  indent: {
    marginLeft: 10,
  },
});

// export default MyFunc;

import React, { Suspense, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";
import { formatCourseData, sortCourses } from "../utils/coursesUtils";
import { useApi } from "../hooks/";
import { getAllResults } from "../services/advisingService";

const DownloadAllResults = () => {
  const resultsApi = useApi(getAllResults);

  useEffect(() => {
    resultsApi.request();
  }, []);

  const renderCoursesList = (courses) => {
    return courses.map((course) => {
      let { formatedTitle } = formatCourseData(course);
      return <Text style={[styles.text, styles.indent]}>{formatedTitle}</Text>;
    });
  };

  const renderResults = (results) => {
    if (!results || !results.semesters0 || !results.semesters0.length || !results.semesters1 || !results.semesters1.length)
      return null;

    const result1 = results.semesters0.map(({ semesterNumber, courses }) => {
      const sortedCourses = sortCourses(courses);
      let totalCredits = sortedCourses.reduce((acc, c) => acc + (c.credits !== null ? c.credits : 3), 0);
      
      return (
        <View style={{ marginBottom: 5 }}>
          <Text style={styles.subtitle}>Semester Number {semesterNumber}</Text>
          {renderCoursesList(sortedCourses)}
          <Text style={styles.text}>
            <Text style={styles.textBold}>Total Credits: </Text>{totalCredits}
          </Text>
          <View style={styles.horizontalLine} />
        </View>
      );
    });

    const result2 = results.semesters1.map(({ semesterNumber, courses }) => {
      const sortedCourses = sortCourses(courses);
      let totalCredits = sortedCourses.reduce((acc, c) => acc + (c.credits !== null ? c.credits : 3), 0);

      return (
        <View style={{ marginBottom: 5 }}>
          <Text style={styles.subtitle}>Semester Number {semesterNumber}</Text>
          {renderCoursesList(sortedCourses)}
          <Text style={styles.text}>
            <Text style={styles.textBold}>Total Credits: </Text>{totalCredits}
          </Text>
          <View style={styles.horizontalLine} />
        </View>
      );
    });

    return (
      <>
        <Text style={styles.title}>User Info</Text>
        <Text style={styles.textBold}>Name: <Text style={styles.text}>{`${results.firstName} ${results.lastName}`}</Text></Text>
        <Text style={styles.textBold}>ID: <Text style={styles.text}>{results.userId}</Text></Text>
        <Text style={styles.textBold}>Standing: <Text style={styles.text}>{results.standing}</Text></Text>
        <Text style={styles.textBold}>Email: <Text style={styles.text}>{results.email}</Text></Text>

        {!!results.finishedCourses?.length && (
          <>
            <Text style={styles.title}>Finished Courses</Text>
            {renderCoursesList(results.finishedCourses)}
          </>
        )}

        <View style={styles.horizontalLine} />
        <Text style={styles.title}>Plan Type 1</Text>
        {result1}
        <Text style={styles.title}>Plan Type 2</Text>
        {result2}
      </>
    );
  };

  const ResultsDocument = () => {
    if (resultsApi.loading || resultsApi.failedToLoad) return null;

    return (
      <Document>
        <Page style={styles.body}>
          {resultsApi.data.map((data) => (
            <View key={data.userId}>{renderResults(data)}</View>
          ))}
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
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
                {({ loading }) => loading ? "Loading document..." : "Download now!"}
              </PDFDownloadLink>
            </div>

            <div>
              <Suspense fallback={<div>Loading PDF Viewer...</div>}>
                <PDFViewer width={"100%"} style={{ height: 900 }}>
                  <ResultsDocument />
                </PDFViewer>
              </Suspense>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DownloadAllResults;

const styles = StyleSheet.create({
  title: { fontSize: 12, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 8, fontWeight: "bold" },
  body: { paddingTop: 35, paddingBottom: 65, paddingHorizontal: 35 },
  text: { fontSize: 6, textAlign: "justify", fontFamily: "Times-Roman" },
  textBold: { fontSize: 6, fontWeight: "bold", textAlign: "justify" },
  pageNumber: { position: "absolute", fontSize: 12, bottom: 30, left: 0, right: 0, textAlign: "center", color: "grey" },
  horizontalLine: { height: 1, width: "100%", backgroundColor: "grey", borderWidth: 1, borderColor: "grey", borderRadius: 20 },
  indent: { marginLeft: 10 },
});

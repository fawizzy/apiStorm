export const analyseResponse = (responses) => {
  const analysis = {};
  const successfulResponses = responses.filter(
    (response) =>
      response["Status Code"] >= 200 && response["Status Code"] < 300
  );
  const failedResponses = responses.filter(
    (response) =>
      response["Status Code"] >= 400 && response["Status Code"] < 500
  );
  analysis["Successful Response"] = successfulResponses.length;
  analysis["Failed Response"] = successfulResponses.length;

  const responseTimes = responses.map((response) => response["response time"]);
  const averageRequestTime =
    responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
  const maxRequestTime = Math.max(...responseTimes);
  const minRequestTime = Math.min(...responseTimes);
  analysis["Average Time Per Request(ms)"] = averageRequestTime.toFixed(2);
  analysis["Maximum Time Per Request(ms)"] = maxRequestTime.toFixed(2);
  analysis["Minimum Time Per Request(ms)"] = minRequestTime.toFixed(2);

  const contentLengths = responses.map((response) =>
    parseInt(response["Content Length"])
  );

  // Calculate the total size of HTML transferred
  const totalSize = contentLengths.reduce((sum, size) => sum + size, 0);

  analysis["Total Bytes transferred"] = totalSize;

  return analysis;
};

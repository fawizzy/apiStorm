#!/usr/bin/node
import { analyseResponse } from "./analyseResponse.js";
import {
  httpsRequest,
  getServerInfoHttps,
  httpRequest,
  getServerInfoHttp,
} from "./makerequest.js";
import { performance } from "perf_hooks";

let url = null;
let numberOfRequest = 1;
let numberOfConcurrentRequest = 1;
let method = "get";
let serverInfo;
if (process.argv.length <= 2) {
  console.log("no arguments provided. exiting...");
  process.exit(1);
}

for (let i = 0; i < process.argv.length; i++) {
  if (process.argv[i] == "-u" && i + 1 < process.argv.length) {
    //get the url provided
    url = process.argv[i + 1];
  }
  if (process.argv[i] == "-n" && i + 1 < process.argv.length) {
    //get the total number of requests
    numberOfRequest = parseInt(process.argv[i + 1]);
  }
  if (process.argv[i] == "-c" && i + 1 < process.argv.length) {
    //get the number of concurrent requests
    numberOfConcurrentRequest = parseInt(process.argv[i + 1]);
  }
}
if (url == null) {
  console.log("no url provided. exiting...");
  process.exit(1);
}

if (numberOfRequest < numberOfConcurrentRequest) {
  console.log(
    "Cannot use concurrency level greater than total number of requests"
  );
  process.exit(1);
}

const urlRegex =
  /^(https?:\/\/|ftp:\/\/|ftps:\/\/)?(localhost|\d+\.\d+\.\d+\.\d+|[\w.-]+)(:[0-9]+)?(\/\S*)?$/;
const isUrl = urlRegex.test(url);
if (!isUrl) {
  console.log("not a valid url");
  process.exit(1);
}
console.log(`apiStorm by Fawizzy`);
console.log("");

if (url.startsWith("https://")) {
  serverInfo = await getServerInfoHttps(url);
} else {
  serverInfo = await getServerInfoHttp(url);
}

console.log(`Benchmarking ${serverInfo["Server Hostname"]}...`);
await delay();
console.log();
console.log();
let maxKeyLength = Math.max(
  ...Object.keys(serverInfo).map((key) => key.length)
);
for (const key in serverInfo) {
  const padding = " ".repeat(maxKeyLength - key.length);
  console.log(`${key}:${padding}    ${serverInfo[key]}`);
}
console.log();
console.log();
const prev = performance.now();

const numberOfIteration = numberOfRequest / numberOfConcurrentRequest;

let totalRequest = 0;
let allResponses = [];
for (let i = 0; i < numberOfIteration; i++) {
  const requests = Array.from({ length: numberOfConcurrentRequest }, () => {
    if (url.startsWith("https://")) {
      return httpsRequest(url);
    } else {
      return httpRequest(url);
    }
  });

  const responses = await Promise.all(requests);
  allResponses.push(...responses);
  totalRequest += responses.length;
  const remainingRequest = numberOfRequest - totalRequest;

  if (remainingRequest < numberOfConcurrentRequest) {
    numberOfConcurrentRequest = remainingRequest;
  }
  console.log(`completed ${totalRequest} requests`);
}
console.log();
console.log();

// const totalTime = (performance.now() - prev) * 0.001;
// const requestsPerSecond = allResponses.length / totalTime;
// const timePerRequest = totalTime / allResponses.length;
// console.log("request per second(#/s): ", requestsPerSecond);
// console.log("time per request(ms): ", timePerRequest * 1000);
// console.log("total time(s): ", totalTime);
// console.log(allResponses);

const analysis = analyseResponse(allResponses);
maxKeyLength = Math.max(...Object.keys(analysis).map((key) => key.length));
for (const key in analysis) {
  const padding = " ".repeat(maxKeyLength - key.length);
  console.log(`${key}:${padding}    ${analysis[key]}`);
}
function delay() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

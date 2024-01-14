import http from "http";
import https from "https";
import { performance } from "perf_hooks";

export const getStatusCode = async (url, method, data) => {
  const result = await axios({
    method,
    url,
    data,
  });

  return result.status;
};

export const httpsRequest = (url, method, data) => {
  const responseData = {};
  const response = new Promise((resolve, reject) => {
    const prev = performance.now();
    https.get(url, (res) => {
      const responseTime = performance.now() - prev;
      responseData["response time"] = responseTime;
      responseData["Status Code"] = res.statusCode;
      responseData["Content Length"] = res.headers["content-length"];

      resolve(responseData);
    });
  });
  return response;
};

export const httpRequest = (url, method, data) => {
  const prev = performance.now();
  const response = new Promise((resolve, reject) => {
    http.get(url, (res) => {
      const time = performance.now() - prev;
      resolve(time);
    });
  });
  return response;
};

export const getServerInfoHttps = (url, method, data) => {
  const responseData = {};
  const response = new Promise((resolve, reject) => {
    https.get(url, (res) => {
      responseData["Server Software"] = res.headers["server"];
      responseData["Server Hostname"] = res.socket._host;
      responseData["Server Port"] = res.socket.remotePort;
      responseData["SSL/TLS Protocol"] = res.socket.getProtocol();

      responseData["TLS Servername"] = res.socket.servername;
      responseData["Document Path"] = res.req.path;
      responseData["Document Length"] = res.headers["content-length"];

      resolve(responseData);
    });
  });
  return response;
};

export const getServerInfoHttp = (url, method, data) => {
  const responseData = {};
  const response = new Promise((resolve, reject) => {
    http.get(url, (res) => {
      responseData["Server Software"] = res.headers["server"];
      responseData["Server Hostname"] = res.socket._host;
      responseData["Server Port"] = res.socket.remotePort;

      resolve(responseData);
    });
  });
  return response;
};

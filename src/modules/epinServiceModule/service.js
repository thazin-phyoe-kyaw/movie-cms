import {
  EPIN_ACTIVATE,
  EPIN_EPIN,
  EPIN_EPIN_GENERATION_JOB,
  EPIN_EPIN_PACKAGE,
  EPIN_EPIN_USER,
  EPIN_GENERATION_JOB,
} from "@/lib/apiConst";
import { REQUEST_HEADER } from "@/lib/config";
import axios from "axios";

async function EpinGet(url) {
  console.log(`${EPIN_EPIN}${url}`, "this is epin get");
  return await axios
    .get(encodeURI(`${EPIN_EPIN}${url}`), REQUEST_HEADER)
    .then(({ data }) => data)
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function EpinGenerateGet(url) {
  console.log(`${EPIN_EPIN_GENERATION_JOB}?${url}`);
  return await axios
    .get(encodeURI(`${EPIN_EPIN_GENERATION_JOB}?${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      return { error: "Client and server connection error" };
    });
}

async function EpinGenerateCreate(data) {
  return await axios
    .post(EPIN_GENERATION_JOB, data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

async function EpinGenerateUpdate(data, id) {
  //console.log(JSON.stringify(data),id)
  return await axios
    .patch(
      encodeURI(`${EPIN_EPIN_GENERATION_JOB}(${id})`),
      data,
      REQUEST_HEADER
    )
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

async function EpinActivate(data) {
  //console.log(JSON.stringify(data),`${EPIN_ACTIVATE}`)
  return await axios
    .post(EPIN_ACTIVATE, data, REQUEST_HEADER)
    .then(() => {
      //console.log(data)
      return { success: true };
    })
    .catch((err) => {
      //console.log(err);
      return { error: "Client and server connection error" };
    });
}

async function EpinUpdate(data, id) {
  return await axios
    .patch(encodeURI(`${EPIN_EPIN}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

async function EpinGenerateDelete(data, id) {
  //console.log(JSON.stringify(data),id)
  return await axios
    .patch(
      encodeURI(`${EPIN_EPIN_GENERATION_JOB}(${id})`),
      data,
      REQUEST_HEADER
    )
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

async function EpinPackageGet(url) {
  return await axios
    .get(encodeURI(`${EPIN_EPIN_PACKAGE}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function EpinPackageUpdate(data, id) {
  // console.log(JSON.stringify(data),`${EPIN_EPIN_PACKAGE}(${id})`)
  return await axios
    .patch(encodeURI(`${EPIN_EPIN_PACKAGE}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

async function EpinUserGet(url) {
  // console.log(`${EPIN_EPIN_USER}${url}`)
  return await axios
    .get(encodeURI(`${EPIN_EPIN_USER}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      //console.log(JSON.stringify(data))
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

export {
  EpinGet,
  EpinGenerateGet,
  EpinGenerateCreate,
  EpinGenerateDelete,
  EpinGenerateUpdate,
  EpinUpdate,
  EpinActivate,
  EpinPackageGet,
  //EpinPackageCreate,
  EpinPackageUpdate,
  EpinUserGet,
};

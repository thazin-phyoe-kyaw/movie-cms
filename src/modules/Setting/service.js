import { FAQ_TITLES, FAQs_FAQs, PRIVACY_AND_POLICIES, TERMS_AND_CONDITIONS } from "@/lib/apiConst";
import { REQUEST_HEADER } from "@/lib/config";
import axios from "axios";

async function FAQtitleGet(url) {
  console.log(`${FAQ_TITLES}${url}`)
  return await axios
    .get(encodeURI(`${FAQ_TITLES}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function FAQtitleCreate(data) {
  return await axios
    .post(FAQ_TITLES, data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function FAQtitleUpdate(data, id) {
  // console.log(`${FAQ_TITLES}(${id})`)
  return await axios
    .patch(encodeURI(`${FAQ_TITLES}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function FAQtitleDelete(data, id) {
  //console.log(`${FAQ_TITLES}(${id})`,data)
  return await axios
    .patch(encodeURI(`${FAQ_TITLES}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

async function FAQGet(url) {
  return await axios
    .get(encodeURI(`${FAQs_FAQs}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function FAQCreate(data) {
  //console.log(`${FAQs_FAQs}`,data)
  return await axios
    .post(FAQs_FAQs, data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function FAQUpdate(data, id) {
  return await axios
    .patch(encodeURI(`${FAQs_FAQs}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function termsAndConditionsCreate(data) {
  return await axios
    .post(TERMS_AND_CONDITIONS, data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function privacyAndPoliciesCreate(data) {
  return await axios
    .post(PRIVACY_AND_POLICIES, data, REQUEST_HEADER)
    .then((response) => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

export {
  FAQGet,
  FAQtitleGet,
  FAQCreate,
  FAQUpdate,
  FAQtitleCreate,
  FAQtitleUpdate,
  FAQtitleDelete,
  termsAndConditionsCreate,
  privacyAndPoliciesCreate,
};

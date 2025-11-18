import { REQUEST_HEADER } from "@/lib/config";
import axios from "axios";
import { PROMOCODE_PROMOCODE, PROMOCODE_PROMOCODE_USER } from "@/lib/apiConst";

async function PromocodeGet(url) {
  console.log(`${PROMOCODE_PROMOCODE}${url}` ,'this is promocode')
  return await axios
    .get(encodeURI(`${PROMOCODE_PROMOCODE}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function PromocodeCreate(data) {
  //console.log(data,"hihihi")
  return await axios
    .post(PROMOCODE_PROMOCODE, data, REQUEST_HEADER)
    .then(() => {
      //console.log("sdfgfgsd")
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function PromocodeUpdate(data, id) {
  // console.log(JSON.stringify(data), `${PROMOCODE_PROMOCODE}(${id})`);
  //console.log(data,id)
  return await axios
    .patch(encodeURI(`${PROMOCODE_PROMOCODE}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function PromocodeDelete(data, id) {
  return await axios
    .patch(encodeURI(`${PROMOCODE_PROMOCODE}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      //console.log(err.message);
      return { error: "Client and server connection error" };
    });
}

async function PromocodeUserDelete(data, id) {
  return await axios
    .patch(
      encodeURI(`${PROMOCODE_PROMOCODE_USER}(${id})`),
      data,
      REQUEST_HEADER
    )
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      //console.log(err.message);
      return { error: "Client and server connection error" };
    });
}

async function PromocodeUserGet(url) {
  //console.log(`${PROMOCODE_PROMOCODE_USER}${url}`);
  return await axios
    .get(encodeURI(`${PROMOCODE_PROMOCODE_USER}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      //console.log(data)
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

export {
  PromocodeGet,
  PromocodeUpdate,
  PromocodeDelete,
  PromocodeCreate,
  PromocodeUserDelete,
  PromocodeUserGet,
};

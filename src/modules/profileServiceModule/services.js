import {
  PROFILE_DOWNLOD,
  PROFILE_FAVOURITE,
  PROFILE_LIKE,
  PROFILE_PROFILE,
  PROFILE_USER_DEVICE,
  PROFILE_USER_SHARE,
} from "@/lib/apiConst";
import { REQUEST_HEADER } from "@/lib/config";
import axios from "axios";

async function ProfileGet(url) {
  console.log(`${PROFILE_PROFILE}${url}` , "this is profile");
  return await axios
    .get(encodeURI(`${PROFILE_PROFILE}${url}`), REQUEST_HEADER)
    .then(({ data }) => data)
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function ProfileUserDeviceGet(url) {
  return await axios
    .get(encodeURI(`${PROFILE_USER_DEVICE}${url}`, REQUEST_HEADER))
    .then(({ data }) => data)
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function ProfileFavouriteGet(url) {
  return await axios
    .get(encodeURI(`${PROFILE_FAVOURITE}${url}`), REQUEST_HEADER)
    .then(({ data }) => data)
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function ProfileLikeGet(url) {
  return await axios
    .get(encodeURI(`${PROFILE_LIKE}${url}`, REQUEST_HEADER))
    .then(({ data }) => data)
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function ProfileDownloadGet(url) {
  return await axios
    .get(encodeURI(`${PROFILE_DOWNLOD}`, REQUEST_HEADER))
    .then(({ data }) => data)
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function ProfileUserShareGet(url) {
  return await axios
    .get(encodeURI(`${PROFILE_USER_SHARE}`, REQUEST_HEADER))
    .then(({ data }) => data)
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function ProfileDelete(data, id) {
  // console.log(`${PROFILE_PROFILE}(${id})`)
  // console.log(data)
  return await axios
    .patch(encodeURI(`${PROFILE_PROFILE}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      //console.log(err.message);
      return { error: "Client and server connection error" };
    });
}

async function ProfileUpdate(data, id) {
  //console.log(JSON.stringify(data), `${PROFILE_PROFILE}(${id})`);
  return await axios
    .patch(encodeURI(`${PROFILE_PROFILE}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

export {
  ProfileGet,
  ProfileUserDeviceGet,
  ProfileFavouriteGet,
  ProfileDownloadGet,
  ProfileUserShareGet,
  ProfileLikeGet,
  ProfileDelete,
  ProfileUpdate,
};

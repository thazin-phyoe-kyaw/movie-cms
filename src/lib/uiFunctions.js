"use client";
const { message } = require("antd");

function errorMessage({ response: { data } }) {
  if (!data) {
    message.error("Something wrong");
  } else {
    message.error(data.message);
  }
}
function notFoundErrorMessage(message) {
  if (message === "not found") {
    message.error("You can't delete!!!! This is already use in another Table");
  }
}
export { errorMessage, notFoundErrorMessage };

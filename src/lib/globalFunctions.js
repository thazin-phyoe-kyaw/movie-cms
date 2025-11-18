import url from "url";
import { ACCESS_LVLS } from "./const";
import { NextResponse } from "next/server";
import * as moment from "moment";

function queryFilterTypeHandler(type, value) {
  switch (true) {
    case type === "boolean":
      return value === "true" ? "true" : "false";
    case type === "string" || type === "number":
      return `'${value.replace(",", "")}'`;
    case type === "id":
      return `${value.replace(",", "")}`;
    default:
      return "";
  }
}

function queryFilterHandler(requestObj, keyObjArray) {
  let url = "";
  for (let i of keyObjArray) {
    if (requestObj[i.key]) {
      if (i.type === "null") {
        url =
          url +
          `${url === "" ? "" : " and "}${i.key} ${requestObj[i.key]} null`;
      } else {
        url =
          url +
          `${url === "" ? "" : " and "}${i.key} eq ${queryFilterTypeHandler(
            i.type,
            requestObj[i.key]
          )}`;
      }
    }
  }

  return `${url}`;
}

function nextQueryHandler(requestObj, pagination) {
  let url = `?pageNumber=${pagination.pageNumber}&perPage=${pagination.perPage}`;
  const keys = Object.keys(requestObj).map((value) => value);

  for (let i of keys) {
    if (requestObj[i].type === "boolean" && requestObj[i].value !== "") {
      url = url + `&${i}=${requestObj[i].value}`;
    }

    if (requestObj[i].type === "string" && requestObj[i].value !== "") {
      url = url + `&${i}=${requestObj[i].value}`;
    }

    if (requestObj[i].type === "id" && requestObj[i].value !== "") {
      url = url + `&${i}=${requestObj[i].value}`;
    }

    if (requestObj[i].type === "number" && requestObj[i].value !== false) {
      url = url + `&${i}=${requestObj[i].value}`;
    }

    if (requestObj[i].type === "null") {
      url = url + `&${i}=${requestObj[i].value ? "eq" : "ne"}`;
    }
  }
  return url;
}

async function getQuery(urlString) {
  return url.parse(urlString, true).query;
}

function paginationQuery({ pageNumber, perPage }) {
  return `$top=${perPage}&$skip=${(pageNumber - 1) * perPage}`;
}

function getCurrentDate() {
  return new Date().toISOString();
}

function getAccessPermissions(roleList) {
  let accessRoles = [];
  let accessPermissions = [];

  ACCESS_LVLS.filter((access) => roleList.includes(access.id)).forEach(
    (access) => {
      accessRoles = [...accessRoles, access.key];
      accessPermissions = [...new Set([...accessPermissions, ...access.value])];
    }
  );

  return {
    accessRoles,
    accessPermissions,
  };
}

function passwordChecker(password) {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#%^&\-!])[A-Za-z\d@#%^&\-!]{8,}$/;

  return passwordRegex.test(password);
}

function color(name) {
  if (name.toLowerCase().includes("admin")) {
    return "cyan";
  }
  if (name.toLowerCase().includes("watcher")) {
    return "magenta";
  }
  if (name.toLowerCase().includes("editor")) {
    return "green";
  }
}

function permissionHandler(session, key) {
  const permissions = key.split(",");
  if (!session || !session.permissions) {
    return false;
  }
  if (
    session.permissions.filter((value) => permissions.includes(value))
      .length === 0
  ) {
    return false;
  }
  return true;
}

function unauthorizeResponse() {
  return NextResponse.json({ message: "Unauthorize Request" }, { status: 401 });
}

function errorResponse(error) {
  return NextResponse.json(
    { message: error ? error : "Something Wrong" },
    { status: 400 }
  );
}

function successResponse() {
  return NextResponse.json({ success: true }, { status: 200 });
}

function getUiDate(dateString) {
  return moment(dateString).format("DD-MM-YYYY");
}

function getUiDateTime(dateString) {
  return moment(dateString).format("DD-MM-YYYY HH-MM-ss");
}

function odataQueryGenerator(object) {
  let query = `?$count=true&$select=${object.fields.toString()}`;

  function filterHandler(filterObj, type) {
    let filter = "";
    // `&$filter=startsWith(titleMm,'${query.name}')`

    for (let i of Object.keys(filterObj)) {
      const target = filterObj[i];
      switch (true) {
        case target.type == "string" && target.value.length !== 0:
          for (let keyword of target.value) {
            if (keyword !== "") {
              filter =
                filter === ""
                  ? `startWith(${i},'${keyword}')`
                  : `${filter} or startWith(${i},'${keyword}')`;
            }
          }
          break;
        case target.type === "boolean" && target.value !== "":
          filter =
            filter === ""
              ? `${i} eq ${target.value}`
              : `${filter} and ${i} eq ${target.value}`;
          break;
        case target.type === "isNull" && target.value !== "":
          ftiler =
            filter === ""
              ? `${i} ${target.value === "true" ? "eq" : "ne"} null`
              : `${filter} and ${i} ${
                  target.value === "true" ? "eq" : "ne"
                } null`;
          break;

        default:
          break;
      }
    }

    return filter === ""
      ? ""
      : `${type === "parent" ? "&" : ""}$filter=${filter}${
          type === "child" ? ";" : ""
        }`;
  }

  function orderHandler(orderObj, type) {
    let order = "";

    for (let i of Object.keys(orderObj)) {
      if (orderObj[i] !== "") {
        order =
          order === "" ? `${i} ${orderObj[i]}` : `${order},${i} ${orderObj[i]}`;
      }
    }

    return order === ""
      ? ""
      : `${type === "parent" ? "&" : "'"}$orderby=${order}${
          type === "child" ? ";" : ""
        }`;
  }

  for (let i of object.childrens) {
    query =
      query +
      `&$expand=${i.name}(${
        i.type === "multi" ? "$count=true;" : ""
      }$select=${i.data.fields.toString()}${
        i.type === "multi"
          ? `;${filterHandler(i.data.filter, "child")}${orderHandler(
              i.data.order,
              "child"
            )}$top=${i.data.top}`
          : ""
      })`;
  }

  return `${query}${filterHandler(object.filter, "parent")}${orderHandler(
    object.order,
    "parent"
  )}&$top=${object.top}&$skip=${object.skip}`;
}

export {
  getQuery,
  paginationQuery,
  getCurrentDate,
  getAccessPermissions,
  queryFilterHandler,
  nextQueryHandler,
  passwordChecker,
  color,
  permissionHandler,
  unauthorizeResponse,
  errorResponse,
  successResponse,
  getUiDate,
  getUiDateTime,
  odataQueryGenerator,
};

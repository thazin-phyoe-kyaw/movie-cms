import { CHILDREN_TABLES_HANDLER_ENUM, ORDER_ENUM } from "./const";

async function apiGetData(query, queryObject, odataFunction) {
  return await odataQueryHandler(
    queryObject,
    query.filter ? JSON.parse(query.filter) : queryObject.filter,
    query.order ? JSON.parse(query.order) : queryObject.order,
    query.fields ? JSON.parse(query.fields) : queryObject.fields,
    query.have_childs ? query.have_childs : "normal",
    query.pagination ? JSON.parse(query.pagination) : { top: 10, skip: 0 },
    odataFunction
  );
}

async function apiFilterHandler(filter_object, query_filter) {
  let filter;
  for (const key of Object.keys(filter_object)) {
    if (
      query_filter[key] &&
      query_filter[key].value &&
      query_filter[key].value !== ""
    ) {
      const target = filter_object[key];
      const query = query_filter[key];

      switch (true) {
        case target.type === "isNull" && target.enum.includes(query.value):
          filter = { ...filter, [key]: { value: query.value } };
          break;
        case target.type === "boolean" && target.enum.includes(query.value):
          filter = { ...filter, [key]: { vaule: query.value } };
          break;
        case target.type === "enum" && target.enum.includes(query.value):
          filter = { ...filter, [key]: { value: query.value } };
          break;
        case target.type === "number" && target.enum.includes(query.key):
          filter = { ...filter, [key]: { value: query.value, key: query.key } };
          break;
        case target.type === "string":
          filter = { ...filter, [key]: { value: query.value } };
          break;
        case target.type === "foreign":
          filter = { ...filter, [key]: { value: query.value } };
          break;
        case target.type === "foreignString":
          filter = { ...filter, [key]: { value: query.value } };
          break;
        default:
          break;
      }
    }
  }

  return filter;
}

async function apiOrderHandler(order_object, query_order) {
  let order;
  for (const key of Object.keys(order_object)) {
    if (query_order[key] && ORDER_ENUM.includes(query_order[key])) {
      order = { ...order, [key]: query_order[key] };
    }
  }

  return order;
}

async function apiQueryHandler(
  queryObject,
  query_filter,
  query_order,
  fields,
  have_childs,
  pagination
) {
  // get filter
  const filter = await apiFilterHandler(queryObject.filter, query_filter);
  // get order
  const order = await apiOrderHandler(queryObject.order, query_order);
  // check fields
  const selectedFields = queryObject.fields?.filter((value) =>
    fields.includes(value)
  );

  return `${filter ? `filter=${JSON.stringify(filter)}&` : ""}${
    order ? `order=${JSON.stringify(order)}&` : ""
  }${
    selectedFields && selectedFields?.length > 0
      ? `fields=${JSON.stringify(fields)}&`
      : `fields=${JSON.stringify(queryObject.fields)}&`
  }have_childs=${
    CHILDREN_TABLES_HANDLER_ENUM.includes(have_childs)
      ? `${have_childs}&`
      : "normal&"
  }${
    pagination
      ? `pagination=${JSON.stringify({
          top: pagination.perPage,
          skip: (pagination.pageNumber - 1) * pagination.perPage,
        })}`
      : `pagination=${JSON.stringify({ top: 10, skip: 0 })}`
  }`;
}

async function filterHandler(filter, query_filter) {
  let filterString = "";
  for (const key of Object.keys(filter)) {
    if (
      query_filter[key] &&
      query_filter[key].value &&
      query_filter[key].value !== ""
    ) {
      // if this field is filter object
      const target = filter[key];
      const query = query_filter[key];

      switch (true) {
        case target.type === "isNull" && target.enum.includes(query.value):
          filterString = `${
            filterString === "" ? "" : `${filterString} and `
          }${key} ${query.value} null`;
          break;
        case target.type === "boolean" && target.enum.includes(query.value):
          filterString = `${
            filterString === "" ? "" : `${filterString} and `
          }${key} eq ${query.value}`;
          break;
        case target.type === "enum" && target.enum.includes(query.value):
          filterString = `${
            filterString === "" ? "" : `${filterString} and `
          }${key} eq '${query.value}'`;
          break;
        case target.type === "number" && target.enum.includes(query.key):
          filterString = `${
            filterString === "" ? "" : `${filterString} and `
          }${key} ${query.key} ${query.value}`;
          break;
        case target.type === "string":
          filterString = `${
            filterString === "" ? "" : `${filterString} and `
          }startswith(tolower(${key}),'${query.value}')`;
          break;
        case target.type === "foreign":
          filterString = `${
            filterString === "" ? "" : `${filterString} and `
          }${key} eq ${query.value}`;
          break;
        //for profile number
        case target.type === "foreignString":
          filterString = `${
            filterString === "" ? "" : `${filterString} and `
          }${key} eq '${query.value}'`;
          break;

        default:
          break;
      }
    }
  }
  // console.log(filterString);
  return filterString;
}

async function orderHandler(order, query_order) {
  let orderString = "";
  for (const key of Object.keys(order)) {
    if (query_order[key] && ORDER_ENUM.includes(query_order[key])) {
      orderString = `${orderString === "" ? "" : `${orderString},`}${key} ${
        query_order[key]
      }`;
    }
  }

  return orderString;
}

function findAll(string, pattern) {
  const regex = new RegExp(pattern, "g");
  const matches = [];

  let match;
  while ((match = regex.exec(string)) !== null) {
    matches.push(match[0]);
  }

  return matches;
}

async function idsToNameReplacer(data, controller) {
  if (data.value && data.value.length > 0) {
    let jsonString = JSON.stringify(data.value);

    let rawExtract = [];

    // get all ids value with pattern
    for (const pattern of controller.patterns) {
      rawExtract = [...rawExtract, ...findAll(jsonString, pattern)];
    }

    // make clear id data
    let idsList = [];
    for (const i of rawExtract) {
      let key = i;
      for (const replacer of controller.replacers) {
        key = key.replaceAll(replacer, "");
      }
      if (!key.includes("null")) {
        idsList = [...idsList, key];
      }
    }

    // remove dulpicate
    idsList = [...new Set(idsList)];

    // get data from relative tables
    const result = await controller.handler(idsList);

    if (result.length === 0) {
      return data;
    }

    // replace id with getData
    for (const i of result) {
      jsonString = jsonString.replaceAll(`"${i.id}"`, JSON.stringify(i));
    }

    return {
      ...data,
      value: JSON.parse(jsonString),
    };
  }

  return data;
}

async function odataQueryHandler(
  { filter, order, ...queryObject },
  query_filter,
  query_order,
  fields,
  have_childs,
  pagination,
  odataFunction
) {
  // create basic query string

  let queryString = `?$count=true`;
  // addSelect
  let selectFields = queryObject.fields.filter((value) =>
    fields.includes(value)
  );
  selectFields = [...new Set(selectFields)];
  if (selectFields.length === 0) {
    queryString = `${queryString}&$select=${queryObject.fields.toString()}`;
  } else {
    queryString = `${queryString}&$select=${selectFields.toString()}`;
  }

  // add expand child tables
  if (CHILDREN_TABLES_HANDLER_ENUM.includes(have_childs)) {
    // console.log(queryObject);
    switch (true) {
      case have_childs === "normal":
        for (const child of queryObject?.childrens) {
          queryString = `${queryString}&$expand=${
            child.name
          }(${await odataExpandQueryHandler(
            child.data,
            child.data.filter,
            child.data.order,
            child.type
          )})`;
        }
        break;
      case have_childs === "only_count":
        for (const child of queryObject.childrens) {
          queryString = `${queryString}&$expand=${child.name}($count=true;$top=0)`;
        }
        break;
      default:
        break;
    }
  }
  // add filters
  const filterString = await filterHandler(filter, query_filter);

  if (filterString !== "") {
    queryString = `${queryString}&$filter=${filterString}`;
  }

  // add orderBy
  const orderString = await orderHandler(order, query_order);

  if (orderString !== "") {
    queryString = `${queryString}&$orderBy=${orderString}`;
  }

  // pagination
  queryString = `${queryString}&$top=${pagination.top}&$skip=${pagination.skip}`;

  let response = await odataFunction(queryString);

  if (
    queryObject.id_to_name_replacer &&
    queryObject.id_to_name_replacer.length > 0
  ) {
    for (const i of queryObject.id_to_name_replacer) {
      response = await idsToNameReplacer(response, i);
    }
  }

  return response;
}

async function odataExpandQueryHandler(
  { filter, order, ...queryObject },
  query_filter,
  query_order,
  type
) {
  let queryString = `${
    type === "multi" ? "" : ""
  }$select=${queryObject.fields.toString()}`;

  // add expand child tables
  if (queryObject?.childrens?.length > 0) {
    for (const child of queryObject.childrens) {
      queryString = `${queryString};$expand=${
        child.name
      }(${await odataExpandQueryHandler(
        child.data,
        child.data.filter,
        child.data.order,
        child.type
      )})`;
    }
  }

  // add filters
  const filterString = await filterHandler(filter, query_filter);
  if (filterString !== "") {
    queryString = `${queryString};$filter=${filterString}`;
  }

  // order by

  const orderString = await orderHandler(order, query_order);

  // );

  if (orderString !== "") {
    queryString = `${queryString};$orderBy=${orderString}`;
  }
  // console.log(
  //   `${queryString};$top=${queryObject.top};$skip=${queryObject.skip}`,
  //   "HJKLNMdjs"
  // );
  // pagination
  return `${queryString};$top=${queryObject.top};$skip=${queryObject.skip}`;
}

export { apiQueryHandler, apiGetData, odataQueryHandler };

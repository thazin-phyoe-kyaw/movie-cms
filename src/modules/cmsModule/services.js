// import {
//   CMS_ACCESS_LVL,
//   CMS_ACCESS_ROLE,
//   CMS_LOGIN,
//   CMS_USER,
//   CMS_USER_CREATE,
//   PASSWORD_RESET,
// } from "@/lib/apiConst";
// import { REQUEST_HEADER } from "@/lib/config";
// import { getCurrentDate, paginationQuery } from "@/lib/globalFunctions";
// import axios from "axios";
// // login
// async function CMSLogin({ email, password }) {
//   const urlString = `${CMS_LOGIN}?email=${email}&password=${password}`;

//   return await axios
//     .get(encodeURI(urlString), REQUEST_HEADER)
//     .then(({ data: { value } }) => {
//       if (!value) {
//         return;
//       }

//       return value;
//     })
//     .catch((error) => {
//       return { error: "Client and server connection error" };
//     });
// }

// // user
// async function GetUserDetail(id) {
//   const urlString = `${CMS_USER}?$select=email,name,siteAdminNote,phoneNumber,address,avatar,isDelete,id&$expand=AccessLevel&$filter=id eq ${id}`;
//   return await axios
//     .get(encodeURI(urlString), REQUEST_HEADER)
//     .then(({ data: { value } }) => {
//       return value.length > 0 ? value[0] : false;
//     })
//     .catch((error) => {
//       return { error: "Client and server connection error" };
//     });
// }
// async function GetUser() {
//   const urlString = CMS_USER;
//   return await axios
//     .get(encodeURI(urlString), REQUEST_HEADER)
//     .then(({ data: { value } }) => {
//       // return value;
//       return value.length > 0 ? value[0] : false;
//     })
//     .catch((error) => {
//       return { error: "Client and server connection error" };
//     });
// }
// async function GetUserList(url) {
//   console.log(`${CMS_USER}${url}`);
//   return await axios
//     .get(encodeURI(`${CMS_USER}${url}`), REQUEST_HEADER)
//     .then(({ data }) => {
//       return data;
//     })
//     .catch((error) => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function UserDelete(id) {
//   const urlString = `${CMS_USER}(${id})`;
//   return await axios
//     .patch(
//       encodeURI(urlString),
//       {
//         isDelete: true,
//         updatedAt: getCurrentDate(),
//       },
//       REQUEST_HEADER
//     )
//     .then(() => {
//       return { success: true };
//     })
//     .catch(() => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function UserCreate(data) {
//   return await axios
//     .post(encodeURI(`${CMS_USER_CREATE}`), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch((err) => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function UserEdit(data, id) {
//   return await axios
//     .patch(encodeURI(`${CMS_USER}(${id})`), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: "true" };
//     })
//     .catch(() => {
//       return { error: "Client server connection error" };
//     });
// }

// async function PasswordReset({ email, password }) {
//   const urlString = `${PASSWORD_RESET}?email=${email}&password=${password}`;

//   return await axios
//     .patch(
//       encodeURI(urlString),
//       {
//         email,
//         password,
//       },
//       REQUEST_HEADER
//     )
//     .then(() => {
//       return { success: true };
//     })
//     .catch(() => {
//       return { error: "Client server connection error" };
//     });
// }

// async function UserAccessLvlUpdate(userId, data) {
//   return await axios
//     .patch(encodeURI(`${CMS_USER}(${userId})`), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch((err) => {
//       return { error: "Client Server connection error" };
//     });
// }
// // roles
// async function GetRoleList(pageNumber, perPage) {
//   const urlString = `${CMS_ACCESS_ROLE}?$count=true&${paginationQuery(
//     pageNumber,
//     perPage
//   )}`;

//   return await axios
//     .get(encodeURI(urlString), REQUEST_HEADER)
//     .then(({ data }) => {
//       return data;
//     })
//     .catch((error) => {
//       return { error: "Client server connection error" };
//     });
// }

// async function CreateRole({ name, description, permissions }) {
//   return await axios
//     .post(
//       encodeURI(CMS_ACCESS_ROLE),
//       {
//         name,
//         description: description ? description : "undefined",
//         permissions: permissions,
//         createdAt: getCurrentDate(),
//         updatedAt: getCurrentDate(),
//       },
//       REQUEST_HEADER
//     )
//     .then(() => {
//       return { success: true };
//     })
//     .catch(() => {
//       return { error: "Client server connection error" };
//     });
// }

// async function UpdateRole({ id, name, description, permissions }) {
//   const urlString = `${CMS_ACCESS_ROLE}(${id})`;
//   return await axios
//     .patch(
//       encodeURI(urlString),
//       {
//         name,
//         description,
//         permissions,
//         updatedAt: getCurrentDate(),
//       },
//       REQUEST_HEADER
//     )
//     .then(() => {
//       return { success: true };
//     })
//     .catch(() => {
//       return { error: "Client server connection error" };
//     });
// }

// async function DeleteRole(id) {
//   const urlString = `${CMS_ACCESS_ROLE}/${id}`;
//   return await axios
//     .delete(encodeURI(urlString), REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch(() => {
//       return { error: "Client server connection error" };
//     });
// }

// // access lvl
// async function AccessLvlList(url) {
//   return await axios
//     .get(encodeURI(`${CMS_ACCESS_LVL}${url}`), REQUEST_HEADER)
//     .then(({ data }) => {
//       return data;
//     })
//     .catch((err) => {
//       return { error: "Client server connection error" };
//     });
// }

// async function AccessLvlCreate({ name, description, roles, permissions }) {
//   return await axios
//     .post(
//       encodeURI(`${CMS_ACCESS_LVL}`),
//       {
//         name,
//         description,
//         roles,
//         permissions,
//         isPublished: true,
//         createdAt: getCurrentDate(),
//         updatedAt: getCurrentDate(),
//       },
//       REQUEST_HEADER
//     )
//     .then(() => {
//       return { success: true };
//     })
//     .catch((err) => {
//       return { error: "Client nd server connection error" };
//     });
// }

// async function AccessLvlDelete(id) {
//   const urlString = `${CMS_ACCESS_LVL}(${id})`;
//   return await axios
//     .patch(
//       encodeURI(urlString),
//       {
//         id,
//         isPublished: false,
//         updatedAt: getCurrentDate(),
//       },
//       REQUEST_HEADER
//     )
//     .then(() => {
//       return { success: true };
//     })
//     .catch((err) => {
//       return { error: "client nd server connection error" };
//     });
// }

// async function AccessLvlUpdate({ id, name, description, roles, permissions }) {
//   const urlString = `${CMS_ACCESS_LVL}(${id})`;
//   return await axios
//     .patch(
//       encodeURI(urlString),
//       {
//         name,
//         description,
//         roles,
//         permissions,
//         updatedAt: getCurrentDate(),
//       },
//       REQUEST_HEADER
//     )
//     .then(() => {
//       return { success: true };
//     })
//     .catch((error) => {
//       return { error: "Client aand server connection error" };
//     });
// }

// export {
//   CMSLogin,
//   GetUserDetail,
//   GetUserList,
//   UserCreate,
//   UserAccessLvlUpdate,
//   UserEdit,
//   UserDelete,
//   GetRoleList,
//   CreateRole,
//   DeleteRole,
//   UpdateRole,
//   AccessLvlList,
//   AccessLvlCreate,
//   AccessLvlUpdate,
//   AccessLvlDelete,
//   PasswordReset,
//   GetUser,
// };

import {
  CMS_ACCESS_LVL,
  CMS_ACCESS_ROLE,
  CMS_LOGIN,
  CMS_USER,
  CMS_USER_CREATE,
  PASSWORD_RESET,
} from "@/lib/apiConst";
import { REQUEST_HEADER } from "@/lib/config";
import { getCurrentDate, paginationQuery } from "@/lib/globalFunctions";
import axios from "axios";
// login
async function CMSLogin({ email, password }) {
  const urlString = `${CMS_LOGIN}?email=${email}&password=${password}`;

  return await axios
    .get(encodeURI(urlString), REQUEST_HEADER)
    .then(({ data: { value } }) => {
      if (!value) {
        return;
      }

      return value;
    })
    .catch((error) => {
      return { error: "Client and server connection error" };
    });
}

// user
async function GetUserDetail(id) {
  const urlString = `${CMS_USER}?$select=email,name,siteAdminNote,phoneNumber,address,avatar,isDelete,id&$expand=AccessLevel&$filter=id eq ${id}`;
  return await axios
    .get(encodeURI(urlString), REQUEST_HEADER)
    .then(({ data: { value } }) => {
      return value.length > 0 ? value[0] : false;
    })
    .catch((error) => {
      return { error: "Client and server connection error" };
    });
}
async function GetUser() {
  const urlString = CMS_USER;
  return await axios
    .get(encodeURI(urlString), REQUEST_HEADER)
    .then(({ data: { value } }) => {
      // return value;
      return value.length > 0 ? value[0] : false;
    })
    .catch((error) => {
      return { error: "Client and server connection error" };
    });
}
async function GetUserList(url) {
  console.log(`${CMS_USER}${url}`);
  return await axios
    .get(encodeURI(`${CMS_USER}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return { error: "Client and server connection error" };
    });
}

async function UserDelete(id) {
  const urlString = `${CMS_USER}(${id})`;
  return await axios
    .patch(
      encodeURI(urlString),
      {
        isDelete: true,
        updatedAt: getCurrentDate(),
      },
      REQUEST_HEADER
    )
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function UserCreate(data) {
  return await axios
    .post(encodeURI(`${CMS_USER_CREATE}`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

async function UserEdit(data, id) {
  return await axios
    .patch(encodeURI(`${CMS_USER}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: "true" };
    })
    .catch(() => {
      return { error: "Client server connection error" };
    });
}

async function PasswordReset({ email, password }) {
  const urlString = `${PASSWORD_RESET}?email=${email}&password=${password}`;

  return await axios
    .patch(
      encodeURI(urlString),
      {
        email,
        password,
      },
      REQUEST_HEADER
    )
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client server connection error" };
    });
}

async function UserAccessLvlUpdate(userId, data) {
  return await axios
    .patch(encodeURI(`${CMS_USER}(${userId})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client Server connection error" };
    });
}
// roles
async function GetRoleList(pageNumber, perPage) {
  const urlString = `${CMS_ACCESS_ROLE}?$count=true&${paginationQuery(
    pageNumber,
    perPage
  )}`;

  return await axios
    .get(encodeURI(urlString), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return { error: "Client server connection error" };
    });
}

async function CreateRole({ name, description, permissions }) {
  return await axios
    .post(
      encodeURI(CMS_ACCESS_ROLE),
      {
        name,
        description: description ? description : "undefined",
        permissions: permissions,
        createdAt: getCurrentDate(),
        updatedAt: getCurrentDate(),
      },
      REQUEST_HEADER
    )
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client server connection error" };
    });
}

async function UpdateRole({ id, name, description, permissions }) {
  const urlString = `${CMS_ACCESS_ROLE}(${id})`;
  return await axios
    .patch(
      encodeURI(urlString),
      {
        name,
        description,
        permissions,
        updatedAt: getCurrentDate(),
      },
      REQUEST_HEADER
    )
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client server connection error" };
    });
}

async function DeleteRole(id) {
  const urlString = `${CMS_ACCESS_ROLE}/${id}`;
  return await axios
    .delete(encodeURI(urlString), REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client server connection error" };
    });
}

// access lvl
async function AccessLvlList(url) {
  return await axios
    .get(encodeURI(`${CMS_ACCESS_LVL}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return { error: "Client server connection error" };
    });
}

async function AccessLvlCreate({ name, description, roles, permissions }) {
  return await axios
    .post(
      encodeURI(`${CMS_ACCESS_LVL}`),
      {
        name,
        description,
        roles,
        permissions,
        isPublished: true,
        createdAt: getCurrentDate(),
        updatedAt: getCurrentDate(),
      },
      REQUEST_HEADER
    )
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client nd server connection error" };
    });
}

async function AccessLvlDelete(id) {
  const urlString = `${CMS_ACCESS_LVL}(${id})`;
  return await axios
    .patch(
      encodeURI(urlString),
      {
        id,
        isPublished: false,
        updatedAt: getCurrentDate(),
      },
      REQUEST_HEADER
    )
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "client nd server connection error" };
    });
}

async function AccessLvlUpdate({ id, name, description, roles, permissions }) {
  const urlString = `${CMS_ACCESS_LVL}(${id})`;
  return await axios
    .patch(
      encodeURI(urlString),
      {
        name,
        description,
        roles,
        permissions,
        updatedAt: getCurrentDate(),
      },
      REQUEST_HEADER
    )
    .then(() => {
      return { success: true };
    })
    .catch((error) => {
      return { error: "Client aand server connection error" };
    });
}

export {
  CMSLogin,
  GetUserDetail,
  GetUserList,
  UserCreate,
  UserAccessLvlUpdate,
  UserEdit,
  UserDelete,
  GetRoleList,
  CreateRole,
  DeleteRole,
  UpdateRole,
  AccessLvlList,
  AccessLvlCreate,
  AccessLvlUpdate,
  AccessLvlDelete,
  PasswordReset,
  GetUser,
};

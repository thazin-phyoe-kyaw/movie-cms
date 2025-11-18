import {
  getCurrentDate,
  paginationQuery,
  queryFilterHandler,
} from "@/lib/globalFunctions";
import {
  AccessLvlCreate,
  AccessLvlDelete,
  AccessLvlList,
  AccessLvlUpdate,
  CMSLogin,
  CreateRole,
  DeleteRole,
  GetRoleList,
  GetUserDetail,
  GetUserList,
  UpdateRole,
  UserAccessLvlUpdate,
  UserCreate,
  UserDelete,
  PasswordReset,
  UserEdit,
} from "./services";
import {
  FILTER_CONST_ACCESS_LEVEL,
FILTER_CONST_CMS_USER,
} from "@/lib/queryConst";

async function CMSControllerLogin({ email, password }) {
  if (!email) {
    return;
  }

  return await CMSLogin({ email, password });
}

async function CMSGetUserDetail(id) {
  return await GetUserDetail(id);
}

async function CMSUserList(query) {
  let url = `?$count=true&$select=email,name,siteAdminNote,phoneNumber,address,avatar,isDelete,id&$expand=AccessLevel`;
  const filter = queryFilterHandler(query, FILTER_CONST_CMS_USER);
  const pagination = paginationQuery(query);

  return await GetUserList(
    `${url}${filter !== "" ? `&$filter=${filter}` : ""}&${pagination}`
  );
}

async function CMSUserCrete(data) {
  return await UserCreate({ ...data, avatar: "undefined" });
}

async function CMSUserDelete(id) {
  const deleteUser = await UserDelete(id);

  if (!deleteUser) {
    return { error: "Something Wrong" };
  }

  return deleteUser;
}
async function UserPasswordReset(email, password) {
  return await PasswordReset(email, password);
}

async function CMSUserUpdate(data) {
  if (data.name && data.id) {
    return await UserEdit(
      {
        name: data.name,
        phoneNumber: data.phoneNumber ? data.phoneNumber : "undefined",
        address: data.address ? data.address : "undefined",
        avatar: data.avatar ? data.avatar : "undefined",
        updatedAt: getCurrentDate(),
      },
      data.id
    );
  }

  return { error: "Require data" };
}

async function CMSUserAccessLevelUpdate(data) {
  if (data.userId && data.accessLvlId) {
    return await UserAccessLvlUpdate(data.userId, {
      accessLevelId: data.accessLvlId,
      updatedAt: getCurrentDate(),
    });
  }

  return { error: "Require data" };
}

async function CMSRoleList(pageNumber, perPage) {
  return await GetRoleList(pageNumber, perPage);
}

async function CMSRoleCreate({ name, description, permissions }) {
  if (!name || permissions.length === 0) {
    return false;
  }

  return await CreateRole({ name, description, permissions });
}

async function CMSRoleDelete({ id }) {
  return await DeleteRole(id);
}

async function CMSRoleUpdate({ id, name, description, permissions }) {
  return await UpdateRole({ id, name, description, permissions });
}

async function CMSAccessLvlList(query) {
  let url = `?$count=true`;
  const filter = queryFilterHandler(query, FILTER_CONST_ACCESS_LEVEL);
  const pagination = paginationQuery(query);

  return await AccessLvlList(
    `${url}${filter !== "" ? `&$filter=${filter}` : ""}&${pagination}`
  );
}

async function CMSAccessLvlCreate({ name, description, roles, permissions }) {
  return await AccessLvlCreate({ name, description, roles, permissions });
}

async function CMSAccessLvlUpdate({
  id,
  name,
  description,
  roles,
  permissions,
  isPublished,
}) {
  return await AccessLvlUpdate({
    id,
    name,
    description,
    roles,
    permissions,
    isPublished,
  });
}

async function CMSAccessLvlDelete({ id }) {
  return await AccessLvlDelete(id);
}

export {
  CMSControllerLogin,
  CMSGetUserDetail,
  CMSUserList,
  CMSUserCrete,
  CMSUserUpdate,
  CMSUserAccessLevelUpdate,
  CMSUserDelete,
  UserPasswordReset,
  CMSRoleList,
  CMSRoleCreate,
  CMSRoleDelete,
  CMSRoleUpdate,
  CMSAccessLvlList,
  CMSAccessLvlCreate,
  CMSAccessLvlUpdate,
  CMSAccessLvlDelete,
};

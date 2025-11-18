import {
  ADS_ENUM_ADS_LOCATION,
  ADS_ENUM_BANNER,
  ADS_ENUM_IMAGE_RATIO,
  BOOLEAN_ENUM,
  COMPARISON_ENUM,
  CONTENT_MOVIE_ENUM,
  EPIN_STATUS,
  IS_NULL_ENUM,
} from "./const";
import {
  GetCMSUserById,
  GetEpisodeById,
  GetTitleById,
  GetUserById,
} from "./generalApis";

const FILTER_CONST_CMS_USER = [
  { key: "isDelete", type: "boolean" },
  { key: "name", type: "string" },
  { key: "email", type: "string" },
  { key: "phoneNumber", type: "string" },
  { key: "siteAdminNote", type: "stirng" },
  { key: "address", type: "string" },
  { key: "avatar", type: "string" },
  { key: "id", type: "id" },
  { key: "accessLevelId", type: "id" },
];

const FILTER_CONST_ACCESS_LEVEL = [
  { key: "id", type: "id" },
  { key: "name", type: "string" },
  { key: "roles", type: "array" },
  { key: "permissions", type: "array" },
  { key: "isPublished", type: "boolean" },
];

const FILTER_CONST_ADS_LIST = [
  { key: "id", type: "id" },
  { key: "createdBy", type: "id" },
  { key: "updatedby", type: "id" },
  { key: "sequence", type: "number" },
  { key: "status", type: "boolean" },
  { key: "adsLocation", type: "number" },
  { key: "imageRatio", type: "number" },
  { key: "deletedAt", type: "null" },
];

const ORDER_CONST_ADS_LIST = ["sequence", "status", "createdAt", "uptadedAt"];

const FILTER_CONST_ADS_ITEMS = [
  { key: "adsListId", type: "id" },
  { key: "id", type: "id" },
  { key: "createdBy", type: "id" },
  { key: "updatedBy", type: "id" },
  { key: "name", type: "string" },
  { key: "bannerType", type: "number" },
  { key: "htmlCode", type: "string" },
  { key: "webLink", type: "string" },
  { key: "imageUrl", type: "string" },
  { key: "titleId", type: "id" },
  { key: "sequence", type: "number" },
  { key: "clickCount", type: "number" },
  { key: "viewCount", type: "number" },
  { key: "status", type: "boolean" },
  { key: "deletedAt", type: "null" },
];

const ORDER_CONST_ADS_ITEMS = [
  "sequence",
  "clickCount",
  "viewCount",
  "status",
  "createdAt",
  "updatedAt",
  "htmlCode",
];

const FILTER_CONST_SUBSCRIPTION_GATEWAYS = [
  { key: "platform", type: "string" },
  { key: "active", type: "boolean" },
  { key: "id", type: "id" },
  { key: "updatedBy", type: "id" },
];

const FILTER_CONST_SUBSCRIPTION_PLANS = [
  { key: "id", type: "id" },
  { key: "isDisplayStatus", type: "isDisplayStatus" },
  { key: "description", type: "description" },
  { key: "featuredImage", type: "featuredImage" },
  { key: "duration", type: "duration" },
  { key: "gateways", type: "gateways" },
  { key: "costDisplay", type: "costDisplay" },
  { key: "currency", type: "currency" },
  { key: "active", type: "active" },
  { key: "planId", type: "planId" },
  { key: "isWalletItem", type: "isWalletItem" },
  { key: "updatedAt", type: "updatedAt" },
  { key: "updatedBy", type: "updatedBy" },
];

const FILTER_CONST_SLIDER_LIST = [
  { key: "id", type: "id" },
  { key: "createdBy", type: "id" },
  { key: "updatedby", type: "id" },
  { key: "status", type: "boolean" },
  // { key: "displayLocation", type: "number" },
  { key: "deletedAt", type: "null" },
];
// for new query
const QUERY_CONST_ADS_LIST = {
  id: { type: "id" },
  createdBy: { type: "id" },
  updatedBy: { type: "id" },
  sequence: { type: "number" },
  status: { type: "boolean" },
  adsLocation: { type: "enum", obj: ADS_ENUM_ADS_LOCATION },
  imageRatio: { type: "enum", obj: ADS_ENUM_IMAGE_RATIO },
  deletedAt: { type: "null" },
};

// const QUERY_CONST_ADS_LIST = [
//   { key: "id", type: "id" },
//   { key: "createdBy", type: "id" },
//   { key: "updatedby", type: "id" },
//   { key: "sequence", type: "number" },
//   { key: "status", type: "boolean" },
//   { key: "adsLocation", type: "enum", obj: ADS_ENUM_ADS_LOCATION },
//   { key: "imageRatio", type: "enum", obj: ADS_ENUM_IMAGE_RATIO },
//   { key: "deletedAt", type: "null" },
// ];

const FILTER_CONST_PROFILE_USER_DEVICE = [{ key: "userId", type: "id" }];

const FILTER_CONST_PROFILE_FAVOURITE = [{ key: "userId", type: "id" }];

const FILTER_CONST_PROFILE_LIKE = [{ key: "userId", type: "id" }];

const FILTER_CONST_PROFILE_DOWNLOAD = [{ key: "userId", type: "id" }];

const FILTER_CONST_PROFILE_USER_SHARE = [{ key: "userId", type: "id" }];
const FILTER_CONST_AD_STREAMING = [{ key: "deletedAt", type: "null" }];
const FILTER_CONST_PROMOCODE_PROMOCODE = [{ key: "deleteAt", type: "null" }];
const FILTER_CONST_PROMOCODE_PROMOCODEUSER = [
  { key: "deleteAt", type: "null" },
];
// new query consst

const FILTER_CONST_FAQS = [
  { key: "id", type: "id" },
  { key: "createdBy", type: "id" },
  { key: "updatedBy", type: "id" },
  { key: "sequence", type: "number" },
  { key: "status", type: "boolean" },
  { key: "deletedAt", type: "null" },
  { key: "questionMm", type: "string" },
  { key: "questionEn", type: "string" },
  { key: "answerEn", type: "string" },
  { key: "answerMm", type: "string" },
];

const QUERY_DISPLAY_ADS_ITEMS_CONST = {
  fields: [
    "id",
    "name",
    "bannerType",
    "htmlCode",
    "webLink",
    "imageUrl",
    "titleId",
    "sequence",
    "clickCount",
    "viewCount",
    "status",
    "deletedAt",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
  filter: {
    name: { value: "", type: "string", label: "Name" },
    bannerType: {
      value: "",
      type: "enum",
      label: "Banner Type",
      enum: ADS_ENUM_BANNER,
    },
    status: {
      value: "",
      type: "boolean",
      label: "Status",
      enum: BOOLEAN_ENUM,
    },
    deletedAt: {
      value: "eq",
      type: "isNull",
      label: "Is Delete",
      enum: IS_NULL_ENUM,
    },
    titleId: {
      value: "",
      type: "foreign",
      label: "Title",
      query: "/api/general/get_title_by_name",
    },
  },
  order: { sequence: "asc", updatedAt: "" },
  childrens: [],
  id_to_name_replacer: [
    {
      handler: GetCMSUserById,
      patterns: [/"createdBy":(.*?),/g, /"updatedBy":(.*?),/g],
      replacers: ['"createdBy":', '"updatedBy":', '"', ",", "}", "]"],
    },
    {
      handler: GetTitleById,
      patterns: [/"titleId":(.*?),/g],
      replacers: ['"titleId":', '"', ",", "}", "]"],
    },
  ],
  top: 10,
  skip: 0,
};

const QUERY_DISPLAY_AD_LIST_CONST = {
  fields: [
    "id",
    "status",
    "adsLocation",
    "imageRatio",
    "sequence",
    "deletedAt",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
  filter: {
    status: {
      value: "",
      type: "boolean",
      label: "Is Active",
      enum: BOOLEAN_ENUM,
    },
    adsLocation: {
      type: "enum",
      label: "Ad Location",
      enum: ADS_ENUM_ADS_LOCATION,
    },
    imageRatio: {
      type: "enum",
      label: "ImageRatio",
      enum: ADS_ENUM_IMAGE_RATIO,
    },
    sequence: {
      value: "",
      type: "number",
      label: "Sequence Order",
      enum: COMPARISON_ENUM,
    },
    deletedAt: {
      value: "eq",
      type: "isNull",
      label: "Is Delete",
      enum: IS_NULL_ENUM,
    },
  },
  order: { sequence: "asc", updatedAt: "", status: "desc" },
  childrens: [
    {
      name: "AdsItems",
      type: "multi",
      data: QUERY_DISPLAY_ADS_ITEMS_CONST,
    },
  ],
  id_to_name_replacer: [
    {
      handler: GetCMSUserById,
      patterns: [/"createdBy":(.*?),/g, /"updatedBy":(.*?),/g],
      replacers: ['"createdBy":', '"updatedBy":', '"', ",", "}", "]"],
    },
    {
      handler: GetTitleById,
      patterns: [/"titleId":(.*?),/g],
      replacers: ['"titleId":', '"', ",", "}", "]"],
    },
  ],
  top: 10,
  skip: 0,
};
const QUERY_DISPLAY_AD_SLIDER_CONST = {
  fields: [
    "id",
    "name",
    "bannerType",
    "htmlCode",
    "webLink",
    "displayLocation",
    "imageUrl",
    "status",
    "titleId",
    "sequence",
    "deletedAt",
    "deletedBy",
    "createdAt",
    "createdBy",
    "updatedAt",
  ],
  filter: {
    name: { value: "", type: "string", label: "Name" },
    status: {
      value: "",
      type: "boolean",
      label: "Is Active",
      enum: BOOLEAN_ENUM,
    },
    sequence: {
      value: "",
      type: "number",
      label: "Sequence Order",
      enum: COMPARISON_ENUM,
    },
    bannerType: {
      value: "",
      type: "enum",
      label: "Banner Type",
      enum: ADS_ENUM_BANNER,
    },
    deletedAt: {
      value: "eq",
      type: "isNull",
      label: "Is Delete",
      enum: IS_NULL_ENUM,
    },
  },
  order: { sequence: "asc", updatedAt: "", status: "desc" },
  top: 10,
  skip: 0,
};

const QUERY_DISPLAY_AD_STREAMING_CONST = {
  fields: [
    "id",
    "adsStreamingUrl",
    "adsStreamingType",
    "adsStartTime",
    "status",
    "targetUser",
    "deletedAt",
    "deletedBy",
    "createdAt",
    "createdBy",
    "updatedAt",
  ],
  filter: {
    status: {
      value: "",
      type: "boolean",
      label: "Is Active",
      enum: BOOLEAN_ENUM,
    },
    deletedAt: {
      value: "eq",
      type: "isNull",
      label: "Is Delete",
      enum: IS_NULL_ENUM,
    },
  },
  order: { updatedAt: "", status: "desc" },
  top: 10,
  skip: 0,
};
// const QUERY_DISPLAY_AD_PLAYLIST_CONST = {
//   fields: [
//     "id",
//     "status",
//     "adsLocation",
//     "imageRatio",
//     "sequence",
//     "deletedAt",
//     "createdAt",
//     "updatedAt",
//     "createdBy",
//     "updatedBy",
//   ],
//   filter: {
//     status: {
//       value: "",
//       type: "boolean",
//       label: "Is Active",
//       enum: BOOLEAN_ENUM,
//     },
//     adsLocation: {
//       type: "enum",
//       label: "Ad Location",
//       enum: ADS_ENUM_ADS_LOCATION,
//     },
//     imageRatio: {
//       type: "enum",
//       label: "ImageRatio",
//       enum: ADS_ENUM_IMAGE_RATIO,
//     },
//     sequence: {
//       value: "",
//       type: "number",
//       label: "Sequence Order",
//       enum: COMPARISON_ENUM,
//     },
//     deletedAt: {
//       value: "eq",
//       type: "isNull",
//       label: "Is Delete",
//       enum: IS_NULL_ENUM,
//     },
//   },
//   order: { sequence: "asc", updatedAt: "", status: "desc" },
//   childrens: [
//     {
//       name: "AdminPlaylistTitles",
//       type: "multi",
//       data: QUERY_DISPLAY_ADS_ITEMS_CONST,
//     },
//   ],
//   id_to_name_replacer: [
//     {
//       handler: GetCMSUserById,
//       patterns: [/"createdBy":(.*?),/g, /"updatedBy":(.*?),/g],
//       replacers: ['"createdBy":', '"updatedBy":', '"', ",", "}", "]"],
//     },
//     {
//       handler: GetTitleById,
//       patterns: [/"titleId":(.*?),/g],
//       replacers: ['"titleId":', '"', ",", "}", "]"],
//     },
//   ],
//   top: 10,
//   skip: 0,
// };

const QUERY_CMS_ACCESS_LVL_CONST = {
  fields: [
    "id",
    "name",
    "description",
    // "roles",
    // "permissions",
    "isPublished",
    "createdAt",
    "updatedAt",
  ],
  filter: {
    name: { value: "", type: "string", label: "Name" },
    isPublished: {
      value: "",
      type: "boolean",
      label: "Is Published",
      enum: BOOLEAN_ENUM,
    },
  },
  order: { isPublished: "asc", createdAt: "desc", updatedAt: "" },
  childrens: [],
  top: 10,
  skip: 0,
};

const QUERY_CMS_USER_CONST = {
  // childrens: [
  //   {
  //     name: "AdsItems",
  //     type: "multi",
  //     data: QUERY_DISPLAY_ADS_ITEMS_CONST,
  //   },
  // ],
  fields: [
    "id",
    "name",
    "email",
    "phoneNumber",
    "siteAdminNote",
    "address",
    "accessLevelId",
    "avatar",
    "createdAt",
    "updatedAt",
    "isLog",
    "isDelete",
  ],
  filter: {
    name: { value: "", type: "string", label: "Name" },
    email: { value: "", type: "string", label: "Email" },
    phoneNumber: {
      value: "",
      type: "stirng",
      label: "Phone Number",
    },
    isLog: {
      value: "",
      type: "boolean",
      label: "Is Locked",
      enum: BOOLEAN_ENUM,
    },
    isDelete: {
      value: "true",
      type: "boolean",
      label: "Deleted",
      enum: BOOLEAN_ENUM,
    },
  },
  order: {
    name: "",
    isLog: "",
    isDeleted: "",
    createdAt: "",
    updatedAt: "",
  },
  childrens: [
    {
      name: "AccessLevel",
      type: "single",
      data: QUERY_CMS_ACCESS_LVL_CONST,
    },
  ],
  top: 10,
  skip: 0,
};

// CONTENT SERVICE
const QUERY_CONTENT_ROLE_CONST = {
  fields: [
    "id",
    "nameMm",
    "nameEn",
    "deletedAt",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
  filter: {
    nameEn: { value: "", type: "string", label: "En Name" },
    status: {
      value: "",
      type: "boolean",
      label: "Is Active",
      enum: BOOLEAN_ENUM,
    },
    deletedAt: {
      value: "eq",
      type: "isNull",
      label: "Is Delete",
      enum: IS_NULL_ENUM,
    },
  },
  order: { createdAt: "desc", updatedAt: "" },
  id_to_name_replacer: [
    {
      handler: GetCMSUserById,
      patterns: [/"createdBy":(.*?),/g, /"updatedBy":(.*?),/g],
      replacers: ['"createdBy":', '"updatedBy":', '"', ",", "}", "]"],
    },
  ],
  top: 10,
  skip: 0,
};
const QUERY_CONTENT_TAG_CONST = {
  fields: [
    "id",
    "nameMm",
    "nameEn",
    "deletedAt",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
  filter: {
    nameEn: { value: "", type: "string", label: "EN Name" },
    status: {
      value: "",
      type: "boolean",
      label: "Is Active",
      enum: BOOLEAN_ENUM,
    },
    deletedAt: {
      value: "eq",
      type: "isNull",
      label: "Is Delete",
      enum: IS_NULL_ENUM,
    },
  },
  order: { createdAt: "desc", updatedAt: "" },
  id_to_name_replacer: [
    {
      handler: GetCMSUserById,
      patterns: [/"createdBy":(.*?),/g, /"updatedBy":(.*?),/g],
      replacers: ['"createdBy":', '"updatedBy":', '"', ",", "}", "]"],
    },
  ],
  top: 10,
  skip: 0,
};
const QUERY_CONTENT_GENRE_CONST = {
  fields: [
    "id",
    "type",
    "nameMm",
    "nameEn",
    "deletedAt",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
  filter: {
    nameEn: { value: "", type: "string", label: "EN Name" },
    status: {
      value: "",
      type: "boolean",
      label: "Is Active",
      enum: BOOLEAN_ENUM,
    },
    deletedAt: {
      value: "eq",
      type: "isNull",
      label: "Is Delete",
      enum: IS_NULL_ENUM,
    },
  },
  order: { createdAt: "desc", updatedAt: "" },
  id_to_name_replacer: [
    {
      handler: GetCMSUserById,
      patterns: [/"createdBy":(.*?),/g, /"updatedBy":(.*?),/g],
      replacers: ['"createdBy":', '"updatedBy":', '"', ",", "}", "]"],
    },
  ],
  top: 10,
  skip: 0,
};
const QUERY_CONTENT_CREDIT_CONST = {
  fields: [
    "id",
    "nameMm",
    "nameEn",
    "keywords",
    "profileImage",
    "coverImage",
    "actorAcademy",
    "directorAcademy",
    "ownerAcademy",
    "bioEn",
    "bioMm",
    "startYear",
    "endYear",
    "status",
    "deletedAt",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
  filter: {
    name: { value: "", type: "string", label: "Name" },
    status: {
      value: "",
      type: "boolean",
      label: "Is Active",
      enum: BOOLEAN_ENUM,
    },
    deletedAt: {
      value: "eq",
      type: "isNull",
      label: "Is Delete",
      enum: IS_NULL_ENUM,
    },
  },
  order: { createdAt: "desc", updatedAt: "" },
  id_to_name_replacer: [
    {
      handler: GetCMSUserById,
      patterns: [/"createdBy":(.*?),/g, /"updatedBy":(.*?),/g],
      replacers: ['"createdBy":', '"updatedBy":', '"', ",", "}", "]"],
    },
  ],
  top: 10,
  skip: 0,
};
const QUERY_CONTENT_TRAILER_CONST = {
  fields: [
    "id",
    "titleId",
    "status",
    "sorting",
    "nameEn",
    "nameMm",
    "trailerUrl",
    "deletedAt",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
  filter: {
    nameEn: { value: "", type: "string", label: "EN Name" },
    status: {
      value: "",
      type: "boolean",
      label: "Is Active",
      enum: BOOLEAN_ENUM,
    },
    deletedAt: {
      value: "eq",
      type: "isNull",
      label: "Is Delete",
      enum: IS_NULL_ENUM,
    },
  },

  order: { createdAt: "desc", updatedAt: "" },
  id_to_name_replacer: [
    {
      handler: GetCMSUserById,
      patterns: [/"createdBy":(.*?),/g, /"updatedBy":(.*?),/g],
      replacers: ['"createdBy":', '"updatedBy":', '"', ",", "}", "]"],
    },
    {
      handler: GetTitleById,
      patterns: [/"titleId":(.*?),/g],
      replacers: ['"titleId":', '"', ",", "}", "]"],
    },
  ],
  top: 10,
  skip: 0,
};

const QUERY_CONTENT_SEASON_CONST = {
  fields: [
    "id",
    "nameMm",
    "nameEn",
    "keywords",
    "publishDate",
    "title",
    "sorting",
    "seriesId",
    "statusType",
    "status",
    "deletedAt",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
  filter: {
    nameEn: { value: "", type: "string", label: "EN Name" },
    status: {
      value: "",
      type: "boolean",
      label: "Is Active",
      enum: BOOLEAN_ENUM,
    },
    deletedAt: {
      value: "eq",
      type: "isNull",
      label: "Is Delete",
      enum: IS_NULL_ENUM,
    },
    seriesId: {
      value: "eq",
      type: "foreign",
      label: "Series",
      query: "",
    },
  },
  order: { updatedAt: "" },
  top: 10,
  skip: 0,
};
const QUERY_CONTENT_EPISODE_CONST = {
  fields: [
    "id",
    "titleMm",
    "titleEn",
    "isPremium",
    "keywords",
    "duration",
    "fullHdFileSize",
    "hdFileSize",
    "sdFileSize",
    "streamingUrl",
    "downloadUrl",
    "sorting",
    "status",
    "statusType",
    "descriptionEn",
    "descriptionMm",
    "posterPortrait",
    "posterLandscape",
    "seasonId",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
  filter: {
    titleEn: { value: "", type: "string", label: "EN Title" },

    seasonId: {
      value: "eq",
      type: "foreign",
      label: "Episode",
      query: "",
    },
  },
  order: { updatedAt: "" },
  top: 10,
  skip: 0,
};

const QUERY_TAG_TITLE_CONST = {
  fields: [
    "id",
    "titleId",
    "tagId",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
  filter: {
    name: { value: "", type: "string", label: "Name" },
  },
  order: { createdAt: "", updatedAt: "" },
  childrens: [
    {
      name: "Tag",
      type: "normal",
      data: QUERY_CONTENT_TAG_CONST,
    },
  ],
  top: 10,
  skip: 0,
};
const QUERY_GENRE_TITLE_CONST = {
  fields: [
    "id",
    "titleId",
    "genreId",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
  filter: {
    name: { value: "", type: "string", label: "Name" },
  },
  order: { createdAt: "", updatedAt: "" },
  childrens: [
    {
      name: "Genre",
      type: "normal",
      data: QUERY_CONTENT_GENRE_CONST,
    },
  ],
  top: 10,
  skip: 0,
};
const QUERY_CREDIT_ROLE_CONST = {
  fields: [
    "id",
    "creditId",
    "roleId",
    "sorting",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
  filter: {
    name: { value: "", type: "string", label: "Name" },
  },
  childrens: [
    {
      name: "Credit",
      type: "normal",
      data: QUERY_CONTENT_CREDIT_CONST,
    },
    {
      name: "Role",
      type: "normal",
      data: QUERY_CONTENT_ROLE_CONST,
    },
  ],
  order: { jsorting: "", updatedAt: "" },
  top: 10,
  skip: 0,
};
const QUERY_TITLE_CREDIT_CONST = {
  fields: [
    "id",
    "titleId",
    "creditRoleId",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
  filter: {
    name: { value: "", type: "string", label: "Name" },
  },
  order: { updatedAt: "", updatedAt: "" },

  childrens: [
    {
      name: "CreditRole",
      type: "multi",
      data: QUERY_CREDIT_ROLE_CONST,
    },
  ],
  top: 10,
  skip: 0,
};
const QUERY_CONTENT_MOVIE_CONST = {
  fields: [
    "id",
    "titleId",
    "duration",
    "fullHdFileSize",
    "hdFileSize",
    "sdFileSize",
    "trailer",
    "streamingUrl",
    "downloadUrl",
    "sorting",
    "isCinema",
    "price",
    "discountPrice",
    "isExclusive",
    "status",
    "startDate",
    "expireDate",
    "publishDate",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
  filter: {
    name: { value: "", type: "string", label: "Name" },
  },
  order: { createdAt: "", updatedAt: "" },

  top: 10,
  skip: 0,
};
const QUERY_MOVIE_CONST = {
  fields: [
    "id",
    "keywords",
    "titleEn",
    "titleMm",
    "descriptionEn",
    "descriptionMm",
    "type",
    "isPremium",
    "resolution",
    "rating",
    "sorting",
    "status",
    "statusType",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],

  order: { createdAt: "", updatedAt: "" },
  childrens: [
    {
      name: "Movie",
      type: "normal",
      data: QUERY_CONTENT_MOVIE_CONST,
    },
    {
      name: "GenreTitles",
      type: "multi",
      data: QUERY_GENRE_TITLE_CONST,
    },
    {
      name: "TagTitles",
      type: "multi",
      data: QUERY_TAG_TITLE_CONST,
    },

    {
      name: "TitleCredit",
      type: "multi",
      data: QUERY_TITLE_CREDIT_CONST,
    },
  ],
  filter: {
    titleEn: { value: "", type: "string", label: "EN Title" },
    titleMm: { value: "", type: "string", label: "MM Title" },
    keywords: { value: "", type: "string", label: "keyword" },

    Type: {
      value: "movie",
      type: "enum",
      label: "Movie",
      enum: CONTENT_MOVIE_ENUM,
    },
    Movie: {
      value: "ne",
      type: "isNull",
      label: "Movie",
      enum: IS_NULL_ENUM,
    },
    status: {
      value: "true",
      type: "boolean",
      label: "Is Active",
      enum: BOOLEAN_ENUM,
    },
  },

  top: 10,
  skip: 0,
};

const QUERY_CONTENT_SERIES_CONST = {
  fields: [
    "id",
    "titleId",
    "trailer",
    "price",
    "discountPrice",
    "isExclusive",
    "status",
    "sorting",
    "startDate",
    "expireDate",
    "publishDate",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
  filter: { name: { value: "", type: "string", label: "MM Title" } },
  order: { createdAt: "", updatedAt: "" },

  top: 10,
  skip: 0,
};
const QUERY_SERIES_CONST = {
  fields: [
    "id",
    "keywords",
    "titleEn",
    "titleMm",
    "descriptionEn",
    "descriptionMm",
    "type",
    "isPremium",
    "resolution",
    "rating",
    "sorting",
    "status",
    "statusType",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],

  order: { createdAt: "", updatedAt: "" },
  childrens: [
    {
      name: "Series",
      type: "normal",
      data: QUERY_CONTENT_SERIES_CONST,
    },
    {
      name: "GenreTitles",
      type: "multi",
      data: QUERY_GENRE_TITLE_CONST,
    },
    {
      name: "TagTitles",
      type: "multi",
      data: QUERY_TAG_TITLE_CONST,
    },

    {
      name: "TitleCredit",
      type: "multi",
      data: QUERY_TITLE_CREDIT_CONST,
    },
  ],
  filter: {
    titleEn: { value: "", type: "string", label: "EN Title" },
    titleMm: { value: "", type: "string", label: "MM Title" },
    keywords: { value: "", type: "string", label: "keyword" },

    Type: {
      value: "series",
      type: "enum",
      label: "Series",
      enum: CONTENT_MOVIE_ENUM,
    },
    Series: {
      value: "ne",
      type: "isNull",
      label: "Series",
      enum: IS_NULL_ENUM,
    },
    status: {
      value: "true",
      type: "boolean",
      label: "Is Active",
      enum: BOOLEAN_ENUM,
    },
  },
  // filter: {

  //     titleMm: { value: "", type: "string", label: "MM Title" },
  //     titleEn: { value: "", type: "string", label: "EN Title" },
  //   },
  //   Type: {
  //     value: "series",
  //     type: "enum",
  //     label: "Series",
  //     enum: CONTENT_MOVIE_ENUM,
  //   },
  //   Series: {
  //     value: "ne",
  //     type: "isNull",
  //     label: "Series",
  //     enum: IS_NULL_ENUM,
  //   },
  //   status: {
  //     value: "true",
  //     type: "boolean",
  //     label: "Is Active",
  //     enum: BOOLEAN_ENUM,
  //   },
  // },

  top: 10,
  skip: 0,
};

// PROFILE
const QUERY_FAVOURITES_CONST = {
  fields: ["titleId", "type"],
  filter: {
    name: { value: "", type: "string", label: "Name" },
  },
  order: { createdAt: "", updatedAt: "" },

  top: 10,
  skip: 0,
};
const QUERY_USER_DEVICES_CONST = {
  fields: [
    "networkType",
    "deviceId",
    "operatorName",
    "os",
    "osVersion",
    "deviceName",
    "deviceType",
  ],
  filter: {
    name: { value: "", type: "string", label: "Name" },
  },
  order: { createdAt: "", updatedAt: "" },

  top: 10,
  skip: 0,
};
const QUERY_LIKES_CONST = {
  fields: ["titleId", "type"],
  filter: {
    name: { value: "", type: "string", label: "Name" },
  },
  order: { createdAt: "", updatedAt: "" },

  top: 10,
  skip: 0,
};
const QUERY_DOWNLOADS_CONST = {
  fields: ["titleId", "downloadDate"],
  filter: {
    name: { value: "", type: "string", label: "Name" },
  },
  order: { createdAt: "", updatedAt: "" },

  top: 10,
  skip: 0,
};
const QUERY_USER_SHARE_CONST = {
  fields: ["fromUser", "toUser", "titleId"],
  filter: {
    name: { value: "", type: "string", label: "Name" },
  },
  order: { createdAt: "", updatedAt: "" },

  top: 10,
  skip: 0,
};
const QUERY_PROFILE_CONST = {
  fields: [
    "id",
    "firebaseUserId",
    "type",
    "email",
    "phoneNumber",
    "name",
    "number",
    "dateOfBirth",
    "gender",
    "imageUrl",
    "lastLogin",
    "status",
  ],
  filter: {
    name: { value: "", type: "string", label: "Name" },
    email: { value: "", type: "string", label: "email" },
    phoneNumber: { value: "", type: "string", label: "phone No" },
    number: { value: "", type: "foreignString", label: "Number" },
  },
  order: { updatedAt: "desc", updatedAt: "" },

  childrens: [
    {
      name: "favourites",
      type: "normal",
      data: QUERY_FAVOURITES_CONST,
    },
    {
      name: "userDevices",
      type: "normal",
      data: QUERY_USER_DEVICES_CONST,
    },
    {
      name: "likes",
      type: "normal",
      data: QUERY_LIKES_CONST,
    },
    {
      name: "userShares",
      type: "normal",
      data: QUERY_USER_SHARE_CONST,
    },
    {
      name: "downloads",
      type: "normal",
      data: QUERY_DOWNLOADS_CONST,
    },
  ],
  top: 10,
  skip: 0,
};
// PROMOCODE

const QUERY_PROMOCODE_USER_CONST = {
  fields: ["id", "userId", "promoId", "deleteAt"],
  filter: {
    name: { value: "", type: "string", label: "Name" },
    status: {
      value: "",
      type: "boolean",
      label: "Is Active",
      enum: BOOLEAN_ENUM,
    },
    deleteAt: {
      value: "eq",
      type: "isNull",
      label: "Is Delete",
      enum: IS_NULL_ENUM,
    },
  },
  order: { updatedAt: "desc" },
  top: 10,
  skip: 0,
};
const QUERY_PROMOCODE_CONST = {
  fields: [
    "id",
    "titleId",
    "episodeId",
    "name",
    "description",
    "deleteNote",
    "startDate",
    "endDate",
    "code",
    "useableCount",
    "usedCount",
    "deleteAt",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
  filter: {
    name: { value: "", type: "string", label: "Name" },
    status: {
      value: "",
      type: "boolean",
      label: "Is Active",
      enum: BOOLEAN_ENUM,
    },
    deleteAt: {
      value: "eq",
      type: "isNull",
      label: "Is Delete",
      enum: IS_NULL_ENUM,
    },
  },
  order: { updatedAt: "desc" },
  id_to_name_replacer: [
    {
      handler: GetTitleById,
      patterns: [/"titleId":(.*?),/g],
      replacers: ['"titleId":', '"', ",", "}", "]"],
    },
    {
      handler: GetEpisodeById,
      patterns: [/"episodeId":(.*?),/g],
      replacers: ['"episodeId":', '"', ",", "}", "]"],
    },
  ],
  childrens: [
    {
      name: "PromoCodeUsers",
      type: "multi",
      data: QUERY_PROMOCODE_USER_CONST,
    },
  ],
  top: 10,
  skip: 0,
};

const QUERY_SUBSCRIPTION_PAYMENT_GATEWAY_CONST = {
  fields: ["id", "platform", "active", "source", "gateWayImage", "updatedBy"],
  filter: {
    name: { value: "", type: "string", label: "Name" },
    status: {
      value: "",
      type: "boolean",
      label: "Is Active",
      enum: BOOLEAN_ENUM,
    },
  },
  order: { active: "desc" },
  id_to_name_replacer: [
    {
      handler: GetCMSUserById,
      patterns: [/"createdBy":(.*?),/g, /"updatedBy":(.*?),/g],
      replacers: ['"createdBy":', '"updatedBy":', '"', ",", "}", "]"],
    },
  ],
  top: 10,
  skip: 0,
};
const QUERY_SUBSCRIPTION_PLAN_CONST = {
  fields: [
    "id",
    "titleMm",
    "titleEng",
    "descriptionMm",
    "descriptionEng",
    "featuredImage",
    "duration",
    "gateways",
    "costDisplay",
    "currency",
    "active",
    "planId",
    "termsAndConditionMm",
    "termsAndConditionEng",
    "updatedAt",
    "updatedBy",
  ],
  filter: {
    gateWays: { value: "", type: "foreign", label: "gate way" },
  },
  order: { active: "desc" },
  id_to_name_replacer: [
    {
      handler: GetCMSUserById,
      patterns: [/"createdBy":(.*?),/g, /"updatedBy":(.*?),/g],
      replacers: ['"createdBy":', '"updatedBy":', '"', ",", "}", "]"],
    },
  ],
  childrens: [
    {
      name: "PaymentGateway",
      type: "multi",
      data: QUERY_SUBSCRIPTION_PAYMENT_GATEWAY_CONST,
    },
  ],
  top: 10,
  skip: 0,
};

const QUERY_FAQSS_CONST = {
  fields: [
    "id",
    "questionEn",
    "questionMm",
    "answerEn",
    "answerMm",
    "status",
    "sequence",
    "faqtitleId",
    "createdAt",
    "updatedAt",
  ],
  filter: {},
  order: { updatedAt: "" },
  top: 10,
  skip: 0,
};
const QUERY_FAQ_CONST = {
  fields: ["id", "titleEn", "titleMm", "createdAt", "updatedAt"],
  filter: {
    titleEn: { value: "", type: "string", label: "Title Name" },
    status: {
      value: "",
      type: "boolean",
      label: "Is Active",
      enum: BOOLEAN_ENUM,
    },
  },
  order: { updatedAt: "desc" },
  childrens: [
    {
      name: "FAQss",
      type: "multi",
      data: QUERY_FAQSS_CONST,
    },
  ],
  top: 10,
  skip: 0,
};
const QUERY_TOPIC_CONST = {
  fields: [
    "id",
    "topicName",
    "topicDescription",
    "isReady",
    "isFifo",
    "messageDeduplication",
    "topicArn",
    "type",
    "filter",
    "from",
  ],
  filter: {
    name: { value: "", type: "string", label: "Name" },
  },
  order: { updatedAt: "" },
  top: 10,
  skip: 0,
};
// NOTI
const QUERY_NOTIFICATION_CONST = {
  fields: [
    "id",
    "name",
    "notiTitle",
    "notiDescription",
    "image",
    "referenceUrl",
    "referencedId",
    "referenceType",
    "sendDate",
    "createdAt",
    "createdBy",
  ],
  filter: {
    name: { value: "", type: "string", label: "Name" },
  },
  order: { createdAt: "desc" },
  childrens: [
    {
      name: "Topic",
      type: "",
      data: QUERY_TOPIC_CONST,
    },
  ],
  top: 10,
  skip: 0,
};

// EPIN

const QUERY_EPIN_PACKAGE_CONST = {
  fields: [
    "id",
    "name",
    "description",
    "duration",
    "expiredDuration",
    "price",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
  filter: {
    name: { value: "", type: "string", label: "Name" },
    status: {
      value: "",
      type: "boolean",
      label: "Is Active",
      enum: BOOLEAN_ENUM,
    },
  },
  order: { updatedAt: "desc" },
  id_to_name_replacer: [
    {
      handler: GetCMSUserById,
      patterns: [/"createdBy":(.*?),/g, /"updatedBy":(.*?),/g],
      replacers: ['"createdBy":', '"updatedBy":', '"', ",", "}", "]"],
    },
  ],
  top: 10,
  skip: 0,
};

const QUERY_GET_GENERATE_JOB_EPIN = {
  fields: [
    "id",
    "name",
    "description",
    "batchNo",
    "lot",
    "prefix",
    "duration",
    "expireDate",
    "count",
    "csvName",
    "creator",
    "createdAt",
    "updatedAt",
    " createdBy",
    "updatedBy",
  ],
  filter: {},
  order: { updatedAt: "" },
  top: 10,
  skip: 0,
};

const QUERY_EPINS_CONST = {
  fields: [
    "id",
    "serialNo",
    "epinNo",
    "expiredDate",
    "duration",
    "price",
    "planId",
    "status",
    "epinGenerationJobId",
    "createdAt",
    "updatedAt",
    " createdBy",
    "updatedBy",
  ],
  filter: {
    serialNo: { value: "", type: "string", label: "Serial No" },
    status: {
      value: "",
      type: "enum",
      label: "Status",
      enum: EPIN_STATUS,
    },
    epinGenerationJobId: {
      value: "",
      type: "foreign",
      label: "epinGenerationJob",
    },
    "epinGenerationJob/batchNo": {
      value: "",
      type: "foreign",
      label: "Batch",
    },
  },
  order: { updatedAt: "desc" },
  childrens: [
    {
      name: "epinGenerationJob",
      type: "",
      data: QUERY_GET_GENERATE_JOB_EPIN,
    },
  ],
  id_to_name_replacer: [
    {
      handler: GetCMSUserById,
      patterns: [/"createdBy":(.*?),/g, /"updatedBy":(.*?),/g],
      replacers: ['"createdBy":', '"updatedBy":', '"', ",", "}", "]"],
    },
  ],
  top: 10,
  skip: 0,
};

const QUERY_EPIN_GENERATION_JOB_CONST = {
  fields: [
    "id",
    "name",
    "description",
    "batchNo",
    "lot",
    "prefix",
    "duration",
    "expireDate",
    "count",
    "csvName",
    "creator",
    "createdAt",
    "updatedAt",
    " createdBy",
    "updatedBy",
  ],
  filter: {
    planId: { value: "", type: "string", label: "Name" },
    // status: {
    //   value: "eq",
    //   type: "boolean",
    //   label: "Is Active",
    //   enum: BOOLEAN_ENUM,
    // },
    batchNo: {
      value: "",
      type: "foreign",
      label: "batchNo",
    },
    prefix: {
      value: "",
      type: "foreignString",
      label: "prefix",
    },
  },
  order: { updatedAt: "desc" },
  childrens: [
    {
      name: "Epins",
      type: "multi",
      data: QUERY_EPINS_CONST,
    },
  ],
  id_to_name_replacer: [
    {
      handler: GetCMSUserById,
      patterns: [/"createdBy":(.*?),/g, /"updatedBy":(.*?),/g],
      replacers: ['"createdBy":', '"updatedBy":', '"', ",", "}", "]"],
    },
  ],
  top: 10,
  skip: 0,
};
export {
  FILTER_CONST_CMS_USER,
  FILTER_CONST_ACCESS_LEVEL,
  FILTER_CONST_ADS_LIST,
  ORDER_CONST_ADS_LIST,
  FILTER_CONST_ADS_ITEMS,
  ORDER_CONST_ADS_ITEMS,
  FILTER_CONST_PROFILE_USER_DEVICE,
  FILTER_CONST_PROFILE_DOWNLOAD,
  FILTER_CONST_PROFILE_FAVOURITE,
  FILTER_CONST_PROFILE_LIKE,
  FILTER_CONST_PROFILE_USER_SHARE,
  FILTER_CONST_SLIDER_LIST,
  FILTER_CONST_SUBSCRIPTION_GATEWAYS,
  FILTER_CONST_SUBSCRIPTION_PLANS,
  FILTER_CONST_AD_STREAMING,
  FILTER_CONST_PROMOCODE_PROMOCODE,
  FILTER_CONST_PROMOCODE_PROMOCODEUSER,

  // new query
  QUERY_CMS_USER_CONST,
  QUERY_CMS_ACCESS_LVL_CONST,
  QUERY_DISPLAY_AD_LIST_CONST,
  QUERY_DISPLAY_ADS_ITEMS_CONST,
  QUERY_DISPLAY_AD_SLIDER_CONST,
  QUERY_DISPLAY_AD_STREAMING_CONST,

  // CONTENT SERVICE QUERY
  QUERY_CONTENT_ROLE_CONST,
  QUERY_CONTENT_TAG_CONST,
  QUERY_CONTENT_GENRE_CONST,
  QUERY_CONTENT_CREDIT_CONST,
  QUERY_CONTENT_TRAILER_CONST,
  QUERY_CONTENT_SEASON_CONST,
  QUERY_CONTENT_EPISODE_CONST,
  QUERY_MOVIE_CONST,
  QUERY_SERIES_CONST,
  // PROFILE
  QUERY_PROFILE_CONST,
  // PROMOCODE
  QUERY_PROMOCODE_CONST,
  // SUBSCRIPTION
  QUERY_SUBSCRIPTION_PAYMENT_GATEWAY_CONST,
  QUERY_SUBSCRIPTION_PLAN_CONST,
  QUERY_FAQ_CONST,
  QUERY_NOTIFICATION_CONST,
  //epin
  QUERY_EPIN_PACKAGE_CONST,
  QUERY_EPIN_GENERATION_JOB_CONST,
  QUERY_EPINS_CONST,

  // faq
  FILTER_CONST_FAQS,
};

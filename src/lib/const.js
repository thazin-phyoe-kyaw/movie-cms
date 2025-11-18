// access lvls
const ACCESS_LVLS = [
  {
    id: "2",
    group: "CMS Access LVL",
    key: "CMS AccessLvl Admin(developer)",
    value: ["ACCESS_EDIT", "ACCESS_WATCH", "ACCESS_CREATE", "ACCESS_DELETE"],
  },
  {
    id: "3",
    group: "CMS User",
    key: "CMS User Admin",
    value: [
      "CMS_USER_WATCH",
      "CMS_USER_EDIT",
      "CMS_USER_CREATE",
      "CMS_USER_PASSWORD",
      "CMS_USER_DELETE",
    ],
  },
  {
    id: "4",
    group: "CMS User",
    key: "CMS User Editor",
    value: ["CMS_USER_WATCH", "CMS_USER_EDIT"],
  },
  {
    id: "5",
    group: "CMS User",
    key: "CMS user Watcher",
    value: ["CMS_USER_WATCH"],
  },
  {
    id: "6",
    group: "Display Service AD",
    key: "Display Service Ad Admin",
    value: [
      "DISPLAY_ADS_LIST_CREATE",
      "DISPLAY_ADS_LIST_READ",
      "DISPLAY_ADS_LIST_EDIT",
      "DISPLAY_ADS_LIST_DELETE",
      "DISPLAY_ADS_ITEMS_CREATE",
      "DISPLAY_ADS_ITEMS_READ",
      "DISPLAY_ADS_ITEMS_EDIT",
      "DISPLAY_ADS_ITEMS_DELETE",
      "DISPLAY_ADMIN_USER_WATCH",
    ],
  },

  {
    id: "7",
    group: "Display Service AD",
    key: "Display service ad Editor",
    value: [
      "DISPLAY_ADS_LIST_READ",
      "DISPLAY_ADS_LIST_EDIT",
      "DISPLAY_ADS_ITEMS_READ",
      "DISPLAY_ADMIN_USER_WATCH",
      "DISPLAY_ADS_ITEMS_EDIT",
    ],
  },
  {
    id: "8",
    group: "Display Service AD",
    key: "Display service ad watcher",
    value: [
      "DISPLAY_ADS_ITEMS_READ",
      "DISPLAY_ADMIN_USER_WATCH",
      "DISPLAY_ADS_LIST_CREATE",
    ],
  },
  {
    id: "9",
    group: "Profile Service",
    key: "Profile Service Admin",
    value: [
      "PROFILE_SERVICE_PROFILE_READ",
      "PROFILE_SERVICE_PROFILE_UPDATE",
      "PROFILE_SERVICE_PROFILE_DELETE",
      "PROFILE_SERVICE_FAVOURITE_READ",
      "PROFILE_SERVICE_USER_DEVICE_READ",
      "PROFILE_SERVICE_LIKE_READ",
      "PROFILE_SERVICE_DOWNLOAD_READ",
      "PROFILE_SERVICE_USER_SHARE_READ",
    ],
  },
  {
    id: "10",
    group: "Profile Service",
    key: "Profile Service Editor",
    value: [
      "PROFILE_SERVICE_PROFILE_UPDATE",
      "PROFILE_SERVICE_PROFILE_READ",
      "PROFILE_SERVICE_FAVOURITE_READ",
      "PROFILE_SERVICE_USER_DEVICE_READ",
      "PROFILE_SERVICE_LIKE_READ",
      "PROFILE_SERVICE_DOWNLOAD_READ",
      "PROFILE_SERVICE_USER_SHARE_READ",
    ],
  },
  {
    id: "11",
    group: "Profile Service",
    key: "Profile Service Watcher",
    value: [
      "PROFILE_SERVICE_PROFILE_READ",
      "PROFILE_SERVICE_FAVOURITE_READ",
      "PROFILE_SERVICE_USER_DEVICE_READ",
      "PROFILE_SERVICE_LIKE_READ",
      "PROFILE_SERVICE_DOWNLOAD_READ",
      "PROFILE_SERVICE_USER_SHARE_READ",
    ],
  },
  {
    id: "12",
    group: "Subscription Service PG",
    key: "Payment gateway Admin",
    value: [
      "SUBSCRIPTION_PAYMENT_GATEWAY_READ",
      "SUBSCRIPTION_PAYMENT_GATEWAY_UPDATE",
      "SUBSCRIPTION_PAYMENT_GATEWAY_PLAN_READ",
    ],
  },
  {
    id: "13",
    group: "Subscription Service PG",
    key: "Payment gateway Watcher",
    value: [
      "SUBSCRIPTION_PAYMENT_GATEWAY_READ",
      "SUBSCRIPTION_PAYMENT_GATEWAY_PLAN_READ",
    ],
  },
  {
    id: "14",
    group: "Subscription Service PL",
    key: "Subscription plan Admin",
    value: [
      "SUBSCRIPTION_PAYMENT_PLAN_CREATE",
      "SUBSCRIPTION_PAYMENT_PLAN_READ",
      "SUBSCRIPTION_PAYMENT_PLAN_UPDATE",
      "SUBSCRIPTION_PAYMENT_PLAN_GATEWAY_READ",
      "SUBSCRIPTION_SUBSCRIPTIONPLAN_CREATE",
      "SUBSCRIPTION_PLAN_GATEWAY_READ",
    ],
  },
  {
    id: "15",
    group: "Subscription Service PL",
    key: "Subscription plan Watcher",
    value: [
      "SUBSCRIPTION_PAYMENT_PLAN_READ",
      "SUBSCRIPTION_PAYMENT__PLAN_GATEWAY_READ",
      "SUBSCRIPTION_SUBSCRIPTION_READ",
      "SUBSCRIPTION_TRANSATION_READ",
    ],
  },
  {
    id: "16",
    group: "Display Service Streaming",
    key: "Display Service Streaming Admin",
    value: [
      "DISPLAY_ADS_STREAMING_CREATE",
      "DISPLAY_ADS_STREAMING_READ",
      "DISPLAY_ADS_ STREAMING_EDIT",
      "DISPLAY_ADS_ STREAMING_DELETE",
    ],
  },

  {
    id: "17",
    group: "Display Service Streaming",
    key: "Display service Streaming Editor",
    value: [
      "DISPLAY_ADS_STREAMING_READ",
      "DISPLAY_ADS_STREAMING_CREATE",
      "DISPLAY_ADS_STREAMING_EDIT",
    ],
  },
  {
    id: "18",
    group: "Display Service Streaming",
    key: "Display service Streaming watcher",
    value: ["DISPLAY_ADS_STREAMING_READ"],
  },
  {
    id: "19",
    group: "Promocode Service",
    key: "Promocode Admin",
    value: [
      "PROMOCODE_SERVICE_READ",
      "PROMOCODE_SERVICE_CREATE",
      "PROMOCODE_SERVICE_UPDATE",
      "PROMOCODE_SERVICE_DELETE",
      "PROMOCODE_SERVICE_TITLE_ID_READ",
      "PROMOCODE_SERVICE_USER_READ",
      "PROMOCODE_SERVICE_USER_DELETE",
      "PROMOCODE_SERVICE_EPISODE_ID_READ",
    ],
  },
  {
    id: "20",
    group: "Display Service Slider",
    key: "Display Service Slider Admin",
    value: [
      "DISPLAY_SLIDER_CREATE",
      "DISPLAY_SLIDER_READ",
      "DISPLAY_SLIDER_EDIT",
      "DISPLAY_SLIDER_DELETE",
    ],
  },
  {
    id: "21",
    group: "Display Service Slider",
    key: "Display service Slider Editor",
    value: [
      "DISPLAY_SLIDER_READ",
      "DISPLAY_SLIDER_CREATE",
      "DISPLAY_SLIDER_EDIT",
    ],
  },
  {
    id: "22",
    group: "Display Service Slider",
    key: "Display service Slider watcher",
    value: ["DISPLAY_SLIDER_READ"],
  },
  {
    id: "23",
    group: "Display Service Playlists",
    key: "Display Service Playlist Admin",
    value: [
      "DISPLAY_PLAYLIST_CREATE",
      "DISPLAY_PLAYLIST_READ",
      "DISPLAY_PLAYLIST_EDIT",
      "DISPLAY_PLAYLIST_DELETE",
    ],
  },
  {
    id: "24",
    group: "Display Service Playlists",
    key: "Display service Playlist Editor",
    value: [
      "DISPLAY_PLAYLIST_CREATE",
      "DISPLAY_PLAYLIST_READ",
      "DISPLAY_PLAYLIST_EDIT",
    ],
  },
  {
    id: "25",
    group: "Display Service Playlists",
    key: "Display service Playlist Watcher",
    value: ["DISPLAY_PLAYLIST_READ"],
  },

  {
    id: "26",
    group: "Content Role Service",
    key: "Content Role Admin",
    value: [
      "CONTENT_ROlE_READ",
      "CONTENT_ROlE_EDIT",
      "CONTENT_ROLE_CREATE",
      "CONTENT_ROLE_DELETE",
    ],
  },
  {
    id: "27",
    group: "Content Role Service",
    key: "Content Role Editor",
    value: ["CONTENT_ROlE_CREATE", "CONTENT_ROlE_READ", "CONTENT_ROLE-EDIT"],
  },
  {
    id: "28",
    group: "Content Role Service",
    key: "Content Role Watcher",
    value: ["CONTENT_ROLE_READ"],
  },
  {
    id: "29",
    group: "Content Tag",
    key: "Content Tag Admin",
    value: ["CONTENT_TAG_READ", "CONTENT_TAG_EDIT", "CONTENT_TAG_CREATE"],
  },
  {
    id: "30",
    group: "Content Tag",
    key: "Content Tag Editor",
    value: ["CONTENT_TAG_CREATE", "CONTENT_TAG_READ", "CONTENT_TAG-EDIT"],
  },
  {
    id: "31",
    group: "Content Tag",
    key: "Content Tag Watcher",
    value: ["CONTENT_TAG_READ"],
  },
  {
    id: "32",
    group: "Content Streaming",
    key: "Content Streaming Admin",
    value: [
      "CONTENT_STREAMING_READ",
      "CONTENT_STREAMING_EDIT",
      "CONTENT_STREAMING_CREATE",
      "CONTENT_STREAMING_DELETE",
    ],
  },
  {
    id: "33",
    group: "Content Streaming",
    key: "Content Streaming Editor",
    value: [
      "CONTENT_STREAMING_CREATE",
      "CONTENT_STREAMING_READ",
      "CONTENT_STREAMING-EDIT",
    ],
  },
  {
    id: "34",
    group: "Content Streaming",
    key: "Content Streaming Watcher",
    value: ["CONTENT_STREAMING_READ"],
  },
  {
    id: "35",
    group: "Content Genre",
    key: "Content Genre Admin",
    value: ["CONTENT_GENRE_READ", "CONTENT_GENRE_EDIT", "CONTENT_GENRE_CREATE"],
  },
  {
    id: "36",
    group: "Content Genre",
    key: "Content Genre Editor",
    value: ["CONTENT_GENRE_CREATE", "CONTENT_GENRE_READ", "CONTENT_GENRE-EDIT"],
  },
  {
    id: "37",
    group: "Content Genre",
    key: "Content Genre Watcher",
    value: ["CONTENT_GENRE_READ"],
  },
  {
    id: "38",
    group: "Content Movie",
    key: "Content Movie Admin",
    value: ["CONTENT_MOVIE_READ", "CONTENT_MOVIE_EDIT", "CONTENT_MOVIE_CREATE"],
  },
  {
    id: "39",
    group: "Content Movie",
    key: "Content Movie Editor",
    value: ["CONTENT_MOVIE_CREATE", "CONTENT_MOVIE_READ", "CONTENT_MOVIE-EDIT"],
  },
  {
    id: "40",
    group: "Content Movie",
    key: "Content Movie Watcher",
    value: ["CONTENT_MOVIE_READ"],
  },
  {
    id: "41",
    group: "Content Trailer",
    key: "Content Trailer Admin",
    value: [
      "CONTENT_TRAILER_READ",
      "CONTENT_TRAILER_EDIT",
      "CONTENT_TRAILER_CREATE",
    ],
  },
  {
    id: "42",
    group: "Content Trailer",
    key: "Content Trailer Editor",
    value: [
      "CONTENT_TRAILER_CREATE",
      "CONTENT_TRAILER_READ",
      "CONTENT_TRAILER-EDIT",
    ],
  },
  {
    id: "43",
    group: "Content Trailer",
    key: "Content Trailer Watcher",
    value: ["CONTENT_TRAILER_READ"],
  },
  {
    id: "44",
    group: "Content Credit",
    key: "Content Credit Admin",
    value: [
      "CONTENT_CREDIT_READ",
      "CONTENT_CREDIT_EDIT",
      "CONTENT_CREDIT_CREATE",
    ],
  },
  {
    id: "45",
    group: "Content Credit",
    key: "Content Credit Editor",
    value: [
      "CONTENT_CREDIT_CREATE",
      "CONTENT_CREDIT_READ",
      "CONTENT_CREDIT-EDIT",
    ],
  },
  {
    id: "46",
    group: "Content Credit",
    key: "Content Credit Watcher",
    value: ["CONTENT_CREDIT-_READ"],
  },
  {
    id: "47",
    group: "Content Series",
    key: "Content Series Admin",
    value: ["CONTENT_SERIE_READ", "CONTENT_SERIE_EDIT", "CONTENT_SERIE_CREATE"],
  },
  {
    id: "48",
    group: "Content Series",
    key: "Content Series Editor",
    value: ["CONTENT_SERIE_CREATE", "CONTENT_SERIE_READ", "CONTENT_SERIE-EDIT"],
  },
  {
    id: "49",
    group: "Content Series",
    key: "Content Series Watcher",
    value: ["CONTENT_SERIE-_READ"],
  },
  {
    id: "50",
    group: "Content Movie",
    key: "Content Movie Admin",
    value: ["CONTENT_MOVIE_READ", "CONTENT_MOVIE_EDIT", "CONTENT_MOVIE_CREATE"],
  },
  {
    id: "51",
    group: "Content Movie",
    key: "Content Movie Editor",
    value: ["CONTENT_MOVIE_CREATE", "CONTENT_MOVIE_READ", "CONTENT_MOVIE-EDIT"],
  },
  {
    id: "52",
    group: "Content Movie",
    key: "Content Movie Watcher",
    value: ["CONTENT_MOVIE_READ"],
  },
  {
    id: "53",
    group: "Epin Service",
    key: "Epin Admin",
    value: [
      "EPIN_EPIN_READ",
      "EPIN_EPIN_CREATE",
      "EPIN_EPIN_UPDATE",
      "EPIN_EPIN_DELETE",
      "EPIN_PACKAGES_READ",
      "EPIN_PACKAGES_CREATE",
      "EPIN_PACKAGES_UPDATE",
      "EPIN_EPIN_GENERATION_JOB_READ",
      "EPIN_GENERATION_JOB_READ",
      "EPIN_GENERATION_JOB_CREATE",
      "EPIN_GENERATION_JOB_DELETE",
      "EPIN_GENERATION_JOB_ACTIVATE",
    ],
  },
  {
    id: "44",
    group: "Epin Service",
    key: "Epin Watcher",
    value: ["EPIN_EPIN_READ"],
  },
  {
    id: "45",
    group: "Epin Service",
    key: "Epin Editor",
    value: ["EPIN_EPIN_READ", "EPIN_EPIN_CREATE", "EPIN_EPIN_UPDATE"],
  },
  {
    id: "46",
    group: "Notification Service",
    key: "Notification Editor",
    value: ["NOTIFICATION_READ", "NOTIFICATION_CREATE"],
  },
  {
    id: "46",
    group: "Notification Service",
    key: "Notification Watcher",
    value: ["NOTIFICATION_READ"],
  },
  {
    id: "48",
    group: "Notification Service",
    key: "Notification Admin",
    value: ["NOTIFICATION_READ", "NOTIFICATION_CREATE"],
  },
  {
    id: "49",
    group: "Setting",
    key: "Setting Admin",
    value: [
      "SETTING_READ",
      "SETTING_CREATE",
      "SETTING_UPDATE",
      "SETTING_DELETE",
      ],
  },
];

// enums

const IS_NULL_ENUM = ["eq", "ne"]; // eq = equal , ne = notEqual
const BOOLEAN_ENUM = ["true", "false"];
const COMPARISON_ENUM = ["eq", "ne", "gt", "lt", "ge", "le"]; // gt = greater than, lt = lessThan, ge = greatherThan Equal , le = lessThan Equal
const ADS_ENUM_IMAGE_RATIO = ["one", "two", "three"];
const ORDER_ENUM = ["asc", "desc"];
const CHILDREN_TABLES_HANDLER_ENUM = ["normal", "only_count", "no_child"];

const ADS_ENUM_DISPAY_LOCATION = ["home", "movie", "series"];
const DISPLAY_LOCATION = ["home", "series"];

const ADS_ENUM_PLAYLIST_LOCATION = ["home", "movie", "series"];

const ADS_ENUM_DISPLAY_PLAYLIST_LOCATION = ["home", "movie", "series"];
const ADS_ENUM_ADS_STREAMING_TYPE = ["preroll", "midroll", "postroll"];
const ADS_ENUM_ADS_TARGET_USER = ["all", "premium", "free"];

const ADS_ENUM_BANNER = ["htmlCode", "image", "webUrl"];
const CONTENT_MOVIE_ENUM = ["movie", "series"];
const ADS_ENUM_ADS_LOCATION = ["home", "movies", "series"];
const SLIDER_ENUM_BANNER = ["htmlCode", "image", "webUrl", "movie", "series"];
const PLAYLIST_LOCATION = ["home", "movies", "series"];

const VIEW_TYPE = ["0", "1", "2"];
const EPIN_STATUS = ["active", "inactive", "used"];

const PLATFORM_ENUM_SUBSCRIPTION_GATEWAYS = [
  "Apple",
  "Google",
  "MPT",
  "Atom",
  "Kpay",
  "Wave",
  "Mahar",
];
const PAYMENT_GATEWAY_STATUS = ["active", "inactive"];

const PROFILE_ENUM_STATUS = ["enable", "disable", "delete", "deleteByAdmin"];

// query consts
const CMS_QUERY_USER_EXPAND_ACCESS_Lvl =
  "?$count=true&$select=email,name,siteAdminNote,phoneNumber,address,avatar,isDelete,id&$expand=AccessLevel";

const DISPLAY_QUERY_ADLIST_EXPAND_ADITEMS = `?$count=true&$select=id,sequence,status,adsLocation,imageRatio,createdBy,updatedBy,deletedAt&$expand=adsItems($count=true;$select=id,titleId,name,bannerType,htmlCode,webLink,imageUrl,sequence,clickCount,viewCount,status,createdBy,updatedBy;$filter=deletedAt eq null;$top=8;$orderby=status desc)`;
const DISPLAY_QUERY_ADITEMS = `?$count=true&$select=id,sequence,clickCount,viewCount,status,titleId,imageUrl,webLink,htmlCode,bannerType,name`;
const DISPLAY_AD_STREAMING = `?$count=true&$select=id,adsStreamingUrl,adsStreamingType,adsStartTime,status,targetUser,deletedAt,deletedBy,createdAt,updatedAt,createdBy,updatedBy`;
const PROFILE_QUERY_PROFILE = `?$count=true&$select=id,firebaseUserId,type,email,phoneNumber,name,number,dateOfBirth,gender,imageUrl,lastLogin,status&$expand=favourites($count=true;$select=titleId,type;$top=10)&$expand=userDevices($count=true;$select=networkType,deviceId,operatorName,os,osVersion,deviceName,deviceType;$top=10)&$expand=likes($count=true;$select=titleId,type;$top=10)&$expand=userShares($count=true;$select=fromUser,toUser,titleId;$top=0)&$expand=downloads($count=true;$select=titleId,downloadDate;$top=10;$orderby=updatedAt desc)`;
const DISPLAY_SLIDER_ITEMS = `?$count=true&$select=id,name,bannerType,htmlCode,webLink,displayLocation,imageUrl,status,titleId,sequence,deletedAt,deletedBy,createdAt,updatedAt,createdBy`;
const PROFILE_Q_PROFILE = `?$count=true&$select=id,firebaseUserId,type,email,phoneNumber,name,number,dateOfBirth,gender,imageUrl,lastLogin,status`;
const DISPLAY_AD_PLAYLIST = `?count=true&$select=titleEn,titleMy,id,viewType,sequence,status,playlistLocation,createdAt,updatedAt,createdBy,updatedBy&$expand=AdminPlaylistTitles`;

const PROFILE_QUERY_USER_DEVICE = `?$count=true&$select=id,lastLogin,deviceName,deviceType,mobileCarrier,networkType,deviceid,os,osVersion,operatorName`;
const PROFILE_QUERY_FAVOURITE = `?$count=true&$select=titleId,type`;
const PROFILE_QUERY_LIKE = `?$count=true&$select=titleId,type`;
const PROFILE_QUERY_DOWNLOAD = `?$count=true&$select=titleId,downlodDate,expiredDate`;
const PROFILE_QUERY_USER_SHARE = `?$count=true&$select=titledId`;

const SUBSCRIPTION_QUERY_PAYMENT_GATEWAY = `?$count=true&$select=id,platform,active,gateWayImage,source,updatedBy&$orderby=active desc`;
const SUBSCRIPTION_QUERY_SUBSCRIPTION_PLAN = `?$count=true&$select=id,titleMm,titleEng,descriptionMm,descriptionEng,featuredImage,duration,gateways,costDisplay,currency,active,planId,termsAndConditionMm,termsAndConditionEng,updatedAt,updatedBy`;
const PROMOCODE_QUERY_PROMOCODE = `?$count=true&$select=id,titleId,episodeId,name,description,deleteNote,startDate,endDate,deleteAt,code,useableCount,usedCount&$expand=PromoCodeUsers($count=true;$select=id,userId,promoId,deleteAt;$filter=deleteAt eq null;$top=10;$orderby=updatedAt desc)`;
const GENRE_QUERY = `?$expand=genreTitles($select=Title;$count=true;$expand=Title($select=id,titleMm,type;$filter=type eq 'series'))`;
const PROMOCODE_QUERY_PROMOCODE_USER = `?$count=true&$select=id,userId,promoId,deleteAt`;

const CONTENT_QUERY_EPISODE = `?$count=true&$select=id,type eq 'series'&$expand=Series($count=true;$select=id)&$expand=Seasons($count=true;$select=id,nameMm,seriesId,nameEn;$top=10)&$expand=Episodes($count=true;$select=id,seasonId,isPremium,keywords,duration,fullHdFileSize,streamingUrl,downloadUrl))`;

// Content
const CONTENT_ROLE = `?$count=true&$select=id,nameMm,nameEn,createdAt,createdBy,updatedAt,updatedBy`;
const SElECT_TYPE = ["genre", "tag"];
// Movie
// const CONTENT_MOVIE_TITLE = `?count=true&$select=id,keywords,titleEn,titleMm,descriptionEn,descriptionMm,isPremium,resolution,rating,sorting,status,statusType,createdAt,updatedAt,createdBy,updatedBy;$filter=type eq movie`;
// const CONTENT_MOVIE_TITLE = `?$filter=type eq movie`;

//Epin
const EPIN_QUERY_EPIN = `?$count=true&$select=serialNo,epinNo,expiredDate,duration,price,planId,status,epinGenerationJobId,id,createdAt,updatedAt,createdBy,updatedBy`;
const EPIN_QUERY_GENERATION_JOB = `?$count=true&$select=id,name,description,batchNo,lot,prefix,duration,expireDate,count,csvName,creator,createdAt,updatedAt,createdBy,updatedBy&$expand=Epins($count=true;$select=id,serialNo,epinNo,expiredDate,duration,price,planId,status,epinGenerationJobId,id,createdAt,updatedAt,createdBy,updatedBy;$filter=status eq 'used' or status eq 'inactive' or status eq 'active')`;
const EPIN_QUERY_PACKAGE = `?$count=true&$select=id,name,description,duration,expiredDuration,price,createdAt,updatedAt,createdBy,updatedBy`;
const EPIN_QUERY_EPIN_USER = `?$count=true&$select=userId,epinId,createdAt,updatedAt,createdBy,updatedBy`;

const NOTIFICATION_QUERY_NOTI = `?$count=true&$select=id,name,notiTitle,notiDescription,image,referenceUrl,referencedId,referenceType,sendDate,createdAt,createdBy&$expand=Topic($select=id,topicName,topicDescription,isReady,isFifo,messageDeduplication,topicArn,type,filter,from)`;
const FAQs_QUERY_FAQs = `?count=true&$select=id,questionEn,questionMm,answerEn,answerMm,status,sequence,faqtitleId,createdAt,updatedAt`;
const FAQs_QUERY_TITLES = `?$count=true&$select=id,titleEn,titleMm,createdAt,updatedAt&$expand=FAQss($count=true;$select=id,questionEn,questionMm,answerEn,answerMm,status,sequence,faqtitleId,createdAt,updatedAt)`;
const TOTAL_COUNT_QUERY = `?$count=true&$select=id,displayObj`;

export {
  ACCESS_LVLS,
  ADS_ENUM_IMAGE_RATIO,
  ADS_ENUM_ADS_LOCATION,
  ADS_ENUM_BANNER,
  ADS_ENUM_DISPAY_LOCATION,
  ADS_ENUM_DISPLAY_PLAYLIST_LOCATION,
  ADS_ENUM_PLAYLIST_LOCATION,
  PLATFORM_ENUM_SUBSCRIPTION_GATEWAYS,
  PROFILE_ENUM_STATUS,
  ADS_ENUM_ADS_STREAMING_TYPE,
  ADS_ENUM_ADS_TARGET_USER,
  DISPLAY_LOCATION,
  DISPLAY_AD_PLAYLIST,
  PLAYLIST_LOCATION,
  VIEW_TYPE,
  SElECT_TYPE,
  // query handler
  IS_NULL_ENUM,
  BOOLEAN_ENUM,
  COMPARISON_ENUM,
  ORDER_ENUM,
  CHILDREN_TABLES_HANDLER_ENUM,
  // query const
  CMS_QUERY_USER_EXPAND_ACCESS_Lvl,
  CONTENT_MOVIE_ENUM,
  DISPLAY_QUERY_ADLIST_EXPAND_ADITEMS,
  DISPLAY_QUERY_ADITEMS,
  DISPLAY_AD_STREAMING,
  DISPLAY_SLIDER_ITEMS,
  PROFILE_QUERY_PROFILE,
  PROFILE_QUERY_USER_DEVICE,
  PROFILE_QUERY_FAVOURITE,
  PROFILE_QUERY_LIKE,
  PROFILE_QUERY_DOWNLOAD,
  PROFILE_QUERY_USER_SHARE,
  SUBSCRIPTION_QUERY_PAYMENT_GATEWAY,
  SUBSCRIPTION_QUERY_SUBSCRIPTION_PLAN,
  // SUBSCRIPTION_QUERY_PAYMENT_GATEWAY_EXPAND_PLANS,
  //SUBSCRIPTION_Q_SUBSCRIPTION_PLAN,
  PROMOCODE_QUERY_PROMOCODE,
  PAYMENT_GATEWAY_STATUS,
  SLIDER_ENUM_BANNER,
  PROMOCODE_QUERY_PROMOCODE_USER,
  CONTENT_QUERY_EPISODE,
  CONTENT_ROLE,
  GENRE_QUERY,

  //Epin
  EPIN_QUERY_EPIN,
  EPIN_QUERY_GENERATION_JOB,
  EPIN_STATUS,
  EPIN_QUERY_PACKAGE,
  EPIN_QUERY_EPIN_USER,
  PROFILE_Q_PROFILE,
  NOTIFICATION_QUERY_NOTI,
  FAQs_QUERY_FAQs,
  FAQs_QUERY_TITLES,
  TOTAL_COUNT_QUERY,
};

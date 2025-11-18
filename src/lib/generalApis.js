import { GetUserList } from "@/modules/cmsModule/services";
import { ProfileGet } from "@/modules/profileServiceModule/services";
import {
  TitleGet,
  EpisodeIdGet,
} from "@/modules/contentServiceModule/services";
import { TopicGet } from "@/modules/NotificationServiceModule/service";

async function GetTitleById(list) {
  if (list.length === 0) {
    return [];
  }
  let returnList = [];
  for (let i = 0; i <= list.length; i += 20) {
    const target = list.slice(i, 20);
    let urlString = "";
    for (let l of target) {
      urlString =
        urlString === "" ? `&$filter=id eq ${l}` : `${urlString} or id eq ${l}`;
    }

    const titleList = await TitleGet(
      `?$select=id,titleMm,titleEn,type,isPremium,resolution,rating,keywords${urlString}`
    );

    if (!titleList.error) {
      returnList = [...returnList, ...titleList.value];
    }
  }
  return returnList;
}

async function GetUserById(idList) {
  if (idList.length === 0) {
    // check if list is empty return
    return [];
  }
  let returnList = [];

  // slice array and fetch data 20 by 20
  for (let i = 0; i <= idList.length; i += 20) {
    const target = idList.slice(i, 20);
    let urlString = "";
    for (let j of target) {
      urlString =
        urlString === "" ? `&$filter=id eq ${j}` : `${urlString} or id eq ${j}`;
    }
    const userList = await ProfileGet(`?$select=id,name,${urlString}`);

    if (!userList.error) {
      returnList = [...returnList, ...userList.value];
    }
  }

  return returnList;
}

async function GetEpinUserById(idList) {
  if (idList.length === 0) {
    return [];
  }
  let returnList = [];
  for (let i = 0; i <= idList.length; i += 20) {
    const target = idList.slice(i, 20);
    let urlString = "";
    for (let j of target) {
      urlString =
        urlString === "" ? `&$filter=id eq ${j}` : `${urlString} or id eq ${j}`;
    }
    const userList = await ProfileGet(
      `?$select=id,name,firebaseUserId,type,email,phoneNumber,number,dateOfBirth,gender,status,${urlString}`
    );
  }
  if (!userList.error) {
    returnList = [...returnList, ...userList.value];
  }
  return returnList;
}

async function GetCMSUserById(idList) {
  if (idList.length === 0) {
    return [];
  }

  let returnList = [];

  for (let i = 0; i <= idList.length; i += 20) {
    const target = idList.slice(i, 20);

    let urlString = "";
    for (let j of target) {
      urlString =
        urlString === "" ? `&$filter=id eq ${j}` : `${urlString} or id eq ${j}`;
    }
    const userList = await GetUserList(`?$select=id,name${urlString}`);

    if (!userList.error) {
      returnList = [...returnList, ...userList.value];
    }
  }

  return returnList;
}

async function GetEpisodeById(epidList) {
  //console.log(epidList)
  if (epidList.length === 0) {
    return [];
  }
  let returnList = [];
  for (let i = 0; i <= epidList.length; i += 20) {
    const target = epidList.slice(i, 20);

    let urlString = "";
    for (let j of target) {
      urlString =
        urlString === "" ? `&$filter=id eq ${j}` : `${urlString} or id eq ${j}`;
    }
    const episodeList = await EpisodeIdGet(
      `?$select=id,titleMm,titleEn${urlString}`
    );

    if (!episodeList.error) {
      returnList = [...returnList, ...episodeList.value];
    }
  }

  return returnList;
}

async function GetTopicById(list) {
  if (list.length === 0) {
    return [];
  }
  let returnList = [];
  for (let t = 0; t <= list.length; t += 20) {
    const target = list.slice(t, 20);
    let urlString = "";
    for (let l of target) {
      urlString =
        urlString === ""
          ? `&$filter= id eq ${l}`
          : `${urlString} or id eq ${l}`;
    }
    const topicList = await TopicGet(`?$select=id,topicName,${urlString}`);
    if (!topicList.error) {
      returnList = [...returnList, ...topicList.value];
    }
  }
  return returnList;
}
export {
  GetTitleById,
  GetUserById,
  GetEpisodeById,
  GetCMSUserById,
  GetEpinUserById,
  GetTopicById,
};

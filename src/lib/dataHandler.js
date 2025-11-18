import {
  GetEpisodeById,
  GetTitleById,
  GetTopicById,
  GetUserById,
} from "./generalApis";

// async function PromodeUserHandler(getData) {
//   if (getData?.value?.length === 0) {
//     return getData;
//   }
//   let userIds = [];
//   let titleIds = [];
//   let episodeIds = [];

//   for (let i of getData?.value) {
//     if (i.PromoCodeUsers.length > 0) {
//       userIds = [...userIds, ...i.PromoCodeUsers.map((value) => value.userId)];
//     }
//     if (i.titleId && i.title !== "00000000-0000-0000-0000-000000000000") {
//       titleIds = [...titleIds, i.titleId];
//     }
//     if (i.episodeId && i.episodeId !== "00000000-0000-0000-0000-000000000000") {
//       episodeIds = [...episodeIds, i.episodeId];
//     }
//   }
//   for (let j of getData.value) {
//     if (j.titleId > 0) {
//       titleIds = [...titleIds, ...j.map((value) => value.titleId)];
//     }
//   }

//   for (let x of getData.value) {
//     if (x.episodeId > 0) {
//       episodeIds = [...episodeIds, ...x.map((value) => value.episodeId)];
//     }
//   }
//   userIds = [...new Set(userIds)];
//   titleIds = [...new Set(titleIds)];
//   episodeIds = [...new Set(episodeIds)];

//   // get data from services
//   const users = await GetUserById([...new Set(userIds)]);
//   const titles = await GetTitleById([...new Set(titleIds)]);
//   // console.log(titles)
//   const episodes = await GetEpisodeById([...new Set(episodeIds)]);
//   // console.log(episodes)

//   return {
//     ...getData,
//     value: getData.value.map((promo) => {
//       const title = titles.filter((value) => value.id === promo.titleId);
//       const episode = episodes.filter((value) => value.id === promo.episodeId);
//       //console.log(episodes)
//       return {
//         ...promo,
//         PromoCodeUsers: promo.PromoCodeUsers.map((promoUser) => {
//           // update user Data
//           const userObj = users.filter((use) => use.id === promoUser.userId);

//           return {
//             ...promoUser,
//             user: users.filter((use) => use.id === promoUser.userId)[0] || {
//               userId: promoUser.userId,
//               name: "unknown",
//             },
//           };
//         }),
//         Titles:
//           title.length > 0
//             ? title[0]
//             : { titleMm: "unknown", id: promo.titleId },
//         Episodes:
//           episode.length > 0
//             ? episode[0]
//             : { titleMm: "unknown", id: promo.episodeId },
//       };
//     }),
//   };
// }
// async function gateWayDataHandler(getData, userlist) {
//   const validatedValue = getData.value.map((gatewayObject) => {
//     const user = userlist.find((user) => user.id === gatewayObject.updatedBy);
//     return {
//       id: gatewayObject.id,
//       name: user ? user.name : "unknown",
//     };
//   });

//   return validatedValue;
// }
// async function planDataHandler(getData, planlist) {
//   const planValue = getData.value.map((planobject) => {
//     const user = planlist.find((user) => user.id === planobject.updatedBy);
//     return {
//       id: planobject.id,
//       name: user ? user.name : "unknown",
//     };
//   });

//   return planValue;
// }

async function ProfileUserHandler(getUserData) {
  //console.log(getUserData);
  if (getUserData?.value?.length === 0) {
    return getUserData;
  }

  let titleIds = [];

  for (let i of getUserData.value) {
    if (i.Favourites.length > 0) {
      titleIds = [...titleIds, ...i.Favourites.map((value) => value.titleId)];
    }
    if (i.Likes.length > 0) {
      titleIds = [...titleIds, ...i.Likes.map((value) => value.titleId)];
    }
    if (i.Downloads.length > 0) {
      titleIds = [...titleIds, ...i.Downloads.map((value) => value.titleId)];
    }
  }

  titleIds = [...new Set(titleIds)];

  const titles = await GetTitleById([...new Set(titleIds)]);

  return {
    ...getUserData,
    value: getUserData.value.map((profile) => {
      return {
        ...profile,
        Favourites: profile.Favourites.map((Favtitle) => {
          const titleObj = titles.find((tit) => tit.id === Favtitle.titleId);
          return {
            ...Favtitle,
            title: titleObj
              ? { titleId: Favtitle.titleId, titleMm: titleObj.titleMm }
              : { titleId: Favtitle.titleId, titleMm: "unknown" },
          };
        }),
        Likes: profile.Likes.map((Liketitle) => {
          const titleObj = titles.find((tit) => tit.id === Liketitle.titleId);
          return {
            ...Liketitle,
            title: titleObj
              ? { titleId: Liketitle.titleId, titleMm: titleObj.titleMm }
              : { titleId: Liketitle.titleId, titleMm: "unknown" },
          };
        }),
        Downloads: profile.Downloads.map((Downloadtitle) => {
          const titleObj = titles.find(
            (tit) => tit.id === Downloadtitle.titleId
          );
          return {
            ...Downloadtitle,
            title: titleObj
              ? { titleId: Downloadtitle.titleId, titleMm: titleObj.titleMm }
              : { titleId: Downloadtitle.titleId, titleMm: "unknown" },
          };
        }),
      };
    }),
  };
}

async function NotificationHandler(getData) {
  if (!getData?.value || getData.value.length === 0) {
    return getData; // Return early if there's no data to process
  }
  // Extract all unique topicIds
  const allTopicIds = [...new Set(getData.value.map((noti) => noti.topic.id))];
  //console.log(allTopicIds,"lll")
  // Assuming GetTopicById is an async function that fetches topics by their IDs
  const topics = await GetTopicById(allTopicIds);

  return {
    ...getData,
    value: getData.value.map((noti) => {
      const topicObj = topics.find((topic) => topic.id === noti.topic.id);
      return {
        ...noti,
        topic: topicObj
          ? { topicId: noti.topicId, topicName: topicObj.topicName }
          : { topicId: noti.topicId, topicName: "unknown" },
      };
    }),
  };
}

export {
  // PromodeUserHandler,
  ProfileUserHandler,
  // planDataHandler,
  // gateWayDataHandler,
  NotificationHandler,
};

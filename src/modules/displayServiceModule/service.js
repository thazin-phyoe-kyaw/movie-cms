// <<<<<<< HEAD
// import {
//   DISPLAY_AD_ITEMS,
//   DISPLAY_AD_LIST,
//   DISPLAY_AD_SLIDER_ITEMS,
//   DISPLAY_AD_STREAMING,
//   DISPLAY_PLAYLISTS,
// } from "@/lib/apiConst";
// import { DISPLAY_SERVICE_API, REQUEST_HEADER } from "@/lib/config";
// import axios from "axios";

// async function GETADList(url) {
//   console.log(`${DISPLAY_AD_LIST}${url}`);
//   return await axios
//     .get(encodeURI(`${DISPLAY_AD_LIST}${url}`), REQUEST_HEADER)
//     .then(({ data }) => {
//       return data;
//     })
//     .catch((error) => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function AdListCreate(data) {
//   return await axios
//     .post(DISPLAY_AD_LIST, data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch(() => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function AdListEdit(data, id) {
//   return await axios
//     .patch(encodeURI(`${DISPLAY_AD_LIST}(${id})`), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch(() => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function AdListDelete(data, id) {
//   return await axios
//     .patch(encodeURI(`${DISPLAY_AD_LIST}(${id})`), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch((err) => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function AdListPublish(data, id) {
//   return await axios
//     .patch(encodeURI(`${DISPLAY_AD_LIST}(${id})`), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch((err) => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function AdListSequence(data) {
//   return await axios
//     .post(encodeURI(`${DISPLAY_SERVICE_API}/$batch`), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch(() => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function GETADItems(url) {
//   return await axios
//     .get(encodeURI(`${DISPLAY_AD_ITEMS}${url}`), REQUEST_HEADER)
//     .then(({ data }) => {
//       return data;
//     })
//     .catch((err) => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function ADItemsCreate(data) {
//   return await axios
//     .post(encodeURI(DISPLAY_AD_ITEMS), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch((err) => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function ADItemsEdit(data, id) {
//   return await axios
//     .patch(encodeURI(`${DISPLAY_AD_ITEMS}(${id})`), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch(() => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function ADItemDelete(data, id) {
//   return await axios
//     .patch(encodeURI(`${DISPLAY_AD_ITEMS}(${id})`), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch(() => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function ADItemsPublish(data, id) {
//   return await axios
//     .patch(encodeURI(`${DISPLAY_AD_ITEMS}(${id})`), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch(() => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function ADItemsSequence(data) {
//   return await axios
//     .post(encodeURI(`${DISPLAY_SERVICE_API}/$batch`), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch(() => {
//       return { error: "Client and server connection error" };
//     });
// }
// async function GETStramingData(url) {
//   return await axios
//     .get(encodeURI(`${DISPLAY_AD_STREAMING}${url}`), REQUEST_HEADER)
//     .then(({ data }) => {
//       return data;
//     })
//     .catch((error) => {
//       return { error: "Client and server connection error" };
//     });
// }
// async function StreamingCreate(data) {
//   return await axios
//     .post(encodeURI(DISPLAY_AD_STREAMING), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch((err) => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function StreamUpdate(data, id) {
//   return await axios
//     .patch(encodeURI(`${DISPLAY_AD_STREAMING}(${id})`), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch((err) => {
//       return { error: "Client and server connection error" };
//     });
// }
// async function StramingDataDelete(data, id) {
//   return await axios
//     .patch(encodeURI(`${DISPLAY_AD_STREAMING}(${id})`), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch(() => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function GETSliderData(url) {
//   return await axios
//     .get(encodeURI(`${DISPLAY_AD_SLIDER_ITEMS}${url}`), REQUEST_HEADER)
//     .then(({ data }) => {
//       return data;
//     })
//     .catch((error) => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function SliderCreate(data) {
//   return await axios
//     .post(encodeURI(DISPLAY_AD_SLIDER_ITEMS), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch((err) => {
//       //(err.message);
//       return { error: "Client and server connection error" };
//     });
// }

// async function SliderEdit(data, id) {
//   return await axios
//     .patch(encodeURI(`${DISPLAY_AD_SLIDER_ITEMS}(${id})`), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch(() => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function SliderDelete(data, id) {
//   return await axios
//     .patch(encodeURI(`${DISPLAY_AD_SLIDER_ITEMS}(${id})`), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch(() => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function GETPlaylists(url) {
//   return await axios
//     .get(encodeURI(url), REQUEST_HEADER)
//     .then(({ data }) => {
//       return data;
//     })
//     .catch((error) => {
//       return { error: "Client and server connection error" };
//     });
// }
// async function PlaylistItemCreate(data) {
//   return await axios
//     .post(encodeURI(`${DISPLAY_SERVICE_API}/$batch`), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch(() => {
//       return { error: "Client and server connection error" };
//     });
// }
// async function PlaylistItemDelete(data) {
//   return await axios
//     .post(
//       encodeURI(`${DISPLAY_PLAYLISTS}?$expand=AdminPlaylistTitles/$batch`),
//       data,
//       REQUEST_HEADER
//     )
//     .then(() => {
//       return { success: true };
//     })
//     .catch(() => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function PlaylistCreate(data) {
//   return await axios
//     .post(encodeURI(DISPLAY_PLAYLISTS), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch((err) => {
//       return { error: "Client and server connection error" };
//     });
// }
// async function PlaylistandItemCreate(data) {
//   console.log(`${DISPLAY_PLAYLISTS}?$expand=AdminPlaylistTitles`);
//   return await axios
//     .post(
//       encodeURI(`${DISPLAY_PLAYLISTS}?$expand=AdminPlaylistTitles`),
//       data,
//       REQUEST_HEADER
//     )
//     .then(() => {
//       return { success: true };
//     })
//     .catch((err) => {
//       return { error: "Client and server connection error" };
//     });
// }

// async function PlaylistUpdate(data, id) {
//   return await axios
//     .patch(encodeURI(`${DISPLAY_PLAYLISTS}(${id})`), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch(() => {
//       return { error: "Client and server connection error" };
//     });
// }
// async function PlaylistDelete(data, id) {
//   return await axios
//     .patch(encodeURI(`${DISPLAY_PLAYLISTS}(${id})`), data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch(() => {
//       return { error: "Client and server connection error" };
//     });
// }

// export {
//   GETADList,
//   AdListCreate,
//   AdListDelete,
//   AdListEdit,
//   AdListPublish,
//   AdListSequence,
//   //
//   GETADItems,
//   ADItemsCreate,
//   ADItemDelete,
//   ADItemsEdit,
//   ADItemsPublish,
//   ADItemsSequence,
//   //
//   GETStramingData,
//   StramingDataDelete,
//   StreamingCreate,
//   StreamUpdate,
//   //
//   GETSliderData,
//   SliderCreate,
//   SliderEdit,
//   SliderDelete,
//   //
//   PlaylistDelete,
//   GETPlaylists,
//   PlaylistCreate,
//   PlaylistUpdate,
//   PlaylistandItemCreate,
//   PlaylistItemCreate,
//   PlaylistItemDelete,
// };
// =======
import {
  DISPLAY_AD_ITEMS,
  DISPLAY_AD_LIST,
  DISPLAY_AD_SLIDER_ITEMS,
  DISPLAY_AD_STREAMING,
  DISPLAY_PLAYLISTS,
} from "@/lib/apiConst";
import { DISPLAY_SERVICE_API, REQUEST_HEADER } from "@/lib/config";
import axios from "axios";

async function GETADList(url) {
  console.log(`${DISPLAY_AD_LIST}${url}` , 'this is')
  return await axios
    .get(encodeURI(`${DISPLAY_AD_LIST}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return { error: "Client and server connection error" };
    });
}

async function AdListCreate(data) {
  return await axios
    .post(DISPLAY_AD_LIST, data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function AdListEdit(data, id) {
  return await axios
    .patch(encodeURI(`${DISPLAY_AD_LIST}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function AdListDelete(data, id) {
  return await axios
    .patch(encodeURI(`${DISPLAY_AD_LIST}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

async function AdListPublish(data, id) {
  return await axios
    .patch(encodeURI(`${DISPLAY_AD_LIST}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

async function AdListSequence(data) {
  return await axios
    .post(encodeURI(`${DISPLAY_SERVICE_API}/$batch`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function GETADItems(url) {
  return await axios
    .get(encodeURI(`${DISPLAY_AD_ITEMS}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

async function ADItemsCreate(data) {
  return await axios
    .post(encodeURI(DISPLAY_AD_ITEMS), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

async function ADItemsEdit(data, id) {
  return await axios
    .patch(encodeURI(`${DISPLAY_AD_ITEMS}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function ADItemDelete(data, id) {
  return await axios
    .patch(encodeURI(`${DISPLAY_AD_ITEMS}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function ADItemsPublish(data, id) {
  return await axios
    .patch(encodeURI(`${DISPLAY_AD_ITEMS}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function ADItemsSequence(data) {
  return await axios
    .post(encodeURI(`${DISPLAY_SERVICE_API}/$batch`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function GETStramingData(url) {
  return await axios
    .get(encodeURI(`${DISPLAY_AD_STREAMING}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return { error: "Client and server connection error" };
    });
}
async function StreamingCreate(data) {
  return await axios
    .post(encodeURI(DISPLAY_AD_STREAMING), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

async function StreamUpdate(data, id) {
  return await axios
    .patch(encodeURI(`${DISPLAY_AD_STREAMING}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
async function StramingDataDelete(data, id) {
  return await axios
    .patch(encodeURI(`${DISPLAY_AD_STREAMING}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function GETSliderData(url) {
  return await axios
    .get(encodeURI(`${DISPLAY_AD_SLIDER_ITEMS}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return { error: "Client and server connection error" };
    });
}

async function SliderCreate(data) {
  return await axios
    .post(encodeURI(DISPLAY_AD_SLIDER_ITEMS), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      //(err.message);
      return { error: "Client and server connection error" };
    });
}

async function SliderEdit(data, id) {
  return await axios
    .patch(encodeURI(`${DISPLAY_AD_SLIDER_ITEMS}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function SliderDelete(data, id) {
  return await axios
    .patch(encodeURI(`${DISPLAY_AD_SLIDER_ITEMS}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function GETPlaylists(url) {
  return await axios
    .get(encodeURI(url), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return { error: "Client and server connection error" };
    });
}
async function PlaylistItemCreate(data) {
  return await axios
    .post(encodeURI(`${DISPLAY_SERVICE_API}/$batch`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function PlaylistItemDelete(data) {
  return await axios
    .post(
      encodeURI(`${DISPLAY_PLAYLISTS}?$expand=AdminPlaylistTitles/$batch`),
      data,
      REQUEST_HEADER
    )
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function PlaylistCreate(data) {
  return await axios
    .post(encodeURI(DISPLAY_PLAYLISTS), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
async function PlaylistandItemCreate(data) {
  return await axios
    .post(
      encodeURI(`${DISPLAY_PLAYLISTS}?$expand=AdminPlaylistTitles`),
      data,
      REQUEST_HEADER
    )
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

async function PlaylistUpdate(data, id) {
  return await axios
    .patch(encodeURI(`${DISPLAY_PLAYLISTS}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function PlaylistDelete(data, id) {
  return await axios
    .patch(encodeURI(`${DISPLAY_PLAYLISTS}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

export {
  GETADList,
  AdListCreate,
  AdListDelete,
  AdListEdit,
  AdListPublish,
  AdListSequence,
  //
  GETADItems,
  ADItemsCreate,
  ADItemDelete,
  ADItemsEdit,
  ADItemsPublish,
  ADItemsSequence,
  //
  GETStramingData,
  StramingDataDelete,
  StreamingCreate,
  StreamUpdate,
  //
  GETSliderData,
  SliderCreate,
  SliderEdit,
  SliderDelete,
  //
  PlaylistDelete,
  GETPlaylists,
  PlaylistCreate,
  PlaylistUpdate,
  PlaylistandItemCreate,
  PlaylistItemCreate,
  PlaylistItemDelete,
};

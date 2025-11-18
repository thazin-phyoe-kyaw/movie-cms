import {
  CONTENT_CREDIT,
  CONTENT_EPISODE,
  CONTENT_GENRE,
  CONTENT_MOVIE,
  CONTENT_ROLES,
  CONTENT_SEASONS,
  CONTENT_SERIES,
  CONTENT_TAG,
  CONTENT_TITLE,
  CONTENT_TRAILERS,
  CREDIT_ROLES,
  CREDIT_TITLES,
  GENRE_TITLES,
  TAG_TITLES,
} from "@/lib/apiConst";
import { REQUEST_HEADER } from "@/lib/config";
import { GENRE_QUERY } from "@/lib/const";
import axios from "axios";

async function TitleGet(url) {
  return await axios
    .get(encodeURI(`${CONTENT_TITLE}${url}`), REQUEST_HEADER)
    .then(({ data }) => data)
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function createTitle(data) {
  return await axios
    .post(encodeURI(CONTENT_TITLE), data, REQUEST_HEADER)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

async function movieTitle(url) {
  return await axios
    .get(encodeURI(`${CONTENT_TITLE}${url}`), REQUEST_HEADER)
    .then(({ data }) => data)
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function MovieTitleGet(url) {
  return await axios
    .get(encodeURI(`${CONTENT_TITLE}${url}`), REQUEST_HEADER)
    .then(({ data }) => data)
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function SeriesTitleGet(url) {
  return await axios
    .get(encodeURI(`${CONTENT_TITLE}${url}`), REQUEST_HEADER)
    .then(({ data }) => data)
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function getGenreTitle(url) {
  return await axios
    .get(encodeURI(`${GENRE_TITLES}${url}`), REQUEST_HEADER)
    .then(({ data }) => data)
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function getTagTitles(url) {
  return await axios
    .get(encodeURI(`${TAG_TITLES}${url}`), REQUEST_HEADER)
    .then(({ data }) => data)
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function getRolesTilte(url) {
  return await axios
    .get(encodeURI(`${CREDIT_ROLES}${url}`), REQUEST_HEADER)
    .then(({ data }) => data)
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function getGenreTitles(url) {
  return await axios
    .get(encodeURI(`${GENRE_QUERY}${url}`), REQUEST_HEADER)
    .then(({ data }) => data)
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function EpisodeGet(url) {
  return await axios
    .get(encodeURI(`${CONTENT_TITLE}${url}`), REQUEST_HEADER)
    .then(({ data }) => data)
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function EpisodeIdGet(url) {
  return await axios
    .get(encodeURI(`${CONTENT_EPISODE}${url}`), REQUEST_HEADER)
    .then(({ data }) => data)
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
// Roles
async function getRoles(url) {
  return await axios
    .get(encodeURI(`${CONTENT_ROLES}${url}`), REQUEST_HEADER)
    .then(({ data }) => data)
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function createRole(data) {
  return await axios
    .post(encodeURI(CONTENT_ROLES), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
async function updateRole(data, id) {
  return await axios
    .patch(encodeURI(`${CONTENT_ROLES}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function deleteRole(data, id) {
  return await axios
    .patch(encodeURI(`${CONTENT_ROLES}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
// Tags
async function getTag(url) {
  return await axios
    .get(encodeURI(`${CONTENT_TAG}${url}`), REQUEST_HEADER)
    .then(({ data }) => data)
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function createTag(data) {
  return await axios
    .post(encodeURI(CONTENT_TAG), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

async function updateTag(data, id) {
  return await axios
    .patch(encodeURI(`${CONTENT_TAG}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function deleteTag(data, id) {
  return await axios
    .patch(encodeURI(`${CONTENT_TAG}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

// Genre
async function getGenre(url) {
  return await axios

    .get(encodeURI(`${CONTENT_GENRE}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

async function createGenre(data) {
  return await axios

    .post(encodeURI(CONTENT_GENRE), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
async function updateGenre(data, id) {
  return await axios
    .patch(encodeURI(`${CONTENT_GENRE}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function deleteGenre(data, id) {
  return await axios
    .patch(encodeURI(`${CONTENT_GENRE}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function getTrailers(url) {
  return await axios
    .get(encodeURI(`${CONTENT_TRAILERS}${url}`), REQUEST_HEADER)
    .then(({ data }) => data)
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
async function createTrailer(data) {
  return await axios
    .post(encodeURI(CONTENT_TRAILERS), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
async function updateTrailer(data, id) {
  return await axios
    .patch(encodeURI(`${CONTENT_TRAILERS}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      console.log(err);
      return { error: "Client and server connection error" };
    });
}
async function deleteTrailer(data, id) {
  return await axios
    .patch(encodeURI(`${CONTENT_TRAILERS}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function getCredits(url) {
  return await axios
    .get(encodeURI(`${CONTENT_CREDIT}${url}`), REQUEST_HEADER)
    .then(({ data }) => data)
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
async function createCredit(data) {
  return await axios
    .post(encodeURI(CONTENT_CREDIT), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
async function updateCredit(data, id) {
  return await axios
    .patch(encodeURI(`${CONTENT_CREDIT}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function deleteCredit(data, id) {
  return await axios
    .patch(encodeURI(`${CONTENT_CREDIT}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function getSeries(url) {
  return await axios
    .get(encodeURI(url), REQUEST_HEADER)
    .then(({ data }) => data)
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
async function createSeries(data) {
  return await axios
    .post(encodeURI(CONTENT_TITLE), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
async function updateSeries(data, id) {
  return await axios
    .patch(encodeURI(`${CONTENT_TITLE}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function getSeasons(url) {
  return await axios
    .get(encodeURI(`${CONTENT_SEASONS}${url}`), REQUEST_HEADER)
    .then(({ data }) => data)
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
async function createSeason(data) {
  return await axios
    .post(encodeURI(CONTENT_SEASONS), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
async function updateSeason(data, id) {
  return await axios
    .patch(encodeURI(`${CONTENT_SEASONS}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function getEpisodes(url) {
  console.log(`${CONTENT_EPISODE}${url}`);
  return await axios
    .get(encodeURI(`${CONTENT_EPISODE}${url}`), REQUEST_HEADER)
    .then(({ data }) => data)
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
async function createEpisode(data) {
  return await axios
    .post(encodeURI(CONTENT_EPISODE), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
async function updateEpisode(data, id) {
  return await axios
    .patch(encodeURI(`${CONTENT_EPISODE}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function createMovie(data) {
  console.log(data);
  return await axios
    .post(encodeURI(CONTENT_TITLE), data, REQUEST_HEADER)
    .then((res) => {
      return { success: true, data: res.data.id };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
async function updateMovie(data, id) {
  return await axios
    .patch(encodeURI(`${CONTENT_TITLE}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function addGenre(data) {
  return await axios
    .post(encodeURI(GENRE_TITLES), data, REQUEST_HEADER)
    .then((res) => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function removeGenre(id) {
  console.log(`${GENRE_TITLES}(${id})`);
  return await axios
    .delete(encodeURI(`${GENRE_TITLES}(${id})`), REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function addTag(data) {
  return await axios
    .post(encodeURI(TAG_TITLES), data, REQUEST_HEADER)
    .then((res) => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function removeTag(id) {
  return await axios
    .delete(encodeURI(`${TAG_TITLES}(${id})`), REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}

async function addCreditTitle(data) {
  console.log(data);
  return await axios
    .post(encodeURI(CREDIT_TITLES), data, REQUEST_HEADER)
    .then((res) => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function removeCreditTitle(id) {
  return await axios
    .delete(encodeURI(`${CREDIT_TITLES}(${id})`), REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function removeCreditRole(id) {
  return await axios
    .delete(encodeURI(`${CREDIT_ROLES}(${id})`), REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function SeriePublish(data, id) {
  return await axios
    .patch(encodeURI(`${CONTENT_TITLE}(${id})`), data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}

async function createCreditRole(data) {
  const { id, ...item } = data;
  console.log(item);
  return await axios
    .post(encodeURI(CREDIT_ROLES), item, REQUEST_HEADER)
    .then((res) => {
      return { creditRoleId: res.data.id };
    })
    .catch((err) => {
      return { error: "Client and server connection error" };
    });
}
export {
  TitleGet,
  MovieTitleGet,
  SeriesTitleGet,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre,
  // getGenreTitle,
  EpisodeGet,
  EpisodeIdGet,
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getTag,
  createTag,
  updateTag,
  deleteTag,
  movieTitle,
  getTrailers,
  createTrailer,
  updateTrailer,
  deleteTrailer,
  getCredits,
  createCredit,
  updateCredit,
  deleteCredit,
  getSeries,
  createSeries,
  updateSeries,
  getSeasons,
  createSeason,
  updateSeason,
  getEpisodes,
  createEpisode,
  updateEpisode,
  createTitle,
  createMovie,
  updateMovie,
  SeriePublish,
  createCreditRole,
  removeCreditRole,
  addGenre,
  removeGenre,
  addTag,
  removeTag,
  addCreditTitle,
  removeCreditTitle,
  getTagTitles,
  getGenreTitles,
  getRolesTilte,
  getGenreTitle,
};

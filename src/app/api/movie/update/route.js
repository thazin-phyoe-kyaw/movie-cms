import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import {
  addGenre,
  removeGenre,
  addTag,
  removeTag,
  updateMovie,
  addCreditTitle,
  addMovieGenre,
  createCredit,
  createCreditRole,
  removeCreditTitle,
  removeCreditRole,
} from "@/modules/contentServiceModule/services";

import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "CONTENT_MOVIE_CREATE")) {
    return unauthorizeResponse();
  }

  const {
    titleMm,
    titleEn,
    keywords,
    descriptionEn,
    descriptionMm,
    id,
    titleId,
    duration,
    fullHdFileSize,
    hdFileSize,
    sdFileSize,
    trailer,
    streamingUrl,
    downloadUrl,
    price,
    discountPrice,
    isExclusive,
    addedGenres,
    removedGenres,
    addedTags,
    removedTags,
    creditRoles,
    removeCreditRoleId,
    deleteCreditRoles,
  } = await request.json();
  console.log(removeCreditRoleId);

  // const Movie = {
  //   duration,
  //   fullHdFileSize: fullHdFileSize + "Mb",
  //   hdFileSize: hdFileSize + "Mb",
  //   sdFileSize: sdFileSize + "Mb",
  //   trailer,
  //   streamingUrl,
  //   downloadUrl,
  //   sorting: 3,
  //   price: +price,
  //   discountPrice: +discountPrice,
  //   isExclusive: true,
  //   status: true,
  //   startDate: getCurrentDate(),
  //   expireDate: getCurrentDate(),
  //   publishDate: getCurrentDate(),
  //   createdAt: getCurrentDate(),
  //   updatedAt: getCurrentDate(),
  //   createdBy: session.user?.id ? session.user.id : "",
  //   updatedBy: session.user?.id ? session.user.id : "",
  // };
  const addGenres = async () => {
    const promises = addedGenres
      .map((item) => ({
        titleId: id,
        genreId: item,
      }))
      .map(async (data) => {
        try {
          const response = await addGenre(data);
          return successResponse();
        } catch (error) {
          return errorResponse(error);
        }
      });

    await Promise.all(promises);
  };
  addGenres();

  const removeGenres = async () => {
    const promises = removedGenres
      .map((item) => item)
      .map(async (id) => {
        try {
          const response = await removeGenre(id);
          return successResponse();
        } catch (error) {
          return errorResponse(error);
        }
      });

    await Promise.all(promises);
  };
  removeGenres();

  const addTags = async () => {
    const promises = addedTags
      .map((item) => ({
        titleId: id,
        tagId: item,
      }))
      .map(async (data) => {
        try {
          const response = await addTag(data);
          return successResponse();
        } catch (error) {
          return errorResponse(error);
        }
      });

    await Promise.all(promises);
  };
  addTags();

  const removeTags = async () => {
    const promises = removedTags
      .map((item) => item)
      .map(async (id) => {
        try {
          const response = await removeTag(id);
          return successResponse();
        } catch (error) {
          return errorResponse(error);
        }
      });

    await Promise.all(promises);
  };
  removeTags();

  const removeCreditTitles = async () => {
    const responses = [];
    for (const id of removeCreditRoleId) {
      try {
        const response = await removeCreditTitle(id);
        responses.push(successResponse());
      } catch (error) {
        responses.push(errorResponse(error));
      }
    }

    return responses;
  };

  await removeCreditTitles();
  const removeCreditRoles = async () => {
    const responses = [];
    for (const id of deleteCreditRoles) {
      try {
        const response = await removeCreditRole(id);
        responses.push(successResponse());
      } catch (error) {
        responses.push(errorResponse(error));
      }
    }

    return responses;
  };

  await removeCreditRoles();

  const addCredits = async () => {
    const responses = [];

    for (const item of creditRoles) {
      try {
        const response = await createCreditRole(item);

        const sth = await addCreditTitle({ titleId: id, ...response });

        responses.push(successResponse(sth));
      } catch (error) {
        responses.push(errorResponse(error));
      }
    }

    return responses;
  };

  await addCredits();

  const createData = await updateMovie(
    {
      keywords,
      titleEn,
      titleMm,
      descriptionEn,
      descriptionMm,
      isPremium: false,
      resolution: "SD",
      rating: 3.5,
      sorting: 4,
      type: "movie",
      status: true,
      statusType: null,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
      createdBy: session.user?.id ? session.user.id : "",
      updatedBy: session.user?.id ? session.user.id : "",
      // Movie,
    },
    id
  );

  if (createData.error) {
    return errorResponse(createData.error);
  }

  return successResponse();
}

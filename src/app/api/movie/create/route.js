import { authOptions } from "@/lib/auth";

import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import {
  createCreditRole,
  createMovie,
} from "@/modules/contentServiceModule/services";

import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "CONTENT_MOVIE_CREATE")) {
    return unauthorizeResponse();
  }
  console.log("MOVIE CREATE");
  const {
    titleMm,
    titleEn,
    keywords,
    descriptionEn,
    descriptionMm,
    duration,
    fullHdFileSize,
    hdFileSize,
    sdFileSize,
    trailer,
    streamingUrl,
    downloadUrl,
    isCinema,
    price,
    discountPrice,
    genre = [],
    tag = [],
    creditRoles = [],
  } = await request.json();

  const Movie = {
    duration,
    fullHdFileSize: fullHdFileSize + "Mb",
    hdFileSize: hdFileSize + "Mb",
    sdFileSize: sdFileSize + "Mb",
    trailer,
    streamingUrl,
    downloadUrl,
    sorting: 3,
    price: +price,
    discountPrice: +discountPrice,
    isExclusive: true,
    status: true,
    startDate: getCurrentDate(),
    expireDate: getCurrentDate(),
    publishDate: getCurrentDate(),
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    createdBy: session.user?.id ? session.user.id : "",
    updatedBy: session.user?.id ? session.user.id : "",
  };
  const creditRolesIds = await Promise.all(
    creditRoles.map(async (dataObj) => await createCreditRole(dataObj))
  );

  console.log(creditRoles, creditRolesIds);
  const genres = Array.isArray(genre)
    ? genre.map((genreId) => ({ genreId }))
    : [];
  const tags = Array.isArray(tag) ? tag.map((tagId) => ({ tagId })) : [];

  const createData = await createMovie({
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
    Movie,
    genreTitles: genres ? genres : [],
    tagTitles: tags ? tags : [],
    titleCredit: creditRolesIds ? creditRolesIds : [],
  });

  if (createData.error) {
    return errorResponse(createData.error);
  }

  return successResponse();
}

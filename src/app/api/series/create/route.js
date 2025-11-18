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
  createSeries,
} from "@/modules/contentServiceModule/services";
import { getServerSession } from "next-auth";
export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "CONTENT_CREDIT_CREATE")) {
    return unauthorizeResponse();
  }

  const {
    keywords,
    titleEn,
    titleMm,
    descriptionEn,
    descriptionMm,
    trailer,
    price,
    discountPrice,
    genre = [],
    creditRoles = [],
    tag = [],
  } = await request.json();

  const creditRolesIds = await Promise.all(
    creditRoles.map(async (dataObj) => await createCreditRole(dataObj))
  );
  const genres = Array.isArray(genre)
    ? genre.map((genreId) => ({ genreId }))
    : [];
  const tags = Array.isArray(tag) ? tag.map((tagId) => ({ tagId })) : [];
  const series = {
    trailer,
    price: +price,
    discountPrice: +discountPrice,
    isExclusive: true,
    status: true,
    sorting: 64,
    startDate: getCurrentDate(),
    expireDate: getCurrentDate(),
    publishDate: getCurrentDate(),
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    createdBy: session.user?.id ? session.user.id : "",
    updatedBy: session.user?.id ? session.user.id : "",
  };

  const createData = await createSeries({
    keywords,
    titleEn,
    titleMm,
    descriptionEn,
    descriptionMm,
    type: "series",
    isPremium: false,
    resolution: "SD",
    rating: 3.5,
    sorting: 71,
    status: true,
    statusType: null,
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    createdBy: session.user?.id ? session.user.id : "",
    updatedBy: session.user?.id ? session.user.id : "",
    series,
    genreTitles: genres ? genres : [],
    tagTitles: tags ? tags : [],
    titleCredit: creditRolesIds ? creditRolesIds : [],
  });

  if (createData.error) {
    return errorResponse(createData.error);
  }

  return successResponse();
}

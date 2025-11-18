import { authOptions } from "@/lib/auth";
import { getTag, getTagTitles } from "@/modules/contentServiceModule/services";
import { getServerSession } from "next-auth";
import TagBody from "./body";
import { GetUserList } from "@/modules/cmsModule/services";
import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_CONTENT_TAG_CONST } from "@/lib/queryConst";
export default async function Role() {
  const { user } = await getServerSession(authOptions);
  const tags = await odataQueryHandler(
    QUERY_CONTENT_TAG_CONST,
    QUERY_CONTENT_TAG_CONST.filter,
    QUERY_CONTENT_TAG_CONST.order,
    QUERY_CONTENT_TAG_CONST.fields,
    "no_child",
    { top: 10, skip: 0 },
    getTag
  );

  const tagTitleID = await getTagTitles(`?$select=tagId`);

  return (
    <TagBody
      permissions={user.permissions}
      preData={
        tags.error
          ? { count: 0, value: [] }
          : {
              count: tags["@odata.count"] ? tags["@odata.count"] : 0,
              value: tags.value ? tags.value : [],
              tagTitleID,
            }
      }
    ></TagBody>
  );
}

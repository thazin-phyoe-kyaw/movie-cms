import Netstorage from "netstorageapi";

import {
  AKAMAI_HOST,
  AKAMAI_USER_NAME,
  AKAMAI_FILE_PATH,
  AKAMAI_ACCESS_KEY,
  AKAMAI_CPCODE,
} from "./config";

const config = {
  hostname: AKAMAI_HOST,
  keyName: AKAMAI_USER_NAME,
  key: AKAMAI_ACCESS_KEY,
  cpCode: AKAMAI_CPCODE,
  ssl: false,
};

export async function fileUploadHanlder(filePath, fileName) {
  const ns = new Netstorage(config);
  const netstorage_destination = `/${config.cpCode}/${AKAMAI_FILE_PATH}/${fileName}`;

  await ns.upload(
    filePath,
    netstorage_destination,
    async (err, response, body) => {
      if (err) {
        return { error: true };
      }
      return await response;
    }
  );
}

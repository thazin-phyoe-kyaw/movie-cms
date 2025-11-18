"use client";
import { AKAMAI_CONFIG, AKAMAI_FILE_PATH } from "./config";

export async function imageUploadHandler(localPath, servicePath, fileName) {
  const ns = new Netstorage(AKAMAI_CONFIG);
  const netstorage_destination = `/${config.cpCode}/${AKAMAI_FILE_PATH}/${servicePath}/${fileName}`;

  await ns.upload(
    localPath,
    netstorage_destination,
    async (err, response, body) => {
      if (err) {
        return { error: true };
      }
      console.log(response);
      return await response;
    }
  );
}

// import axios from "axios";
// import { NextResponse } from "next/server";
// export async function POST(request) {
//   try {
//     const data = await request.formData();
//     const file = data.get("file");
//     console.log(file, "tzpk");
//     if (!file) {
//       return NextResponse.json({ success: false });
//     }
//     const fileBuffer = await file.arrayBuffer();
//     const netStorageFilePath = "1427411/" + file.name;
//     const uploadUrl =
//       "https://maharbackup.ftp.upload.akamai.com/" + netStorageFilePath;
//     console.log(uploadUrl);

//     const response = await axios.put(uploadUrl, fileBuffer, {
//       headers: {
//         "X-Akamai-ACS-Action": "version=1&action=upload&format=plain",
//         "X-Akamai-ACS-Auth-Data": "CR6ET4i7tI4chYmZTOcHZ2tmSpVfsgbY3q1CJ2sf5p",
//         "Content-Type": "mulitpart/form-data",
//       },
//     });

//     if (response.status === 200) {
//       const imageUrl = response.headers["location"];
//       return NextResponse.json({ success: true, imageUrl });
//     } else {
//       return NextResponse.json({
//         success: false,
//         message: "File Upload Failed",
//       });
//     }
//   } catch (error) {
//     return NextResponse.json({ success: false, data: "Internal Server Error" });
//   }
// }
// ``;

// // host - maharbackup.ftp.upload.akamai.com
// // HTTP Domain Name - maharbackup-nsu.akamaihd.net
// // Access key - CR6ET4i7tI4chYmZTOcHZ2tmSpVfsgbY3q1CJ2sf5p
// // username - maharsystem
// // password - mahar123
// // file path - /1427411/test
// import axios from "axios";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const data = await request.formData();
//     const file = data.get("file");

//     if (!file) {
//       return NextResponse.json({ success: false, message: "No file provided" });
//     }
//     const netStorageFilePath = "1427411/" + file.name;
//     const uploadUrl =
//       "https://maharbackup.ftp.upload.akamai.com/" + netStorageFilePath;
//     const fileBuffer = await file.arrayBuffer();
//     console.log(file, "tzpk");
//     // console.log(fileBuffer);
//     const response = await axios.put(uploadUrl, fileBuffer, {
//       headers: {
//         "X-Akamai-ACS-Action": "version=1&action=upload&format=plain",
//         "X-Akamai-ACS-Auth-Data": "CR6ET4i7tI4chYmZTOcHZ2tmSpVfsgbY3q1CJ2sf5p",
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     console.log(response, "zzz");
//     if (response.status === 200) {
//       const imageUrl =
//         "https://maharbackup-nsu.akamaihd.net/" + netStorageFilePath;
//       return NextResponse.json({ success: true, imageUrl });
//     } else {
//       return NextResponse.json({
//         success: false,
//         message: "File Upload Failed",
//       });
//     }
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     return NextResponse.json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// }
// import axios from "axios";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const data = await request.formData();
//     const file = data.get("file");

//     if (!file) {
//       return NextResponse.json({ success: false, message: "No file provided" });
//     }

//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onloadend = async function () {
//       const base64String = reader.result.split(",")[1]; // Extract Base64 string

//       const uploadUrl = "https://maharbackup.ftp.upload.akamai.com/upload"; // Modify the upload endpoint

//       try {
//         // Send the Base64 string in the request body
//         const response = await axios.post(
//           uploadUrl,
//           { file: base64String },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               "X-Akamai-ACS-Action": "version=1&action=upload&format=plain",
//               "X-Akamai-ACS-Auth-Data":
//                 "CR6ET4i7tI4chYmZTOcHZ2tmSpVfsgbY3q1CJ2sf5p",
//             },
//           }
//         );
//         console.log(response);
//         if (response.status === 200) {
//           const imageUrl = response.data.imageUrl; // Modify this based on your server response structure
//           return NextResponse.json({ success: true, imageUrl });
//         } else {
//           return NextResponse.json({
//             success: false,
//             message: "File Upload Failed",
//           });
//         }
//       } catch (error) {
//         console.error("Error uploading file:", error);
//         return NextResponse.json({
//           success: false,
//           message: "Internal Server Error",
//         });
//       }
//     };
//   } catch (error) {
//     console.error("Error processing file:", error);
//     return NextResponse.json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// }
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" });
    }
    const netStorageFilePath = "1427411/" + file.name;
    const uploadUrl =
      "https://maharbackup.ftp.upload.akamai.com/" + netStorageFilePath;

    const fileBuffer = await file.arrayBuffer();
    const base64String = Buffer.from(fileBuffer).toString("base64");

    try {
      const response = await axios.post(uploadUrl, base64String, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Akamai-ACS-Action": "version=1&action=upload&format=plain",
          "X-Akamai-ACS-Auth-Data":
            "CR6ET4i7tI4chYmZTOcHZ2tmSpVfsgbY3q1CJ2sf5p",
        },
      });

      if (response.status === 200) {
        const imageUrl = response.data.imageUrl;
        return NextResponse.json({ success: true, imageUrl });
      } else {
        return NextResponse.json({
          success: false,
          message: "File Upload Failed",
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      return NextResponse.json({
        success: false,
        message: "Internal Server Error",
      });
    }
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

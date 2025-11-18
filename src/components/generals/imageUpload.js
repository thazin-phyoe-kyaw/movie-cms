// import React, { useState } from "react";
// import { Upload, Modal, Button } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import axios from "axios";
// function ImageUpload() {
//   const [fileList, setFileList] = useState([]);
//   const [previewVisible, setPreviewVisible] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const handleCancel = () => setPreviewVisible(false);

//   const handlePreview = async (file) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }
//     setPreviewImage(file.url || file.preview);
//     setPreviewVisible(true);
//   };

//   const handleChange = ({ fileList }) => setFileList(fileList);
//   const customRequest = async ({ file, onSuccess, onError }) => {
//     try {
//       const data = new FormData();
//       data.set("file", file);
//       console.log(data);
//       const response = await axios.post("/api/upload_image", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log(repsonse, "res");
//       const imageUrl = response.data.image_path;
//       file.url = imageUrl;
//       setFileList([...fileList, file]);
//       onSuccess();
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       onError(error);
//     }
//   };

//   const getBase64 = (file) =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });

//   return (
//     <div>
//       <Upload
//         customRequest={customRequest}
//         listType="picture-card"
//         fileList={fileList}
//         onPreview={handlePreview}
//         onChange={handleChange}
//       >
//         {fileList.length >= 8 ? null : (
//           <div>
//             <PlusOutlined />
//             <div style={{ marginTop: 8 }}>Upload</div>
//           </div>
//         )}
//       </Upload>
//       <Modal open={previewVisible} footer={null} onCancel={handleCancel}>
//         <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
//       </Modal>
//     </div>
//   );
// }

// export default ImageUpload;

import React, { useState } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

function ImageUpload() {
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const data = new FormData();
      data.append("file", file);
      console.log(file);
      console.log(data, "dd");
      const response = await axios.post("/api/upload_image", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response, "imageupload rp");
      const imageUrl = response.data.imageUrl;
      file.url = imageUrl;
      setFileList([...fileList, file]);
      onSuccess();
    } catch (error) {
      console.error("Error uploading file:", error);
      onError(error);
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div>
      <Upload
        customRequest={customRequest}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
}

export default ImageUpload;

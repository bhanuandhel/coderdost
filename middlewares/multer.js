import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage });

export const singleUpload = upload.single("file");

// export const multipleUpload = upload.array("files", 10); // limit to 10 images

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const { db } = require("./config/mongodb");

require("dotenv").config();

const API_Key = process.env.API_Key;
const API_Secret = process.env.API_Secret;

const uploadToIPFS = async (filePath, title) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath));

  const metadata = JSON.stringify({
    name: "UserUpload",
    keyvalues: {
      caption: title,
    },
  });

  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 1,
  });

  formData.append("pinataOptions", options);

  //where we send the images
  const response = await axios.post(url, formData, {
    maxBodyLength: "Infinity", // needed for larger iamge files
    headers: {
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      pinata_api_key: API_Key,
      pinata_secret_api_key: API_Secret,
    },
  });

  const ipfsHash = response.data.IpfsHash;
  await insertData({ ipfsHash, caption, username });
  return ipfsHash;
};

const downloadFromIPFS = async (ipfsHash, destinationPath) => {
  try {
    const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    const response = await axios({
      method: "get",
      url: url,
      responseType: "stream",
    });

    const fileName = path.join(destinationPath, `${ipfsHash}.jpg`);
    const writer = fs.createWriteStream(fileName);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", () => {
        resolve(fileName);
      });
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Error downloading image from IPFS:", error);
    throw new Error("Unable to download file from IPFS.");
  }
};

const insertData = async ({ ipfsHash, title }) => {
  const database = await db();
  const usersCollection = database.collection("reports");

  // Update the user's CID array
  await usersCollection.updateOne({ title }, { $push: { CID: ipfsHash } });

  console.log("Data updated successfully");
};

module.exports = {
  uploadToIPFS,
  downloadFromIPFS,
};

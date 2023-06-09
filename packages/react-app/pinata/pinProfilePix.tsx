import axios from "axios"
const FormData = require("form-data");
const JWT = `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`

export const pinFileToPinata = async (selectedFile : string | File | number | readonly string[] | undefined) => {
  const formData = new FormData();
    
    formData.append('file', selectedFile)

    const metadata = JSON.stringify({
      name: 'Coffee Dapp',
    });
    formData.append('pinataMetadata', metadata);
    
    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);
    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`
        }
      });
      console.log(res.data.IpfsHash);
      return res.data.IpfsHash
    } catch (error) {
      console.log(error);
    }
};

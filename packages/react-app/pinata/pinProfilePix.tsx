import axios from "axios"
const FormData = require("form-data");
const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2YWU3YmFiMS1iMzcxLTQzNzEtYThkOC1jZmU1NjVkYzBhZDgiLCJlbWFpbCI6InNhbmNhcnJpbGxvNDExQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI5NDgxZWVhMzgwMGZiMDZjY2U3MSIsInNjb3BlZEtleVNlY3JldCI6IjBjNWIzZmIyOWFkN2NkNGNhZjAwYTlmZWNhYjczNWMyOTgxOWE1NzZlZTUxOGVmYWU4ZmY0MjljYjU4M2VhZDkiLCJpYXQiOjE2ODA0MDM2Njd9.fnUsHQzlD9aL_hLTtbcGmQYrhHDjZ1ePoBXf2gBVKbM`

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
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2YWU3YmFiMS1iMzcxLTQzNzEtYThkOC1jZmU1NjVkYzBhZDgiLCJlbWFpbCI6InNhbmNhcnJpbGxvNDExQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI5NDgxZWVhMzgwMGZiMDZjY2U3MSIsInNjb3BlZEtleVNlY3JldCI6IjBjNWIzZmIyOWFkN2NkNGNhZjAwYTlmZWNhYjczNWMyOTgxOWE1NzZlZTUxOGVmYWU4ZmY0MjljYjU4M2VhZDkiLCJpYXQiOjE2ODA0MDM2Njd9.fnUsHQzlD9aL_hLTtbcGmQYrhHDjZ1ePoBXf2gBVKbM"
        }
      });
      console.log(res.data.IpfsHash);
      return res.data.IpfsHash
    } catch (error) {
      console.log(error);
    }
};
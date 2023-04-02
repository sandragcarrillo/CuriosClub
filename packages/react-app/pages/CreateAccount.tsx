import React, { useState } from 'react'
import { pinFileToPinata } from '@/pinata/pinProfilePix'
import { useCelo } from '@celo/react-celo';
import { createCreator } from '@/interact';

export default function CreateAccount() {
  const [username, setUsername] = useState<string>("")
  const [userBio, setUserBio] = useState<string>("")
  const [profilePix, setProfilePix] = useState<string | File | number | readonly string[] | undefined>(undefined)
  const { address, kit } = useCelo()
  
  const handleUsername = (e: React.FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value)
      console.log(e.currentTarget.value)

  }

  const handleUserBio = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setUserBio(e.currentTarget.value)

  }

   const handleprofilePix = (e: React.ChangeEvent<HTMLInputElement>) => {
     if (e.target.files != null) {
      setProfilePix(e.target.files[0]); 
      console.log(e.target.files[0])
    } 
   }
  
  const createAccount = async () => {
    if (!address) {
      alert("Please connect your wallet")
      return
    }

    if (username === "") {
      alert("Username required!")
      return
    } 

    if (userBio === "") {
      alert("Brief bio required")
      return
    }
    if (username.indexOf(' ') >= 0) {
      // setErrorMessage("Space not allowed here")
      alert("Space not allowed here")
      return
    } 

    if (!profilePix) {
      alert("Please upload your profile photo")
      return
    }

    const pinataHash = await pinFileToPinata(profilePix)
    await createCreator(address, username, pinataHash, userBio, kit)  
  }

  return (
    <div>
      <h1 className='mb-4 text-lg font-bold'>Are you a Creator? Create Account here </h1>
      <div className='w-full'>
        <input className='w-full border-2 rounded-md mb-2 p-2' type="text" placeholder='username' value={username} onChange={handleUsername} />
      </div>
      <div>
        <textarea className='w-full border-2 rounded-md p-2' placeholder='Brief bio' value={userBio} onChange={handleUserBio} />
      </div>
      <label>Upload your profile pix</label>
      <div>
        <input className='w-full' type="file" id="formFile" onChange={handleprofilePix} />
      </div>
      <button className=' w-full bg-yellow-300 mt-4 p-4 rounded-md' onClick={createAccount}>Create Account</button>
    </div>
  )
}

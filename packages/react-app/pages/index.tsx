import React, { useState, useEffect } from 'react'
import Image from "next/image"
import Link from "next/link"
import { getCreators } from '@/interact'
import { useCelo } from '@celo/react-celo';
import Router from 'next/router';

export default function Home() {
  const [creators, setCreators] = useState<any[]>([])
  const { kit, address } = useCelo()
 
  useEffect(() => {
    const allCreators = async () => {
      try {
        const creatorList = await getCreators(kit)
        setCreators(creatorList)
      } catch (e) {
        console.log(e)
      }
  
    }
    allCreators()
  }, [kit])
 
  return (
    <div>
      <div>
        <h1>Are you a creator? click the button below to create account!</h1>
        <button className="bg-yellow-300 rounded-md p-4 mt-4" onClick={() => window.open("CreateAccount")}> Create Creator Account</button>
      </div>
 
        <div className="flex justify-around">
        {!address ? <div className='text-center mt-2'>Please connect your wallet to view listed creators </div>
          : creators && creators.map((item, index) => <div key={index} className="w-3/4 mt-2 mx-2 border-2 border-yellow-300 p-4 rounded-md">
        <Image src={`https://ipfs.io/ipfs/${item.ipfsHash}`} alt="profile-pix" width={300} height={200} />
        <p>{item.username}</p>
        <p>{item.userbio}</p>
        <label>Donation received:</label>
        <span className="font-bold">{`${item.donationsReceived/1e18 } CELO`}</span>
          <p className="">{`Supporters: ${item.supporters}`}</p>
          <Link
            href={{
              pathname: `/Support/`,
              query: { id: item.id, walletAddress: item.walletAddress }// the data
            }}
          >
            <button className="w-full bg-yellow-300 rounded-md p-2 my-2">{` Support ${item.walletAddress.substring(0,7)}...`}</button>
          </Link>
        </div>     
      )}      
      </div>    
    </div>
  )
 }
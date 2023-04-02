import React, { useState, useEffect } from 'react'
import Image from "next/image"
import Link from "next/link"
import { getCreators } from '@/interact'
import { useCelo } from '@celo/react-celo';
import Router from 'next/router';
import DropdownRender from '@/components/Dropdown';

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

      <div className="grid gap-10 lg:grid-cols-3">
      <div className="relative p-px overflow-hidden transition duration-300 transform border rounded-xl shadow-md  hover:shadow-xl lg:col-span-1 ">
          <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 " />
          <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-deep-purple-accent-400 " />
          <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-deep-purple-accent-400 " />
          <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-deep-purple-accent-400 " />
          <div className="relative items-center p-5 items-center justify-center  bg-white rounded-xl">
          <div className='justify-center align-center'>
             <DropdownRender />
            </div>
            <h1 className="mb-2 text-center text-xl text-gray-900">
             Protocolos y apps
            </h1>
            <div className=''>
            <a
              href="/"
              className="inline-flex bg-gray-100 items-center justify-center mt-5  w-full h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded border-black border-sm shadow-md  focus:shadow-outline focus:outline-none"
            >
              Celo
            </a>

            <a
              href="/"
              className="inline-flex bg-gray-100 items-center justify-center mt-5  w-full h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded border-black border-sm shadow-md  focus:shadow-outline focus:outline-none"
            >
              Metamask
            </a>

            <a
              href="/"
              className="inline-flex bg-gray-100 items-center justify-center mt-5  w-full h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded border-black border-sm shadow-md  focus:shadow-outline focus:outline-none"
            >
              Aurora
            </a>

            <a
              href="/"
              className="inline-flex bg-gray-100 items-center justify-center mt-5  w-full h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded border-black border-sm shadow-md  focus:shadow-outline focus:outline-none"
            >
              Talent Protocol
            </a>
            </div>

            <a
              href="/"
              className="inline-flex bg-gray-100 items-center justify-center mt-5  w-full h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded border-black border-sm shadow-md  focus:shadow-outline focus:outline-none"
            >
              Chainlink
            </a>

            <a
              href="/"
              className="inline-flex bg-gray-100 items-center justify-center mt-5  w-full h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded border-black border-sm shadow-md  focus:shadow-outline focus:outline-none"
            >
              Valora
            </a>

            <a
              href="/"
              className="inline-flex bg-gray-100 items-center justify-center mt-5  w-full h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded border-black border-sm shadow-md  focus:shadow-outline focus:outline-none"
            >
              LayerX
            </a>

            

          </div>
        </div>

      </div>

    
      <div>
        <h1>Are you a creator? click the button below to create account!</h1>
        <button className="bg-yellow-300 rounded-md p-4 mt-4" onClick={() => window.open("CreateAccount")}> Create Creator Account</button>
      </div>

        <div className="flex justify-around">
        {!address ? <div className='text-center mt-2'>Conecta tu billetera para ver las contribuciones</div>
          : creators && creators.map((item, index) => <div key={index} className="w-3/4 mt-2 mx-2 border-2 border-yellow-300 p-4 rounded-md">
        <Image src={`https://ipfs.io/ipfs/${item.ipfsHash}`} alt="profile-pix" width={300} height={200} />
        <p>{item.username}</p>
        <p>{item.userbio}</p>
        <p>{item.userSubmission}</p>
          <p className="">{`Supporters: ${item.supporters}`}</p>
          <Link
            href={{
              pathname: `/Support/`,
              query: { id: item.id, walletAddress: item.walletAddress }// the data
            }}
          >
            <button className="w-full bg-yellow-300 rounded-md p-2 my-2">{` Reconoce a ${item.walletAddress.substring(0,7)}...`}</button>
          </Link>
        </div>      
      )}       
      </div>     
    </div>
  )
}

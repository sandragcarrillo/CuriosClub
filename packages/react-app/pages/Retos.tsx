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
         <div className='text-center'>
        <h1 className=' '>Responde a los retos y obtén recompensas del protocolo y la comunidad. Adicionalmente, por cada recompensa se destina un 5% a la organización OneTreePlanted para su programa de restauración del Amazonas, en cooperación con la sociedad civil y comunidades locales
        </h1>
        <button className="bg-yellow-300 rounded-md p-4 mt-2 text-bold font-bold mb-4" onClick={() => window.open("https://onetreeplanted.org/")}> Visita a OneTreePlanted</button>
      
       
       

      </div>

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
        

        <div className="flex-col  lg:col-span-2 h-fit border-2 border-black rounded-xl p-10">
        <div className=' gap-3 align-center align-center'>
         <Image src={`https://pbs.twimg.com/profile_images/1582135788581621764/7yN00JTO_400x400.jpg`} alt="profile-pix" width={50} height={40} className="rounded-xl" />
         <p className='font-bold'>Talent Protocol</p>
        <p className='font-italic text-sm'>Nueva funcionalidad</p>
        <div>
       
        </div>
        <div>
        <p className='pt-5 pb-5'>Tenemos una nueva funcionalidad: mintear tokens para que otras personas puedan invertir en tu talento. 
            Mintea tus tokens, documenta tu experiencia para mostrarle a otros usuarios a utilizar esta funcionalidad
        </p>
        <div className='flex-col gap-10 '>
        <p className="font-bold">Applicantes: 2</p>
          <p className="font-bold">Recompensa: 100 cUSD</p>
            <button className="bg-black text-white rounded-md p-4 mt-4 pr-4" onClick={() => window.open("/CreateAccount")}> Aplicar al reto</button> 
        </div>
 
        </div>
       
        </div>      
      </div>   

      <div className="flex-col  lg:col-span-2 h-fit border-2 border-black rounded-xl p-10">
        <div className=' gap-3 align-center align-center'>
         <Image src={`https://pbs.twimg.com/profile_images/1582135788581621764/7yN00JTO_400x400.jpg`} alt="profile-pix" width={50} height={40} className="rounded-xl" />
         <p className='font-bold'>Metamask</p>
        <p className='font-italic text-sm'>Nueva funcionalidad</p>
        <div>
       
        </div>
        <div>
        <p>Tenemos una nueva funcionalidad: mintear tokens para que otras personas puedan invertir en tu talento. 
            Mintea tus tokens, documenta tu experiencia para mostrarle a otros usuarios a utilizar esta funcionalidad
        </p>
        <div className='flex-col gap-10 '>
        <p className="">Applicantes: 2</p>
          <p className="">Recompensa: 100 cUSD</p>
            <button className="bg-black text-white rounded-md p-4 mt-4 pr-4" onClick={() => window.open("/CreateAccount")}> Aplicar al reto</button> 
        </div>
 
        </div>
       
        </div>      
      </div>  

      </div>
</div>
    
  )
}

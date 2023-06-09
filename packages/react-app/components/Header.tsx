import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
    useCelo,
  } from '@celo/react-celo';
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from 'next/link'
import { getCreators } from "@/interact";

interface ICreator {
  donationsReceived: string;
  id: number;
  ipfsHash: string; 
  supporters: number; 
  userbio: string;
  username: string;
  walletAddress: string
}

export default function Header() {
  const [data, setData] = useState<any>({})

    let [componentInitialized, setComponentInitialized] = useState(false);
    let {
        initialised,
        address,
        kit,
        connect,
        disconnect
    } = useCelo();

    useEffect(() => {
      if (initialised) {
        setComponentInitialized(true);
      }
      const creatorData = async () => {
        const creators = await getCreators(kit)
        return setData(!address ? null : creators.find((item: any) => item.walletAddress === address))
    }
    creatorData()
    }, [initialised, kit]);
    console.log("data", data)
    console.log(address)
    return (
      <Disclosure as="nav" className="bg-black border-b border-prosperity">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white focus:outline-none focus:ring-1 focus:ring-inset focus:rounded-none focus:ring-black">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center  sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Image className="block h-8 w-auto lg:block sm:hidden" src="/CuriousClub.png" width="24" height="24" alt="CC Logo" />
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link href="/"
                      className="inline-flex items-center border-b-2 border-black px-1 pt-1 text-md font-bold text-white"
                    >
                      CuriosClub
                    </Link>                    
                  </div>
                  { data === undefined || address === null ? null : 
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                        <Link className="inline-flex items-center border-b-2 border-black px-1 pt-1 text-sm font-medium text-white"
                          href={{
                            pathname: `/Dashboard/`,
                            // query: { username: address === null ? null : data.username}// the data
                          }}
                      >
                      Dashboard                 
                        </Link>
                                   
                  </div>
                  }
                  
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {componentInitialized && address ? (
                    <div>
                      <button className="border-2 border-black rounded-md mr-2 p-2">{`${address.substring(0,15)}...`}</button>
                       <button
                      type="button"
                      className="inline-flex content-center place-items-center rounded-full border border-prosperity bg-black py-2 px-5 text-md font-medium text-snow hover:bg-prosperity hover:text-black"
                      onClick={disconnect}
                    >Desconectar</button>
                    </div>

                   
                  ) : (
                    <button
                      type="button"
                      className="inline-flex content-center place-items-center rounded-full border border-prosperity bg-black py-2 px-5 text-md font-medium text-snow hover:bg-prosperity hover:text-black"
                      onClick={() =>
                        connect().catch((e) => console.log((e as Error).message))
                      }
                    >Conectar billetera</button>
                  )}
                </div>
              </div>
            </div>
  
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pt-2 pb-4">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block border-l-4 border-black py-2 pl-3 pr-4 text-base font-medium text-white"
                >
                  Inicio
                </Disclosure.Button>
                {/* Add here your custom menu elements */}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
  }

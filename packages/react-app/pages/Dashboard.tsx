import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { getCreators } from '@/interact'
import { useCelo } from '@celo/react-celo'
import Link from 'next/link'

export default function Dashboard() {
   const [data, setData] = useState<any>({})
   const { address, kit } = useCelo()
 
  useEffect(() => {
    const creatorData = async () => {
      const creators = await getCreators(kit)
      if (!address) {
        return null
      } else {
        return setData(creators.find((item: any) => item.walletAddress === address))
      }
    }
    creatorData()
  }, [address, kit])
  console.log("creator id", data.id)
  return (
    <div>
      { !address ?  <div>Please connect your wallet</div> : 
        <div className="w-full mt-2 mx-2 border-2 border-yellow-300 p-4 rounded-md">
        <Image src={`https://ipfs.io/ipfs/${data.ipfsHash}`}  alt="profile-pix" width={200} height={200} />
        <p>{data.username}</p>
        <p>{data.userBio}</p>
        <label> Donation received: </label>
        <span className="font-bold">{data.donationsReceived === undefined ? null : `${data.donationsReceived/1e18} CUSD`}</span>
        <p className="mb-4">{`Supporters: ${data.supporters}`}</p>
          {/* <a className='className="w-full bg-yellow-300 rounded-md p-2 my-4"' href="Withdraw">Withdraw Tip</a> */}
        <Link
            href={{
              pathname: `/Withdraw`,
              query: { id: data.id, walletAddress: data.walletAddress }// the data
            }}
          >
            <button className="w-full bg-yellow-300 rounded-md p-2 my-2">{`Withdraw Tip`}</button>
          </Link>  
      </div>
      }
    </div>
  )
}

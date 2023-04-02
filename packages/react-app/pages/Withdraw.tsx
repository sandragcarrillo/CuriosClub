import React, { useState } from 'react'
import { creatorWithdrawTip } from '@/interact'
import { useCelo } from '@celo/react-celo'
import { ethers } from 'ethers'
import {useRouter} from 'next/router'

export default function Withdraw() {
   const [amount, setAmount] = useState<string>("")
   const { address, kit } = useCelo()
    const router = useRouter()
    const {
      query: { id, walletAddress}
    } = router

    const props = {
      id,
      walletAddress
    }
  const handleAmount = (e: React.FormEvent<HTMLInputElement>) => {
    setAmount(e.currentTarget.value)
      console.log(e.currentTarget.value)

  }
  
  console.log("id is", props.id)
  const withdrawTip = async () => {
    if (amount === "") {
      alert("amount required!")
      return
    } 
    await creatorWithdrawTip(address, props.id, ethers.utils.parseUnits(amount, "ether"), kit)  
  }

  return (
    <div>
      <h1 className='mb-4 text-lg font-bold'>Withdraw Tip</h1>
      <div className='w-full'>
        <input className='w-full border-2 rounded-md mb-2 p-2' type="number" placeholder='amount' value={amount} onChange={handleAmount} />
      </div>
      <div>
        <input className='w-full border-2 rounded-md p-2' type="text" placeholder='wallet Address' disabled value={props.walletAddress} />
      </div>
      <button className=' w-full bg-yellow-300 mt-4 p-4 rounded-md' onClick={withdrawTip}>Withdraw Tip</button>
    </div>
)}

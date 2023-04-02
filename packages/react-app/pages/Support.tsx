import React, { useState } from 'react'
import { sendTip } from '@/interact'
import { useCelo } from '@celo/react-celo'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'

export default function Support() {
  const [amount, setAmount] = useState<string>("")
  const [comment, setComment] = useState<string>("")
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

  const handleComment = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value)
          console.log(e.currentTarget.value)
  }
  
  const sendSupport = async () => {
    if (amount === "") {
      alert("amount required!")
      return
    }
    await sendTip(address, comment, props.id, ethers.utils.parseUnits(amount, "ether"), kit)    
  }

  return (
    <div>
      <h1 className='mb-4 text-lg font-bold'> Reconoce su contribución enviando cUSD </h1>
      <div className='w-full'>
        <input className='w-full border-2 rounded-md mb-2 p-2' type="number" placeholder='Cantidad' value={amount} onChange={handleAmount} />
      </div>
      <div>
        <textarea className='w-full border-2 rounded-md p-2' placeholder='Comentario' value={comment} onChange={handleComment} />
      </div>
      <div>
        <input className='w-full border-2 rounded-md p-2' type="text" placeholder='wallet Address' disabled value={props.walletAddress} />
      </div>
      <button className=' w-full bg-yellow-300 mt-4 p-4 rounded-md' onClick={sendSupport}>Envía tu recomocimiento</button>
    </div>
)}

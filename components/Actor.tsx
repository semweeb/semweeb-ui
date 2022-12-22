import { useRouter } from 'next/router'
import React from 'react'

export interface ActorProps {
  actorLabel:string
  charactersLabel:string
}

const Actor: React.FC<any> = ({ actorLabel,charactersLabel}) => {
  const router = useRouter()

  return (
    <div>
        <h2 className='font-bold'>{actorLabel}</h2>
        <h3> {charactersLabel} </h3>
    </div>
  )
}

export default Actor
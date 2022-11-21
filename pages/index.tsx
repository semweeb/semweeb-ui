import { Button, Input } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()

  const [search, setSearch] = useState("")

  return (
    <div className="w-full min-h-screen h-full flex items-center justify-center">
      <form className="max-w-xl w-full space-y-6" onSubmit={(e) => {
        e.preventDefault()
        router.push(`/search?q=${encodeURIComponent(search)}`)
      }}>
        <div className="flex flex-col w-full justify-center items-center">
          <div className="mb-2">
            <img className="object-cover h-40 w-40 rounded-full" src="/dekdekpe.png" />
          </div>
          <h1 className="text-4xl font-bold">[Sem Weeb]™</h1>
          <h2 className="text-2xl ">アニメ Engine</h2>
        </div>
        <Input value={search} onChange={(e) => setSearch(String(e.target.value))} placeholder="enter your query here" />
        <div className="flex justify-center space-x-4">
          <Button colorScheme="gray">
            I'm Feeling Lucky
          </Button>
          <Button colorScheme="blue" type="submit">
            Search
          </Button>
        </div>
      </form>
    </div>
  )
}

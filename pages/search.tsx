
import { Button, Input } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Search() {
  const router = useRouter()

  const [search, setSearch] = useState("")

  useEffect(() => {
    const { q: query } = router.query
    setSearch(String(query))
  }, [router.query])

  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center">
      <div className="w-full flex px-4 h-20 border-b-2 border-gray-100 space-x-8 items-center sticky z-20 top-0 bg-white shadow-sm">
        <div className="flex items-center h-full space-x-3">
          <img className="w-12 h-12 rounded-full" src="/dekdekpe.png" />
          <div className="flex flex-col items-start justify-center -space-y-1">
            <h1 className="text-xl font-bold">[Sem Weeb]</h1>
            <p>アニメ Engine</p>
          </div>
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              router.replace(`/search?q=${search}`)
            }}
            className="flex space-x-3"
          >
            <div className="w-96">
              <Input value={search} onChange={(e) => setSearch(String(e.target.value))} />
            </div>
            <Button colorScheme="blue" type="submit">Search</Button>
          </form>
        </div>
      </div>
      <div className="h-full w-full px-16 mt-8 space-y-4">
        <h1 className="text-2xl">Search Results</h1>
        <div className="grid grid-cols-8 gap-8">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => {
            return (
              <div className="flex flex-col items-center justify-center space-y-1 group">
                <div className="overflow-hidden rounded-xl hover:cursor-pointer">
                  <img className="transform transition-all group-hover:scale-[1.10] duration-[400ms] saturate-[0.6] group-hover:saturate-100" src="https://cdn.myanimelist.net/images/anime/1987/117507.jpg" />
                </div>
                <h2 className="text-xl transition-all duration-[400ms] group-hover:text-blue-700 hover:cursor-pointer">86 [Eighty Six]</h2>
                <p className="text-sm transition-all duration-[400ms] text-center group-hover:text-blue-700 hover:cursor-pointer">Genre: Action, Drama, Psychological</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

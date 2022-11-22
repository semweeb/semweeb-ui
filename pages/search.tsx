
import { Button, Input } from '@chakra-ui/react'
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
      <div className="h-full w-full px-16 my-8 space-y-4">
        <h1 className="text-2xl">Search Results</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-8">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => {
            return (
              <div className="flex flex-col items-center justify-center space-y-1 group" key={item} onClick={() => router.push(`/result?id=${item}`)}>
                <div className="overflow-hidden rounded-xl hover:cursor-pointer max-w-[225px] max-h-[318px]">
                  <img className="w-full h-full object-cover transform transition-all scale-100 group-hover:scale-[1.10] duration-[400ms] saturate-50 group-hover:saturate-100" src="https://cdn.myanimelist.net/images/anime/1987/117507.jpg" />
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

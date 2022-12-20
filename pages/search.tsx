
import { Button, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Result from "../components/Result"

export default function Search() {
  const router = useRouter()

  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    const { q: query } = router.query
    setSearch(String(query))
  }, [router.query])

  useEffect(() => {
    if (search === "") return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?q=${search}&page=${page}`)
      .then((res) => res.json())
      .then((res) => setData(res))
  }, [search, page])

  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center">
      <div className="h-full w-full px-16 my-8 space-y-4">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl">Search Results</h1>
          <div className="flex space-x-4">
            <button onClick={() => page > 0 && setPage(page - 1)}>&lt;</button>
            <button onClick={() => setPage(page + 1)}>&gt;</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-8">
          {data.map((item: any, index: any) => {
            return (
              <Result id={item?.id?.value} key={index} imageUrl={item?.image?.value} title={item?.title?.value} genre={item?.genres?.value?.split(", ")} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

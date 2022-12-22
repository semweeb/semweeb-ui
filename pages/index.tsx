import { Button, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import SearchBar from '../components/SearchBar'

export default function Home() {
  const router = useRouter()

  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState([])

  const handleLucky = (_: any) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/suggestions?q=${search}`).then((res) => res.json()).then((res) => {
      if (res.length == 0) return;
      const id = res[Math.floor(Math.random()*res.length)]
      router.push("/result?id=" + id.id.value)
    })
  }

  return (
    <div className="w-full min-h-screen h-full flex items-center justify-center">
      <form className="max-w-xl w-full space-y-6" onSubmit={(e) => {
        e.preventDefault()
        router.replace(`/search?q=${search}&genres=${filters.map((item: any) => item?.value).join(";")}`)
      }}>
        <div className="flex flex-col w-full justify-center items-center">
          <div className="mb-2">
            <img className="object-cover h-40 w-40 rounded-full" src="/dekdekpe.png" />
          </div>
          <h1 className="text-4xl font-bold">[Sem Weeb]</h1>
          <h2 className="text-2xl ">アニメ Engine</h2>
        </div>
        <SearchBar
          activeFilters={filters}
          setActiveFilters={setFilters} 
          search={search} 
          onChange={(e) => setSearch(String(e.target.value))} 
          placeholder="enter search query"
        />
        <div className="flex justify-center space-x-4">
          <Button colorScheme="gray" onClick={handleLucky}>
            I&apos;m Feeling Lucky
          </Button>
          <Button colorScheme="blue" type="submit">
            Search
          </Button>
        </div>
      </form>
    </div>
  )
}

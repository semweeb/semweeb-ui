import React from "react"
import { Input, Button } from "@chakra-ui/react"
import { useRouter } from "next/router"
import SearchBar from "./SearchBar"
import Link from "next/link"

export default function Navbar() {
  const router = useRouter()

  const { q } = router.query

  const [search, setSearch] = React.useState("")
  const [filters, setFilters] = React.useState([])

  React.useEffect(() => {
    if (q && q !== "") {
      setSearch(String(q))
    }
  }, [q])

  return (
    <div className="w-full flex px-16 h-20 border-b-2 border-gray-100 space-x-8 items-center sticky z-20 top-0 bg-white shadow-sm">
      <div className="flex items-center h-full space-x-3">
        <Link href="/">
        <img className="w-12 h-12 rounded-full" src="/dekdekpe.png" />
        </Link>
        <Link href="/">
        <div className="hidden md:block flex flex-col items-start justify-center -space-y-1">
          <h1 className="text-xl font-bold">[Sem Weeb]</h1>
          <p>アニメ Engine</p>
        </div>
        </Link>
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (search !== "") {
              router.replace(`/search?q=${search}&genres=${filters.map((item: any) => item?.value).join(";")}`)
            }
          }}
          className="flex space-x-3"
        >
          <div className="md:w-64 lg:w-96">
            <SearchBar activeFilters={filters} setActiveFilters={setFilters} placeholder="enter search query" search={search} onChange={(e) => setSearch(String(e.target.value))} />
          </div>
          <Button colorScheme="blue" type="submit">Search</Button>
        </form>
      </div>
    </div>
  )
}

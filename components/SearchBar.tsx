import React from 'react'
import { Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export interface SearchBarProps {
  search: string
  onChange: (e: any) => void
  placeholder: string
}

const SearchBar: React.FC<SearchBarProps> = ({ search, onChange, placeholder }) => {
  const router = useRouter()

  const [suggestions, setSuggestions] = React.useState([])
  const [active, setActive] = React.useState(false)
  const timerRef = React.useRef<any>(null)

  React.useEffect(() => {
    if (search === "") return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/suggestions?q=${search}`).then((res) => res.json()).then((res) => setSuggestions(res))
    }, 500)
  }, [search])

  return (
    <div className="relative" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
      <Input value={search} onChange={onChange} placeholder={placeholder} />
      <div className={`pt-2 w-full absolute z-20 transition-all duration-150 ${!active || search === "" || suggestions.length === 0 ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <div className="max-h-[16rem] overflow-y-auto w-full h-full bg-white rounded-lg border border-1 border-gray-300">
          {suggestions.map((item: any) => {
            return (
              <div
                key={item?.id?.value}
                onClick={() => {
                  router.push("/result?id=" + item?.id?.value)
                  setActive(false)
                }}
                className="w-full space-x-4 px-4 py-2 flex items-center cursor-pointer hover:bg-gray-50"
              >
                <img className="h-16 rounded-lg" src={item?.image?.value} />
                <div>
                  <p>{item?.title?.value}</p>
                  <p className="text-gray-500">{item?.genres?.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchBar

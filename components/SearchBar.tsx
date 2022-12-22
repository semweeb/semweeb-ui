import React from 'react'
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export interface SearchBarProps {
  search: string
  onChange: (e: any) => void
  placeholder: string
  activeFilters: any[]
  setActiveFilters: (e: any) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ search, onChange, placeholder, activeFilters, setActiveFilters }) => {
  const router = useRouter()

  const [suggestions, setSuggestions] = React.useState([])
  const [active, setActive] = React.useState(false)
  const timerRef = React.useRef<any>(null)

  React.useEffect(() => {
    const filterRegex = /(genre:)/;
    const filters = search.match(filterRegex)
    if (filters && filters.length != 0) {
      onChange({ target: { value: search.substring(filters[0].length)} })
      setActiveFilters([
        ...activeFilters,
        {
          name: filters[0].split(":")[0],
          value: "",
        }
      ])
    }
  }, [search])

  React.useEffect(() => {
    console.log(activeFilters)
  }, [activeFilters])

  React.useEffect(() => {
    if (search === "") return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/suggestions?q=${search}`).then((res) => res.json()).then((res) => setSuggestions(res))
    }, 500)
  }, [search])

  return (
    <div className="relative" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
      <div className="flex border border-1 border-gray-400 w-full rounded-lg p-2 space-x-1">
        {activeFilters.map((item: any, index: number) => {
          return (
            item && <div className="flex items-center justify-start text-white px-2 rounded-lg bg-[#484848]">
              <span className="mr-1">{item?.name}:</span>
              <input 
              autoFocus 
              style={{ width: (activeFilters[index]?.value?.length !== 0 ? activeFilters[index]?.value?.length : 1) + 'ch' }} 
              onChange={(e) => {
                const temp = JSON.parse(JSON.stringify(activeFilters)) as any;
                temp[index] = {
                  name: item.name,
                  value: e.target.value,
                }
                setActiveFilters(temp)
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 8 || e.keyCode === 46) {
                  if (activeFilters[index].value?.length === 0) {
                    const temp = JSON.parse(JSON.stringify(activeFilters)) as any;
                    temp.splice(index, 1)
                    setActiveFilters(temp)
                  }
                }
              }}
              type="text" 
              className="bg-transparent text-white outline-none active:outline-none w-8" />
            </div>
          )
        })}
        <input value={search} onChange={onChange} type="text" className="w-full h-full pl-2 py-2 border-none outline-none focus:outline-none" />
      </div>
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

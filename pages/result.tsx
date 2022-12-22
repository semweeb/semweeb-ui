import { useRouter } from "next/router"
import { useEffect, useState } from 'react'
import dynamic from "next/dynamic"
import Actor from "../components/Actor"

function numberWithCommas(x: any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false
})

export default function Result() {
  const router = useRouter()

  const { id } = router.query
  const [data, setData] = useState<any>({})
  const [actor, setActor] = useState([])


  useEffect(() => {
    if (!id) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/details?id=${id}`)
      .then((res) => res.json())
      .then((res) => setData(res))
  }, [id])

  useEffect(() => {
    if (!id) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/actor-details?id=${id}`)
      .then((act) => act.json())
      .then((act) => setActor(act))
  }, [id])

  console.log(actor)

  return (
    <div className="w-full min-h-screen h-full flex justify-center py-20">
      <div className="w-full h-full grid grid-cols-12 gap-12 max-w-7xl mx-16">
        <div className="h-full w-full space-y-4 col-span-3">
          <div className="rounded-lg w-full aspect-[75/106] overflow-hidden">
            <img className="w-full h-full object-cover" src={data?.main_picture?.value} />
          </div>
          <div>
            <h1 className="font-bold">
              Alternative Titles
            </h1>
            <hr className="my-1" />
            <div>
              {/* Nanti dari wikidata ambil alternative title terus pake rdfs:label yang alternate 
                  language aja buat di display disini, paling tinggal di map dari 
                  region code -> full country name aja (gua urus nanti -adrian) */}
              <p>
                <span className="font-bold">Japanese: </span>
                <span>{data?.title_japanese?.value}</span>
              </p>
              <p>
                <span className="font-bold">English: </span>
                <span>{data?.title_english?.value}</span>
              </p>
            </div>
          </div>
          <div>
            <h1 className="font-bold">
              Information
            </h1>
            <hr className="my-1" />
            <div>
              <p>
                {/* Ini nanti pake type yang udah ada di csv kemarin aja */}
                <span className="font-bold">Type: </span>
                <span>{data?.type_name?.value}</span>
              </p>
              <p>
                <span className="font-bold">Episodes: </span>
                <span>{data?.episodes?.value}</span>
              </p>
              <p>
                <span className="font-bold">Status: </span>
                <span>{data?.status_name?.value}</span>
              </p>
              <p>
                <span className="font-bold">Aired: </span>
                <span>{data?.start_date?.value} to {data?.end_date?.value}</span>
              </p>
              <p>
                <span className="font-bold">Producers: </span>
                <span>{data?.producers?.value}</span>
              </p>
              <p>
                <span className="font-bold">Licensors: </span>
                <span>{data?.licensors?.value}</span>
              </p>
              <p>
                <span className="font-bold">Studios: </span>
                <span>{data?.studios?.value}</span>
              </p>
              <p>
                <span className="font-bold">Source Material: </span>
                <span>{data?.source_name?.value}</span>
              </p>
              <p>
                <span className="font-bold">Genres: </span>
                <span>{data?.genres?.value}</span>
              </p>
              <p>
                <span className="font-bold">Themes: </span>
                <span>{data?.themes?.value}</span>
              </p>
              <p>
                <span className="font-bold">Ep. Duration: </span>
                <span>{data?.episode_duration?.value}</span>
              </p>
              <p>
                <span className="font-bold">Rating: </span>
                <span>{data?.rating_name?.value}</span>
              </p>

            </div>
          </div>
          <div>
            <h1 className="font-bold">
              Statistics
            </h1>
            <hr className="my-1" />
            <div>
              <p>
                {/* Ini nanti pake type yang udah ada di csv kemarin aja */}
                <span className="font-bold">Score: </span>
                <span>{data?.score?.value}</span>
              </p>
              {data?.scored_by && (
                <>
                  <p>
                    <span className="font-bold">Scored by: </span>
                    <span>{numberWithCommas(data?.scored_by?.value)} people</span>
                  </p>
                </>
              )}
              {data?.members && (
                <><p>
                  <span className="font-bold">Members: </span>
                  <span>{numberWithCommas(data?.members?.value)} people</span>
                </p></>
              )}


            </div>
          </div>
        </div>
        <div className="w-full col-span-9">
          <div>
            <h1 className="text-3xl">{data?.title?.value}</h1>
            <h2 className="text-xl text-gray-600"> {data?.genres?.value}</h2>
          </div>

          <hr className="my-4" />

          {data?.synopsis && (
            <>
              <h3 className="text-2xl mb-2 font-semibold">Synopsis</h3>
              <p className="text-lg">
                {data?.synopsis?.value}
              </p>
              <hr className="my-4" />
            </>
          )}



          {data?.background && (
            <>
              <h3 className="text-2xl mb-2 font-semibold">Background</h3>
              <p className="text-lg">
                {data?.background?.value}
              </p>
              <hr className="my-4" />
            </>
          )}

          {data?.trailer_url && (
            <>
              <h3 className="text-2xl mb-2 font-semibold">Trailer</h3>
              <div>
                <ReactPlayer url={data?.trailer_url?.value} />
              </div>
              <hr className="my-4" />
            </>
          )}

          {actor.length > 0 && (
            <>
              <h3 className="text-2xl mb-2 font-semibold">Voice Actors</h3>
              <div className="w-full grid grid-cols-3 gap-4">
                {actor.map((item: any, index: any) => {
                  return (
                    <Actor key={index} actorLabel={item?.actorLabel?.value} charactersLabel={item?.charactersLabel?.value} />
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}


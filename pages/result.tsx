import { useRouter } from "next/router"

export default function Result() {
  const router = useRouter()

  const { id } = router.query

  return (
    <div className="w-full min-h-screen h-full flex justify-center py-20">
      <div className="w-full h-full grid grid-cols-12 gap-12 max-w-7xl mx-16">
        <div className="h-full w-full space-y-4 col-span-3">
          <div className="rounded-lg w-full aspect-[75/106] overflow-hidden">
            <img className="w-full h-full object-cover" src="/dekdekpe.png" />
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
                <span>りゅうおうのおしごと！</span>
              </p>
              <p>
                <span className="font-bold">English: </span>
                <span>The Ryuo&apos;s Work is Never Done!</span>
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
                <span>TV Series</span>
              </p>
              <p>
                <span className="font-bold">Source Material: </span>
                <span>Original</span>
              </p>
              <p>
                <span className="font-bold">Episodes: </span>
                <span>12</span>
              </p>
              <p>
                <span className="font-bold">Status: </span>
                <span>Finished</span>
              </p>
              <p>
                <span className="font-bold">Aired: </span>
                <span>Jan 8, 2018 to Mar 26, 2018</span>
              </p>
              <p>
                <span className="font-bold">Studios: </span>
                <span>Project No. 9</span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full col-span-9">
          <div>
            <h1 className="text-3xl">DekDekPe: Programming Basics</h1>
            <h2 className="text-xl text-gray-600">Action, Adventure, Psychological</h2>
          </div>

          <hr className="my-4" />

          <h3 className="text-2xl mb-2 font-semibold">Synopsis</h3>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat odio, sodales a ipsum ut, pellentesque accumsan mi. Ut nulla magna, consectetur eu accumsan cursus, viverra id lacus. Cras fringilla nibh sit amet elit efficitur pharetra. Nullam quis elit volutpat lectus dapibus pulvinar et in ex. Integer at erat non quam malesuada sodales vitae vitae arcu. Proin egestas leo et justo rhoncus dignissim. Integer ac dui id odio ornare tincidunt non eget nunc. Phasellus erat dolor, sollicitudin vitae enim tristique, tristique auctor enim. Nulla et arcu ornare, venenatis neque eget, sagittis turpis. Aliquam non ante nec metus posuere placerat.
          </p>

          <hr className="my-4" />

          <h3 className="text-2xl mb-2 font-semibold">Background</h3>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat odio, sodales a ipsum ut, pellentesque accumsan mi. Ut nulla magna, consectetur eu accumsan cursus, viverra id lacus.
          </p>
        </div>
      </div>
    </div>
  )
}


import React from 'react'

export default function CoverageSection() {
  return (
      <section className="mt-10">
        <div className="w-full flex items-center justify-center bg-coverage lg:h-[100vh] md:h-[50vh] h-[30vh]">
          <div className="relative w-full z-50">
            <div className=" text-center flex flex-col justify-center items-center gap-3 w-full md:w-auto px-4">
              <h2 className="font-semibold text-2xl md:text-4xl text-black">
                Geographical Coverage
              </h2>
              <p className="text-[#7C7B7B]">find our services in 25 cities around the world</p>
              <button className="md:max-w-[150px] max-w-[120px] text-sm w-full rounded-full cursor-pointer mt-2 bg-[#3e5ec0] text-white py-2 px-2 flex items-center justify-center font-medium">
                See All
                <i className="fa-solid fa-chevron-right ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
  )
}

import { useEffect, useState } from "react";
import { Accommodation } from "./types";
import AccommodationCard from "./components/AccommodationCard";
import Filter from "./components/Filter";
import ErrorMsg from "./components/ErrorMsg";

export default function App() {
  const [accommodation, setAccommodation] = useState<
    Accommodation[] | undefined
  >(undefined);
  const [filteredAccommodation, setFilteredAccommodation] = useState<
    Accommodation[] | undefined
  >(undefined);
  const [errMsg, setErrMsg] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api.adriatic.hr/test/accommodation");
        const data = await res.json();
        data[1].availableDates[4].intervalEnd = "2024-12-31";
        setAccommodation(data);
      } catch (error) {
        const err = error as Error;
        console.log(err);
        setErrMsg(err.message);
        throw new Error(err.message);
      }
    }
    fetchData();
  }, []);

  const displayItems = filteredAccommodation
    ? filteredAccommodation
    : accommodation;

  return (
    <div className="max-w-[1536px] mx-auto px-24 pt-14 pb-14 h-screen flex flex-col gap-20">
      <div className="flex flex-col lg:flex-row gap-10  items-center">
        <Filter
          accommodation={accommodation}
          setFilteredAccommodation={setFilteredAccommodation}
        />
        <img
          src="https://i.croatiaimages.com/a/desktop/images/logos/logo-adriatic.hr-hr.2fd85bab299.svg"
          alt="company logo"
          className="flex-1 h-[20rem] w-[20rem]"
        />
      </div>
      {errMsg ? (
        <ErrorMsg errMsg={errMsg} />
      ) : (
        <div className="flex gap-12 flex-wrap pb-20">
          {displayItems?.map((item) => (
            <div
              className="w-full lg:w-[30%] md:w-[45%] bg-white"
              key={item.id}
            >
              <AccommodationCard singleAccommodation={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

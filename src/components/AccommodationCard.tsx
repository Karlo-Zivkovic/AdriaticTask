import { useState } from "react";
import { Accommodation } from "../types";
import Modal from "./Modal";
interface AccommodationCardProps {
  singleAccommodation: Accommodation;
}

export default function AccommodationCard({
  singleAccommodation,
}: AccommodationCardProps) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  return (
    <div className="text-black h-[25rem]">
      <div>
        <img
          src={singleAccommodation.image}
          alt=""
          className="object-cover w-full h-48"
        />
      </div>
      <div className="p-5 flex flex-col gap-5 grow h-[calc(25rem-192px)]">
        <h1 className="font-bold text-stone-800 text-xl truncate">
          {singleAccommodation.title}
        </h1>
        <div className="flex flex-col gap-4">
          <p>Kapacitet: {singleAccommodation.capacity}</p>
          {singleAccommodation.beachDistanceInMeters && (
            <p>
              Udaljenost od plaže: {singleAccommodation.beachDistanceInMeters} m
            </p>
          )}
        </div>
        <button
          onClick={() => setModalIsOpen(true)}
          className="bg-sky-500 text-white p-2.5 text-sm font-bold hover:bg-sky-800 transition-all duration-200 mt-auto"
        >
          Više informacija
        </button>
      </div>
      {modalIsOpen && (
        <Modal
          singleAccommodation={singleAccommodation}
          setModalIsOpen={setModalIsOpen}
        />
      )}
    </div>
  );
}

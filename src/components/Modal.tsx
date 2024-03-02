import { createPortal } from "react-dom";
import { Accommodation } from "../types";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import DateRangePicker from "./DateRangePicker";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import BookingConfirmationModal from "./BookingConfirmationModal";
import AmenitySection from "./AmenitySection";

interface ModalProps {
  singleAccommodation: Accommodation;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({
  singleAccommodation,
  setModalIsOpen,
}: ModalProps) {
  const [finalCost, setFinalCost] = useState<number>(0);
  const [numberOfNights, setNumberOfNights] = useState<number | null>(null);
  const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
  const [openConfirmationModal, setOpenConfirmationModal] =
    useState<boolean>(false);
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const prices = singleAccommodation.pricelistInEuros.map(
    (item) => item.pricePerNight,
  );

  const handleChooseDatesClick = () => {
    const arrivalDatePicker = document.getElementById("arrivalDate");
    if (arrivalDatePicker) {
      arrivalDatePicker.click();
    }
  };
  const handleIncreaseNumberOfGuests = () => {
    if (numberOfGuests === singleAccommodation.capacity) return;

    setNumberOfGuests((guests) => guests + 1);
  };

  const handleDecreaseNumberOfGuests = () => {
    if (numberOfGuests === 1) return;
    setNumberOfGuests((guests) => guests - 1);
  };

  const lowestPerNight = Math.min(...prices);
  const highestPerNight = Math.max(...prices);

  return createPortal(
    <div className="text-black">
      <div
        className="fixed top-0 backdrop-blur h-screen w-[100%] cursor-pointer"
        onClick={() => setModalIsOpen(false)}
      />
      <div className="dark:bg-gray-800 dark:text-gray-100 fixed top-[69%] lg:w-[42rem] xl:w-max xl:top-[50%] left-[50%] translate-y-[-70%] translate-x-[-50%] p-6 bg-white rounded drop-shadow-lg w-[70%]  flex xl:flex-row flex-col gap-6">
        <div className="flex-1 flex flex-col gap-4 justify-between">
          <img src={singleAccommodation.image} alt="" className="" />
        </div>
        <div className="flex-[2] flex flex-col gap-2.5">
          <h1 className="font-bold text-xl border-b border-gray-500 pb-4 pr-6">
            {singleAccommodation.title}
          </h1>
          <AmenitySection singleAccommodation={singleAccommodation} />
          <div className="my-3">
            <DateRangePicker
              departureDate={departureDate}
              setDepartureDate={setDepartureDate}
              arrivalDate={arrivalDate}
              setArrivalDate={setArrivalDate}
              pricelistInEuros={singleAccommodation.pricelistInEuros}
              availableDates={singleAccommodation.availableDates}
              setFinalCost={setFinalCost}
              setNumberOfNights={setNumberOfNights}
            />
          </div>

          <div className="flex items-center gap-10">
            <div className="flex gap-2 items-center self-start sm:self-auto">
              Broj gostiju:{" "}
              <button
                onClick={handleDecreaseNumberOfGuests}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={numberOfGuests === 1}
              >
                <CiCircleMinus size={30} />
              </button>{" "}
              {numberOfGuests}
              <button
                disabled={numberOfGuests === singleAccommodation.capacity}
                onClick={handleIncreaseNumberOfGuests}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CiCirclePlus size={30} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row items-center justify-between mt-auto">
            {!finalCost ? (
              <p className="underline" onClick={handleChooseDatesClick}>
                Odaberi datume boravka
              </p>
            ) : (
              <p>
                Broj noćenja:{" "}
                <span className="font-bold">{numberOfNights}</span>
              </p>
            )}
            {!finalCost ? (
              <p>
                <span className="text-2xl font-bold">
                  {lowestPerNight === highestPerNight
                    ? lowestPerNight
                    : `${lowestPerNight}-${highestPerNight}`}
                </span>{" "}
                € / noć
              </p>
            ) : (
              <>
                <p className="font-semibold md:text-2xl text-lg">
                  Total:{" "}
                  <span className="md:text-2xl text-lg font-semibold">
                    {finalCost}
                  </span>{" "}
                  €
                </p>
                <button
                  onClick={() => setOpenConfirmationModal(true)}
                  className="bg-sky-500 w-full sm:w-28 text-white p-2.5 font-bold hover:bg-sky-600 transition-all duration-200 rounded"
                >
                  Rezerviraj
                </button>
              </>
            )}
          </div>
        </div>
        <IoCloseOutline
          size={50}
          onClick={() => setModalIsOpen(false)}
          className="absolute -right-5 bg-gray-100 -top-5 rounded-full p-2 text-gray-800 cursor-pointer hover:bg-gray-200 transition-all"
        />
      </div>
      {openConfirmationModal && (
        <BookingConfirmationModal
          title={singleAccommodation.title}
          arrivalDate={arrivalDate!}
          departureDate={departureDate!}
          finalCost={finalCost}
          numberOfGuests={numberOfGuests!}
          numberOfNights={numberOfNights!}
          setOpenConfirmationModal={setOpenConfirmationModal}
          setModalIsOpen={setModalIsOpen}
        />
      )}
    </div>,

    document.body,
  );
}

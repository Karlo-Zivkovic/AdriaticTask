import { createPortal } from "react-dom";
import { HiMiniCheckCircle, HiOutlineMoon } from "react-icons/hi2";
import { dateFormat } from "../utils";
import { FaCalendarDays } from "react-icons/fa6";
import { BiUser } from "react-icons/bi";
import { HiOutlineCurrencyEuro } from "react-icons/hi";

interface BookingConfirmationModalProps {
  title: string;
  arrivalDate: Date;
  departureDate: Date;
  finalCost: number;
  numberOfGuests: number;
  numberOfNights: number;
  setOpenConfirmationModal: (state: boolean) => void;
  setModalIsOpen: (state: boolean) => void;
}

export default function BookingConfirmationModal({
  title,
  arrivalDate,
  departureDate,
  finalCost,
  numberOfGuests,
  numberOfNights,
  setOpenConfirmationModal,
  setModalIsOpen,
}: BookingConfirmationModalProps) {
  const handleCloseModals = () => {
    setOpenConfirmationModal(false);
    setModalIsOpen(false);
  };

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[30rem]">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-black">
            Uspješno ste rezervirali smještaj {title}
          </p>
          <HiMiniCheckCircle size={80} className="text-green-500" />
        </div>
        <hr className="my-4 border-gray-300" />
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <FaCalendarDays size={24} className="text-gray-500" />
            <p className="text-gray-700">
              {dateFormat(arrivalDate)} - {dateFormat(departureDate)}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <BiUser size={24} className="text-gray-500" />
            <p className="text-gray-700">Broj gostiju: {numberOfGuests}</p>
          </div>
          <div className="flex items-center space-x-2">
            <HiOutlineMoon size={24} className="text-gray-500" />
            <p className="text-gray-700">Broj noćenja: {numberOfNights}</p>
          </div>
          <div className="flex items-center space-x-2">
            <HiOutlineCurrencyEuro size={24} className="text-gray-500" />
            <p className="text-gray-700">
              Cijena: <span className="font-bold text-xl">{finalCost} €</span>
            </p>
          </div>
        </div>
        <button
          className="font-bold text-sm p-4  w-full bg-sky-500 mt-5 rounded  hover:bg-sky-600 transition"
          onClick={handleCloseModals}
        >
          Natrag na početnu stranicu
        </button>
      </div>
    </div>,
    document.body,
  );
}

import { useState } from "react";
import { Accommodation } from "../types";
import DatePicker from "react-datepicker";
import { IoCalendar } from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";

interface FilterProps {
  accommodation: Accommodation[] | undefined;
  setFilteredAccommodation: (
    accommodation: Accommodation[] | undefined,
  ) => void;
}

const amenitiesCro: { [key: string]: string } = {
  airConditioning: "Klima",
  parkingSpace: "Parking",
  pets: "Ljubimci",
  pool: "Bazen",
  wifi: "Wifi",
  tv: "TV",
};

const Filter = ({ accommodation, setFilteredAccommodation }: FilterProps) => {
  const [capacity, setCapacity] = useState("");
  const [arrivalDate, setArrivalDate] = useState<Date | null>(new Date());
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [amenities, setAmenities] = useState({
    airConditioning: false,
    parkingSpace: false,
    pets: false,
    pool: false,
    wifi: false,
    tv: false,
  });

  const handleFilter = () => {
    let filtered = accommodation;

    if (capacity !== "") {
      filtered = filtered?.filter(
        (item) => item.capacity >= parseInt(capacity),
      );
    }

    // if (!isNaN(arrivalDate.getTime()) && !isNaN(departureDate.getTime())) {
    if (arrivalDate && departureDate) {
      filtered = filtered?.filter((item) =>
        item.availableDates.some(
          (availableDate) =>
            new Date(availableDate.intervalStart) <= arrivalDate! &&
            new Date(availableDate.intervalEnd) >= departureDate!,
        ),
      );
    }
    // if (date !== "") {
    //   filtered = filtered?.filter((item) =>
    //     item.availableDates.some(
    //       (availableDate) =>
    //         availableDate.intervalStart <= date &&
    //         availableDate.intervalEnd >= date,
    //     ),
    //   );
    // }
    filtered = filtered?.filter((item) =>
      Object.entries(amenities).every(
        ([amenity, value]) =>
          !value || (item.amenities as { [key: string]: boolean })[amenity],
      ),
    );

    setFilteredAccommodation(filtered);
  };
  const handleResetFilter = () => {
    setCapacity("");
    setArrivalDate(null);
    setDepartureDate(null);
    setAmenities({
      airConditioning: false,
      parkingSpace: false,
      pets: false,
      pool: false,
      wifi: false,
      tv: false,
    });
    setFilteredAccommodation(accommodation);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md w-[30rem]">
      <h2 className="text-xl font-semibold mb-4 text-gray-600">Filters</h2>
      <div className="flex gap-2">
        <div className="mb-4 relative">
          <label className="text-gray-700" htmlFor="dateOfArrival">
            Datum dolaska:
          </label>
          <DatePicker
            selected={arrivalDate}
            name="dateOfArrival"
            dateFormat="dd/MM/YYYY"
            id="dateOfArrival"
            onChange={(date) => setArrivalDate(date)}
            minDate={new Date()}
            placeholderText="dd/mm/yyyy"
            className="mt-1 px-2 rounded-md border border-gray-300 outline-none shadow-sm focus:border-indigo-300 text-gray-700 w-full"
          />
          <IoCalendar className="absolute top-8 right-2 text-black" />
        </div>
        <div className="mb-4 relative">
          <label className="text-gray-700" htmlFor="dateOfDeparture">
            Datum odlaska:
          </label>
          <DatePicker
            selected={departureDate}
            name="dateOfDeparture"
            id="dateOfDeparture"
            dateFormat="dd/MM/YYYY"
            placeholderText="dd/mm/yyyy"
            onChange={(date) => setDepartureDate(date)}
            minDate={
              arrivalDate ? new Date(arrivalDate.getTime() + 86400000) : null
            }
            className="mt-1 px-2 rounded-md border border-gray-300 outline-none shadow-sm focus:border-indigo-300 text-gray-700 w-full"
          />
          <IoCalendar className="absolute top-8 right-2 text-black" />
        </div>
      </div>
      <div className="mb-4">
        <label className="text-gray-700" htmlFor="capacity">
          Kapacitet:
        </label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          value={capacity}
          min={1}
          onChange={(e) => setCapacity(e.target.value)}
          className="block w-full mt-1 px-2 rounded-md border border-gray-300 outline-none shadow-sm focus:border-indigo-300 text-gray-700"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="block text-gray-700">Amenities:</label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(amenities).map(([amenity, checked]) => (
            <div key={amenity} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={amenity}
                checked={checked}
                onChange={(e) =>
                  setAmenities((prevState) => ({
                    ...prevState,
                    [amenity]: e.target.checked,
                  }))
                }
              />
              <label className="text-gray-700" htmlFor={amenity}>
                {amenitiesCro[amenity]}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-4 justify-end">
        <button
          onClick={handleResetFilter}
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded transition"
        >
          Resetiraj filter
        </button>
        <button
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded transition"
          onClick={handleFilter}
        >
          Filtriraj
        </button>
      </div>
    </div>
  );
};

export default Filter;

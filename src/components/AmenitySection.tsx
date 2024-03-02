import { PiTelevisionSimpleLight } from "react-icons/pi";
import { Accommodation } from "../types";
import Amenity from "./Amenity";
import { MdOutlinePets } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { FaSquareParking, FaWifi } from "react-icons/fa6";
import { FaSwimmingPool } from "react-icons/fa";

interface AmenitySectionProps {
  singleAccommodation: Accommodation;
}

export default function AmenitySection({
  singleAccommodation,
}: AmenitySectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-2 items-center">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-gray-700">Kapacitet:</p>
        <span className="font-bold text-sm">
          {singleAccommodation.capacity}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-gray-700">
          Udaljenost od plaže:
        </p>
        {singleAccommodation.beachDistanceInMeters ? (
          <span className="text-sm font-bold text-gray-700">
            {singleAccommodation.beachDistanceInMeters} m
          </span>
        ) : (
          <p className="text-xl pr-1">--</p>
        )}
      </div>
      <Amenity
        amenityExists={singleAccommodation.amenities.tv}
        text="TV"
        icon={<PiTelevisionSimpleLight />}
      />
      <Amenity
        amenityExists={singleAccommodation.amenities.pets}
        text="Ljubimci"
        icon={<MdOutlinePets />}
      />
      <Amenity
        amenityExists={singleAccommodation.amenities.airConditioning}
        text="Klima"
        icon={<TbAirConditioning />}
      />
      <Amenity
        amenityExists={singleAccommodation.amenities.parkingSpace}
        text="Parking"
        icon={<FaSquareParking />}
      />
      <Amenity
        amenityExists={singleAccommodation.amenities.wifi}
        text="Wifi"
        icon={<FaWifi />}
      />
      <Amenity
        amenityExists={singleAccommodation.amenities.pool}
        text="Bazen"
        icon={<FaSwimmingPool />}
      />
    </div>
  );
}

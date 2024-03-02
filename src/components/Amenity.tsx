import { ReactElement } from "react";
import { HiCheck } from "react-icons/hi2";

interface AmenityProps {
  amenityExists: boolean;
  text: string;
  icon: ReactElement;
}

export default function Amenity({ amenityExists, text, icon }: AmenityProps) {
  return (
    <div className="flex items-center gap-4 w-36 justify-between">
      <div className="flex items-center gap-2">
        <p className="text-xl">{icon}</p>
        <p className="text-sm font-medium text-gray-700">{text}</p>
      </div>
      {amenityExists ? (
        <HiCheck className="text-green-800 " size={20} />
      ) : (
        <p className="text-xl pr-1">--</p>
      )}
    </div>
  );
}

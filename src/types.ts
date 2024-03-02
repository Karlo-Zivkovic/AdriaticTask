export type Accommodation = {
  id: number;
  title: string;
  image: string;
  capacity: number;
  beachDistanceInMeters: number;
  amenities: {
    airConditioning: boolean;
    parkingSpace: boolean;
    pets: boolean;
    pool: boolean;
    wifi: boolean;
    tv: boolean;
  };
  pricelistInEuros: [
    {
      intervalStart: string;
      intervalEnd: string;
      pricePerNight: number;
    },
  ];
  availableDates: [
    {
      intervalStart: string;
      intervalEnd: string;
    },
  ];
};


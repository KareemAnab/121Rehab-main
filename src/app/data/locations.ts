// src/data/locations.ts

export type ClinicLocation = {
  id: string;
  name: string;
  addressLine1: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  phoneDisplay: string;
  emailDisplay: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  imageUrl: string;
};

export const clinicLocations: ClinicLocation[] = [
  {
    id: "west-covina",
    name: "121 Rehab – West Covina",
    addressLine1: "2155 E Garvey Ave N Suite B1",
    city: "West Covina",
    state: "CA",
    zip: "91791",
    phone: "+16269625035",
    phoneDisplay: "(626) 962-5035",
    emailDisplay: "pt121@yahoo.com",
    lat: 34.07346397180705,
    lng: -117.89929629080532,
    googleMapsUrl:
      "https://www.google.com/maps/place/2155+E+Garvey+Ave+N+Suite+B1,+West+Covina,+CA+91791",
    imageUrl: "/images/locations/121rehabwestcovina.jpg",
  },
  {
    id: "colton",
    name: "121 Rehab – Colton",
    addressLine1: "1405 W Valley Blvd #101",
    city: "Colton",
    state: "CA",
    zip: "92324",
    phone: "+19097832204",
    phoneDisplay: "(909) 783-2204",
    emailDisplay: "pt121@yahoo.com",
    lat: 34.07026802864836,
    lng: -117.34888502519352,
    googleMapsUrl:
      "https://www.google.com/maps/place/1405+W+Valley+Blvd+%23101,+Colton,+CA+92324",
    imageUrl: "/images/locations/121rehabcolton.jpg",
  },
];

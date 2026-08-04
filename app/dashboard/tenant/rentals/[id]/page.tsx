// import { getMyRentals } from "../_actions/getMyRentals";
import { getSingleRentals } from "../_actions/getSingleRentals";
import LandlordCard from "../_components/LandlordCard";
import PaymentCard from "../_components/PaymentCard";
import PropertyCard from "../_components/PropertyCard";
import RentalInfoCard from "../_components/RentalInfoCard";
// import LandlordCard from "./_components/LandlordCard";
// import PaymentCard from "./_components/PaymentCard";
// import PropertyCard from "./_components/PropertyCard";
// import RentalInfoCard from "./_components/RentalInfoCard";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RentalDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const rental = await getSingleRentals(id);

//   const rental = {
//     id,

//     status: "PENDING",

//     startDate: "2026-08-02T00:00:00.000Z",

//     endDate: "2026-09-02T00:00:00.000Z",

//     createdAt: "2026-08-01T23:40:05.758Z",

//     property: {
//       id: "1",
//       title: "Executive Apartment",
//       description:
//         "Fully furnished executive apartment close to business districts.",
//       location: "Banani, Dhaka",
//       price: 13000,
//       category: {
//         name: "House",
//       },
//       amenities: [
//         "WiFi",
//         "Parking",
//         "Security",
//         "Generator",
//       ],
//       images: [],
//     },

//     landlord: {
//       name: "Mr. Landlord",
//       email: "landlord@gmail.com",
//     },

//     payment: null,
//   };

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Rental Details
        </h1>

        <p className="mt-2 text-muted-foreground">
          View information about your rental request.
        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <PropertyCard
          property={rental.property}
        />

        <RentalInfoCard
          rental={rental}
        />

        {/* <LandlordCard
          landlord={rental.landlord}
        /> */}

        <PaymentCard
          payment={rental.payment}
        />

      </div>

    </div>
  );
}
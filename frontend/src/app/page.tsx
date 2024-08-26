import Link from "next/link";

import UserRider from "@/components/UserRider/UserRider";
6;

export default function Home() {
  return (
    <main className="h-screen bg-gray-900 flex items-center justify-center">
      <section className="flex flex-col gap-6">
        <div className="w-full py-6 rounded-xl text-center  bg-orange-50  shadow-xl justify-center items-center">
          <p>
            <span className="text-gray-950 text-3xl font-bold font-['Inter']">
              Ride
            </span>
            <span className="text-amber-400 text-3xl font-bold font-['Inter']">
              Phalt
            </span>
          </p>
        </div>
        <div className="flex gap-12 ">
          <UserRider
            role="Rider"
            style="bg-blue-950 text-cream-400"
            link="/user/maps"
          />
          <UserRider
            role="Driver"
            style="text-blue-950 bg-cream-400"
            link="/rider"
          />
        </div>
      </section>
    </main>
  );
}

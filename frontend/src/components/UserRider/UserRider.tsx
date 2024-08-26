import React from "react";
import Link from "next/link";

const UserRider = ({
  role,
  style,
  link="/rider",
}: {
  role: string;
  style: string;
  link: string;
}) => {
  return (
    <Link href={link}>
      <div
        className={` w-96 h-96 rounded-xl text-3xl font-bold flex  items-center justify-center shadow-xl  ${style}`}
      >
        {role}
      </div>
    </Link>
  );
};

export default UserRider;

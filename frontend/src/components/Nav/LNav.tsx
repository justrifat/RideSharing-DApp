import Link from "next/link";
import React from "react";

const LNav = ({
  text1,
  text2,
  text3,
  link1,
  link2,
  link3,
}: {
  text1: string;
  text2: string;
  text3: string;
  link1: string;
  link2: string;
  link3: string;
}) => {
  return (
    <nav className="w-full py-2 flex justify-center items-center bg-cream-400">
      <ul className="flex gap-24 justify-center items-center">
       { text3!=="See Route"&&<li>
          <Link href={link3} className="text-blue-950 font-bold text-2xl ">
            {text3}
          </Link>
        </li>}
        <li>
          <Link href={link1} className="text-blue-950 font-bold text-2xl ">
            {text1}
          </Link>
        </li>

        <li>
          <Link href={link2} className="text-blue-950 font-bold text-2xl">
            {text2}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default LNav;

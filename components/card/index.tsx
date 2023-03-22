import { Item } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Card: FC<Item> = ({ links, data }) => {
  return (
    <Link
      href={`/show/${data[0].nasa_id}`}
      className="bg-dark-300 flex flex-col gap-1 p-3 w-full rounded-lg transition-all hover:scale-105"
    >
      <div className="relative object-cover w-full h-80 overflow-hidden">
        <Image
          className="rounded-lg h-[inherit] w-full object-cover"
          src={links[0].href}
          alt={data[0].title}
          width={400}
          height={400}
        />
      </div>
      <p
        data-testid="card-title"
        className="font-bold text-lg mt-2 line-clamp-2"
      >
        {data[0].title}
      </p>
      <p className="font-bold">
        Location:{" "}
        <span className="font-normal text-[#aaa]">
          {data[0].location || "unknown"}
        </span>
      </p>
      <p className="font-bold">
        Photographer:{" "}
        <span className="font-normal text-[#aaa]">
          {data[0].photographer || "unknown"}
        </span>
      </p>
    </Link>
  );
};

export default Card;

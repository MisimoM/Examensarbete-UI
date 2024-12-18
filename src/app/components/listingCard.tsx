import { FC } from "react";
import house from "@/public/house.jpg";
import Image from 'next/image';
import Link from "next/link";

interface ListingCardProps {
    Id?: string,
    Title?: string,
    ImageUrl?: string,
    MainLocation?: string,
    SubLocation?: string,
    Price?: number,
}

const ListingCard : FC<ListingCardProps> = 
({
    Id,
    Title,
    ImageUrl,
    MainLocation,
    SubLocation,
    Price
}) => {
    return (
        <div className="rounded-md p-1 hover:bg-zinc-100">
            <Link href={`/listing/${Id}`}>
                <Image className="rounded-md" src={house} alt="House" />
                <div className="mt-2">
                    <h3 className="text-lg font-semi-bold">{Title}</h3>
                    <h3 className="text-base font-semi-bold">{SubLocation}, {MainLocation}</h3>
                    <h3 className="text-base font-bold">{Price} kr natt</h3>
                </div>
            </Link>
        </div>
    )
}

export { ListingCard }
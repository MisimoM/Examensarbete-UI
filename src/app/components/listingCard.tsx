import { FC } from "react";
import Link from "next/link";

interface ListingCardProps {
    Id?: string,
    Title?: string,
    ImageUrl?: string,
    AltText?: string,
    MainLocation?: string,
    SubLocation?: string,
    Price?: number,
}

const ListingCard : FC<ListingCardProps> = 
({
    Id,
    Title,
    ImageUrl,
    AltText,
    MainLocation,
    SubLocation,
    Price
}) => {
    return (
        <div className="rounded-md">
            <Link href={`/listing/${Id}`}>
                <img
                    className="rounded-md w-full aspect-[4/3] object-cover object-[25%_75%]"
                    src={ImageUrl}
                    alt={AltText}
                    loading="lazy"
                />
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
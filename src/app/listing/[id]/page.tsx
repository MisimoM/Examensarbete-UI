'use client'

import Image from 'next/image';
import house from "@/public/house.jpg";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Listing() {

    const params = useParams()

    interface Listing {
        title: string;
        description: string;
        subLocation: string;
        mainLocation: string;
        price: number;
        accomodationType: string;
        availableFrom: string;
        availableUntil: string;
      }
  
    const [listing, setListing] = useState<Listing>();
  
    useEffect(() => {
      if (params && params.id) {
        // Hämta annonsen från API:et
        fetch(`https://localhost:7186/Listings/GetById/${params.id}`)
          .then((res) => res.json())
          .then((data) => setListing(data))
          .catch((err) => console.error('Error fetching listing:', err));
      }
    }, [params]);
  
    if (!listing) return <p>Loading...</p>;
    
    return (
        <main>
            <div className="container mx-auto w-6/12 my-2">
                <Image src={house} alt="House" />
                <h2>{listing.title}</h2>
                <p>{listing.description}</p>
                <p>{listing.subLocation}, {listing.mainLocation}</p>
                <p>{listing.price}kr natt</p>
                <p>{listing.accomodationType}</p>
                <p>{listing.availableFrom}</p>
                <p>{listing.availableUntil}</p>
            </div>
        </main>
    )
}
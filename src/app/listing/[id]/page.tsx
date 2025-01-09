'use client'

import Image from 'next/image';
import house from "@/public/house.jpg";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input } from '@/src/app/components/ui/input';
import { ButtonOrLink } from '@/src/app/components/ui/button';
import { createBooking } from '@/src/lib/services/booking/createBooking';
import { isLoggedIn } from '@/src/lib/services/authentication/isLoggedIn';
import { useRouter } from 'next/navigation';

export default function Listing() {

  const params = useParams()
  const router = useRouter()

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
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  
  useEffect(() => {
    if (params && params.id) {
      fetch(`https://localhost:7186/Listings/GetById/${params.id}`)
        .then((res) => res.json())
        .then((data) => setListing(data))
        .catch((err) => console.error('Error fetching listing:', err));
      }
  }, [params]);
  
  if (!listing) return <p>Loading...</p>;

  const pricePerNight = listing.price
    
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    
    return differenceInTime > 0 ? differenceInTime / (1000 * 60 * 60 * 24) : 0;
  };
    
  const totalPrice = calculateDays() * pricePerNight;

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!startDate || !endDate || !listing) return;

    const loggedInStatus = await isLoggedIn();
    if (!loggedInStatus) {
      router.push('/login');
      return;
    }

    const listingId = params.id;
    
    if (typeof listingId !== 'string') {
      console.error('Listing ID is invalid');
      alert('Något gick fel vid bokningen.');
      return;
    }

    const bookingData = {
      listingId: listingId,
      startDate: startDate,
      endDate: endDate
    };

    try {
      const response = await createBooking(bookingData);

      if (response.ok) {
        alert('Bokning genomförd!');
      } else {
        alert('Något gick fel vid bokningen.');
      }
    } catch (err) {
      console.error('Error creating booking:', err);
      alert('Något gick fel vid bokningen.');
    }
  };
    
  return (
    <main>
      <div className="container flex gap-4 mx-auto w-6/12 my-2">
        <div>
          <Image className='rounded-md' src={house} alt="House" />
          <h2>{listing.title}</h2>
          <p>{listing.description}</p>
          <p>{listing.subLocation}, {listing.mainLocation}</p>
          <p>{listing.price}kr natt</p>
          <p>{listing.accomodationType}</p>
          <p>{listing.availableFrom}</p>
          <p>{listing.availableUntil}</p>
        </div>
        <div>
          <div className='p-3 border border-primary rounded'>
            <form onSubmit={handleBooking} className='flex flex-col gap-3'>
              <h3>Boka här</h3>
              <div className='flex gap-2'>
                <Input label='Startdatum' name='startDate' type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <Input label='Slutdatum' name='endDate' type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
              <h3>Totalt: {totalPrice}kr</h3>
              <ButtonOrLink type='submit'>Boka</ButtonOrLink>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
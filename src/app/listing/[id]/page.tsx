'use client'

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input } from '@/src/app/components/ui/input';
import { ButtonOrLink } from '@/src/app/components/ui/button';
import { createBooking } from '@/src/lib/services/booking/createBooking';
import { useRouter } from 'next/navigation';
import Slideshow from '../../components/slideshow';
import { useAuth } from '@/src/app/authContext';

export default function Listing() {
  const { isAuthenticated, accessToken, refreshAuth} = useAuth();
  const params = useParams();
  const router = useRouter();

  interface ListingImage {
    url: string;
    altText: string;
  }

  interface Facility {
    id: number;
    name: string;
  }

  interface Host {
    name: string;
    email: string;
    profileImage: string;
  }

  interface Listing {
    title: string;
    description: string;
    subLocation: string;
    mainLocation: string;
    price: number;
    accommodationType: string;
    availableFrom: string;
    availableUntil: string;
    images: ListingImage[];
    facilities: Facility[];
    host: Host;
  }

  const [listing, setListing] = useState<Listing>();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    if (params && params.id) {
      fetch(`https://localhost:7186/Listings/${params.id}`)
        .then((res) => res.json())
        .then((data) => setListing(data))
        .catch((err) => console.error('Error fetching listing:', err));
    }
  }, [params]);

  if (!listing) return <p>Loading...</p>;

  const pricePerNight = listing.price;

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();

    return differenceInTime > 0 ? differenceInTime / (1000 * 60 * 60 * 24) : 0;
  };

  const totalPrice = calculateDays() * pricePerNight;
  const days = calculateDays();

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!startDate || !endDate || !listing) return;

    await refreshAuth();

    if (!isAuthenticated) {
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
        const response = await createBooking(bookingData, accessToken);

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
  <div className="container mx-auto my-10 flex-grow">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Annonsinformation */}
      <div>
        <Slideshow images={listing.images} />
        <div>
          <h2 className="text-2xl font-bold mt-4">{listing.title}</h2>
        </div>
        <p className="text-gray-700">{listing.description}</p>
        <p className="text-gray-500">{listing.subLocation}, {listing.mainLocation}</p>

        {/* Faciliteter */}
        <div className="my-5 py-5 border-y border-gray-300">
          <h3 className="text-lg font-semibold mb-2">Vad boendet erbjuder</h3>
          <ul className="grid grid-cols-2 gap-2">
            {listing.facilities.map((facility) => (
              <li key={facility.id} className="text-gray-600">
                ✅ {facility.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Värdinfo */}
        <div className='my-5'>
          <h3 className="text-lg font-semibold mb-2">Värden</h3>
          <div className="flex items-center gap-4">
            <img
              src={listing.host.profileImage}
              alt="Värdens profilbild"
              className="w-16 h-16 rounded-full object-cover border border-primary"
            />
            <div>
              <h3 className="text-lg font-semibold">{listing.host.name}</h3>
              <p className="text-gray-600">{listing.host.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bokningssektion */}
      <div>
        <div className="p-5 border border-primary rounded">
          <form onSubmit={handleBooking} className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">{listing.price} kr/natt</h3>
            <div className="flex gap-2 pb-5 border-b border-dark-green">
              <Input
                label="Startdatum"
                name="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Input
                label="Slutdatum"
                name="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <p className="text-gray-700">
                {pricePerNight} kr x {days} nätter
              </p>
            </div>
            <h5 className="text-lg font-bold">Totalt {totalPrice} kr</h5>
            <ButtonOrLink type="submit">Boka</ButtonOrLink>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}

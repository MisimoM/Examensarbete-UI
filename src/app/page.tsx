'use client'

import '@/src/app/globals.css'

import { ListingCard } from '@/src/app/components/listingCard';
import { Dropdown } from '@/src/app/components/ui/dropdown';
import { useEffect, useState } from 'react';
import { useForm } from '../lib/hooks/useForm';
import { ButtonOrLink } from './components/ui/button';
import { SearchListing } from '@/src/lib/services/listing/searchListing';

interface ListingImage {
  url: string;
  altText: string;
}

interface Listing {
  id: string;
  title: string;
  images: ListingImage[];
  mainLocation: string;
  subLocation: string;
  price: number;
}

export default function Home() {
  const { formData, handleChange } = useForm({
    mainLocation: '' as 'Halmstads kommun' | 'Varbergs kommun' | 'Falkenbergs kommun' | '',
    subLocation: '',
    accommodationType: '',
  });

  const [listings, setListings] = useState<Listing[]>([]);

  const areaOptions = {
    'Halmstads kommun': [
      { value: 'Steninge', label: 'Steninge' },
      { value: 'Tylösand', label: 'Tylösand' },
      { value: 'Haverdal', label: 'Haverdal' },
    ],
    'Varbergs kommun': [
      { value: 'Getterön', label: 'Getterön' },
      { value: 'Apelviken', label: 'Apelviken' },
      { value: 'Träslövsläge', label: 'Träslövsläge' }
    ],
    'Falkenbergs kommun': [
      { value: 'Skrea Strand', label: 'Skrea Strand' },
      { value: 'Slöinge', label: 'Slöinge' },
      { value: 'Ullared', label: 'Ullared' }
    ],
  };

  const fetchListings = async (filters: typeof formData) => {
    const response = await SearchListing(filters);
    if (response.success && response.data) {
      setListings(response.data);
    } else {
      console.error('Kunde inte hämta annonser.', response.error);
    }
  };

  useEffect(() => {
    fetchListings(formData);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(e)
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchListings(formData)
  };

  return (
    <div className='container mx-auto'>
      <form className="flex gap-4 mx-auto my-3" onSubmit={handleSearch}>
        <Dropdown
          label="Kommun"
          name="mainLocation"
          options={[
            { value: '', label: 'Alla kommuner' },
            { value: 'Halmstads kommun', label: 'Halmstads kommun' },
            { value: 'Varbergs kommun', label: 'Varbergs kommun' },
            { value: 'Falkenbergs kommun', label: 'Falkenbergs kommun' },
          ]}
          value={formData.mainLocation}
          onChange={handleFilterChange}
        />

        <Dropdown
          label="Område"
          name="subLocation"
          options={[
            { value: '', label: 'Alla områden' },
            ...(formData.mainLocation && areaOptions[formData.mainLocation]
              ? areaOptions[formData.mainLocation]
              : []),
          ]}
          value={formData.subLocation}
          onChange={handleFilterChange}
        />

        <Dropdown
          label="Boende"
          name="accommodationType"
          options={[
            { value: '', label: 'Alla boenden' },
            { value: 'Cottage', label: 'Stuga' },
            { value: 'House', label: 'Hus' },
            { value: 'Apartment', label: 'Lägenhet' },
          ]}
          value={formData.accommodationType}
          onChange={handleFilterChange}
        />

        <ButtonOrLink className='h-1/2 self-end' type='submit'>Sök boende</ButtonOrLink>
      </form>

      <section className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <ListingCard
              key={listing.id}
              Id={listing.id}
              Title={listing.title}
              ImageUrl={listing.images[0].url}
              AltText={listing.images[0].altText}
              MainLocation={listing.mainLocation}
              SubLocation={listing.subLocation}
              Price={listing.price}
            />
          ))
        ) : (
          <p className="text-center">Inga annonser hittades.</p>
        )}
      </section>
    </div>
  );
}

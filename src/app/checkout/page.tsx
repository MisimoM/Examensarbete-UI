'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const [bookingData, setBookingData] = useState<{
    bookingId: string;
    pricePerNight: number;
    numberOfNights: number;
  } | null>(null);

  const [htmlSnippet, setHtmlSnippet] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const storedBookingData = sessionStorage.getItem('bookingData');
    if (storedBookingData) {
      setBookingData(JSON.parse(storedBookingData));
    } else {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    if (bookingData) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              bookingId: bookingData.bookingId,
              pricePerNight: bookingData.pricePerNight,
              numberOfNights: bookingData.numberOfNights,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch Klarna checkout data');
          }

          const data = await response.json();
          setHtmlSnippet(data.htmlSnippet);
        } catch (error) {
          console.error('Error fetching Klarna checkout data:', error);
        }
      };

      fetchData();
    }
  }, [bookingData]);

  useEffect(() => {
    if (htmlSnippet) {
      const checkoutContainer = document.getElementById('my-checkout-container');
      if (checkoutContainer) {
        checkoutContainer.innerHTML = htmlSnippet;

        const scriptTags = checkoutContainer.getElementsByTagName('script');
        for (let i = 0; i < scriptTags.length; i++) {
          const parentNode = scriptTags[i].parentNode;
          const newScriptTag = document.createElement('script');
          newScriptTag.type = 'text/javascript';
          newScriptTag.text = scriptTags[i].text;
          parentNode?.removeChild(scriptTags[i]);
          parentNode?.appendChild(newScriptTag);
        }
      }
    }
  }, [htmlSnippet]);

  if (!bookingData || !htmlSnippet) return <p>Laddar...</p>;

  return (
    <div className="container mx-auto my-10">
      <div id="my-checkout-container"></div>
    </div>
  );
};

export default CheckoutPage;

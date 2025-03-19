'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ConfirmationPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [htmlSnippet, setHtmlSnippet] = useState<string>('');

  useEffect(() => {
    if (orderId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${API_URL}/order/${orderId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch Klarna confirmation data');
          }

          const data = await response.json();
          setHtmlSnippet(data.htmlSnippet);
        } catch (error) {
          console.error('Error fetching Klarna confirmation data:', error);
        }
      };

      fetchData();
    }
  }, [orderId]);

  useEffect(() => {
    if (htmlSnippet) {
      const confirmationContainer = document.getElementById('klarna-confirmation-container');
      if (confirmationContainer) {
        confirmationContainer.innerHTML = htmlSnippet;

        const scriptTags = confirmationContainer.getElementsByTagName('script');
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

  if (!htmlSnippet) return <p>Laddar bekräftelse...</p>;

  return (
    <div className="container mx-auto my-10">
      <div id="klarna-confirmation-container"></div>
    </div>
  );
};

export default ConfirmationPage;
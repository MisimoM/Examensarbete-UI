export async function createBooking(bookingData: { listingId: string, startDate: string, endDate: string }, accessToken: string | null) {
  if (!accessToken) {
      throw new Error('No access token available');
  }

  const response = await fetch('https://localhost:7186/Bookings', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
      throw new Error('Failed to create booking');
  }

  return response;
}
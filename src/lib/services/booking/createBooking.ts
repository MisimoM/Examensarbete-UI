export async function createBooking(bookingData: { listingId: string, startDate: string, endDate: string }, accessToken: string) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
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
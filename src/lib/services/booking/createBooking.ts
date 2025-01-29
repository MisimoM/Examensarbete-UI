import { getAccessToken } from "../authentication/getAccessToken";
import { refreshTokens } from "../authentication/refreshTokens";

export async function createBooking(bookingData: { listingId: string, startDate: string, endDate: string }) {
    
  let accessToken = await getAccessToken();
    
  if(!accessToken)
  {
    await refreshTokens();
    accessToken = await getAccessToken();
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
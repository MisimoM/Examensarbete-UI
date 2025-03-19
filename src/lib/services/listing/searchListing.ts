export const SearchListing = async (formData: { mainLocation: string, subLocation: string, accommodationType: string }) => {
    try {

      const queryParams = new URLSearchParams({
        mainLocation: formData.mainLocation,
        subLocation: formData.subLocation,
        accommodationType: formData.accommodationType,
      }).toString();


      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("An error occured:", error);
      return { success: false, error };
    }
  };
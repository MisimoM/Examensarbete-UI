export const useLogin = async (formData: { mainLocation: string, subLocation: string, accommodationType: string }) => {
    try {
      const response = await fetch("https://localhost:7186/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
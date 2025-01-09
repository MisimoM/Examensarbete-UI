export const LoginUser = async (formData: { email: string, password: string }) => {
    try {
      const response = await fetch("https://localhost:7186/auth/login", {
        method: "POST",
        credentials: 'include',
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
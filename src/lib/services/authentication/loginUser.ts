export const LoginUser = async (formData: { email: string, password: string }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();

      const accessToken = data.accessToken;
      sessionStorage.setItem("accessToken", accessToken);

      return { success: true, data };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return { success: false, error };
  }
};
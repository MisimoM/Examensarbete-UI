'use client'

import { Input } from "@/src/app/components/ui/input";
import { ButtonOrLink } from "@/src/app/components/ui/button";
import { useRouter } from 'next/navigation';
import { LoginUser } from "@/src/lib/services/authentication/loginUser";
import { useForm } from "@/src/lib/hooks/useForm";
import { useAuth } from "@/src/app/authContext";

export default function Login() {
  const router = useRouter();
  const { formData, handleChange } = useForm({ email: "", password: "" });

  const { refreshAuth } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { success, data } = await LoginUser(formData, refreshAuth);  

    if (success) {
      console.log("Inloggning lyckades:", data);
      router.push("/");
    } else {
      console.error("Inloggning misslyckades");
    }
  };

  return (
    <main>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <Input 
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
        />
        
        <ButtonOrLink type="submit">Login</ButtonOrLink>
      </form>
    </main>
  );
}
import { useState } from "react";

export function useForm<T extends Record<string, string>>(initialValues: T) {
    const [formData, setFormData] = useState<T>(initialValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

  return { formData, handleChange, setFormData };
}
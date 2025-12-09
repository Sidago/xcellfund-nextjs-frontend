"use client";
import React, { useState } from "react";
import TextInput from "@/components/common/TextInput";
import appConfig from "@/config/app.config";

type Icon = { name: string };

type Button = { label: string; icon: Icon };

type Input = {
  icon: Icon;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "number" | "textarea";
  required?: boolean;
  name?: string;
};

type Props = {
  button: Button;
  input: Input[];
};

export default function Form({ button, input }: Props) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isOdd = input.length % 2 !== 0;

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Format error names: phone_number → Phone Number
  const formatFieldName = (name: string = "") => {
    return name
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    input.forEach((field) => {
      const key = field.name || "";
      const label = field.label || formatFieldName(key);

      if (field.required && !formData[key]?.trim()) {
        newErrors[key] = `${label} is required`;
      }

      if (field.type === "email" && formData[key]) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(formData[key])) {
          newErrors[key] = "Invalid email format";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setSuccess(false);

    try {
      const url = appConfig.apiUrl + "/api/contact-messages";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${appConfig.apiKey}`,
        },
        body: JSON.stringify({
          data: formData,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setSuccess(true);
      setFormData({});

      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        {input.map((field, index) => {
          const isLastOdd = isOdd && index === input.length - 1;

          return (
            <div key={index} className={isLastOdd ? "md:col-span-2" : ""}>
              {field.label && (
                <label
                  className="block lato text-lg font-light leading-[15px] text-[#333743] mb-2"
                  htmlFor={field.name}
                >
                  {field.label}
                  <span>{field.required ? " *" : ""}</span>
                </label>
              )}

              <TextInput
                name={field.name}
                type={field.type}
                value={formData[field.name || ""] || ""}
                onChange={(e) => handleChange(field.name || "", e.target.value)}
                placeholder={field.placeholder}
              />

              {errors[field.name || ""] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors[field.name || ""]}
                </p>
              )}
            </div>
          );
        })}

        {/* Submit Button inside form to ensure submit works */}
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="lato text-[15px] inline-block bg-[#333743] text-white px-6 py-3 rounded capitalize font-normal hover:opacity-95 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : button.label}
          </button>

          {success && (
            <p className="text-green-600 text-sm mt-3">
              Message sent successfully!
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

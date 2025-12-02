import Hero from "@/components/common/Hero";
import Form from "@/components/contact/Form";
import AppLayout from "@/components/layouts/AppLayout";
import fetchApi from "@/services/ApiService";
import { createMetadata } from "@/utils/generateMetadata";
import React from "react";

export const generateMetadata = async () => {
  const data = await fetchApi("investors");
  return createMetadata(data?.data?.seo || {});
};

export default async function page() {
  const data = await fetchApi("investors");
  return (
    <AppLayout pathname="/investors">
      <Hero
        title={data?.data?.hero.title}
        subtitle={data?.data?.hero.subtitle}
        image={data?.data?.hero.background_image}
      />
      <main className="max-w-[1140px] mx-auto px-5 md:px-0 py-20">
        <h2 className="text-gray-800 text-3xl prata font-normal tracking-[2px] sentence-case mb-8 text-center md:text-left">Investor Login</h2>
        <p className="text-gray-950 text-base font-light mb-6 tracking-[1px] text-center md:text-left">View Your Account, Contracts, Yield and Profile Information</p>
        <Form button={data?.data?.form?.button} input={data?.data?.form?.input} />
      </main>
    </AppLayout>
  );
}

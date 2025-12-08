import React, { Suspense } from "react";
import { createMetadata } from "@utils/generateMetadata";
import fetchApi from "@/services/ApiService";
import Features from "@/components/home/Features";
import FeatureSkeleton from "@/components/placeholder/FeatureSkeleton";
import { ServiceSkeleton } from "@/components/placeholder/ServiceSkeleton";
import Services from "@/components/home/Services";
import { WhoAreWeSkeleton } from "@/components/placeholder/WhoAreWeSkeleton";
import WhoAreWe from "@/components/home/WhoAreWe";
import { WhoAreWeBannerSkeleton } from "@/components/placeholder/WhoAreWeBannerSkeleton";
import WhoAreWeBanner from "@/components/home/WhoAreWeBanner";
import { HighlightsSkeleton } from "@/components/placeholder/HighlightsSkeleton";
import Highlights from "@/components/home/Highlights";
import Carousel from "@/components/carousel/Carousel";
import AppLayout from "@/components/layouts/AppLayout";

export const generateMetadata = async () => {
  const data = await fetchApi("home");
  createMetadata(data?.data?.seo || {});
};

export default async function page() {
  const homeData = await fetchApi("home");
  return (
    <AppLayout pathname="/">
      <Carousel items={homeData?.data?.carousel?.items} interval={300000} />
      <Suspense fallback={<FeatureSkeleton count={4} />}>
        <Features data={homeData?.data?.features} />
      </Suspense>
      <Suspense fallback={<ServiceSkeleton count={4} />}>
        <Services data={homeData?.data?.services} />
      </Suspense>
      <Suspense fallback={<WhoAreWeSkeleton />}>
        <WhoAreWe data={homeData?.data?.who_we_are} />
      </Suspense>
      <Suspense fallback={<WhoAreWeBannerSkeleton />}>
        <WhoAreWeBanner data={homeData?.data?.who_we_are_banner} />
      </Suspense>
      <Suspense fallback={<HighlightsSkeleton count={4} />}>
        <Highlights data={homeData?.data?.highlights} />
      </Suspense>
    </AppLayout>
  );
}
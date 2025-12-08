"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Carousel from "@/components/carousel/Carousel";

const Features = dynamic(() => import("@/components/home/Features"), { ssr: false });
const FeatureSkeleton = dynamic(() => import("@/components/placeholder/FeatureSkeleton"), { ssr: false });
const Services = dynamic(() => import("@/components/home/Services"), { ssr: false });
const ServiceSkeleton = dynamic(() => import("@/components/placeholder/ServiceSkeleton").then(mod => mod.ServiceSkeleton), { ssr: false });
const WhoAreWe = dynamic(() => import("@/components/home/WhoAreWe"), { ssr: false });
const WhoAreWeSkeleton = dynamic(() => import("@/components/placeholder/WhoAreWeSkeleton").then(mod => mod.WhoAreWeSkeleton), { ssr: false });
const WhoAreWeBanner = dynamic(() => import("@/components/home/WhoAreWeBanner"), { ssr: false });
const WhoAreWeBannerSkeleton = dynamic(() => import("@/components/placeholder/WhoAreWeBannerSkeleton").then(mod => mod.WhoAreWeBannerSkeleton), { ssr: false });
const Highlights = dynamic(() => import("@/components/home/Highlights"), { ssr: false });
const HighlightsSkeleton = dynamic(() => import("@/components/placeholder/HighlightsSkeleton").then(mod => mod.HighlightsSkeleton), { ssr: false });

export default function HomeClient({ homeData }: { homeData: any }) {
  return (
    <>
      <Carousel items={homeData?.data?.carousel?.items} interval={3000} />
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
    </>
  );
}

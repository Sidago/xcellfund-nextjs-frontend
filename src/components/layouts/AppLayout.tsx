import fetchApi from "@/services/ApiService";
import React, { Suspense } from "react";
import Topbar from "@/components/common/Topbar";
import Banner from "@/components/contact/Banner";
import Map from "@/components/common/Map";
import MapSkeleton from "@/components/placeholder/MapSkeleton";
import ContactBannerSkeleton from "@/components/placeholder/ContactBannerSkeleton";
import TopbarSkeleton from "@/components/placeholder/TopbarSkeleton";
import SubscriptionSkeleton from "@/components/placeholder/SubscriptionSkeleton";
import Subscription from "@/components/common/Subscription";
import CopyrightSkeleton from "@/components/placeholder/CopyrightSkeleton";
import Copyright from "@/components/common/Copyright";
import FooterSkeleton from "@/components/placeholder/FooterSkeleton";
import Footer from "@/components/common/Footer";
import Menu from "@/components/menu/Menu";
import MenuSkeleton from "@/components/placeholder/MenuSkeleton";
import { shouldShow } from "@/utils/shouldShow";
import HomeContactSkeleton from "@/components/placeholder/HomeContactSkeleton";
import HomeContact from "@/components/home/Contact";
import ContactusContactSkeleton from "@/components/placeholder/ContactusContactSkeleton";
import ContactusContact from "@/components/contact-us/Contact";

export default async function AppLayout({
  children,
  pathname,
}: {
  children: React.ReactNode;
  pathname: string;
}) {
  const globalData = await fetchApi("global");

  return (
    <>
      <div className="w-full absolute z-50">
        <Suspense
          fallback={<TopbarSkeleton contactsCount={2} socialsCount={3} />}
        >
          <Topbar data={globalData?.data} />
        </Suspense>

        <Suspense fallback={<MenuSkeleton />}>
          <Menu
            menus={globalData?.data?.mainmenu?.menus}
            brand={globalData?.data?.mainmenu?.brand}
          />
        </Suspense>
      </div>
      {children}
      {pathname === "/contact-us" && (
        <Suspense
          fallback={<ContactusContactSkeleton inputCount={5} linkCount={2} />}
        >
          <ContactusContact
            input={globalData?.data?.contact_form?.input}
            button={globalData?.data?.contact_form?.button}
            address={{
              ...globalData?.data?.footer_section?.address,
              heading: "Our Location",
            }}
          />
        </Suspense>
      )}
      {shouldShow("contact-banner", pathname) && (
        <Suspense fallback={<ContactBannerSkeleton hasButton={true} />}>
        <Banner
          title={globalData?.data?.contact_section?.title}
          subtitle={globalData?.data?.contact_section?.subtitle}
          link={globalData?.data?.contact_section?.link}
          background_image={globalData?.data?.contact_section?.background_image}
        />
      </Suspense>
      )}
      {pathname === "/" && (
        <Suspense fallback={<HomeContactSkeleton inputCount={5} />}>
          <HomeContact
            input={globalData?.data?.contact_form?.input}
            button={globalData?.data?.contact_form?.button}
          />
        </Suspense>
      )}
      {shouldShow("map", pathname) && (
        <Suspense fallback={<MapSkeleton />}>
          <Map embedLink={globalData?.data?.map?.embed_link} />
        </Suspense>
      )}

      <Suspense fallback={<SubscriptionSkeleton socialsCount={3} />}>
        <Subscription
          input={globalData?.data?.subscription_section?.input}
          button={globalData?.data?.subscription_section?.button}
          socials={globalData?.data?.topnav?.socials}
        />
      </Suspense>
      <Suspense fallback={<FooterSkeleton />}>
        <Footer
          address={globalData?.data?.footer_section?.address}
          branding={globalData?.data?.footer_section?.branding}
          quicklinks={globalData?.data?.footer_section?.quicklinks}
        />
      </Suspense>
      <Suspense fallback={<CopyrightSkeleton />}>
        <Copyright
          copyright_text={
            globalData?.data?.footer_section?.copyright?.copyright_text
          }
          links={globalData?.data?.footer_section?.copyright?.links}
        />
      </Suspense>
    </>
  );
}

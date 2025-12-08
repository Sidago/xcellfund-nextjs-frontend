import { createMetadata } from "@utils/generateMetadata";
import fetchApi from "@/services/ApiService";
import AppLayout from "@/components/layouts/AppLayout";
import HomeClient from "./HomeClient";


export const generateMetadata = async () => {
  const data = await fetchApi("home");
  createMetadata(data?.data?.seo || {});
};

export default async function page() {
  const homeData = await fetchApi("home");
  return (
    <AppLayout pathname="/">
      <HomeClient homeData={homeData} />
    </AppLayout>
  );
}

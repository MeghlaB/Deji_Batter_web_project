

import Banner from "../Banner/Herosection";
import BulkOrderSection from "../BulkOrderSection/BulkOrderSection";
import ChatlingWidget from "../Chatbasebot/Chatbasebot";

import FeaturedProduct from "../FeaturedProduct/FeaturedProduct";
import ProductCategories from "../ProductCategories/ProductCategories";
import ServiceGuaranteeSection from "../ServicesGradutaion/ServicesGradution";


function Home() {
  return (
    <div>
      <Banner />
      <ChatlingWidget/>
    <FeaturedProduct></FeaturedProduct>
  <ProductCategories/>
    <BulkOrderSection/>
  <ServiceGuaranteeSection/>
    </div>
  );
}

export default Home;

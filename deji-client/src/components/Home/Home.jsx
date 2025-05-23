

import Banner from "../Banner/Herosection";
import BulkOrderSection from "../BulkOrderSection/BulkOrderSection";
import ChatlingWidget from "../Chatbasebot/Chatbasebot";

import FeaturedProduct from "../FeaturedProduct/FeaturedProduct";
import ProductCategories from "../ProductCategories/ProductCategories";


function Home() {
  return (
    <div>
      <Banner />
      <ChatlingWidget/>
    <FeaturedProduct></FeaturedProduct>
  <ProductCategories/>
    <BulkOrderSection/>
  
    </div>
  );
}

export default Home;

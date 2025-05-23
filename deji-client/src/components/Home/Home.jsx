

import Banner from "../Banner/Herosection";
import ChatlingWidget from "../Chatbasebot/Chatbasebot";

import FeaturedProduct from "../FeaturedProduct/FeaturedProduct";


function Home() {
  return (
    <div>
      <Banner />
      <ChatlingWidget/>
    <FeaturedProduct></FeaturedProduct>
    </div>
  );
}

export default Home;

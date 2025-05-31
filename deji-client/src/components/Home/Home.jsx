import FAQAccordion from "../../Pages/Question";
import AutoPlay from "../AutoCarosule/AutoPlay";
import Banner from "../Banner/Herosection";
import BulkOrderSection from "../BulkOrderSection/BulkOrderSection";
import CertificateSection from "../Certificates/Certificates";
import ChatlingWidget from "../Chatbasebot/Chatbasebot";

import FeaturedProduct from "../FeaturedProduct/FeaturedProduct";
import GlobalExhibition from "../GlobalExhibition/GlobalExhibition";
import NewsFAQ from "../NewsFAQ/NewsFAQ";
import Partners from "../Partners/Partners";

function Home() {
  return (
    <div>
      <Banner />
      <ChatlingWidget />

      <FeaturedProduct></FeaturedProduct>
      <AutoPlay></AutoPlay>
      <GlobalExhibition/>
      <Partners/>
      <BulkOrderSection />

      <CertificateSection />
       <NewsFAQ/>
    </div>
  );
}

export default Home;

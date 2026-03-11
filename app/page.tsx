import  CommunityJoinSection  from "./components/sections/CommunityJoinSection";
import  FAQSection  from "./components/sections/FAQSection";
import FeaturesListSection from "./components/sections/FeaturesListSection";
import  FooterSection  from "./components/sections/FooterSection";
import HeaderSection from "./components/sections/HeaderSection";
import HowItWorks from "./components/sections/HowItWorks";
import  PortfolioSection  from "./components/sections/PortfolioSection";
import  PricingSection  from "./components/sections/PricingSection";
import  TestimonialsSection  from "./components/sections/TestimonialsSection";
import UGC from "./components/sections/UGC";
import VideoSection from "./components/sections/VideoSection";
import { ChatBot } from "./components/ui/chat";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import OurPartenrs from "./components/sections/OurParteners";






const ugcImages = [
  { bg: "bg-[#eaf6fb]", image: "/rectangle-6533.png" },
  { bg: "bg-[#eaf6fb]", image: "/rectangle-6534.png" },
  { bg: "bg-[#eaf6fb]", image: "/rectangle-6535.png" },
];

export default function Home() {
  return (
    <div className="bg-white w-full relative overflow-hidden">
      <HeaderSection />
      <VideoSection />
      <FeaturesListSection />
       <HowItWorks />     
      <OurPartenrs />

      <PortfolioSection />

      <PricingSection />

      <CommunityJoinSection />
      <UGC />
      <TestimonialsSection />

      <FAQSection />

      <FooterSection />

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  )
}

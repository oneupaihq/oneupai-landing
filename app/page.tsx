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
// import { ChatBot } from "./components/ui/chat"; // Replaced with Crisp Chat
import OurPartenrs from "./components/sections/OurParteners";




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

      {/* AI Chatbot - Now using Crisp Chat (loaded in layout.tsx) */}
      {/* <ChatBot /> */}
    </div>
  )
}

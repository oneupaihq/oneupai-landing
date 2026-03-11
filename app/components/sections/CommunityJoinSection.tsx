"use client";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { usePopup } from "./PopupContext";


const cards = [
  {
    title: "Learn",
    description: "Short, simple lessons that show you how to use and promote your website. No tech background needed.",
    icon: "/images/piller-ic1.svg",
    backgroundImage: "/images/piller1.png",
  },
  {
    title: "Tools",
    description: "Access ready-made templates, guides, and resources you can use right away.",
    icon: "/images/piller-ic2.svg",
    backgroundImage: "/images/piller2.png",
  },
  {
    title: "Support",
    description: "Ask questions, join live sessions, and get support fast. You also get a say in what gets built next.",
    icon: "/images/piller-ic3.svg",
    backgroundImage: "/images/piller3.png",
  },
];


const cardClasses = ["ideal-card-first", "ideal-card-second", "ideal-card-third"];
const lineSvg = "/images/waves-line.svg";
const line1Svg = "/images/line1.svg";

export default function CommunityJoinSection() {

const { openCommunityPopup } = usePopup();




  return (
    <section className="relative w-full py-12 lg:py-20 overflow-hidden bg-white">
      <div className="lg:block hidden absolute top-[25px] right-[-50px] w-[250px] z-10">
        <img src={lineSvg} className="w-full" alt="" />
      </div>
      <div className="lg:block hidden absolute bottom-[40px] left-48 w-[150px] z-10">
          <img src={line1Svg} alt="" />
        </div>

      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center gap-4 max-w-[700px] mx-auto mb-12 md:mb-16">
                    <Badge
                      variant="outline" className="px-4"
                    >
                      Exclusive Community Access
                    </Badge>
                    <h2 className="ff-jakarta font-bold text-[#000000] md:text-[40px] text-[36px] text-center leading-[120%]">
                     Everything You Need to Succeed
                    </h2>
                <p className="ff-Graphik font-normal text-[#1E293B] md:text-[20px] lg:text-xl text-base text-center md:leading-[30px] leading-[24px]">
                  Every plan includes free access to learning resources, 
                  ready-made tools, and a support community to support your growth
                </p>
                  </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 items-center justify-items-center">
        {cards.map((card, i) => {
          const isCenter = i === 1;
          const cardHeight = isCenter ? "h-[444px]" : "h-[444px]";
          const cardRotation = isCenter ? "" : i === 0 ? "" : "";

          return (
            <div
              key={i}
              className={`relative flex flex-col justify-center overflow-hidden h-full rounded-[25px] transition-all duration-300  ${cardClasses[i]} ${cardHeight} ${cardRotation} w-full`}
              style={{
                backgroundImage: `url(${card.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* <div className="absolute inset-0 bg-[#E1E9F533] z-10" /> */}

              <div className="px-5 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-5 text-center f-full">
                <div className="text-center mb-8">
                <img src={card.icon} className="mx-auto" alt="" />
                </div>
                <div className="md:min-h-[128px]">
                  <h3 className="ff-jakarta text-[28px] md:text-[32px] font-medium text-[#000000] leading-[100%] mb-6">
                  {card.title}
                </h3>
                <p className="ff-jakarta mt-2 text-[16px] md:text-[18px] text-[#1E293B] leading-[24px] md:px-2">
                  {card.description}
                </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 md:mt-14">
              <Button
                variant="outline"
                size='md'
                asChild>
                <a href="https://dashboard.oneupai.com/onboard">Get AI Strategy</a>
              </Button>
              <Button variant='primary' size='md' onClick={openCommunityPopup}>
                Join Free Community
              </Button>
            </div>
      </div>
    </section>
  );
}
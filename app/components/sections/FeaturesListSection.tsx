import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

const features = [
  {
    icon: "/frame-11.svg",
    headline: "Engage Visitors Instantly",
    body: "Your AI agent helps answer questions, guide visitors, and capture leads so potential customers “do not slip away while you are busy.”",
    bullets: [
      "A clear offer people understand fast",
      "Strong \"book now\" and \"get a quote\" prompts in the right spots",
      "Built for service businesses, not generic websites",
    ],
  },
  {
    icon: "/frame-11-1.svg",
    headline: "Simplify Booking",
    body: "“Let customers book appointments through your website and keep everything organized by syncing with your personal calendar.”",
    bullets: [
      "Clients book calls or appointments any time",
      "Less back-and-forth messages",
      "Get paid through Stripe",
    ],
  },
  {
    icon: "/frame-11-3.svg",
    headline: "Manage Content in One Place",
    body: "Update your website, post to your social accounts, and get easy-to-understand insights, so you can see what is helping your business grow.",
    bullets: [
      "No coding or designers",
      "Looks great on phones automatically",
      "Edit everything anytime in a simple dashboard",
    ],
  },
];

const lineSvg = "/images/waves-line.svg";

export default function FeaturesListSection() {
  return (
    <section id="features" className="relative w-full py-12 lg:py-24 overflow-hidden bg-white">
      <div className="lg:block hidden absolute top-[25px] right-[-50px] w-[250px] z-10">
        <img src={lineSvg} className="w-full" alt="" />
      </div>

      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center gap-5 max-w-[900px] mx-auto mb-12 md:mb-16">
          <Badge variant="outline">Key Benefits</Badge>
          <h2 className="ff-jakarta font-bold text-[#000000] md:text-[40px] text-[36px] text-center leading-[110%]">
            Never Miss a Business Opportunity 
          </h2>
          <p className="max-w-[948px] mx-auto text-[#1E293B] md:text-[20px] lg:text-xl text-base text-center md:leading-[30px] leading-[24px]">
          With AI-powered visitor support, booking tools, calendar sync, and social media management, 
          your website can keep working while you focus on your customers.
        </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-[#e8f7fb] to-[#d4f1f9] rounded-[20px] border-0 shadow-sm hover:shadow-md transition-shadow h-full"
            >
              <CardContent className="flex flex-col gap-6 p-6 md:p-8 h-full">
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full">
                  <img className="w-10 h-10" alt="" src={feature.icon} />
                </div>
                
                <div className="flex flex-col gap-4 flex-1">
                  <h3 className="ff-jakarta font-bold text-[#0e0e0f] text-xl md:text-2xl leading-tight">
                    {feature.headline}
                  </h3>
                  
                  <p className="ff-Graphik font-normal md:min-h-[120px] text-[#1E293B] md:text-[18px] md:leading-[24px] text-base">
                    {feature.body}
                  </p>
                  
                  <ul className="flex flex-col gap-3 mt-2">
                    {feature.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM11.8566 6.19113C12.1002 5.85614 12.0261 5.38708 11.6911 5.14345C11.3561 4.89982 10.8871 4.97388 10.6434 5.30887L7.15969 10.099L5.28033 8.21967C4.98744 7.92678 4.51256 7.92678 4.21967 8.21967C3.92678 8.51256 3.92678 8.98744 4.21967 9.28033L6.71967 11.7803C6.87477 11.9354 7.08999 12.0149 7.30867 11.9977C7.52734 11.9805 7.72754 11.8685 7.85655 11.6911L11.8566 6.19113Z" fill="#1A80E7"/>
                          </svg>
                        </div>
                        <span className="ff-Graphik font-normal text-[#1E293B] md:text-[16px] text-[14px] md:leading-[20px]">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

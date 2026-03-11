"use client";
import { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { usePopup } from "./PopupContext";

const lineSvg = "/images/waves-line.svg";

const USD_TO_CAD_RATE = 1.35;

function getCountryFromCookie(): string {
  if (typeof document === 'undefined') return 'US';
  const cookies = document.cookie.split(';');
  const countryCookie = cookies.find(c => c.trim().startsWith('user-country='));
  if (countryCookie) {
    const value = countryCookie.split('=')[1];
    return value ? value.trim() : 'US';
  }
  return 'US';
}

export default function PricingSection() {
  const { openSalesPopup } = usePopup();
  const [mounted, setMounted] = useState(false);
  const [pricing, setPricing] = useState({
    starter: '$47',
    professional: '$97',
    enterprise: 'Let’s Talk',
  });

  useEffect(() => {
    setMounted(true);
    const country = getCountryFromCookie();
    if (country === 'CA') {
      const starterCAD = Math.round(47 * USD_TO_CAD_RATE);
      const professionalCAD = Math.round(97 * USD_TO_CAD_RATE);
      setPricing({
        starter: `CAD$${starterCAD}`,
        professional: `CAD$${professionalCAD}`,
        enterprise: 'Let’s Talk',
      });
    }
  }, []);

  const pricingPlans = [
    {
      title: "LAUNCH",
      description: "Everything you need to get your first customers online.",
      price: pricing.starter,
      period: "/mo",
      isPopular: false,
      ctaText: "Start Free Trial",
      ctaType: "link" as const,
    },
    {
      title: "GROW",
      description: "Go further with more features and fewer limits.",
      price: pricing.professional,
      period: "/mo",
      isPopular: true,
      ctaText: "Start Free Trial",
      ctaType: "link" as const,
    },
    {
      title: "SCALE",
      description: "A tailor-made solution built around your business, not the other way around.",
      price: pricing.enterprise,
      period: "",
      isPopular: false,
      ctaText: "Book a Call",
      ctaType: "popup" as const,
    },
  ];

  const planFeatures = [
    [
      "1 AI-powered website, pick any template",
      "AI assistant that answers visitor questions and captures leads around the clock",
      "Online booking system, up to 100 appointments a month",
      "Accept payments directly on your site",
      "Syncs with your Google Calendar automatically",
      "Hosting, security, and a free web address included",
    ],
    [
      "Everything in Launch, plus:",
      "Train your AI assistant using your own documents and business info",
      "No booking limits",
      "Publish to up to 10 social media platforms from one place",
      "Your branding only, no OneUpAI logo",
      "Priority support",
    ],
    [
      "Everything in Grow, plus",
      "Custom website built specifically for your business",
      "Support for multiple websites from one account",
      "Custom integrations including voice and AI agents",
      "Advanced analytics and API support",
      "Dedicated account manager"
    ],
  ];

  return (
    <section id="pricing" className="relative w-full pb-12 md:pb-16 bg-white overflow-hidden">
      <div className="lg:block hidden absolute top-[25px] right-[-50px] w-[250px] z-10">
        <img src={lineSvg} className="w-full" alt="" />
      </div>
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center gap-5 max-w-[700px] mx-auto mb-12 md:mb-16">
          <Badge variant="outline" className="px-4">Pricing</Badge>
          <h2 className="ff-jakarta font-bold text-[#000000] md:text-[40px] text-[36px] text-center leading-[120%]">
            More Than a Website. A Smart Tool That Pays for Itself. 
          </h2>
          <p className="ff-Graphik font-normal text-[#1E293B] md:text-[20px] lg:text-xl text-base text-center md:leading-[30px] leading-[24px]">
            Start with a free trial. Upgrade when your business is ready. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className="bg-[#2AA8D71A] rounded-[20px] border-0 shadow-sm hover:shadow-lg transition-shadow h-full"
            >
              <CardContent className="p-6 xl:p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4 relative">
                  <h3 className="ff-jakarta font-bold text-[#0e0e0f] text-[26px] xl:text-2xl">
                    {plan.title}
                  </h3>
                  {plan.isPopular && (
                    <Badge className="absolute lg:right-[-20px] lg:top-[-20px] right-[-12px] top-[-12px] bg-[#1a80e7] text-white ff-jakarta font-medium text-[12px] px-3 py-1.5 rounded-[10px]">
                      Popular
                    </Badge>
                  )}
                </div>

                <p className="ff-Graphik font-normal text-[#1E293B] text-sm xl:text-base leading-relaxed mb-6 lg:h-[50px]">
                  {plan.description}
                </p>

                <div className="mb-4 md:min-h-[65px]">
                  <div className="flex items-baseline gap-1">
                    <span className="ff-jakarta font-bold text-[#0e0e0f] text-[34px] xl:text-[40px] leading-[100%]">
                      {plan.price}
                    </span>
                  </div>
                  <span className="ff-Graphik font-normal text-slate-600 text-sm">
                    {plan.period}
                  </span>
                </div>

                {/* CTA — link for trial plans, popup for sales */}
                {plan.ctaType === "popup" ? (
                  <Button variant="primary" size="md" className="mb-6" onClick={openSalesPopup}>
                    {plan.ctaText}
                  </Button>
                ) : (
                  <Button variant="primary" size="md" className="mb-6" asChild>
                    <a href="https://dashboard.oneupai.com/onboard">{plan.ctaText}</a>
                  </Button>
                )}

                <div className="flex-1">
                  <h4 className="ff-jakarta font-semibold text-[#1a80e7] text-base mb-6">
                    Key Features
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {planFeatures[index].map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 border-b border-[#1E3A8A0D] pb-2"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM11.8566 6.19113C12.1002 5.85614 12.0261 5.38708 11.6911 5.14345C11.3561 4.89982 10.8871 4.97388 10.6434 5.30887L7.15969 10.099L5.28033 8.21967C4.98744 7.92678 4.51256 7.92678 4.21967 8.21967C3.92678 8.51256 3.92678 8.98744 4.21967 9.28033L6.71967 11.7803C6.87477 11.9354 7.08999 12.0149 7.30867 11.9977C7.52734 11.9805 7.72754 11.8685 7.85655 11.6911L11.8566 6.19113Z" fill="#1A80E7"/>
                          </svg>
                        </div>
                        <span className="ff-jakarta font-normal text-[#1E293B] text-[14px] leading-[140%]">
                          {feature}
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
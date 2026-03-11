
import { Phone, Mail } from "lucide-react";
import { Badge } from "../ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const faqItems = [
  {
    question: "Do I need to know how to code?",
    answer:
      "No. If you can answer a few questions about your business, OneUpAI can build your site.",
  },
  {
    question: "Can I edit what it creates?",
    answer:
      "Yes. Change text, images, pricing, and sections any time from your dashboard.",
  },
  {
    question: "How do I get paid?",
    answer:
      "Connect Stripe (existing or new). Customers pay you directly.",
  },
  {
    question: "Will it work on mobile?",
    answer:
      "Yes. Your site will look right on phones, tablets, and desktops.",
  },
  {
    question: "How is this different from Wix or Squarespace?",
    answer:
      "Those tools still expect you to write the copy, design the page, and set everything up. OneUpAI gets you to a finished site much faster, with booking and payments ready to go.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, you can cancel anytime with no long-term contracts or cancellation fees. We believe in earning your business every month by delivering exceptional results and value.",
  },
  {
    question: "Is my data secure with OneUpAI?",
    answer:
      "Absolutely. We use enterprise-grade encryption and security protocols. Your data is stored securely and never shared with third parties. We're fully compliant with GDPR and industry-standard security practices.",
  },
];

export default function FAQSection () {
  return (
    <section id="contact" className="w-full py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 xl:gap-48">
          <div className="flex flex-col justify-between gap-8 lg:gap-10">
            <div>
              <Badge
                variant="outline" className="mb-6"
                 >
                Have Questions?
              </Badge>
              <h2 className="ff-jakarta font-bold text-[#000000] md:text-[40px] text-[36px] leading-[100%]">
                Frequently asked question.
              </h2>
            </div>

            <div className="p-6 bg-gradient-to-br from-[#e8f4f8] to-[#d4eef6] rounded-2xl flex flex-col gap-6">
              <div className="flex items-center gap-4 justify-between">
                <div>
                  <p className="ff-Graphik font-normal text-[#1E293B] text-[17px] leading-[100%] mb-2">
                    Call Us
                  </p>
                  <a
                    href="tel:+18336638724"
                    className="ff-jakarta font-bold text-[#0e0e0f] text-[19px] md:text-[22px] leading-[100%] hover:text-[#1a80e7] transition-colors whitespace-nowrap"
                  >
                    1-833-ONEUPAI (663-8724)
                  </a>
                </div>
                 <div className="flex-shrink-0 h-8 w-8">
                  <svg width="100%" height="100%" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.0521 26.8668C6.97491 22.7817 3.83941 17.8553 1.86487 12.4319C0.778553 9.46687 1.77387 6.20982 4.00716 3.97653L5.38922 2.59636C5.76078 2.22406 6.20212 1.92868 6.68797 1.72715C7.17382 1.52561 7.69465 1.42188 8.22065 1.42188C8.74664 1.42187 9.26747 1.52561 9.75332 1.72715C10.2392 1.92868 10.6805 2.22406 11.0521 2.59636L14.2883 5.83255C14.6606 6.20411 14.9559 6.64545 15.1575 7.1313C15.359 7.61715 15.4628 8.13799 15.4628 8.66398C15.4628 9.18997 15.359 9.7108 15.1575 10.1967C14.9559 10.6825 14.6606 11.1238 14.2883 11.4954L13.492 12.2917C13.1733 12.6103 12.9205 12.9886 12.748 13.405C12.5755 13.8214 12.4867 14.2676 12.4867 14.7183C12.4867 15.169 12.5755 15.6153 12.748 16.0317C12.9205 16.448 13.1733 16.8263 13.492 17.145L20.772 24.4269C21.0907 24.7456 21.469 24.9984 21.8853 25.1709C22.3017 25.3434 22.748 25.4322 23.1987 25.4322C23.6494 25.4322 24.0956 25.3434 24.512 25.1709C24.9284 24.9984 25.3067 24.7456 25.6253 24.4269L26.4235 23.6306C26.7951 23.2583 27.2364 22.963 27.7222 22.7614C28.2081 22.5599 28.7289 22.4561 29.2549 22.4561C29.7809 22.4561 30.3017 22.5599 30.7876 22.7614C31.2734 22.963 31.7148 23.2583 32.0863 23.6306L35.3225 26.8668C35.6948 27.2384 35.9902 27.6797 36.1918 28.1656C36.3933 28.6514 36.497 29.1723 36.497 29.6982C36.497 30.2242 36.3933 30.7451 36.1918 31.2309C35.9902 31.7168 35.6948 32.1581 35.3225 32.5297L33.9424 33.9098C31.7091 36.145 28.452 37.1403 25.4869 36.054C20.0636 34.0795 15.1372 30.944 11.0521 26.8668Z" stroke="#1A80E7" strokeWidth="2.84375" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
                <div className="h-[1px] bg-[#0000001A]"></div>
              <div className="flex items-center gap-4 justify-between">
               
                <div>
                  <p className="ff-Graphik font-normal text-[#1E293B] text-[17px] leading-[100%] mb-1.5">
                    For technical issues
                  </p>
                  <a
                    href="mailto:success@oneupai.com"
                    className="ff-jakarta font-bold text-[#0e0e0f] text-[19px] md:text-[22px] leading-[100%] hover:text-[#1a80e7] transition-colors break-all"
                  >
                    success@oneupai.com
                  </a>
                </div>
                 <div className="flex-shrink-0 h-8 w-8">
                  <svg width="100%" height="100%" viewBox="0 0 38 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37.9167 3.79167C37.9167 1.70625 36.2104 0 34.125 0H3.79167C1.70625 0 0 1.70625 0 3.79167V26.5417C0 28.6271 1.70625 30.3333 3.79167 30.3333H34.125C36.2104 30.3333 37.9167 28.6271 37.9167 26.5417V3.79167ZM34.125 3.79167L18.9583 13.2708L3.79167 3.79167H34.125ZM34.125 26.5417H3.79167V7.58333L18.9583 17.0625L34.125 7.58333V26.5417Z" fill="#1A80E7"/>
                    </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <Accordion
              type="single"
              collapsible
              className="w-full flex flex-col gap-0"
            >
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={`item-${index}`}
                  value={`item-${index}`}
                  className="border-b border-[#e5e7eb] last:border-b-0"
                >
                  <AccordionTrigger className="flex items-center justify-between w-full py-5 md:py-6 hover:no-underline [&[data-state=open]>svg]:rotate-0 group">
                    <span className="ff-jakarta font-semibold text-[#0e0e0f] text-base md:text-lg lg:text-xl text-left pr-4 group-hover:text-[#1a80e7] transition-colors">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 md:pb-6">
                    <div className="ff-Graphik font-normal text-slate-700 text-sm md:text-base leading-relaxed pt-1">
                      {item.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

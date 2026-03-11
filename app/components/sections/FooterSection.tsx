import { Button } from "../ui/button";

const footerLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Login", href: "https://dashboard.oneupai.com/onboard" },
  // { label: "Agency Partners", href: "#agency-partners" },
];

export default function FooterSection() {
  return (
    <footer className="w-full bg-[#00244C] text-white">
      {/* CTA Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="flex flex-col items-center gap-6 md:gap-8  text-center">
          <h2 className="ff-jakarta font-bold text-[#ffffff] max-w-[900px] mx-auto md:text-[40px] text-[36px] text-center leading-[120%]">
            Ready to Get More Bookings From Your Website?
          </h2>
          <p className="ff-Graphik font-normal text-[#ffffff] max-w-[800px] mx-auto md:text-[20px] lg:text-xl text-base text-center md:leading-[30px] leading-[24px]">
            Stop sending people to a page that does not convert. Launch your site today and let it bring you leads day and night.
          </p>
          <Button variant='primary' size='md' asChild>
                <a href="https://dashboard.oneupai.com/onboard">Launch My Site</a>
          </Button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-white/10">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <a href="/">
              <img src="/images/white.png" alt="OneUpAI" className="h-20 w-auto" />
              </a>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              {footerLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="ff-Graphik font-normal text-white/80 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Copyright */}
            <p className="ff-Graphik font-normal text-white/60 text-sm">
              © 2026 OneUpAI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

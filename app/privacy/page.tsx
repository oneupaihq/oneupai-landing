import type { Metadata } from "next";
import PageLayout from "@/app/components/PageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy - OneUpAI",
  description: "Privacy Policy for OneUpAI",
};

export default function PrivacyPage() {
  return (
    <PageLayout
      title="Privacy Policy"
      subtitle="OneUpAI"
      lastUpdated="Last Updated: January 14th, 2026"
    >
      {/* Section 1 */}
      <section>
        <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">1. Introduction</h2>
        <div className="space-y-4">
          <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
            This Privacy Policy describes how 99CODESHOP LLC (DBA "OneUpAI") and ONEUPAI SOLUTIONS INC (collectively, "OneUpAI," "we," "us," or "our") collect, use, disclose, and protect your personal information when you use our website at https://oneupai.com (the "Site"), our AI automation services, software development services, SaaS products, educational content, and related services (collectively, the "Services").
          </p>
          <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
            We are committed to protecting your privacy and complying with applicable data protection laws, including the General Data Protection Regulation (GDPR) for users in the European Economic Area (EEA), the Personal Information Protection and Electronic Documents Act (PIPEDA) for users in Canada, and various U.S. state privacy laws including the California Consumer Privacy Act (CCPA) and its amendments.
          </p>
          <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
            By using our Services, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with this Privacy Policy, please do not use our Services.
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section>
        <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">2. Data Controllers</h2>
        <div className="space-y-4">
          <div>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed font-semibold mb-2">
              For users in the United States:
            </p>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
              99CODESHOP LLC (DBA "OneUpAI")
            </p>
          </div>
          <div>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed font-semibold mb-2">
              For users in Canada and other jurisdictions:
            </p>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
              ONEUPAI SOLUTIONS INC
            </p>
          </div>
          <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
            For privacy-related inquiries, please contact us at <a href="mailto:privacy@oneupai.com" className="text-[#1a80e7] hover:underline">privacy@oneupai.com</a>. For legal matters, contact <a href="mailto:legal@oneupai.com" className="text-[#1a80e7] hover:underline">legal@oneupai.com</a>.
          </p>
        </div>
      </section>

      {/* Section 3 */}
      <section>
        <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">3. Information We Collect</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">3.1 Information You Provide to Us</h3>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed mb-3">
              We collect information that you voluntarily provide when you:
            </p>
            <ul className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed space-y-2 pl-6 mb-4">
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Create an account or register for our Services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Subscribe to our SaaS products or services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Request information, support, or consultations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Participate in our educational content, community forums, or webinars</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Schedule appointments or consultations through our calendar system</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Communicate with us via email, phone, or chat</span>
              </li>
            </ul>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed mb-3">
              This information may include:
            </p>
            <ul className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed space-y-2 pl-6">
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Personal identifiers (name, email address, phone number)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Business information (company name, job title, industry)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Account credentials (username, password)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Communication preferences and interests</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Any other information you choose to provide</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">3.2 Payment Information</h3>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
              We use Stripe, a third-party payment processor, to process subscription payments and transactions. We do not directly collect or store your complete payment card information. Stripe collects and processes payment information in accordance with their privacy policy and PCI-DSS standards. We may receive limited payment information such as the last four digits of your card and billing address for record-keeping purposes.
            </p>
          </div>

          <div>
            <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">3.3 Automatically Collected Information</h3>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed mb-3">
              When you access our Site or use our Services, we automatically collect certain information, including:
            </p>
            <ul className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed space-y-2 pl-6">
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Device information (device type, operating system, browser type)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>IP address and approximate geographic location</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Usage data (pages visited, features used, time spent, navigation patterns)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Referral source and campaign information</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Cookies and similar tracking technologies (see Section 8)</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">3.4 Lead and Calendar Data</h3>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
              We collect and process lead information and calendar scheduling data when you book consultations, demos, or other appointments. This includes your contact information, appointment preferences, time zone, and any information you provide during the scheduling process.
            </p>
          </div>

          <div>
            <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">3.5 Third-Party Service Data</h3>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
              If you integrate third-party services with our platform or authorize us to access third-party accounts on your behalf (for AI automation purposes), we may collect information from those services as necessary to provide our Services, subject to the privacy policies and permissions of those third-party platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section>
        <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">4. How We Use Your Information</h2>
        <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed mb-4">
          We use the information we collect for the following purposes:
        </p>
        <ul className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed space-y-2 pl-6">
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>To provide, maintain, and improve our Services</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>To process your transactions and manage subscriptions</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>To create and manage your account</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>To communicate with you about your account, services, and updates</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>To provide customer support and respond to inquiries</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>To deliver AI automation services, software development, and SaaS solutions</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>To provide access to educational content and community platforms</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>To schedule and manage appointments and consultations</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>To send marketing communications (with your consent where required)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>To personalize your experience and recommend relevant content</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>To analyze usage patterns and improve our Services</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>To detect, prevent, and address technical issues, fraud, and security threats</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>To comply with legal obligations and enforce our agreements</span>
          </li>
        </ul>
      </section>

      {/* Section 5 */}
      <section>
        <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">5. Legal Bases for Processing (EEA Users)</h2>
        <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed mb-4">
          For users in the European Economic Area, we process your personal data based on the following legal grounds:
        </p>
        <ul className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed space-y-3 pl-6">
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <div>
              <span className="font-semibold">Contract Performance:</span> Processing necessary to provide Services you've requested or to enter into a contract with you
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <div>
              <span className="font-semibold">Legitimate Interests:</span> Processing necessary for our legitimate business interests, such as improving Services, preventing fraud, and ensuring security
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <div>
              <span className="font-semibold">Consent:</span> Processing based on your explicit consent, such as for marketing communications
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <div>
              <span className="font-semibold">Legal Obligation:</span> Processing necessary to comply with legal requirements
            </div>
          </li>
        </ul>
      </section>

      {/* Section 6 */}
      <section>
        <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">6. How We Share Your Information</h2>
        <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed mb-4">
          We do not sell your personal information. We may share your information in the following circumstances:
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">6.1 Service Providers</h3>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed mb-3">
              We share information with trusted third-party service providers who assist us in operating our business and providing Services:
            </p>
            <ul className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed space-y-2 pl-6 mb-3">
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span><span className="font-semibold">Stripe:</span> Payment processing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span><span className="font-semibold">Supabase:</span> Database and backend services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span><span className="font-semibold">Vercel:</span> Hosting and content delivery</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span><span className="font-semibold">Clerk:</span> Authentication and user management</span>
              </li>
            </ul>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
              These service providers are contractually obligated to protect your information and use it only for the purposes we specify.
            </p>
          </div>

          <div>
            <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">6.2 Business Transfers</h3>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
              If we are involved in a merger, acquisition, sale of assets, or bankruptcy, your information may be transferred as part of that transaction. We will notify you of any such change in ownership or control of your personal information.
            </p>
          </div>

          <div>
            <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">6.3 Legal Requirements</h3>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
              We may disclose your information if required by law, court order, or governmental regulation, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others, investigate fraud, or respond to a government request.
            </p>
          </div>

          <div>
            <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">6.4 With Your Consent</h3>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
              We may share information with third parties when you have given us explicit consent to do so.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7 */}
      <section>
        <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">7. International Data Transfers</h2>
        <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
          Your information may be transferred to and processed in countries other than your country of residence, including the United States and Canada. These countries may have different data protection laws than your jurisdiction. When we transfer personal data from the EEA or UK, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission, to protect your information in accordance with GDPR requirements.
        </p>
      </section>

      {/* Section 8 */}
      <section>
        <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">8. Cookies and Tracking Technologies</h2>
        <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed mb-4">
          We use cookies, web beacons, and similar tracking technologies to collect information about your browsing activities and to provide and improve our Services. Cookies are small data files stored on your device that help us recognize you, remember your preferences, and analyze site usage.
        </p>
        
        <div className="space-y-4">
          <div>
            <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">8.1 Types of Cookies We Use</h3>
            <ul className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed space-y-2 pl-6">
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <div>
                  <span className="font-semibold">Essential Cookies:</span> Required for the operation of our Services (authentication, security)
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <div>
                  <span className="font-semibold">Functional Cookies:</span> Enable enhanced functionality and personalization
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <div>
                  <span className="font-semibold">Analytics Cookies:</span> Help us understand how visitors use our Site
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <div>
                  <span className="font-semibold">Marketing Cookies:</span> Track your visits across websites to deliver relevant advertising
                </div>
              </li>
            </ul>
          </div>
          <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
            You can control cookies through your browser settings. However, disabling certain cookies may affect your ability to use some features of our Services.
          </p>
        </div>
      </section>

      {/* Section 9 */}
      <section>
        <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">9. Data Retention</h2>
        <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed mb-4">
          We retain your personal information for as long as necessary to provide our Services, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it. Specific retention periods depend on the type of data and the purpose for which it was collected:
        </p>
        <ul className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed space-y-2 pl-6">
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>Account information: Retained for the duration of your account plus applicable legal requirements</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>Transaction records: Retained for 7 years for tax and accounting purposes</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>Marketing communications: Retained until you unsubscribe</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>Analytics data: Retained for 26 months</span>
          </li>
        </ul>
      </section>

      {/* Section 10 */}
      <section>
        <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">10. Your Privacy Rights</h2>
        <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed mb-4">
          Depending on your location, you may have the following rights regarding your personal information:
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">10.1 Rights for All Users</h3>
            <ul className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed space-y-2 pl-6">
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <div>
                  <span className="font-semibold">Access:</span> Request a copy of the personal information we hold about you
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <div>
                  <span className="font-semibold">Correction:</span> Request correction of inaccurate or incomplete information
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <div>
                  <span className="font-semibold">Deletion:</span> Request deletion of your personal information
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <div>
                  <span className="font-semibold">Opt-out:</span> Unsubscribe from marketing communications
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">10.2 Additional Rights for EEA Users (GDPR)</h3>
            <ul className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed space-y-2 pl-6">
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <div>
                  <span className="font-semibold">Data Portability:</span> Receive your data in a structured, machine-readable format
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <div>
                  <span className="font-semibold">Restriction of Processing:</span> Request limitation on how we process your data
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <div>
                  <span className="font-semibold">Object to Processing:</span> Object to processing based on legitimate interests
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <div>
                  <span className="font-semibold">Withdraw Consent:</span> Withdraw consent for processing based on consent
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <div>
                  <span className="font-semibold">Lodge a Complaint:</span> File a complaint with your local data protection authority
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">10.3 Additional Rights for Canadian Users (PIPEDA)</h3>
            <ul className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed space-y-2 pl-6">
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Access to information about our privacy practices</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Challenge the accuracy and completeness of your information</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>File a complaint with the Privacy Commissioner of Canada</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">10.4 Additional Rights for California Users (CCPA/CPRA)</h3>
            <ul className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed space-y-2 pl-6">
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Right to know what personal information is collected, used, shared, or sold</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Right to opt-out of the sale or sharing of personal information (we do not sell your data)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Right to non-discrimination for exercising your rights</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Right to limit use of sensitive personal information</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">10.5 Exercising Your Rights</h3>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
              To exercise any of these rights, please contact us at <a href="mailto:privacy@oneupai.com" className="text-[#1a80e7] hover:underline">privacy@oneupai.com</a>. We will respond to your request within the timeframes required by applicable law (typically 30 days for GDPR requests, 45 days for CCPA requests). We may need to verify your identity before processing your request.
            </p>
          </div>
        </div>
      </section>

      {/* Section 11 */}
      <section>
        <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">11. Data Security</h2>
        <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed mb-4">
          We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
        </p>
        <ul className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed space-y-2 pl-6 mb-4">
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>Encryption of data in transit and at rest</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>Regular security assessments and monitoring</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>Access controls and authentication measures</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>Employee training on data protection</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#1a80e7] mt-1">•</span>
            <span>Secure third-party service provider agreements</span>
          </li>
        </ul>
        <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
          However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
        </p>
      </section>

      {/* Section 12 */}
      <section>
        <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">12. Children's Privacy</h2>
        <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
          Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at <a href="mailto:privacy@oneupai.com" className="text-[#1a80e7] hover:underline">privacy@oneupai.com</a>, and we will delete such information from our systems.
        </p>
      </section>

      {/* Section 13 */}
      <section>
        <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">13. Third-Party Links and Services</h2>
        <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
          Our Site and Services may contain links to third-party websites, applications, or services that are not operated by us. This Privacy Policy does not apply to such third-party services. We encourage you to review the privacy policies of any third-party services you access through our Site or Services.
        </p>
      </section>

      {/* Section 14 */}
      <section>
        <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">14. Changes to This Privacy Policy</h2>
        <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
          We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the updated Privacy Policy on our Site and updating the "Last Updated" date. For significant changes, we may provide additional notice, such as via email or a prominent notice on our Site. Your continued use of our Services after such changes constitutes acceptance of the updated Privacy Policy.
        </p>
      </section>

      {/* Section 15 */}
      <section className="bg-gradient-to-br from-[#e8f7fb] to-[#d4f1f9] rounded-[20px] p-6 md:p-8">
        <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">15. Contact Us</h2>
        <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed mb-4">
          If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
        </p>
        
        <div className="space-y-4">
          <div>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg font-semibold mb-1">For Privacy Inquiries:</p>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg">
              Email: <a href="mailto:privacy@oneupai.com" className="text-[#1a80e7] hover:underline">privacy@oneupai.com</a>
            </p>
          </div>

          <div>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg font-semibold mb-1">For Legal Matters:</p>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg">
              Email: <a href="mailto:legal@oneupai.com" className="text-[#1a80e7] hover:underline">legal@oneupai.com</a>
            </p>
          </div>
          
          <div>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg font-semibold mb-2">Mailing Address:</p>
            <div className="space-y-3">
              <div>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg">99CODESHOP LLC (DBA "OneUpAI")</p>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg">4030 Wake Forest Road, STE 349</p>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg">Raleigh, NC 27609</p>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg">USA</p>
              </div>
              <div>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg">ONEUPAI SOLUTIONS INC</p>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg">67 D30 Suite 1003</p>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg">Vaughan, ON L4L 9J8</p>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg">Canada</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">15.1 EEA Representative</h3>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
              For users in the European Economic Area, you may also contact our designated representative for GDPR matters at <a href="mailto:privacy@oneupai.com" className="text-[#1a80e7] hover:underline">privacy@oneupai.com</a>.
            </p>
          </div>
        </div>
      </section>

      <p className="ff-Graphik text-[#64748B] text-sm md:text-base leading-relaxed italic text-center pt-8">
        By using OneUpAI's Services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
      </p>
    </PageLayout>
  );
}

import type { Metadata } from "next";
import PageLayout from "@/app/components/PageLayout";

export const metadata: Metadata = {
  title: "Terms of Service - OneUpAI",
  description: "Terms of Service for OneUpAI - Read our terms and conditions for using our services.",
};

export default function TermsPage() {
  return (
    <PageLayout
      title="Terms of Service"
      subtitle="OneUpAI"
      lastUpdated="Last Updated: January 14th, 2026"
    >
          {/* Section 1 */}
          <section>
            <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">1. Acceptance of Terms</h2>
            <div className="space-y-4">
              <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                These Terms of Service ("Terms") constitute a legally binding agreement between you ("you," "your," or "User") and 99CODESHOP LLC (DBA "OneUpAI") and ONEUPAI SOLUTIONS INC (collectively, "OneUpAI," "we," "us," or "our") governing your access to and use of the OneUpAI website at https://oneupai.com (the "Site"), our AI automation services, software development services, SaaS products, educational content, community platforms, and all related services (collectively, the "Services").
              </p>
              <div className="bg-[#FFF8E7] border-l-4 border-[#FFC848] p-4 rounded-r-lg">
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed font-semibold">
                  BY ACCESSING OR USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS AND OUR PRIVACY POLICY. IF YOU DO NOT AGREE TO THESE TERMS, YOU MUST NOT ACCESS OR USE OUR SERVICES.
                </p>
              </div>
              <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of material changes by posting updated Terms on our Site and updating the "Last Updated" date.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">2. Eligibility and Account Registration</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">2.1 Age Requirement</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that you meet this age requirement and have the legal capacity to enter into these Terms.
                </p>
              </div>

              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">2.2 Account Creation</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed mb-3">
                  To access certain features of our Services, you may be required to create an account. You agree to:
                </p>
                <ul className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed space-y-2 pl-6">
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a80e7] mt-1">•</span>
                    <span>Provide accurate, current, and complete information during registration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a80e7] mt-1">•</span>
                    <span>Maintain and promptly update your account information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a80e7] mt-1">•</span>
                    <span>Maintain the security and confidentiality of your account credentials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a80e7] mt-1">•</span>
                    <span>Notify us immediately of any unauthorized access or security breach</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a80e7] mt-1">•</span>
                    <span>Accept responsibility for all activities that occur under your account</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">2.3 Business Accounts</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  If you are creating an account on behalf of a business or organization, you represent that you have the authority to bind that entity to these Terms, and references to "you" in these Terms include both you individually and the entity you represent.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">3. Description of Services</h2>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed mb-4">
              OneUpAI provides the following categories of Services:
            </p>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#e8f7fb] to-[#d4f1f9] rounded-[20px] p-6">
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">3.1 Professional Services</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed mb-3">
                  Done-for-you AI implementation services, including:
                </p>
                <ul className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed space-y-2 pl-6">
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a80e7] mt-1">•</span>
                    <span>AI agent development and deployment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a80e7] mt-1">•</span>
                    <span>AI-powered website creation and optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a80e7] mt-1">•</span>
                    <span>Automation workflow design and implementation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a80e7] mt-1">•</span>
                    <span>Custom AI solution development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a80e7] mt-1">•</span>
                    <span>Phone banking systems and related applications</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#e8f7fb] to-[#d4f1f9] rounded-[20px] p-6">
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">3.2 Software Development Services</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  Custom software development, system integration, technical consulting, and software architecture services tailored to your business needs.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#e8f7fb] to-[#d4f1f9] rounded-[20px] p-6">
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">3.3 SaaS Products and Templates</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  Subscription-based access to AI-powered web templates, SaaS solutions, automation tools, and related software platforms provided on a recurring billing basis.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#e8f7fb] to-[#d4f1f9] rounded-[20px] p-6">
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">3.4 Educational Content and Community</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  Access to educational resources, community platforms, webinars, tutorials, and related content designed to help you learn about and implement AI solutions.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">4. Subscription Terms and Billing</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">4.1 Subscription Plans</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  We offer various subscription tiers and service packages with different features, pricing, and billing cycles. Current pricing and plan details are available on our Site and may be updated from time to time. We will provide notice of material pricing changes as required by applicable law.
                </p>
              </div>

              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">4.2 Free Trial</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  We offer a 14-day free trial for eligible new subscribers. To access the trial, you must provide valid payment information. If you do not cancel before the trial period ends, your subscription will automatically convert to a paid subscription, and you will be charged the applicable subscription fee. We reserve the right to limit free trial eligibility and to modify or discontinue trials at any time.
                </p>
              </div>

              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">4.3 Billing and Payment</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed mb-3">
                  By subscribing to our Services, you agree to the following:
                </p>
                <ul className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed space-y-2 pl-6">
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a80e7] mt-1">•</span>
                    <span>Subscription fees are billed in advance on a recurring basis (monthly, annually, or as otherwise specified)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a80e7] mt-1">•</span>
                    <span>All payments are processed through Stripe, our third-party payment processor</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a80e7] mt-1">•</span>
                    <span>You authorize us to charge your designated payment method on each billing cycle</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a80e7] mt-1">•</span>
                    <span>You are responsible for providing accurate and current payment information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a80e7] mt-1">•</span>
                    <span>All fees are non-refundable except as expressly stated in these Terms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a80e7] mt-1">•</span>
                    <span>Prices are exclusive of applicable taxes, which you are responsible for paying</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">4.4 Automatic Renewal</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  Your subscription will automatically renew at the end of each billing cycle unless you cancel before the renewal date. The renewal charge will be at the then-current subscription rate.
                </p>
              </div>

              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">4.5 Failed Payments</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  If a payment fails or is declined, we may attempt to process the payment again. We reserve the right to suspend or terminate your access to the Services if payment cannot be successfully processed. You remain responsible for any uncollected amounts.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">5. Cancellation and Refunds</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">5.1 Cancellation During Trial</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  You may cancel your subscription at any time during the 14-day trial period without being charged. To cancel, you must submit a cancellation request through your account dashboard or by contacting our support team. Cancellations submitted before the trial period ends will prevent automatic conversion to a paid subscription.
                </p>
              </div>

              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">5.2 Cancellation After Trial</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  If you cancel your subscription after the trial period has ended, the cancellation will take effect immediately, and you will retain access to the Services through the end of your current billing period. No refunds will be provided for any unused portion of your subscription. You will not be charged for subsequent billing cycles.
                </p>
              </div>

              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">5.3 Refund Policy</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  All subscription fees and service charges are non-refundable except as required by applicable law. For professional services and custom software development projects, specific refund terms will be outlined in the applicable Statement of Work or service agreement.
                </p>
              </div>

              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">5.4 Termination by OneUpAI</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  We reserve the right to suspend or terminate your account and access to the Services at any time, with or without notice, for any reason, including violation of these Terms, fraudulent activity, or non-payment. In the event of termination for cause, no refunds will be provided.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">6. Intellectual Property Rights</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">6.1 OneUpAI Intellectual Property</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  All content, features, functionality, software, code, designs, graphics, logos, text, images, and other materials provided through our Services (excluding User Content as defined below) are owned by OneUpAI or our licensors and are protected by copyright, trademark, patent, and other intellectual property laws. You may not copy, modify, reproduce, distribute, transmit, display, perform, publish, license, create derivative works from, transfer, or sell any information, software, products, or services obtained from our Services without our express written permission.
                </p>
              </div>

              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">6.2 Limited License</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Services for your personal or internal business purposes. This license does not include any right to: (a) resell or make commercial use of the Services; (b) collect or use product listings, descriptions, or prices; (c) make derivative uses of the Services; (d) download or copy account information; or (e) use data mining, robots, or similar data gathering tools.
                </p>
              </div>

              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">6.3 Custom Development and Work Product</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  For professional services and custom software development projects, ownership of deliverables and work product will be specified in the applicable Statement of Work or service agreement. Unless otherwise agreed in writing, OneUpAI retains ownership of all pre-existing intellectual property, tools, frameworks, libraries, and general knowledge used in providing the Services.
                </p>
              </div>

              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">6.4 User Content</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  You retain ownership of any content, data, materials, or information you provide to us ("User Content"). By providing User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, and display such content solely for the purpose of providing the Services to you. You represent and warrant that you have all necessary rights to grant this license and that your User Content does not infringe any third-party rights.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">7. User Responsibilities and Conduct</h2>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed mb-4">
              You agree to use the Services only for lawful purposes and in accordance with these Terms. You agree NOT to:
            </p>
            <ul className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed space-y-2 pl-6">
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Violate any applicable laws, regulations, or third-party rights</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Use the Services to transmit any harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable content</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Interfere with or disrupt the Services or servers or networks connected to the Services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Attempt to gain unauthorized access to any portion of the Services or any systems or networks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Use the Services to send spam, unsolicited communications, or engage in phishing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Upload or transmit viruses, malware, or other malicious code</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Impersonate any person or entity or falsely state or misrepresent your affiliation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Reverse engineer, decompile, or disassemble any software provided through the Services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Use automated systems or bots to access the Services without authorization</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1a80e7] mt-1">•</span>
                <span>Share your account credentials or allow unauthorized access to your account</span>
              </li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">8. Service Availability and Modifications</h2>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
              We strive to provide reliable and consistent Services, but we do not guarantee uninterrupted or error-free operation. The Services may be temporarily unavailable due to maintenance, updates, or factors beyond our control. We reserve the right to modify, suspend, or discontinue any aspect of the Services at any time, with or without notice. We will not be liable for any modification, suspension, or discontinuation of the Services.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">9. Third-Party Services and Integrations</h2>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
              Our Services may integrate with or contain links to third-party services, applications, or websites. We do not control, endorse, or assume responsibility for any third-party services. Your use of third-party services is governed by their respective terms and privacy policies. We are not responsible for any damages or losses resulting from your use of third-party services.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">10. Disclaimers and Warranties</h2>
            <div className="space-y-4">
              <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed font-semibold">
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
              </p>
              <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed font-semibold">
                WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE SERVICES OR SERVERS ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. WE MAKE NO WARRANTIES REGARDING THE ACCURACY, RELIABILITY, OR COMPLETENESS OF ANY CONTENT OR INFORMATION PROVIDED THROUGH THE SERVICES.
              </p>
              <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                ANY ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED FROM ONEUPAI OR THROUGH THE SERVICES DOES NOT CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THESE TERMS.
              </p>
              <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO SOME OF THE ABOVE EXCLUSIONS MAY NOT APPLY TO YOU.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">11. Limitation of Liability</h2>
            <div className="space-y-4">
              <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed font-semibold">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL ONEUPAI, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, REVENUE, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO YOUR USE OR INABILITY TO USE THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed font-semibold">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID TO US FOR THE SERVICES IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.
              </p>
              <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">12. Indemnification</h2>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
              You agree to indemnify, defend, and hold harmless OneUpAI, its affiliates, and their respective officers, directors, employees, agents, and licensors from and against any claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to: (a) your use of the Services; (b) your violation of these Terms; (c) your violation of any rights of another party; (d) your User Content; or (e) any fraudulent, negligent, or unlawful conduct.
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">13. Governing Law and Dispute Resolution</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">13.1 Governing Law</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed mb-3">
                  For users in the United States: These Terms shall be governed by and construed in accordance with the laws of the state where 99CODESHOP LLC is registered, without regard to conflict of law principles.
                </p>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed mb-3">
                  For users in Canada: These Terms shall be governed by and construed in accordance with the laws of the province where ONEUPAI SOLUTIONS INC is registered and the federal laws of Canada applicable therein.
                </p>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  For users in the European Economic Area: These Terms shall be governed by the laws of your country of residence to the extent required by applicable consumer protection laws.
                </p>
              </div>

              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">13.2 Dispute Resolution</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  Any dispute, controversy, or claim arising out of or relating to these Terms or the Services shall first be attempted to be resolved through good faith negotiations between the parties. If the dispute cannot be resolved through negotiation within thirty (30) days, the dispute may be submitted to mediation or arbitration as agreed by the parties, or resolved through litigation in accordance with the jurisdiction provisions below.
                </p>
              </div>

              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">13.3 Jurisdiction and Venue</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  Subject to applicable consumer protection laws, you agree to submit to the personal jurisdiction of the courts located in the jurisdiction where the applicable OneUpAI entity is registered for the purpose of litigating all such claims or disputes.
                </p>
              </div>

              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">13.4 Consumer Rights</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  Nothing in these Terms shall affect any statutory rights that you may have as a consumer that cannot be waived or limited by contract under applicable law.
                </p>
              </div>
            </div>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">14. Modifications to Terms</h2>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
              We reserve the right to modify these Terms at any time. When we make material changes, we will post the updated Terms on our Site and update the "Last Updated" date. For significant changes, we may provide additional notice such as via email or a prominent notice on our Site. Your continued use of the Services after the effective date of the revised Terms constitutes your acceptance of the changes. If you do not agree to the modified Terms, you must stop using the Services and cancel your account.
            </p>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">15. General Provisions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">15.1 Entire Agreement</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  These Terms, together with our Privacy Policy and any applicable service agreements or Statements of Work, constitute the entire agreement between you and OneUpAI regarding the Services and supersede all prior agreements and understandings.
                </p>
              </div>

              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">15.2 Severability</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect, and the invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
                </p>
              </div>

              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">15.3 Waiver</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. Any waiver must be in writing and signed by an authorized representative of OneUpAI.
                </p>
              </div>

              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">15.4 Assignment</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  You may not assign or transfer these Terms or your rights and obligations hereunder without our prior written consent. We may assign these Terms without restriction. Any attempted assignment in violation of this section shall be null and void.
                </p>
              </div>

              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">15.5 Force Majeure</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including acts of God, natural disasters, war, terrorism, labor disputes, or internet service failures.
                </p>
              </div>

              <div>
                <h3 className="ff-jakarta font-semibold text-[#000000] text-xl md:text-2xl mb-3">15.6 Survival</h3>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed">
                  All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnification, and limitations of liability.
                </p>
              </div>
            </div>
          </section>

          {/* Section 16 */}
          <section className="bg-gradient-to-br from-[#e8f7fb] to-[#d4f1f9] rounded-[20px] p-6 md:p-8">
            <h2 className="ff-jakarta font-bold text-[#000000] text-2xl md:text-3xl mb-4">16. Contact Information</h2>
            <p className="ff-Graphik text-[#1E293B] text-base md:text-lg leading-relaxed mb-4">
              If you have questions, concerns, or disputes regarding these Terms, please contact us:
            </p>
            
            <div className="space-y-4">
              <div>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg font-semibold mb-1">For Legal Matters:</p>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg">
                  Email: <a href="mailto:legal@oneupai.com" className="text-[#1a80e7] hover:underline">legal@oneupai.com</a>
                </p>
              </div>

              <div>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg font-semibold mb-1">For General Inquiries:</p>
                <p className="ff-Graphik text-[#1E293B] text-base md:text-lg">
                  Website: <a href="https://oneupai.com" className="text-[#1a80e7] hover:underline">https://oneupai.com</a>
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
            </div>
          </section>

          <p className="ff-Graphik text-[#64748B] text-sm md:text-base leading-relaxed italic text-center pt-8">
            By using OneUpAI's Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </PageLayout>
      );
    }

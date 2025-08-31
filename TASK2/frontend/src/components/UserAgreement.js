import React from 'react';

const UserAgreement = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">User Agreement</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-600 mb-4">
                This User Agreement ("Agreement") is a contract between you and ProjectFlow ("we," "us," or "our") 
                that governs your use of our project management platform and services. By accessing or using our services, 
                you agree to be bound by this Agreement and all applicable laws and regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Eligibility</h2>
              <p className="text-gray-600 mb-4">
                To use our services, you must be at least 18 years old and have the legal capacity to enter into this Agreement. 
                If you are using our services on behalf of an organization, you represent that you have the authority to bind that organization to this Agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Account Registration and Security</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  When you create an account, you agree to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                  <li>Not share your account credentials with others</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use Policy</h2>
              <p className="text-gray-600 mb-4">You agree to use our services only for lawful purposes and in accordance with this Agreement. You agree not to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Use the services for any illegal or unauthorized purpose</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Upload or transmit malicious code, viruses, or harmful content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the services</li>
                <li>Use the services for spam or unsolicited communications</li>
                <li>Reverse engineer or attempt to extract source code</li>
                <li>Use automated systems to access the services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Content and Data</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ownership</h3>
                  <p className="text-gray-600 mb-2">
                    You retain ownership of all content and data you create, upload, or store using our services. 
                    You are responsible for ensuring you have the necessary rights to use such content.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">License</h3>
                  <p className="text-gray-600 mb-2">
                    By using our services, you grant us a limited, non-exclusive license to use, store, and display your content 
                    solely for the purpose of providing and improving our services.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Protection</h3>
                  <p className="text-gray-600 mb-2">
                    We implement appropriate security measures to protect your data. However, you are responsible for backing up your important data.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Subscription and Billing</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Our services are offered on a subscription basis. By subscribing, you agree to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Pay all fees associated with your chosen plan</li>
                  <li>Provide accurate billing information</li>
                  <li>Authorize recurring payments</li>
                  <li>Pay applicable taxes and fees</li>
                  <li>Maintain valid payment methods</li>
                </ul>
                <p className="text-gray-600">
                  We reserve the right to modify pricing with 30 days' notice. Subscription fees are non-refundable except as provided in our refund policy.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Service Availability and Support</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  We strive to maintain high availability of our services, but we do not guarantee uninterrupted access. 
                  The services may be temporarily unavailable due to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Scheduled maintenance and updates</li>
                  <li>Technical issues or system failures</li>
                  <li>Force majeure events</li>
                  <li>Third-party service disruptions</li>
                </ul>
                <p className="text-gray-600">
                  We provide support through various channels including email, chat, and phone. Support availability may vary by subscription plan.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property Rights</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Our services, including all software, content, and intellectual property, are owned by ProjectFlow and protected by copyright, 
                  trademark, and other intellectual property laws.
                </p>
                <p className="text-gray-600">
                  You may not copy, modify, distribute, sell, or lease any part of our services without our written permission.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Privacy and Data Protection</h2>
              <p className="text-gray-600 mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, 
                which is incorporated into this Agreement by reference. By using our services, you consent to our collection and use of information as described in our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                To the maximum extent permitted by law, ProjectFlow shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages arising from your use of our services. Our total liability shall not exceed 
                the amount you paid for the services in the 12 months preceding the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Indemnification</h2>
              <p className="text-gray-600 mb-4">
                You agree to indemnify and hold harmless ProjectFlow, its officers, directors, employees, and agents from and against any claims, 
                damages, obligations, losses, liabilities, costs, or debt arising from your use of the services or violation of this Agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Termination</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Either party may terminate this Agreement at any time. We may terminate your account immediately if you:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Violate this Agreement</li>
                  <li>Fail to pay subscription fees</li>
                  <li>Engage in fraudulent or illegal activity</li>
                  <li>Use the services in a manner that could harm us or others</li>
                </ul>
                <p className="text-gray-600">
                  Upon termination, your access to the services will cease immediately, and we may delete your account and data.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Dispute Resolution</h2>
              <p className="text-gray-600 mb-4">
                Any disputes arising from this Agreement or your use of our services shall be resolved through binding arbitration 
                in accordance with the rules of the American Arbitration Association, unless prohibited by law. 
                The arbitration shall be conducted in English and the seat of arbitration shall be in the jurisdiction specified in our Terms of Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Governing Law</h2>
              <p className="text-gray-600 mb-4">
                This Agreement shall be governed by and construed in accordance with the laws of the jurisdiction in which ProjectFlow operates, 
                without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Changes to Agreement</h2>
              <p className="text-gray-600 mb-4">
                We may modify this Agreement from time to time. We will notify you of material changes via email or through the services. 
                Your continued use of the services after such modifications constitutes acceptance of the updated Agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Severability</h2>
              <p className="text-gray-600 mb-4">
                If any provision of this Agreement is found to be unenforceable or invalid, that provision will be limited or eliminated 
                to the minimum extent necessary so that this Agreement will otherwise remain in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Entire Agreement</h2>
              <p className="text-gray-600 mb-4">
                This Agreement, together with our Privacy Policy, Terms of Service, and Cookie Policy, constitutes the entire agreement 
                between you and ProjectFlow regarding the use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this User Agreement, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 mb-2"><strong>Email:</strong> nikamharshadshivaji@gmail.com</p>
                <p className="text-gray-600 mb-2"><strong>Phone:</strong> +91 9156633238</p>
                <p className="text-gray-600 mb-2"><strong>GitHub:</strong> <a href="https://github.com/dev-harshhh19" target="_blank" rel="noopener noreferrer">dev-harshhh19</a></p>
                <p className="text-gray-600 mb-2"><strong>LinkedIn:</strong> <a href="https://in.linkedin.com/in/harshad-nikam-311734281" target="_blank" rel="noopener noreferrer">harshad-nikam-311734281</a></p>
                <p className="text-gray-600 mb-2"><strong>Instagram:</strong> <a href="https://instagram.com/dev.harshhh19/" target="_blank" rel="noopener noreferrer">@dev.harshhh19</a></p>
                <p className="text-gray-600 mb-2"><strong>Twitter:</strong> <a href="https://twitter.com/not_harshad_19/" target="_blank" rel="noopener noreferrer">@not_harshad_19</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAgreement; 
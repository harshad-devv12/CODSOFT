import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
              <p className="text-gray-600 mb-4">
                Cookies are small text files that are placed on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences, 
                analyzing how you use our site, and personalizing content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-600 mb-4">We use cookies for the following purposes:</p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                  <p className="text-gray-600 mb-2">These cookies are necessary for the website to function properly. They enable basic functions like:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>User authentication and login</li>
                    <li>Session management</li>
                    <li>Security features</li>
                    <li>Basic site functionality</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Cookies</h3>
                  <p className="text-gray-600 mb-2">These cookies help us understand how visitors interact with our website by:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Collecting information about page visits</li>
                    <li>Analyzing site performance</li>
                    <li>Identifying areas for improvement</li>
                    <li>Measuring loading times</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Functional Cookies</h3>
                  <p className="text-gray-600 mb-2">These cookies enhance your experience by:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Remembering your preferences</li>
                    <li>Personalizing content</li>
                    <li>Storing language settings</li>
                    <li>Maintaining user preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Cookies</h3>
                  <p className="text-gray-600 mb-2">These cookies help us improve our services by:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Tracking user behavior</li>
                    <li>Understanding user demographics</li>
                    <li>Measuring campaign effectiveness</li>
                    <li>Optimizing user experience</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Session Cookies</h3>
                  <p className="text-gray-600 mb-2">These cookies are temporary and are deleted when you close your browser. They help maintain your session while using our website.</p>
                  <p className="text-sm text-gray-500">Duration: Browser session</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Persistent Cookies</h3>
                  <p className="text-gray-600 mb-2">These cookies remain on your device for a set period and are used to remember your preferences and settings.</p>
                  <p className="text-sm text-gray-500">Duration: Up to 2 years</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Cookies</h3>
                  <p className="text-gray-600 mb-2">These cookies are set by third-party services we use, such as analytics providers and payment processors.</p>
                  <p className="text-sm text-gray-500">Duration: Varies by provider</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Cookies</h2>
              <p className="text-gray-600 mb-4">
                We may use third-party services that set their own cookies. These services include:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Google Analytics</h4>
                  <p className="text-sm text-gray-600">Website analytics and performance tracking</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Stripe</h4>
                  <p className="text-sm text-gray-600">Payment processing and security</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Intercom</h4>
                  <p className="text-sm text-gray-600">Customer support and chat functionality</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Hotjar</h4>
                  <p className="text-sm text-gray-600">User behavior analysis and heatmaps</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Managing Cookies</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Browser Settings</h3>
                  <p className="text-gray-600 mb-2">You can control cookies through your browser settings:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
                    <li>Firefox: Options → Privacy & Security → Cookies and Site Data</li>
                    <li>Safari: Preferences → Privacy → Manage Website Data</li>
                    <li>Edge: Settings → Cookies and site permissions → Cookies and site data</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Cookie Consent</h3>
                  <p className="text-gray-600 mb-2">
                    When you first visit our website, you'll see a cookie consent banner. You can:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Accept all cookies</li>
                    <li>Reject non-essential cookies</li>
                    <li>Customize your preferences</li>
                    <li>Change your settings later</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Impact of Disabling Cookies</h2>
              <p className="text-gray-600 mb-4">
                While you can disable cookies, doing so may affect the functionality of our website:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>You may need to log in repeatedly</li>
                <li>Some features may not work properly</li>
                <li>Your preferences won't be remembered</li>
                <li>Personalized content may not be available</li>
                <li>Site performance may be affected</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookie Retention Periods</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Cookie Type</th>
                      <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Purpose</th>
                      <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Session ID</td>
                      <td className="border border-gray-200 px-4 py-2">User authentication</td>
                      <td className="border border-gray-200 px-4 py-2">Browser session</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Language</td>
                      <td className="border border-gray-200 px-4 py-2">Language preference</td>
                      <td className="border border-gray-200 px-4 py-2">1 year</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Theme</td>
                      <td className="border border-gray-200 px-4 py-2">UI theme preference</td>
                      <td className="border border-gray-200 px-4 py-2">1 year</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Analytics</td>
                      <td className="border border-gray-200 px-4 py-2">Website analytics</td>
                      <td className="border border-gray-200 px-4 py-2">2 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Updates to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. 
                We will notify you of any material changes by posting the updated policy on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
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

export default CookiePolicy; 
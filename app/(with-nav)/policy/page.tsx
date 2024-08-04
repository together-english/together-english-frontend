import "../../../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "정책 페이지",
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-12">
            Privacy Policy
          </h1>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Introduction</h2>
            <p className="mb-6">
              Welcome to English Together. We value your privacy and are
              committed to protecting your personal information. This Privacy
              Policy explains how we collect, use, and safeguard your
              information when you visit our website and use our services.
            </p>
            <h2 className="text-2xl font-semibold mb-6">
              Information We Collect
            </h2>
            <ul className="list-disc list-inside mb-6">
              <li>
                Personal Information: We may collect personal information such
                as your name, email address, and contact details when you
                register or interact with our platform.
              </li>
              <li>
                Usage Data: We may collect information about how you use our
                website and services, including your IP address, browser type,
                and pages visited.
              </li>
              <li>
                Cookies: We use cookies to enhance your experience on our
                website. You can control cookies through your browser settings.
              </li>
            </ul>
            <h2 className="text-2xl font-semibold mb-6">
              How We Use Your Information
            </h2>
            <p className="mb-6">We use your information to:</p>
            <ul className="list-disc list-inside mb-6">
              <li>Provide and improve our services.</li>
              <li>
                Communicate with you, including sending updates and promotional
                materials.
              </li>
              <li>
                Analyze usage and trends to enhance our website and services.
              </li>
            </ul>
            <h2 className="text-2xl font-semibold mb-6">Data Security</h2>
            <p className="mb-6">
              We implement security measures to protect your personal
              information from unauthorized access, disclosure, or misuse.
              However, please be aware that no method of transmission over the
              Internet or electronic storage is completely secure.
            </p>
            <h2 className="text-2xl font-semibold mb-6">Your Rights</h2>
            <p className="mb-6">
              You have the right to access, correct, or delete your personal
              information. If you have any questions or requests regarding your
              data, please contact us using the details provided below.
            </p>
            <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
            <p className="mb-6">
              If you have any questions about this Privacy Policy or our
              practices, please contact us at:
              <a
                href="mailto:support@englishtogether.com"
                className="text-blue-500 hover:underline"
              >
                support@englishtogether.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

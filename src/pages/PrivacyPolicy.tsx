
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RouteHead from "@/components/RouteHead";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen">
      <RouteHead
        title="Privacy Policy — Lionvest Realty"
        description="Learn how Lionvest Realty collects, uses, and safeguards your personal information when you browse properties and services across Gurgaon and Delhi NCR."
        path="/privacy-policy"
      />
      <Navbar />
      
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-display text-lion-black">Privacy Policy</h1>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-lion-gold to-lion-darkgold mx-auto mt-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose max-w-none text-gray-700 bg-white p-8 rounded-lg shadow-md"
          >
            <p className="mb-6">
              This Privacy Policy governs how Lionvest Realty collects, uses, maintains, and discloses information from users ("User") of the website ("Site"). This policy applies to the Site and all products and services offered by Lionvest Realty.
            </p>
            
            <h2 className="text-2xl font-display text-lion-black mt-8 mb-4">Personal Identification Information</h2>
            <p className="mb-6">
              We may collect personal identification information from Users through various interactions on our Site. While Users can visit the Site anonymously, personal data is only collected when voluntarily submitted. Refusing to provide personal information may limit access to certain features of the Site.
            </p>
            
            <h2 className="text-2xl font-display text-lion-black mt-8 mb-4">Non-Personal Identification Information</h2>
            <p className="mb-6">
              We also collect non-personal identification information whenever Users interact with our Site. This may include details such as browser type, device information, operating system, and internet service provider. This data is used to help improve the overall experience.
            </p>
            
            <h2 className="text-2xl font-display text-lion-black mt-8 mb-4">Web Browser Cookies</h2>
            <p className="mb-6">
              Our Site may use "cookies" to enhance User experience. Cookies are placed on your device for record-keeping and to track certain information about your visit. Users can set their browser to refuse cookies or alert them when cookies are sent; however, some parts of the Site may not function properly if cookies are disabled.
            </p>
            
            <h2 className="text-2xl font-display text-lion-black mt-8 mb-4">Use of Project Images</h2>
            <p className="mb-6">
              In addition to textual content, our Site displays images of the projects we are selling. These images are used solely for informational and marketing purposes. Lionvest Realty does not claim ownership of images provided by third parties, and any such images are subject to the original source's rights.
            </p>
            
            <h2 className="text-2xl font-display text-lion-black mt-8 mb-4">Protection of Your Information</h2>
            <p className="mb-6">
              We implement appropriate data collection, storage, and processing practices along with security measures to safeguard personal information, including usernames, passwords, and transaction details, from unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h2 className="text-2xl font-display text-lion-black mt-8 mb-4">Sharing Your Personal Information</h2>
            <p className="mb-6">
              Lionvest Realty does not sell, trade, or rent Users' personal identification information to others. We may share aggregated demographic data not linked to any personal identification information with business partners, trusted affiliates, and advertisers for analytical and marketing purposes.
            </p>
            
            <h2 className="text-2xl font-display text-lion-black mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p className="mb-6">
              Lionvest Realty reserves the right to update this Privacy Policy at any time. Any changes will be posted on this page with a revised updated date. Users are encouraged to check this policy periodically to stay informed of any modifications.
            </p>
            
            <h2 className="text-2xl font-display text-lion-black mt-8 mb-4">Acceptance of These Terms</h2>
            <p className="mb-6">
              By using this Site, you acknowledge and accept this Privacy Policy. If you do not agree with this policy, please do not use our Site. Continued use of the Site after any changes signifies your acceptance of those changes.
            </p>
            
            <div className="flex items-center justify-center mt-12 mb-4">
              <div className="w-24 h-1 bg-gradient-to-r from-lion-gold to-lion-darkgold rounded-full"></div>
            </div>
            
            <p className="text-center text-gray-500 text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

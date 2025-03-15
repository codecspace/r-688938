
import { motion } from "framer-motion";
import { Button } from "./ui/button";

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm uppercase tracking-wider text-lion-gold mb-2">About us</h2>
              <h3 className="text-4xl font-display text-lion-black mb-6">About Lionvest Realty</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  At Lionvest Realty Pvt. Ltd., We are committed to providing seamless and expert real estate solutions for residential and commercial property buyers in Delhi, Noida and Gurgaon. With a vision to simplify property transactions, we provide strategic guidance and unmatched support to help you make informed investment decisions.
                </p>
                <p>
                  Our name, "Lionvest" is more than just one brand, it is a symbol of the strength, confidence and reliability that brings into the real estate market. The lion symbol:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-semibold">Strength and power:</span> Performing our dominance and leadership in the real estate industry.</li>
                  <li><span className="font-semibold">Courage and belief:</span> to empower customers with bold, well informed investment options.</li>
                  <li><span className="font-semibold">Authority and reputation:</span> establishing faith through reliability, expertise and excellence.</li>
                  <li><span className="font-semibold">Protection and reliability:</span> to ensure safe and transparent property transactions.</li>
                </ul>
                <p>
                  With a client-first approach, we are proud to give real estate solutions supported by deep market insight and unwavering integrity. Whether you are looking for your dream house or a strategic commercial investment, Lionvest Realty Private. Limited Dynamic is your reliable partner in navigating the real estate landscape.
                </p>
              </div>
              <Button className="mt-8 bg-lion-gold hover:bg-lion-darkgold text-black">
                Learn More
              </Button>
            </motion.div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-64 h-64 bg-lion-gold/20 rounded-lg"></div>
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
              alt="Modern building"
              className="w-full h-[500px] object-cover rounded-lg shadow-xl relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

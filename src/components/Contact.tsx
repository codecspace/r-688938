
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { useState } from "react";
import { toast } from "./ui/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, consent: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "We'll get back to you as soon as possible!",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        consent: false
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm uppercase tracking-wider text-lion-gold mb-2">Contact Us</h2>
          <h3 className="text-4xl font-display text-lion-black">How To Find Us</h3>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-2xl font-display text-lion-black mb-6">Real Estate Agency</h3>
              
              <div className="space-y-6 mb-8 text-gray-700">
                <div className="flex items-start">
                  <MapPin className="text-lion-gold mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lion-black">Gurugram</h4>
                    <address className="not-italic">
                      Sector - 63A, Gurugram, Haryana
                    </address>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="text-lion-gold mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lion-black">Phone</h4>
                    <p>9773552334</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="text-lion-gold mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lion-black">Mobile</h4>
                    <p>9773552334</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="text-lion-gold mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lion-black">Email</h4>
                    <p>Lionvestrealty@gmail.com</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 mt-6 border-t border-gray-200">
                <h4 className="font-semibold text-lion-black flex items-center mb-4">
                  <Clock className="text-lion-gold mr-2" /> Opening Hours
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday-Friday</span>
                    <span>10:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-lion-black mb-4">Follow Us</h4>
                <div className="flex space-x-3">
                  <motion.a 
                    href="#" 
                    whileHover={{ scale: 1.1, backgroundColor: "#D4AF37" }}
                    className="w-10 h-10 bg-lion-black text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <Facebook size={18} />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    whileHover={{ scale: 1.1, backgroundColor: "#D4AF37" }}
                    className="w-10 h-10 bg-lion-black text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <Twitter size={18} />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    whileHover={{ scale: 1.1, backgroundColor: "#D4AF37" }}
                    className="w-10 h-10 bg-lion-black text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <Instagram size={18} />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    whileHover={{ scale: 1.1, backgroundColor: "#D4AF37" }}
                    className="w-10 h-10 bg-lion-black text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <Linkedin size={18} />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Map and Content */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <div className="grid grid-cols-1 gap-8">
              <div className="h-[300px] rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192866!2d77.06889754725781!3d28.527580594036787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1652345678901!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy"
                  title="Gurugram Office Location"
                  className="w-full h-full"
                />
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-display text-lion-black mb-6">Send Us a Message</h3>
                    <p className="text-gray-700 mb-6">
                      Whether you're looking for property for sale in the Delhi NCR area or property for rent, Lionvest Realty makes searching easy. We will help you find your dream house in just a few seconds.
                    </p>
                    <p className="text-gray-700">
                      We offer our clients a wealth of knowledge regarding all aspects of purchasing or selling a home. Please feel free to contact us with any questions!
                    </p>
                  </div>
                  
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Your Phone</Label>
                      <Input 
                        id="phone" 
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="I'm interested in..." 
                        className="h-24"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="consent" 
                        className="rounded border-gray-300"
                        checked={formData.consent}
                        onChange={handleCheckboxChange}
                        required
                      />
                      <label htmlFor="consent" className="text-sm text-gray-700">I consent to the GDPR Terms</label>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-lion-gold hover:bg-lion-darkgold text-black"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;


import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm uppercase tracking-wider text-lion-gold mb-2">Contact Us</h2>
            <h3 className="text-4xl font-display text-lion-black mb-6">Get In Touch</h3>
            
            <div className="space-y-6 mb-8 text-gray-700">
              <p>
                Have questions about our properties or services? Fill out the form and our team will get back to you shortly.
              </p>
              
              <div className="flex items-start">
                <MapPin className="text-lion-gold mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-lion-black">Gurugram Office</h4>
                  <address className="not-italic">
                    Sector - 63A, Gurugram, Haryana
                  </address>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="text-lion-gold mr-4" />
                <div>
                  <h4 className="font-semibold text-lion-black">Phone</h4>
                  <p>9773552334</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="text-lion-gold mr-4" />
                <div>
                  <h4 className="font-semibold text-lion-black">Email</h4>
                  <p>Lionvestrealty@gmail.com</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192866!2d77.06889754725781!3d28.527580594036787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1652345678901!5m2!1sen!2sin" 
                width="100%" 
                height="300" 
                style={{ border: 0 }} 
                loading="lazy"
                title="Gurugram Office Location"
                className="rounded-lg shadow-md"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-8 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-display text-lion-black mb-6">Send Us a Message</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+91 98765 43210" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Property Inquiry" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="I'm interested in..." 
                  className="h-32"
                />
              </div>
              
              <Button className="w-full bg-lion-gold hover:bg-lion-darkgold text-black">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

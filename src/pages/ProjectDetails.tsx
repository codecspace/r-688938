
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Calendar, CheckCircle, ArrowLeft } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { projectsData } from "@/data/projectsData";
import { toast } from "@/components/ui/use-toast";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the project based on the ID parameter
    const foundProject = projectsData.find(p => p.id === id);
    
    if (foundProject) {
      setProject(foundProject);
      // Simulate loading for smooth transition
      setTimeout(() => {
        setLoading(false);
      }, 800);
    } else {
      setLoading(false);
    }
    
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, [id]);

  const handleScheduleVisit = () => {
    toast({
      title: "Visit Scheduled",
      description: "Our agent will contact you shortly to confirm the details.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-lion-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project details...</p>
        </motion.div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">Project Not Found</h2>
        <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="bg-lion-gold hover:bg-lion-darkgold text-black font-medium px-6 py-2 rounded transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div 
        className="relative h-[60vh] w-full bg-lion-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="absolute inset-0 bg-black opacity-50 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
        
        <motion.img 
          src={project.heroImage || project.images?.[0]} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        />
        
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16 relative z-20">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center text-white mb-4 hover:text-lion-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-display text-white mb-4">{project.title}</h1>
            <div className="flex items-center text-white/90">
              <MapPin className="w-5 h-5 mr-2 text-lion-gold" />
              <p>{project.location}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Main Info */}
          <div className="lg:col-span-2">
            {/* Project Description */}
            <motion.div 
              className="bg-white rounded-xl shadow-md p-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-lion-black">Description</h2>
              <div className="prose max-w-none text-gray-700">
                {project.longDescription ? (
                  <p>{project.longDescription}</p>
                ) : (
                  <p>{project.description}</p>
                )}
              </div>
            </motion.div>
            
            {/* Image Gallery */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-lion-black">Gallery</h2>
              <Carousel className="w-full">
                <CarouselContent>
                  {project.images && project.images.map((image: string, index: number) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <motion.div 
                          className="aspect-video overflow-hidden rounded-xl"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img 
                            src={image} 
                            alt={`${project.title} - Image ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </motion.div>
            
            {/* Specifications */}
            {project.specifications && (
              <motion.div 
                className="bg-white rounded-xl shadow-md p-8 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-lion-black">Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(project.specifications).map(([key, value]: [string, any]) => (
                    <div key={key} className="flex flex-col">
                      <h3 className="text-lg font-medium text-lion-gold mb-3 capitalize">{key}</h3>
                      <div className="text-gray-700">
                        {Array.isArray(value) ? (
                          <ul className="list-disc pl-5 space-y-1">
                            {value.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Amenities */}
            {project.amenities && (
              <motion.div 
                className="bg-white rounded-xl shadow-md p-8 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-lion-black">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {project.amenities.map((amenity: string, index: number) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 p-3 rounded-lg bg-gray-50"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle className="h-5 w-5 text-lion-gold flex-shrink-0" />
                      <span className="text-gray-700">{amenity}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Right Side - Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card - Fixed position */}
            <motion.div 
              className="bg-lion-gold text-black rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                position: 'sticky',
                top: '2rem',
                zIndex: 10
              }}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold">Interested in this property?</h3>
                <p className="text-black/80 mt-1">Contact our agent for more information</p>
              </div>
              
              <div className="bg-white p-6 space-y-5">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-lion-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">+91 9773552334</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-lion-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">Lionvestrealty@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-lion-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{project.fullAddress || project.location}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="w-full bg-lion-gold hover:bg-lion-darkgold text-black font-medium"
                    onClick={handleScheduleVisit}
                  >
                    Schedule a Visit
                  </Button>
                </div>
              </div>
            </motion.div>
            
            {/* Features */}
            <motion.div 
              className="bg-white rounded-xl shadow-md p-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-5 text-lion-black">Features</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium mb-3 text-lion-gold">Interior Details</h4>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-gray-700">✓ Equipped Kitchen</span>
                    <span className="text-gray-700">✓ Gym</span>
                    <span className="text-gray-700">✓ Laundry</span>
                    <span className="text-gray-700">✓ Media Room</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium mb-3 text-lion-gold">Outdoor Details</h4>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-gray-700">✓ Back yard</span>
                    <span className="text-gray-700">✓ Basketball court</span>
                    <span className="text-gray-700">✓ Garage</span>
                    <span className="text-gray-700">✓ Pool</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium mb-3 text-lion-gold">Utilities</h4>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-gray-700">✓ Central Air</span>
                    <span className="text-gray-700">✓ Electricity</span>
                    <span className="text-gray-700">✓ Heating</span>
                    <span className="text-gray-700">✓ Natural Gas</span>
                    <span className="text-gray-700">✓ Ventilation</span>
                    <span className="text-gray-700">✓ Water</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProjectDetails;


import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, CheckCircle, ArrowLeft, Calendar, Clock } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RouteHead from "@/components/RouteHead";
import { Button } from "@/components/ui/button";
import { projectsData } from "@/data/projectsData";
import { toast } from "@/hooks/use-toast";
import { ProjectDataType } from "@/data/projectsData";
import ImageWithFallback from "@/components/layout/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [cooldown, setCooldown] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  // Function to create a formatted email with property details
  const createFormattedEmail = () => {
    if (!project) return '';
    
    const subject = `Inquiry about ${project.propertyName}`;
    const body = `
Hello,

I am interested in the property: ${project.propertyName} located at ${project.location}.

Please contact me regarding this property.

Additional details:
- Name: [Your Name]
- Phone Number: [Your Phone Number]
- Best time to call: [Best Time to Call]
- Additional Questions: [Any Additional Questions]

Thank you,
[Your Name]
    `.trim();
    
    // Check if we're on desktop and use Gmail web interface
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!isMobileDevice) {
      // For desktop, open Gmail in browser
      return `https://mail.google.com/mail/?view=cm&fs=1&to=sales@lionvestrealty.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      // For mobile, use mailto:
      return `mailto:sales@lionvestrealty.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  };

  // Function to handle direct contact actions
  const handleContact = (type: string, value: string) => {
    if (type === "phone") {
      window.location.href = `tel:${value}`;
      toast({
        title: "Calling...",
        description: `Dialing ${value}`,
      });
      setDialogOpen(false);
    } else if (type === "email") {
      window.location.href = createFormattedEmail();
      toast({
        title: "Opening email client",
        description: `Composing email about ${project?.propertyName}`,
      });
      setDialogOpen(false);
    } else if (type === "schedule") {
      setDialogOpen(true);
    }
  };

  const handleScheduleVisit = () => {
    if (cooldown) return;
    
    setCooldown(true);
    setDialogOpen(true);
    
    // Set cooldown for 5 seconds
    setTimeout(() => {
      setCooldown(false);
    }, 5000);
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

  // Filter project images to only include those that are part of the original project data
  // If no images array exists, use the heroImage and standard image
  const projectImages = project?.images || [];
  
  // If projectImages is empty, add heroImage and regular image if they exist
  if (projectImages.length === 0) {
    if (project?.heroImage) {
      projectImages.push(project.heroImage);
    }
    if (project?.image && project.image !== project?.heroImage) {
      projectImages.push(project.image);
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <RouteHead
        title={`${project.propertyName} in ${project.location} — Lionvest Realty`}
        description={`Explore ${project.propertyName} by ${project.developerName} in ${project.location}. Get pricing, floor plans and expert guidance from Lionvest Realty across Gurgaon & Delhi NCR.`.slice(0, 158)}
        path={`/project/${project.id}`}
      />
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
        
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <ImageWithFallback
            src={project?.heroImage || project?.image}
            alt={project?.propertyName}
            fallbackLabel={project?.propertyName}
            optimizeWidth={1280}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16 relative z-20">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="glass-dark px-6 py-4 rounded-lg inline-block max-w-3xl"
          >
            <Link 
              to="/" 
              className="inline-flex items-center text-white mb-4 hover:text-lion-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-display text-white mb-4">{project?.propertyName}</h1>
            <div className="flex items-center text-white/90">
              <MapPin className="w-5 h-5 mr-2 text-lion-gold" />
              <p>{project?.location}</p>
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
              className="glass-card rounded-xl p-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-lion-black">Description</h2>
              <div className="prose max-w-none text-gray-700">
                {project?.longDescription ? (
                  <p>{project.longDescription}</p>
                ) : (
                  <p>{project?.description}</p>
                )}
              </div>
            </motion.div>
            
            {/* Image Gallery - Only show when project has images */}
            {projectImages.length > 0 && (
              <motion.div 
                className="mb-8 glass-panel p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-lion-black">Gallery</h2>
                <Carousel className="w-full">
                  <CarouselContent>
                    {projectImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <motion.div 
                            className="aspect-video overflow-hidden rounded-xl"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ImageWithFallback
                              src={image}
                              alt={`${project?.propertyName} - Image ${index + 1}`}
                              fallbackLabel={project?.propertyName}
                              optimizeWidth={900}
                              loading={index === 0 ? "eager" : "lazy"}
                              className="w-full h-full object-cover object-center"
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
            )}
            
            {/* Specifications */}
            {project?.specifications && (
              <motion.div 
                className="glass-card rounded-xl p-8 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-lion-black">Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(project.specifications).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <h3 className="text-lg font-medium text-lion-gold mb-3 capitalize">{key}</h3>
                      <div className="text-gray-700">
                        {Array.isArray(value) ? (
                          <ul className="list-disc pl-5 space-y-1">
                            {value.map((item, index) => (
                              <li key={index}>{String(item)}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{String(value)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Amenities */}
            {project?.amenities && (
              <motion.div 
                className="glass-card rounded-xl p-8 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-lion-black">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {project.amenities.map((amenity, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 p-3 rounded-lg glass"
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
              className="glass-card rounded-xl overflow-hidden sticky top-8 z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-gradient-to-br from-lion-gold to-lion-darkgold p-6">
                <h3 className="text-xl font-semibold text-lion-black">Interested in this property?</h3>
                <p className="text-lion-black/80 mt-1">Contact our agent for more information</p>
              </div>
              
              <div className="p-6 space-y-5">
                <div className="flex items-start gap-3 cursor-pointer hover:bg-gray-50/50 p-2 rounded-lg transition-colors" onClick={() => handleContact("phone", "+91 9773552334")}>
                  <Phone className="w-5 h-5 text-lion-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">+91 9773552334</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 cursor-pointer hover:bg-gray-50/50 p-2 rounded-lg transition-colors" onClick={() => handleContact("email", "sales@lionvestrealty.com")}>
                  <Mail className="w-5 h-5 text-lion-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">sales@lionvestrealty.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-2">
                  <MapPin className="w-5 h-5 text-lion-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">Plus offices, 1st floor, landmark Cyber Park, Sector 67, Gurgaon. HR 122101</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    className={`w-full ${cooldown ? 'bg-gray-400 cursor-not-allowed' : 'bg-lion-gold hover:bg-lion-darkgold'} text-black font-medium transition-all duration-300`}
                    onClick={handleScheduleVisit}
                    disabled={cooldown}
                  >
                    {cooldown ? (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Please wait...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Schedule a Visit</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
            
            {/* Features */}
            <motion.div 
              className="glass-card rounded-xl p-6 mt-8"
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
      
      {/* Contact Dialog with glassmorphism */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md glass-card border-0">
          <DialogHeader>
            <DialogTitle>Schedule a Visit</DialogTitle>
            <DialogDescription>
              Choose how you would like to be contacted for scheduling a visit to {project.propertyName}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              onClick={() => handleContact("phone", "+91 9773552334")}
              className="flex items-center justify-center gap-2 bg-lion-gold hover:bg-lion-darkgold text-black"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </Button>
            <Button
              onClick={() => handleContact("email", "sales@lionvestrealty.com")}
              className="flex items-center justify-center gap-2 bg-lion-gold hover:bg-lion-darkgold text-black"
            >
              <Mail className="h-4 w-4" />
              Email Us
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ProjectDetails;

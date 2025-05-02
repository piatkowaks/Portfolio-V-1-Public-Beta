import { useState, useEffect } from "react";
import { 
  Mail, 
  Globe, 
  Send,
  Download,
  CheckCircle,
  XCircle,
  User,
  AtSign,
  MessageSquare
} from "lucide-react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter,
  FaDiscord
} from "react-icons/fa";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // Show success message for 5 seconds then reset form
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    const errors = {
      name: formData.name ? "" : "Name is required",
      email: !formData.email 
        ? "Email is required" 
        : !validateEmail(formData.email) 
          ? "Please enter a valid email" 
          : "",
      subject: "",
      message: formData.message ? "" : "Message is required"
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error when user types
    if (formErrors[id as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [id]: ""
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please fill all required fields correctly",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await apiRequest("POST", "/api/contact", formData);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { 
      icon: <Mail className="h-5 w-5 text-github-blue" />, 
      title: "Email", 
      value: "contact@draft", 
      link: "mailto:contact@shakshamdas09", 
      hoverColor: "hover:bg-blue-600",
      description: "For business inquiries & collaboration"
    },
    { 
      icon: <Globe className="h-5 w-5 text-green-500" />, 
      title: "Website", 
      value: "draft.dev", 
      link: "https://draft.dev", 
      hoverColor: "hover:bg-green-600",
      description: "Visit my personal website for more info"
    },
    { 
      icon: <FaGithub className="h-5 w-5 text-purple-500" />, 
      title: "GitHub", 
      value: "@Draftgamz", 
      link: "https://github.com/Draftgamz", 
      hoverColor: "hover:bg-purple-700",
      description: "View my code repositories & projects"
    },
    { 
      icon: <FaLinkedin className="h-5 w-5 text-blue-500" />, 
      title: "LinkedIn", 
      value: "Draft", 
      link: "https://linkedin.com", 
      hoverColor: "hover:bg-blue-700",
      description: "Connect professionally for opportunities"
    }
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-github-darker relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/3 left-2/3 w-96 h-96 bg-github-blue opacity-5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-2/3 w-80 h-80 bg-github-green opacity-5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="p-3">
              <Mail className="h-8 w-8 text-github-blue" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-github-muted text-lg">
            Have a question, project idea, or job opportunity? I'd love to hear from you.
            Feel free to reach out using the form below or connect through social platforms.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <div className="glass-card p-8 rounded-lg shadow-lg animate-fadeUp order-2 md:order-1">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <Send className="h-5 w-5 mr-2 text-github-blue" />
              <span>Send Me a Message</span>
            </h3>
            <p className="text-github-muted mb-6">Have a question or want to work together?</p>
            
            {submitted ? (
              <div className="glass-card rounded-lg p-8 text-center border-t-4 border-github-green">
                <div className="bg-github-green bg-opacity-20 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-github-green" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Message Sent Successfully!</h4>
                <p className="text-github-muted mb-6">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center px-5 py-2.5 bg-github-dark hover:bg-github-blue text-github-blue hover:text-white border border-github-blue rounded-md transition-all duration-300 font-medium"
                >
                  <Send className="h-4 w-4 mr-2" />
                  <span>Send another message</span>
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 flex items-center">
                    <User className="h-4 w-4 mr-1 text-github-muted" />
                    <span>Your Name</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`
                        w-full py-3 px-4 bg-github-dark border rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-github-blue
                        ${formErrors.name ? 'border-red-500' : 'border-github-border'}
                      `}
                    />
                    {formErrors.name && (
                      <div className="text-red-500 text-xs mt-1 ml-1">{formErrors.name}</div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 flex items-center">
                    <AtSign className="h-4 w-4 mr-1 text-github-muted" />
                    <span>Email Address</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`
                        w-full py-3 px-4 bg-github-dark border rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-github-blue
                        ${formErrors.email ? 'border-red-500' : 'border-github-border'}
                      `}
                    />
                    {formErrors.email && (
                      <div className="text-red-500 text-xs mt-1 ml-1">{formErrors.email}</div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2 flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1 text-github-muted" />
                    <span>Subject (Optional)</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      id="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry, Job Opportunity, or Question"
                      className={`
                        w-full py-3 px-4 bg-github-dark border rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-github-blue
                        ${formErrors.subject ? 'border-red-500' : 'border-github-border'}
                      `}
                    />
                    {formErrors.subject && (
                      <div className="text-red-500 text-xs mt-1 ml-1">{formErrors.subject}</div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1 text-github-muted" />
                    <span>Message</span>
                  </label>
                  <div className="relative">
                    <textarea 
                      id="message" 
                      rows={5} 
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hello, I'd like to talk about..."
                      className={`
                        w-full py-3 px-4 bg-github-dark border rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-github-blue
                        ${formErrors.message ? 'border-red-500' : 'border-github-border'}
                      `}
                    ></textarea>
                    {formErrors.message && (
                      <div className="text-red-500 text-xs mt-1 ml-1">{formErrors.message}</div>
                    )}
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-github-blue hover:bg-opacity-90 text-white font-medium rounded-md transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl flex items-center justify-center shine-effect"
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2">Sending...</span>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          
          <div className="glass-card p-8 rounded-lg shadow-lg animate-fadeUp order-1 md:order-2">
            <h3 className="text-xl font-semibold mb-6 inline-flex items-center">
              <span className="p-2 mr-3">
                <Globe className="h-5 w-5 text-github-green" />
              </span>
              Connect With Me
            </h3>
            
            <div className="space-y-6 flex-grow">
              {socialLinks.map((social, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-4 glass-card hover:border-github-blue transition-all duration-300 rounded-lg group"
                >
                  <div className={`w-14 h-14 rounded-md bg-github-dark flex items-center justify-center mr-4 transition-colors duration-300 ${social.hoverColor}`}>
                    {social.icon}
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm text-github-muted">{social.title}</h4>
                    <a 
                      href={social.link} 
                      target="_blank" 
                      className="text-github-blue hover:underline group-hover:text-white transition-colors font-medium" 
                      rel="noreferrer"
                    >
                      {social.value}
                    </a>
                    <p className="text-xs text-github-muted mt-1">
                      {social.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <a 
                href="/resume.pdf" 
                target="_blank"
                className="inline-flex items-center px-6 py-3 bg-github-green hover:bg-opacity-90 text-white font-medium rounded-md transition-all duration-300 shadow-lg hover:shadow-xl shine-effect"
              >
                <Download className="h-5 w-5 mr-2" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
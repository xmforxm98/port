import React from "react";
import { motion } from "framer-motion";
import ProfileCard from "../ui/ProfileCard/ProfileCard";
import { 
  MapPin, 
  Calendar, 
  Award, 
  Users, 
  Briefcase, 
  GraduationCap,
  Code,
  Palette,
  Globe,
  Mail,
  Phone,
  Linkedin,
  MessageCircle,
  ChevronRight
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export function AboutPage() {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <motion.div
        className="max-w-4xl mx-auto p-6 space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <div className="relative mx-auto pt-12 flex items-center justify-center">
            <ProfileCard
              name=" "
              title=" "
              handle="yongwookim"
              status="Online"
              contactText="Contact Me"
              avatarUrl="/profile.jpg"
              showUserInfo={true}
              enableTilt={true}
              onContactClick={() => window.open('https://linkedin.com/in/yongwoo-kim', '_blank')}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Mail size={16} />
              <span>yongwoo.kim@strate.design</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone size={16} />
              <span>+82-10-2027-1169</span>
            </div>
            <div className="flex items-center gap-1">
              <Linkedin size={16} />
              <span>linkedin.com/in/yongwoo-kim</span>
            </div>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Users className="text-primary" size={24} />
            About Me
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            I'm a passionate designer with expertise in UX/UI & product design, and AI solutions. 
            Currently working as a UX/UI Designer at Presight.ai in Abu Dhabi, I specialize in creating user-centered 
            designs that bridge the gap between complex AI technologies and intuitive user experiences. With a 
            strong background in both design and technology, I bring a unique perspective to every project.
          </p>
        </motion.div>

        {/* Experience Section */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Briefcase className="text-primary" size={24} />
            Experience
          </h2>
          <div className="space-y-6">
            <div className="border-l-2 border-primary pl-4">
              <h3 className="font-semibold text-lg">UX/UI Designer</h3>
              <p className="text-primary font-medium">Presight.ai</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                <Calendar size={14} />
                2023 - Present • Abu Dhabi, UAE
              </p>
              <p className="text-muted-foreground">AI Development and user experience design</p>
            </div>

            <div className="border-l-2 border-muted pl-4">
              <h3 className="font-semibold text-lg">Product Designer</h3>
              <p className="text-primary font-medium">RadiKumari, Inc.</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                <Calendar size={14} />
                Seoul, South Korea
              </p>
              <p className="text-muted-foreground">PLAY2: Culture Activity App, 4th generation Musical Ticket Booking Solution</p>
            </div>

            <div className="border-l-2 border-muted pl-4">
              <h3 className="font-semibold text-lg">AI Product Designer, PM</h3>
              <p className="text-primary font-medium">SmartMind, Inc.</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                <Calendar size={14} />
                2020 - 2022 • Seoul, South Korea
              </p>
              <p className="text-muted-foreground">AI Solutions development and product management</p>
            </div>

            <div className="border-l-2 border-muted pl-4">
              <h3 className="font-semibold text-lg">HMI Design Intern</h3>
              <p className="text-primary font-medium">PSA Citroen Peugeot</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                <Calendar size={14} />
                France
              </p>
              <p className="text-muted-foreground">Next generation light design, Autonomous car UX</p>
            </div>
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <GraduationCap className="text-primary" size={24} />
            Education
          </h2>
          <div className="space-y-4">
            <div className="border-l-2 border-primary pl-4">
              <h3 className="font-semibold text-lg">Master of Arts in Design</h3>
              <p className="text-primary font-medium">Strate École de Design - France</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                <Calendar size={14} />
                2017 - 2019 • Paris, France
              </p>
              <p className="text-muted-foreground">Mobile Design specialization</p>
            </div>
            
            <div className="border-l-2 border-muted pl-4">
              <h3 className="font-semibold text-lg">Bachelor of Design</h3>
              <p className="text-primary font-medium">Seoul National University S&T</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                <Calendar size={14} />
                2011 - 2017 • Seoul, Korea
              </p>
              <p className="text-muted-foreground">Design Department</p>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Palette className="text-primary" size={24} />
            Skills & Technologies
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-primary">Design Skills</h3>
              <div className="space-y-2">
                {[
                  "User Interface Design", "User Experience Design", "Interaction Design",
                  "Wireframing", "Rapid Prototyping", "Design Research", "Product Design",
                  "Service Design", "Motion Graphics", "Project Management"
                ].map((skill) => (
                  <div key={skill} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm inline-block mr-2 mb-2">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-primary">Tools & Technologies</h3>
              <div className="space-y-2">
                {[
                  "Figma", "Framer", "Sketch", "Photoshop", "Illustrator",
                  "After Effects", "Premiere", "InVision", "Google Analytics",
                  "Blender", "Power BI", "HTML/CSS", "JavaScript", "React", "Java", "Flutter"
                ].map((tool) => (
                  <div key={tool} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm inline-block mr-2 mb-2">
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Languages Section */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Globe className="text-primary" size={24} />
            Languages
          </h2>
          <div className="flex gap-4">
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg">
              <span className="font-semibold">Korean</span>
              <span className="text-sm block text-muted-foreground">Native</span>
            </div>
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg">
              <span className="font-semibold">English</span>
              <span className="text-sm block text-muted-foreground">Professional</span>
            </div>
          </div>
        </motion.div>

        {/* Awards Section */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Award className="text-primary" size={24} />
            Awards & Recognition
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Award className="text-primary flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-semibold">Culture Platform UX, Grand Prize</h3>
                <p className="text-sm text-muted-foreground">2022 • Newspaper Corp, MoneyToday</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Award className="text-primary flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-semibold">BMW Young Design Award, Winner</h3>
                <p className="text-sm text-muted-foreground">BMW France Automobile Festival</p>
              </div>
            </div>
          </div>

          {/* Awards & Recognition Images */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '24px' }}>
            <img 
              src="/images/screenshot1.png" 
              alt="Award 1"
              style={{ maxWidth: '48%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <img 
              src="/images/screenshot2.png" 
              alt="Award 2"
              style={{ maxWidth: '48%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
          </div>
        </motion.div>

        {/* Career Q&A Section */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <MessageCircle className="text-primary" size={24} />
            Career Q&A
          </h2>
          <div className="space-y-6">
            {/* Question 1 */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <ChevronRight className="text-primary flex-shrink-0 mt-1" size={16} />
                <h3 className="font-semibold text-primary">What motivates you in design?</h3>
              </div>
              <p className="text-muted-foreground ml-6 leading-relaxed">
                I'm driven by the challenge of making complex technologies accessible and intuitive. 
                Seeing users effortlessly navigate through AI-powered interfaces that I've designed gives me immense satisfaction. 
                The intersection of data, human psychology, and visual design is where I find my passion.
              </p>
            </div>

            {/* Question 2 */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <ChevronRight className="text-primary flex-shrink-0 mt-1" size={16} />
                <h3 className="font-semibold text-primary">How do you approach new challenges?</h3>
              </div>
              <p className="text-muted-foreground ml-6 leading-relaxed">
                I start with thorough research and user empathy, then rapidly prototype and test solutions. 
                My international experience has taught me to consider diverse cultural perspectives. 
                I believe in failing fast, learning quickly, and iterating based on data and user feedback.
              </p>
            </div>

            {/* Question 3 */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <ChevronRight className="text-primary flex-shrink-0 mt-1" size={16} />
                <h3 className="font-semibold text-primary">What's your career vision?</h3>
              </div>
              <p className="text-muted-foreground ml-6 leading-relaxed">
                I aim to become a leading voice in AI-human interaction design. 
                I want to contribute to making AI technologies more democratized and accessible globally. 
                My goal is to bridge cultural and technological gaps through thoughtful design that respects both human needs and business objectives.
              </p>
            </div>

            {/* Question 4 */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <ChevronRight className="text-primary flex-shrink-0 mt-1" size={16} />
                <h3 className="font-semibold text-primary">What makes you unique as a designer?</h3>
              </div>
              <p className="text-muted-foreground ml-6 leading-relaxed">
                My unique combination of technical understanding, international perspective, and data-driven approach sets me apart. 
                Having worked across Korea, France, and the UAE, I bring cultural sensitivity to design. 
                My background in both AI product management and hands-on design allows me to see the bigger picture while crafting detailed user experiences.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
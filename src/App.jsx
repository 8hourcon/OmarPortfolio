import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Shield, 
  Server, 
  Code, 
  Database, 
  Lock, 
  Cpu, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronDown, 
  ExternalLink, 
  Download, 
  Menu, 
  X,
  Linkedin,
  Github
} from 'lucide-react';

/**
 * Modern Cybersecurity Portfolio for Omar Younis
 * Built with React + Tailwind CSS
 */

// --- DATA ---
const personalInfo = {
  name: "Omar Younis",
  title: "Cybersecurity Analyst",
  location: "Melbourne, Victoria",
  email: "omaryounis1300@outlook.com",
  phone: "0414 803 819",
  about: "Motivated Cybersecurity Undergraduate and Certificate IV graduate with practical experience in network defense, vulnerability assessment, and SIEM configuration. Proven ability to identify security threats using industry-standard tools like Splunk, Wireshark, and Kali Linux. I bring a strong work ethic and problem-solving mindset developed through high-pressure environments.",
};

const skills = [
  { category: "Security Tools", icon: <Shield className="w-5 h-5" />, items: ["Splunk (SIEM)", "Wireshark", "Nmap", "Snort (IDS)", "Squid Proxy"] },
  { category: "Vulnerability Mgmt", icon: <Lock className="w-5 h-5" />, items: ["OWASP WebGoat", "DVWA", "SQL Injection", "XSS Mitigation", "Risk Assessment"] },
  { category: "Operating Systems", icon: <Terminal className="w-5 h-5" />, items: ["Kali Linux", "Ubuntu", "Windows Server", "Active Directory"] },
  { category: "Networking", icon: <Server className="w-5 h-5" />, items: ["TCP/IP", "Firewalls", "DNS / DHCP", "VPN Config", "Secure Coding"] },
];

const projects = [
  {
    title: "SIEM Configuration & Log Analysis",
    tech: ["Splunk", "Log Analysis", "Dashboards"],
    description: "Configured Splunk to ingest and index logs from various network sources. Created custom dashboards and alerts to detect anomalous user behavior and potential intrusion attempts, simulating a SOC environment.",
    icon: <Database className="w-8 h-8 text-cyan-400" />
  },
  {
    title: "Vulnerability Assessment Lab",
    tech: ["OWASP WebGoat", "DVWA", "Burp Suite"],
    description: "Deployed a secure testing environment to identify and exploit vulnerabilities including SQL Injection, XSS, and Brute Force attacks. Documented remediation strategies to patch and harden web applications.",
    icon: <Code className="w-8 h-8 text-violet-400" />
  },
  {
    title: "Network Traffic Control",
    tech: ["Squid Proxy", "Wireshark", "ACLs"],
    description: "Implemented Squid Proxy to filter web traffic within a controlled network. Configured Access Control Lists (ACLs) to restrict malicious domains and utilized Wireshark to inspect packet data for unencrypted traffic.",
    icon: <Cpu className="w-8 h-8 text-emerald-400" />
  }
];

const experience = [
  {
    role: "Mechanic",
    company: "Family Business",
    period: "2022 - 2023",
    desc: "Provided exceptional customer service and collaborated with team members to improve workflow efficiency. Gained hands-on experience in complex mechanical diagnosis.",
  },
  {
    role: "Butcher",
    company: "Local Butcher",
    period: "2019 - 2021",
    desc: "Maintained strict cleanliness standards and health regulations. Managed inventory and storage conditions while delivering high-quality service.",
  },
];

const education = [
  {
    degree: "Bachelor of Cybersecurity",
    school: "Swinburne University",
    period: "2025 - 2027 (Current)",
    status: "In Progress"
  },
  {
    degree: "Certificate IV in Cybersecurity",
    school: "Swinburne University",
    period: "2024",
    status: "Completed"
  }
];

// --- COMPONENTS ---

const NavLink = ({ href, children, active, onClick }) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      onClick && onClick();
    }}
    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
      active ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
    }`}
  >
    {children}
    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transform transition-transform duration-300 ${active ? 'scale-x-100' : 'scale-x-0'}`} />
  </a>
);

const SectionHeading = ({ children, subtitle }) => (
  <div className="mb-12 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
      {children}
    </h2>
    <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-violet-500 mx-auto rounded-full mb-4"></div>
    {subtitle && <p className="text-slate-400 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group ${className}`}>
    {children}
  </div>
);

// --- MAIN APP ---

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const titles = ["Cybersecurity Analyst", "SOC Specialist", "Network Defender", "Ethical Hacker"];

  // Typing Effect Logic
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % titles.length;
      const fullText = titles[i];

      setTypingText(isDeleting 
        ? fullText.substring(0, typingText.length - 1) 
        : fullText.substring(0, typingText.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && typingText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typingText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typingText, isDeleting, loopNum, typingSpeed]);

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Mesh Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-500/10 blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent cursor-pointer"
               onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })}>
            OY<span className="text-slate-500 text-xs tracking-widest ml-1 font-mono">SEC</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-1">
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <NavLink key={item} href={`#${item.toLowerCase()}`} active={activeSection === item.toLowerCase()}>
                {item}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-4 space-y-2">
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-slate-400 hover:text-cyan-400 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-4xl mx-auto px-6 text-center z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm mb-6 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
            Available for Hire
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Hi, I'm <span className="text-cyan-400">{personalInfo.name}</span>
          </h1>
          
          <div className="h-12 md:h-16 text-2xl md:text-4xl text-slate-400 font-mono mb-8">
            I am a <span className="text-violet-400">{typingText}</span>
            <span className="animate-pulse">|</span>
          </div>

          <p className="max-w-xl mx-auto text-slate-400 text-lg mb-10 leading-relaxed">
            Securing digital infrastructures through proactive threat hunting, vulnerability management, and SIEM analysis.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center"
            >
              View My Work
            </button>
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border border-slate-700 hover:border-violet-500 text-slate-300 hover:text-white rounded-lg transition-all flex items-center bg-slate-800/50 backdrop-blur-sm"
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-500">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>About Me</SectionHeading>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                I am a dedicated Cybersecurity student at <span className="text-cyan-400 font-semibold">Swinburne University</span>, combining academic rigor with hands-on lab experience.
              </p>
              <p className="text-slate-400 leading-relaxed">
                My journey started in high-pressure service environments (Automotive & Retail), where I developed resilience and rapid problem-solving skills. I've successfully pivoted these traits into the digital security realm, building a solid foundation in network defense and ethical hacking.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center py-8">
                <h3 className="text-4xl font-bold text-white mb-2">Cert IV</h3>
                <p className="text-sm text-cyan-400 uppercase tracking-wider">Completed</p>
              </Card>
              <Card className="text-center py-8">
                <h3 className="text-4xl font-bold text-white mb-2">BSec</h3>
                <p className="text-sm text-violet-400 uppercase tracking-wider">In Progress</p>
              </Card>
              <Card className="col-span-2 flex items-center justify-between px-8 py-6">
                <div className="text-left">
                  <h4 className="text-xl font-bold text-white">Open to Work</h4>
                  <p className="text-slate-400">Junior Analyst / SOC roles</p>
                </div>
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-slate-900/50 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeading subtitle="My technical arsenal and proficiencies.">Technical Skills</SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, idx) => (
              <Card key={idx} className="h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-slate-700/50 text-cyan-400">
                    {skillGroup.icon}
                  </div>
                  <h3 className="font-bold text-lg text-white">{skillGroup.category}</h3>
                </div>
                <ul className="space-y-3">
                  {skillGroup.items.map((item, i) => (
                    <li key={i} className="flex items-center text-slate-400 text-sm">
                      <div className="h-1.5 w-1.5 bg-cyan-500 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeading subtitle="Key academic projects and lab simulations.">Featured Projects</SectionHeading>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <Card key={idx} className="flex flex-col">
                <div className="mb-6 flex justify-between items-start">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 shadow-inner">
                    {project.icon}
                  </div>
                  <ExternalLink className="text-slate-500 hover:text-white cursor-pointer transition-colors" size={20} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-mono rounded bg-slate-700/50 text-cyan-300 border border-slate-600/50">
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Experience Section */}
      <section id="experience" className="py-24 px-6 bg-slate-900/50 relative z-10">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>Experience & Education</SectionHeading>
          
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Experience Column */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-violet-400">01.</span> Work History
              </h3>
              <div className="space-y-8 relative border-l border-slate-700 ml-3 pl-8">
                {experience.map((exp, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[37px] top-1 h-4 w-4 rounded-full bg-slate-900 border-2 border-violet-500"></span>
                    <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                    <p className="text-cyan-400 text-sm mb-2">{exp.company} | {exp.period}</p>
                    <p className="text-slate-400 text-sm">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Column */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-cyan-400">02.</span> Education
              </h3>
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <Card key={idx} className="border-l-4 border-l-cyan-500 rounded-l-none">
                    <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                    <p className="text-slate-300">{edu.school}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-slate-500">{edu.period}</span>
                      <span className="text-xs bg-slate-700 text-white px-2 py-1 rounded">
                        {edu.status}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading>Get In Touch</SectionHeading>
          <p className="text-slate-400 mb-12 max-w-xl mx-auto">
            I am currently looking for opportunities as a Security Analyst or Junior SOC member. 
            Whether you have a question or just want to say hi, my inbox is always open.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="flex flex-col items-center py-8">
              <Mail className="w-8 h-8 text-cyan-400 mb-4" />
              <h4 className="text-white font-bold mb-1">Email</h4>
              <a href={`mailto:${personalInfo.email}`} className="text-slate-400 hover:text-white text-sm">
                {personalInfo.email}
              </a>
            </Card>

            <Card className="flex flex-col items-center py-8">
              <Phone className="w-8 h-8 text-violet-400 mb-4" />
              <h4 className="text-white font-bold mb-1">Phone</h4>
              <p className="text-slate-400 text-sm">{personalInfo.phone}</p>
            </Card>

            <Card className="flex flex-col items-center py-8">
              <MapPin className="w-8 h-8 text-emerald-400 mb-4" />
              <h4 className="text-white font-bold mb-1">Location</h4>
              <p className="text-slate-400 text-sm">{personalInfo.location}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 text-center text-slate-500 text-sm bg-slate-950 relative z-10">
        <p>© {new Date().getFullYear()} Omar Younis. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
}

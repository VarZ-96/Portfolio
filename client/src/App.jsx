import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Spline from "@splinetool/react-spline";

/* Scroll Animation Section Wrapper */
const AnimatedSection = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 }
    );
    const { current } = domRef;
    if (current) observer.observe(current);
    return () => current && observer.unobserve(current);
  }, []);

  return (
    <div
      ref={domRef}
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
};

const AnimatedBackground = () => (
  <div className="spline-background">
    <Spline scene="https://prod.spline.design/a5Bgcw6U5vNnDfIn/scene.splinecode" />
  </div>
);

const NavBar = () => (
  <nav className="navbar">
    <a href="#home" className="nav-logo">
      VarZ
    </a>
    <ul className="nav-links">
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
);
/* Sections */
const Home = () => (
  <section id="home" className="section home-section">
    <AnimatedSection>
      <div className="home-content">
        <h1>
          Hi, I'm <span className="highlight">Varshil</span>
        </h1>
        <p className="subtitle">A Creative Developer and a Student</p>
        <a href="#projects" className="cta-button">
          View My Work
        </a>
      </div>
    </AnimatedSection>
  </section>
);

const About = () => (
  <section id="about" className="section">
    <AnimatedSection>
      <div className="section-content">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Hello! I'm a passionate developer with a love for building
              dynamic, responsive, scalable, and visually stunning web applications. My
              expertise lies in both frontend and backend development, and I'm always eager to
              learn new technologies.
            </p>
            <p>
              When I'm not coding, you can find me gaming, 
              gyming, or learning new technologies. I
              believe in technology as a medium for art and expression.
              Currently I am pursuing Bachelor's in Computer Science and Engineering 
              from IIIT-Naya Raipur. You can find more information about me in my resume.
            </p>
            <a 
              href="/Varshil_Pandey_Resume.pdf" 
              download="Varshil_Pandey_Resume.pdf" 
              className="cta-button resume-button"
            >
              Download My Resume
            </a>
          </div>
          <div className="about-image-placeholder">
            <img 
              src="/my-photo.jpg"
              alt="Varshil Pandey" 
              className="about-photo"
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  </section>
);

const skillsData = [
  // Row 1
  { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/00FF00" },
  { name: "React", logo: "https://cdn.simpleicons.org/react/00FF00" },
  { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/00FF00" },
  { name: "Express", logo: "https://cdn.simpleicons.org/express/00FF00" },
  
  // Row 2
  { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/00FF00" },
  { name: "Vite", logo: "https://cdn.simpleicons.org/vite/00FF00" },
  { name: "Python", logo: "https://cdn.simpleicons.org/python/00FF00" },
  { name: "C++", logo: "https://cdn.simpleicons.org/cplusplus/00FF00" },

  // Row 3
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/00FF00" },
  { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/00FF00" },
  { name: "Git", logo: "https://cdn.simpleicons.org/git/00FF00" },
  { name: "GitHub", logo: "https://cdn.simpleicons.org/github/00FF00" },

  // Row 4
  { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/00FF00" },
  { name: "Render", logo: "https://cdn.simpleicons.org/render/00FF00" },
  { name: "Figma", logo: "https://cdn.simpleicons.org/figma/00FF00" },
  { name: "Spline", icon: "S" },
];

const Skills = () => (
  <section id="skills" className="section">
    <AnimatedSection>
      <div className="section-content">
        <h2>My Toolkit</h2>
        <div className="skills-grid">
          {skillsData.map((skill, i) => (
            <div key={i} className="skill-card">
              <div className="skill-card-icon">
                {skill.logo ? (
                  <img src={skill.logo} alt={`${skill.name} logo`} />
                ) : (
                  <span className="logo-text">{skill.icon}</span>
                )}
              </div>
              <h3>{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  </section>
);

const projectsData = [
  {
    title: "Vibe-Commerce Cart",
    imageUrl: "/project-1.png",
    description: "A PERN stack e-commerce app with secure Google OAuth 2.0 login, JWT-based stateless sessions, Razorpay integration and applications of LLD and HLD.",
    liveUrl: "#",
    githubUrl: "https://github.com/VarZ-96/VibeCommerce-Cart",
  },
  {
    title: "Slot Swapper",
    imageUrl: "/project-2.png",
    description: "A PERN stack, peer-to-peer scheduling web app for users to swap calendar time slots, implemented REST API and JWT.",
    liveUrl: "https://slot-swapper-chi.vercel.app/",
    githubUrl: "https://github.com/VarZ-96/SlotSwapper",
  },
  {
    title: "VarZ Tours and Travels",
    imageUrl: "/project-3.png",
    description: "A basic travel agency website with user authentication, dynamic content rendering, and responsive design. My first web development project!",
    liveUrl: "https://iiit-project-1-web-app-varz-96s-projects.vercel.app/",
    githubUrl: "https://github.com/VarZ-96/IIIT-Project-1-web-app",
  },
];
const Projects = () => (
  <section id="projects" className="section">
    <AnimatedSection>
      <div className="section-content">
        <h2>My Projects</h2>
        <div className="projects-grid">
          {projectsData.map((project, i) => (
            <div key={i} className="project-card">
              <div className="project-image">
                <img 
                  src={project.imageUrl} 
                  alt={`${project.title} Screenshot`} 
                  onError={(e) => { 
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span>Image Not Found</span>';
                  }}
                />
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-links">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  </section>
);

const Contact = () => {
  const [status, setStatus] = useState("Send Message");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          message: message.value,
        }),
      });
      if (response.ok) {
        setStatus("Message Sent!");
        e.target.reset();
        setTimeout(() => setStatus("Send Message"), 3000);
      } else throw new Error("Network error");
    } catch (error) {
      console.error("Failed to send message:", error);
      setStatus("Send Failed");
      setTimeout(() => setStatus("Send Message"), 3000);
    }
  };

  return (
    <section id="contact" className="section">
      <AnimatedSection>
        <div className="section-content">
          <h2>Get In Touch</h2>
          <p style={{ textAlign: "center", marginBottom: "2rem" }}>
            Have a project in mind or just want to say hi? My inbox is always
            open.
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" className="form-input" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" className="form-input" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" className="form-textarea" required />
            </div>
            <button type="submit" className="submit-button">{status}</button>
          </form>
        </div>
      </AnimatedSection>
    </section>
  );
};

const Footer = () => (
  <footer className="footer">
    © {new Date().getFullYear()} Varshil Pandey. All Rights Reserved.
  </footer>
);

/* ===== Main App ===== */
export default function App() {
  useEffect(() => {
    // Create main glowing dot
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    document.body.appendChild(dot);

    // Create longer trail (more elements = longer trail)
    const trails = Array.from({ length: 30 }).map(() => {
      const t = document.createElement("div");
      t.className = "cursor-trail";
      document.body.appendChild(t);
      return t;
    });

    const trailPositions = trails.map(() => ({ x: 0, y: 0 }));
    let mouseX = 0,
      mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Main dot follows cursor instantly
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      // Trail follows with smooth delay
      trailPositions.forEach((pos, i) => {
        const next = i === 0 ? { x: mouseX, y: mouseY } : trailPositions[i - 1];
        pos.x += (next.x - pos.x) * 0.25;
        pos.y += (next.y - pos.y) * 0.25;
        const opacity = 1 - i / trails.length; // smoother fade
        const scale = 1 - i / (trails.length * 1.3); // smaller toward end
        trails[i].style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${scale})`;
        trails[i].style.opacity = opacity.toFixed(2);
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      dot.remove();
      trails.forEach((t) => t.remove());
    };
  }, []);

  return (
    <>
      <AnimatedBackground />
      <NavBar />
      <main>
        <Home />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <div className="watermark">Created by VarZ</div>
    </>
  );
}


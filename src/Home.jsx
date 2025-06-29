import Button from "../components/Button";
import MainNavBar from "../components/MainNavBar";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    projectTitle: "Cell Store",
    projectDescription:
      "Cell Store is a static website for a local phone shop, showcasing the latest smartphones, accessories, and repair services. Built without a backend, it offers a fast, user-friendly experience with friendly staff and great prices, serving as a one-stop shop for all things mobile.",
    projectThumb: "/cellstore-thumbnail.png",
    techStack: ["React.js", "BootStrap"],
    liveDemoUrl: "https://cell-store.netlify.app/",
    sourceCodeUrl: "https://github.com/mahmoudmaherofficial/new-cell-store",
  },
  {
    projectTitle: "LuxeLane",
    projectDescription:
      "LuxeLane is a full-stack online clothing store featuring a curated collection of stylish apparel and accessories. Powered by a Node.js and Express.js backend, it delivers a seamless, responsive shopping experience with elegant design and dynamic functionality.",
    projectThumb: "/luxelane-thumbnail.png",
    techStack: ["Next.js", "Tailwind CSS", "Node.js", "Express.js"],
    liveDemoUrl: "https://luxelanestore.vercel.app/",
    sourceCodeUrl: "https://github.com/mahmoudmaherofficial/luxelane-frontend",
  },
];
const HomePage = () => (
  <main>
    <MainNavBar />
    {/* Landing Section */}
    <section className="landing text-slate-100 relative overflow-hidden bg-gradient-to-tl from-slate-700 to-slate-900 min-h-screen pt-[72px]">
      <div className="container flex flex-col-reverse justify-center gap-16 lg:flex-row lg:justify-between lg:gap-0 items-center h-[calc(100vh-72px)]">
        <article className="text-6xl lg:text-8xl font-bold">
          <div className="flex flex-col relative">
            <span>Mahmoud</span>
            <div className="flex items-end gap-4 justify-between">
              <span>Maher</span>
              <Button size="small" className="text-2xl flex-1 lg:hidden" aria-label="Explore Mahmoud's portfolio">
                Explore <i className="fa-duotone fa-solid fa-arrow-right" />
              </Button>
              <Button size="large" className="text-2xl flex-1 hidden lg:block" aria-label="Explore Mahmoud's portfolio">
                Explore <i className="fa-duotone fa-solid fa-arrow-right" />
              </Button>
            </div>
          </div>
        </article>
        <article className="relative">
          <div className="overflow-hidden rounded-full w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] flex items-center justify-center border-3 border-slate-600 hover:border-6 transition-all duration-300">
            <img
              src="/image.webp"
              alt="Mahmoud Maher's profile picture"
              className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
            />
          </div>
        </article>
      </div>
    </section>

    {/* About Section */}
    <section className="py-16 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        <article className="special-heading">About me</article>
        <article className="mt-8 max-w-4xl mx-auto text-center text-slate-700">
          <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
            I'm Mahmoud Maher, a passionate web developer dedicated to crafting modern, responsive, and user-friendly
            applications. With expertise in React, Tailwind CSS, and JavaScript, I transform ideas into reality through
            clean code and thoughtful design.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-slate-800 mb-3">Skills</h3>
              <ul className="list-none text-left text-base text-slate-600 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-slate-700 rounded-full mr-2"></span>React.js, Next.js & JavaScript
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-slate-700 rounded-full mr-2"></span>Tailwind CSS & Responsive Design
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-slate-700 rounded-full mr-2"></span>UI/UX Design Principles
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-slate-700 rounded-full mr-2"></span>API Integration
                </li>
              </ul>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-slate-800 mb-3">Experience</h3>
              <ul className="list-none text-left text-base text-slate-600 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-slate-700 rounded-full mr-2"></span>Building scalable web applications
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-slate-700 rounded-full mr-2"></span>Collaborating with cross-functional
                  teams
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-slate-700 rounded-full mr-2"></span>Optimizing performance and
                  accessibility
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-slate-700 rounded-full mr-2"></span>Continuous learning and adapting to
                  new tech
                </li>
              </ul>
            </div>
          </div>
          <a href="mailto:mahmoudmaherofficial@gmail.com" className="cursor-pointer inline-block">
            <Button size="large" aria-label="Contact Mahmoud Maher">
              Get in Touch <i className="fa-duotone fa-solid fa-envelope ml-2" />
            </Button>
          </a>
        </article>
      </div>
    </section>

    {/* Projects Section */}
    <section className="py-12 bg-slate-50">
      <div className="container">
        <article className="special-heading">Projects</article>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {projects.map((project, i) => (
            <ProjectCard {...project} key={i} />
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials Sections */}
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <article className="special-heading">What others say</article>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
            <p className="text-slate-600 italic text-base leading-relaxed mb-4">
              "Mahmoud delivered a fantastic project with clean code and great communication. His ability to meet
              deadlines was impressive."
            </p>
            <p className="text-slate-800 font-semibold text-lg">Youssef Gamal, Client</p>
          </div>
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
            <p className="text-slate-600 italic text-base leading-relaxed mb-4">
              "His attention to detail and expertise in React made our app a success. Mahmoud is a true professional."
            </p>
            <p className="text-slate-800 font-semibold text-lg">Farouk Wael, Team Lead</p>
          </div>
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
            <p className="text-slate-600 italic text-base leading-relaxed mb-4">
              "Mahmoud's work on our full-stack project was outstanding. His Next.js skills brought our vision to life."
            </p>
            <p className="text-slate-800 font-semibold text-lg">Amira Hassan, Project Manager</p>
          </div>
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
            <p className="text-slate-600 italic text-base leading-relaxed mb-4">
              "Collaborating with Mahmoud was a pleasure. His dedication to responsive design elevated our user
              experience."
            </p>
            <p className="text-slate-800 font-semibold text-lg">Omar Khaled, UI/UX Designer</p>
          </div>
        </div>
      </div>
    </section>

    {/* Contact Section */}
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <article className="special-heading">Contact Me</article>{" "}
        <div className="max-w-2xl mx-auto mt-10">
          <form action="https://formspree.io/f/movwyobn" method="POST" className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg border border-slate-300"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg border border-slate-300"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full p-3 rounded-lg border border-slate-300 h-32"></textarea>
            <Button size="large" aria-label="Send message">
              Send Message
            </Button>
          </form>
          <div className="flex justify-center gap-4 mt-6">
            <a
              href="https://github.com/mahmoudmaherofficial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile">
              <i className="fa-brands fa-github text-2xl text-slate-700 hover:text-slate-800"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/mahmoudmaherofficial2/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile">
              <i className="fa-brands fa-linkedin text-2xl text-slate-700 hover:text-slate-800"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default HomePage;

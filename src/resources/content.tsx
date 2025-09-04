import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Mo.",
  lastName: "Ruhaan Dalal",
  name: `Mo. Ruhaan Dalal`,
  role: "AI/ML Engineer, CUDA Engineer",
  avatar: "/images/avatar.jpg",
  email: "ruhaandalal@gmail.com",
  // Keep a valid IANA timezone for time displays but provide a separate displayLocation
  location: "Asia/Kolkata",
  displayLocation: "India",
  languages: ["English", "Hindi", "Gujarati"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
  link: "https://github.com/Ruhaan838",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
  link: "https://www.linkedin.com/in/mo-ruhaan-dalal-a93a20292/",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
  {
    name: "Resume",
  icon: "document",
    link: "https://drive.google.com/file/d/15Tu16bF3Ok-jdPRQHr4SC6nNnKAq801K/view?usp=drive_link",
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building bridges between design and code</>,
  featured: {
    display: true,
    title: "Continuous Learning",
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      I'm Selene, a design engineer at{" "}
      <Logo
        dark
        icon="/trademarks/wordmark-dark.svg"
        style={{ display: "inline-flex", top: "0.25em", marginLeft: "-0.25em" }}
      />
      , where I craft intuitive
      <br /> user experiences. After hours, I build my own projects.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I am an AI/ML and CUDA engineer focused on building high-performance
        deep learning systems and GPU-accelerated solutions. My work includes model development,
        kernel optimization, and scalable ML infrastructure.
      </>
    ),
  },
  work: {
  display: false, // removed per request
  title: "Work Experience",
    experiences: [
      {
        company: "FLY",
        timeframe: "2022 - Present",
        role: "Senior Design Engineer",
        achievements: [
          <>
            Redesigned the UI/UX for the FLY platform, resulting in a 20% increase in user
            engagement and 30% faster load times.
          </>,
          <>
            Spearheaded the integration of AI tools into design workflows, enabling designers to
            iterate 50% faster.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Creativ3",
        timeframe: "2018 - 2022",
        role: "Lead Designer",
        achievements: [
          <>
            Developed a design system that unified the brand across multiple platforms, improving
            design consistency by 40%.
          </>,
          <>
            Led a cross-functional team to launch a new product line, contributing to a 15% increase
            in overall company revenue.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
  display: false, // removed per request
  title: "Studies",
    institutions: [
      {
        name: "University of Jakarta",
        description: <>Studied software engineering.</>,
      },
      {
        name: "Build the Future",
        description: <>Studied online marketing and personal branding.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Skills",
    skills: [
      {
        title: "Technical:",
        description: (
          <>
            <ul>
              <li>Strong background in mathematics (used in AI/ML/DL).</li>
              <li>Great understanding of deep learning core concepts and advanced topics from recent advancements.</li>
            </ul>
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Soft:",
        description: (
          <>
            <ul>
              <li>Hunger to learn something new.</li>
              <li>I excel at learning through observation, quickly understanding complex concepts, and improving upon them to deliver creative and effective solutions.</li>
              <li>Moderate time management and organization but I can complete my tasks on time.</li>
            </ul>
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Programming languages/frameworks:",
        description: <></>,
        tags: [
          { name: "Python" },
          { name: "PyTorch" },
          { name: "CUDA" },
          { name: "ROCm/HIP" },
          { name: "Gym" },
          { name: "C/C++" },
          { name: "Huggingface" },
        ],
        images: [],
      },
      {
        title: "Continuous Learning",
        description: (
          <>
            <ul>
              <li>
                <strong>100 Days of CUDA Programming — Advanced GPU Computing</strong>
                <ul>
                  <li>
                    Completed 100+ programming challenges, mastering parallel algorithms, memory
                    optimization, and performance profiling for HPC applications
                  </li>
                </ul>
              </li>
              <li>
                <strong>100 Days of Reinforcement Learning — RL for Games and LLMs</strong>
                <ul>
                  <li>
                    Implemented RL algorithms, including policy gradients and Q-learning for game
                    environments and language model fine-tuning with RLHF
                  </li>
                </ul>
              </li>
            </ul>
          </>
        ),
        tags: [],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Project",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };

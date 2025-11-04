
import { RoadmapItem } from './types';

export const ROADMAP_DATA: RoadmapItem[] = [
  // Year 1
  {
    quarter: 1,
    year: 1,
    title: "Q1: The Foundation - Drawing & Observation",
    theme: "Mastering the basics of artistic perception.",
    skills: ["Traditional Drawing (Pencil & Paper)", "Digital Sketching Fundamentals (e.g., in Krita/Photoshop)", "Composition Rules (Rule of Thirds, Golden Ratio)", "Perspective (1, 2, and 3-point)", "Basic Value & Shading"],
    software: ["Krita", "Photoshop", "PureRef"],
    portfolio: "Create a portfolio section with at least 20 observational sketches (still life, environments) and 5 fully shaded drawings.",
    networking: "Join online art communities like ArtStation, DeviantArt, and Polycount. Start following professional game artists.",
    points: 100
  },
  {
    quarter: 2,
    year: 1,
    title: "Q2: Understanding Form & Color",
    theme: "Bringing life to your sketches with form and color.",
    skills: ["Color Theory (Hue, Saturation, Value)", "Light & Shadow Dynamics", "Material Studies (wood, metal, cloth)", "Basic Anatomy (Proportions, major muscle groups)", "Intro to 3D: Basic Modeling in Blender"],
    software: ["Blender (Basics)", "Photoshop/Krita"],
    portfolio: "Add colored versions of your best Q1 drawings. Create 5 material study spheres. Model 3 simple props in Blender (e.g., a cup, a book, a simple weapon).",
    networking: "Participate in a weekly art challenge online. Provide constructive feedback on others' work.",
    points: 150
  },
  {
    quarter: 3,
    year: 1,
    title: "Q3: Introduction to the 3D Pipeline",
    theme: "From concept to a simple 3D asset.",
    skills: ["UV Unwrapping & Mapping", "Basic Texturing (Hand-painted style)", "High-poly to Low-poly Baking", "Intro to ZBrush/Blender Sculpting", "Character/Creature Anatomy"],
    software: ["Blender", "ZBrush/Blender Sculpting", "Substance Painter (Basics)"],
    portfolio: "Create one complete game-ready prop: Model, sculpt high-poly details, retopologize to low-poly, UV unwrap, bake, and texture it. Document the process.",
    networking: "Start a personal art blog or a dedicated ArtStation blog to post your work-in-progress.",
    points: 200
  },
  {
    quarter: 4,
    year: 1,
    title: "Q4: Real-time Rendering Foundations",
    theme: "Seeing your assets in a game engine.",
    skills: ["Importing assets into Unreal Engine 5 / Unity", "Basic Material Setup in-engine", "Lighting Fundamentals (3-point lighting)", "Post-processing basics", "Creating a simple scene/diorama"],
    software: ["Unreal Engine 5", "Unity"],
    portfolio: "Build a small diorama in UE5 or Unity showcasing the assets you've created this year. Create a short video fly-through and high-quality screenshots for your portfolio.",
    networking: "Follow game studios and art directors on LinkedIn and Twitter. Comment thoughtfully on their posts.",
    points: 250
  },
  // Year 2
  {
    quarter: 5,
    year: 2,
    title: "Q5: Specialization Path - Environment Art",
    theme: "Building worlds.",
    skills: ["Modular Asset Creation", "World Building & Composition", "Foliage Creation (e.g., SpeedTree/Blender)", "PBR Texturing Workflow (Mastering Substance Painter)", "Intro to Procedural Materials (Substance Designer)"],
    software: ["Substance Painter", "Substance Designer", "Unreal Engine 5/Unity"],
    portfolio: "Create a small, complete environment scene (e.g., a corner of a room, a forest clearing) using modular assets and PBR textures. The scene should tell a story.",
    networking: "Join Discord servers focused on environment art (e.g., DiNusty Empire). Share your progress and ask for feedback.",
    points: 300
  },
  {
    quarter: 6,
    year: 2,
    title: "Q6: Specialization Path - Character Art",
    theme: "Creating believable characters.",
    skills: ["Advanced Character Sculpting (ZBrush)", "Topology for Animation", "Realistic Skin Texturing", "Hair Card Creation", "Clothing & Hard Surface Armor Modeling"],
    software: ["ZBrush", "Maya/Blender (Retopology)", "Marmoset Toolbag", "Substance Painter"],
    portfolio: "Create a full game-ready character bust (head and shoulders). Present it in Marmoset Toolbag with multiple lighting setups.",
    networking: "Reach out to one junior artist for an informational chat about their journey.",
    points: 300
  },
  {
    quarter: 7,
    year: 2,
    title: "Q7: Advanced Techniques & Workflows",
    theme: "Optimizing and enhancing your art.",
    skills: ["Advanced Shader Creation in UE5/Unity", "Technical Art Basics (simple scripts, performance profiling)", "Procedural Generation techniques (Houdini basics)", "Advanced Lighting Scenarios (Day/Night cycles)"],
    software: ["Unreal Engine 5/Unity (Blueprints/Shader Graph)", "Houdini (Apprentice)"],
    portfolio: "Create a more complex portfolio piece based on your specialization, incorporating an advanced technique (e.g., an environment with dynamic lighting, a character with custom shaders).",
    networking: "Attend a local or online game developer meetup.",
    points: 350
  },
  {
    quarter: 8,
    year: 2,
    title: "Q8: Portfolio Project I - Conception",
    theme: "Planning and starting a large-scale project.",
    skills: ["Project Management & Scheduling (Trello/Notion)", "Concept Art Interpretation & Blockouts", "Creating a Style Guide/Art Bible", "Reference Gathering & Moodboarding"],
    software: ["PureRef", "Trello/Notion", "Engine of choice"],
    portfolio: "Develop a full pre-production package for a major portfolio piece. This includes a project brief, mood board, asset list, and a detailed blockout of the scene or character in-engine.",
    networking: "Get feedback on your project idea from a mentor or a professional artist.",
    points: 400
  },
  // Year 3
  {
    quarter: 9,
    year: 3,
    title: "Q9: Portfolio Project II - Production",
    theme: "Building your masterpiece.",
    skills: ["Efficient Asset Production", "Time Management & Milestone Adherence", "Problem-Solving Technical Hurdles", "Maintaining Artistic Quality & Consistency"],
    software: ["Your full toolset"],
    portfolio: "Complete 70% of your major portfolio piece. The focus is on high-quality asset creation and scene assembly.",
    networking: "Post regular updates of your project on ArtStation and LinkedIn, detailing your process and challenges.",
    points: 450
  },
  {
    quarter: 10,
    year: 3,
    title: "Q10: Portfolio Project III - Polish & Presentation",
    theme: "The final 10% that makes 90% of the difference.",
    skills: ["Advanced Lighting & Cinematography", "Polishing assets and materials", "Creating a cinematic fly-through", "Capturing high-resolution screenshots", "Portfolio Website Creation"],
    software: ["Adobe Premiere/DaVinci Resolve", "A portfolio platform (ArtStation Pro, personal website)"],
    portfolio: "Finalize your major portfolio piece. Create a polished video presentation and a series of 'beauty shots'. Build your professional portfolio website.",
    networking: "Create a tailored list of 20-30 studios you'd love to work for.",
    points: 500
  },
  {
    quarter: 11,
    year: 3,
    title: "Q11: Job Hunting & Professional Presence",
    theme: "Preparing for the industry.",
    skills: ["Resume/CV Writing for Artists", "Crafting a Compelling Cover Letter", "Art Test Preparation & Execution", "Interview Skills (Behavioral & Technical)"],
    software: ["LinkedIn", "ArtStation Jobs"],
    portfolio: "Refine your portfolio based on feedback. Create a one-page resume that links to your portfolio. Prepare for a mock art test.",
    networking: "Start actively networking with recruiters on LinkedIn. Informational interviews with artists at your target studios.",
    points: 550
  },
  {
    quarter: 12,
    year: 3,
    title: "Q12: Lifelong Learning & Industry Trends",
    theme: "Staying future-ready.",
    skills: ["AI in Art Pipelines (e.g., Stable Diffusion, Midjourney for concepting)", "Cloud-based collaboration tools", "Staying updated with new engine features", "Mentoring junior artists"],
    software: ["Latest versions of all your key software"],
    portfolio: "Add a smaller, quicker project to your portfolio showing you can learn and adapt to new technology or workflows.",
    networking: "Give back to the community by mentoring someone in Year 1 of their journey. Continue building professional relationships.",
    points: 600
  }
];

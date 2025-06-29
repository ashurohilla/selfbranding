"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Star,
  Volume2,
  VolumeX,
  Github,
  Linkedin,
  Mail,
  Terminal,
  Code,
  Cpu,
  BookAIcon,
} from "lucide-react";
import { useRef } from "react";


export default function Page() {
  const [selected, setSelected] = useState<
    "home" | "projects" | "about" | "contact"
  >("home");
  const [soundOn, setSoundOn] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fullText =
    "Welcome to the digital realm of Ashish — Code Jedi, Hardware Tinkerer, and Master of Digital Sorcery. Navigate through the holocrons to discover projects that blend creativity with technology.";
useEffect(() => {
  const handleUserInteraction = () => {
    if (audioRef.current && !soundOn) {
      audioRef.current.play().then(() => {
        setSoundOn(true);
        console.log("Auto-play after user interaction");
      }).catch(err => console.warn("Autoplay failed:", err));
    }
    document.removeEventListener("click", handleUserInteraction);
    document.removeEventListener("keydown", handleUserInteraction);
  };

  document.addEventListener("click", handleUserInteraction);
  document.addEventListener("keydown", handleUserInteraction);

  return () => {
    document.removeEventListener("click", handleUserInteraction);
    document.removeEventListener("keydown", handleUserInteraction);
  };
}, []);
  useEffect(() => {
    if (selected === "home" && currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setTypedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, selected, fullText]);

  useEffect(() => {
    if (selected === "home") {
      setCurrentIndex(0);
      setTypedText("");
    }
  }, [selected]);

  return (
    <div className="bg-black text-yellow-400 min-h-screen font-mono relative overflow-hidden">
      {/* Animated Starfield background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className=" w-full h-full opacity-20 animate-pulse"></div>
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Scanning line effect */}
      <div
        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse z-10"
        style={{ animation: "scan 4s linear infinite" }}
      ></div>

      <header className="relative z-20 p-6 flex justify-between items-center border-b border-yellow-600 bg-black/80 backdrop-blur-sm">
        <h1 className="text-3xl flex items-center gap-3 font-bold">
          <div className="relative">
            <Star className="animate-spin text-yellow-400" size={32} />
            <div className="absolute inset-0 animate-ping">
              <Star className="text-yellow-400/30" size={32} />
            </div>
          </div>
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
            Ashish's Digital Realm
          </span>
        </h1>
        <nav className="flex items-center space-x-2">
          {[
            { key: "home", label: "Home", icon: Terminal },
            { key: "projects", label: "Projects", icon: Code },
            { key: "about", label: "About", icon: Cpu },
            { key: "contact", label: "Contact", icon: Mail },
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={selected === key ? "default" : "ghost"}
              onClick={() => setSelected(key as any)}
              className={`flex items-center gap-2 transition-all duration-300 hover:scale-105 ${
                selected === key
                  ? "bg-yellow-600 text-black hover:bg-yellow-500"
                  : "text-yellow-400 hover:text-yellow-200 hover:bg-yellow-900/20"
              }`}
            >
              <Icon size={16} />
              {label}
            </Button>
          ))}
		  <Link target="blank" href={"/blogs"}>
		  <Button
		  variant={"ghost"}
              className={`flex items-center gap-2 transition-all duration-300 hover:scale-105  text-yellow-400 hover:text-yellow-200 hover:bg-yellow-900/20`}
			  >
              <BookAIcon size={16} />
              Blog
            </Button>
				</Link>
				
		  <Button
			variant="ghost"
			onClick={() => {
			  setSoundOn(!soundOn);
			  if (audioRef.current) {
				if (!soundOn) {
				  audioRef.current.play();
				  console.log("Playing sound");
				} else {
				  audioRef.current.pause();
				  audioRef.current.currentTime = 0;
				}
			  }
			}}
			className="text-yellow-400 hover:text-yellow-200 hover:bg-yellow-900/20 transition-all duration-300 hover:scale-105"
		  >
			{soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
			{/* Hidden audio element */}
			<audio
			  ref={audioRef}
			  src="/music.mp3"
			  loop
			  style={{ display: "none" }}
			  onEnded={() => setSoundOn(false)}
			/>
		  </Button>
        </nav>
      </header>

      <main className="relative z-10 p-6">
        {selected === "home" && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center py-16">
              <div className="mb-8">
                <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent animate-pulse">
                  ASHISH
                </h1>
                <h2 className="text-2xl text-yellow-300 mb-2">
                  Code Jedi & Digital Architect
                </h2>
                <div className="text-yellow-500 text-sm tracking-widest">
                  SYSTEM ONLINE • STATUS: ACTIVE
                </div>
              </div>

              {/* Typing Animation */}
              <Card className="bg-black/60 border-yellow-600 shadow-2xl backdrop-blur-sm max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Terminal
                      className="text-yellow-400 mt-1 flex-shrink-0"
                      size={20}
                    />
                    <div className="text-left">
                      <div className="text-yellow-300 text-lg leading-relaxed">
                        {typedText}
                        <span className="animate-pulse text-yellow-400">|</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                <Card className="bg-yellow-900/20 border-yellow-700 hover:bg-yellow-900/30 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <Code className="mx-auto mb-3 text-yellow-400" size={32} />
                    <h3 className="text-xl font-bold text-yellow-200">50+</h3>
                    <p className="text-yellow-400">Projects Completed</p>
                  </CardContent>
                </Card>
                <Card className="bg-yellow-900/20 border-yellow-700 hover:bg-yellow-900/30 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <Cpu className="mx-auto mb-3 text-yellow-400" size={32} />
                    <h3 className="text-xl font-bold text-yellow-200">10+</h3>
                    <p className="text-yellow-400">Technologies Mastered</p>
                  </CardContent>
                </Card>
                <Card className="bg-yellow-900/20 border-yellow-700 hover:bg-yellow-900/30 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <Star className="mx-auto mb-3 text-yellow-400" size={32} />
                    <h3 className="text-xl font-bold text-yellow-200">∞</h3>
                    <p className="text-yellow-400">Lines of Code</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {selected === "projects" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-yellow-400 mb-2">
                Project Holocrons
              </h2>
              <p className="text-yellow-300">
                Discover the digital artifacts of innovation
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Matka RC Droid",
                  description:
                    "Powered by Raspberry Pi & Teensy — voice module + scary LEDs.",
                  tech: ["Raspberry Pi", "Teensy", "Python", "C++"],
                  status: "ACTIVE",
                },
                {
                  title: "Meme Alarm System",
                  description:
                    "Plays random memes using YouTube API as a funny wake-up routine.",
                  tech: ["YouTube API", "Python", "JavaScript"],
                  status: "DEPLOYED",
                },
                {
                  title: "Full Memory Scanner",
                  description:
                    "Scans local game memory for values, reverse engineering style.",
                  tech: ["C++", "Assembly", "Windows API"],
                  status: "RESEARCH",
                },
                {
                  title: "Cloud Infrastructure",
                  description:
                    "Scalable AWS deployments with Kubernetes orchestration.",
                  tech: ["AWS", "Kubernetes", "Docker", "Terraform"],
                  status: "PRODUCTION",
                },
                {
                  title: "IoT Weather Station",
                  description:
                    "Real-time weather monitoring with Arduino sensors.",
                  tech: ["Arduino", "ESP32", "MQTT", "React"],
                  status: "ACTIVE",
                },
                {
                  title: "AI Chat Assistant",
                  description:
                    "Intelligent conversational AI with natural language processing.",
                  tech: ["Python", "TensorFlow", "FastAPI", "React"],
                  status: "BETA",
                },
              ].map((project, index) => (
                <Card
                  key={index}
                  className="bg-yellow-900/10 border-yellow-700 hover:bg-yellow-900/20 transition-all duration-300 hover:scale-105 group cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-yellow-200 group-hover:text-yellow-100">
                        {project.title}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          project.status === "ACTIVE"
                            ? "bg-green-900/50 text-green-400"
                            : project.status === "DEPLOYED"
                              ? "bg-blue-900/50 text-blue-400"
                              : project.status === "PRODUCTION"
                                ? "bg-purple-900/50 text-purple-400"
                                : project.status === "BETA"
                                  ? "bg-orange-900/50 text-orange-400"
                                  : "bg-yellow-900/50 text-yellow-400"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="text-yellow-300 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-xs bg-yellow-800/30 text-yellow-300 px-2 py-1 rounded border border-yellow-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selected === "about" && (
          <Card className="bg-yellow-900/10 border-yellow-700 max-w-xl mx-auto">
            <CardContent className="p-6">
              <h2 className="text-xl  mb-2">🧠 Who is Ashish?</h2>
              <p className="text-yellow-300">
                A Code Jedi from India — fluent in JavaScript, C++, Python, and
                GoLang. Tinkers with cloud systems (AWS, DevOps) and hardware
                (Arduino, Teensy, Raspberry Pi). Loves turning silly ideas into
                working droids.
              </p>

              <div className="mt-6 space-y-2 text-yellow-300">
                <div>
                  <label>JavaScript</label>
                  <div className="w-full h-2 bg-yellow-700 rounded-full">
                    <div className="h-full bg-yellow-300 w-[90%] rounded-full"></div>
                  </div>
                </div>
                <div>
                  <label>Python</label>
                  <div className="w-full h-2 bg-yellow-700 rounded-full">
                    <div className="h-full bg-yellow-300 w-[85%] rounded-full"></div>
                  </div>
                </div>
                <div>
                  <label>GoLang</label>
                  <div className="w-full h-2 bg-yellow-700 rounded-full">
                    <div className="h-full bg-yellow-300 w-[70%] rounded-full"></div>
                  </div>
                </div>
                <div>
                  <label>Arduino / Hardware</label>
                  <div className="w-full h-2 bg-yellow-700 rounded-full">
                    <div className="h-full bg-yellow-300 w-[95%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {selected === "contact" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-yellow-400 mb-2">
                Establish Communication
              </h2>
              <p className="text-yellow-300">
                Ready to collaborate on the next digital adventure?
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-yellow-900/10 border-yellow-700 hover:bg-yellow-900/20 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-yellow-200 mb-6">
                    Direct Channels
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-yellow-900/20 hover:bg-yellow-900/30 transition-colors cursor-pointer">
                      <Mail className="text-yellow-400" size={24} />
                      <div>
                        <p className="text-yellow-200 font-semibold">Email</p>
                        <p className="text-yellow-300 text-sm">
                         ashishrohilla510@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-yellow-900/20 hover:bg-yellow-900/30 transition-colors cursor-pointer">
                      <Github className="text-yellow-400" size={24} />
                      <div>
                        <p className="text-yellow-200 font-semibold">GitHub</p>
                        <p className="text-yellow-300 text-sm">
                          github.com/ashurohilla
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-yellow-900/20 hover:bg-yellow-900/30 transition-colors cursor-pointer">
                      <Linkedin className="text-yellow-400" size={24} />
                      <div>
                        <p className="text-yellow-200 font-semibold">
                          LinkedIn
                        </p>
                        <p className="text-yellow-300 text-sm">
                          linkedin.com/in/ashish-jedi
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-yellow-900/10 border-yellow-700">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-yellow-200 mb-6">
                    System Status
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-300">Availability</span>
                      <span className="text-green-400 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        ONLINE
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-300">Response Time</span>
                      <span className="text-yellow-400">&lt; 24 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-300">Time Zone</span>
                      <span className="text-yellow-400">IST (UTC+5:30)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-300">Preferred Contact</span>
                      <span className="text-yellow-400">Email</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-yellow-900/20 rounded-lg border border-yellow-700">
                    <p className="text-yellow-300 text-sm">
                      <Terminal className="inline mr-2" size={16} />
                      Ready to discuss projects, collaborations, or just chat
                      about technology!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
	       <footer className="relative z-10 border-t border-yellow-600 bg-black/80 backdrop-blur-sm mt-16">
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Brand Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Star className="animate-spin text-yellow-400" size={24} />
                    <div className="absolute inset-0 animate-ping">
                      <Star className="text-yellow-400/30" size={24} />
                    </div>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                    Code Jedi
                  </span>
                </div>
                <p className="text-yellow-300 text-sm leading-relaxed">
                  Crafting digital experiences with the power of code and
                  creativity. May the source be with you.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-yellow-200 font-semibold text-lg">
                  Navigation
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "home", label: "Home" },
                    { key: "projects", label: "Projects" },
                    { key: "about", label: "About" },
                    { key: "contact", label: "Contact" },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setSelected(key as any)}
                      className="text-yellow-400 hover:text-yellow-200 text-sm text-left transition-colors duration-200"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-yellow-200 font-semibold text-lg">
                  Connect
                </h3>
                <div className="flex gap-4">
                  <a
                    href="mailto:ashish@jedi.codes"
                    className="p-2 rounded-lg bg-yellow-900/20 hover:bg-yellow-900/40 text-yellow-400 hover:text-yellow-200 transition-all duration-300 hover:scale-110"
                    title="Email"
                  >
                    <Mail size={20} />
                  </a>
                  <a
                    href="https://github.com/ashish-jedi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-yellow-900/20 hover:bg-yellow-900/40 text-yellow-400 hover:text-yellow-200 transition-all duration-300 hover:scale-110"
                    title="GitHub"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://linkedin.com/in/ashish-jedi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-yellow-900/20 hover:bg-yellow-900/40 text-yellow-400 hover:text-yellow-200 transition-all duration-300 hover:scale-110"
                    title="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-yellow-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-yellow-400 text-sm">
                <Terminal size={16} />
                <span>
                  © 2024 Ashish - Code Jedi. All systems operational.
                </span>
              </div>
              <div className="flex items-center gap-2 text-yellow-500 text-xs">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>SYSTEM STATUS: ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

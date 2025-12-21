import { Globe, Smartphone, Code2 } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Powerful, responsive websites built with cutting-edge technologies. From corporate sites to complex web applications."
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications delivering exceptional user experiences across all devices."
    },
    {
      icon: Code2,
      title: "Custom Software",
      description: "Robust, scalable software solutions designed to streamline operations and give you a competitive edge."
    }
  ];

  return (
    <section id="services" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <p className="text-sm text-white/40 uppercase tracking-[0.2em] mb-6 font-light">
              What We Do
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white tracking-tight">
              Our Services<span className="text-white/30">.</span>
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-8 border border-white/5 rounded-2xl hover:border-white/10 transition-all duration-500 hover:bg-white/[0.02]"
              >
                {/* Icon */}
                <div className="mb-8">
                  <service.icon
                    className="w-8 h-8 text-white/40 group-hover:text-white/60 transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-light mb-4 text-white/90 tracking-wide">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-white/50 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

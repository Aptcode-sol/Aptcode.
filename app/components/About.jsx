export default function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-20 lg:gap-32">
            {/* Left Column - Headline */}
            <div className="lg:w-1/2">
              <p className="text-sm text-white/40 uppercase tracking-[0.2em] mb-6 font-light">
                About Us
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-10 text-white leading-[1.1] tracking-tight">
                Perfect Code<span className="text-white/30">,</span>
                <br />
                Perfect Solution<span className="text-white/30">.</span>
              </h2>
              <p className="text-lg text-white/60 font-light leading-relaxed mb-6">
                At Aptcode, we believe exceptional digital solutions begin with understanding your unique challenges.
              </p>
              <p className="text-lg text-white/60 font-light leading-relaxed">
                Our name reflects our promise: to write the perfect code for the perfect solution.
              </p>
            </div>

            {/* Right Column - Features */}
            <div className="lg:w-1/2 space-y-12">
              {[
                {
                  number: "01",
                  title: "Precision Engineering",
                  description: "Every line of code crafted to deliver seamless experiences and tangible returns on your investment."
                },
                {
                  number: "02",
                  title: "User-Centric Design",
                  description: "Intuitive interfaces that put your users first, ensuring exceptional usability and engagement."
                },
                {
                  number: "03",
                  title: "Custom Solutions",
                  description: "Bespoke solutions tailored to your business needs, ensuring perfect alignment with your vision."
                }
              ].map((item) => (
                <div key={item.number} className="group">
                  <div className="flex items-start gap-6">
                    <span className="text-sm text-white/30 font-light tracking-wider pt-1">
                      {item.number}
                    </span>
                    <div className="flex-1 border-t border-white/10 pt-6">
                      <h3 className="text-xl font-light mb-3 text-white/90 tracking-wide">
                        {item.title}
                      </h3>
                      <p className="text-white/50 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

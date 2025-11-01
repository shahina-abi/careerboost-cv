"use client";

import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="py-32 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-6xl sm:text-7xl font-bold text-blue-600 mb-8 tracking-tight leading-tight">
                About Us
              </h1>
              <p className="text-xl text-black font-bold leading-relaxed tracking-wide">
                Empowering professionals to unlock their full potential through expertly crafted resumes that open doors to exceptional career opportunities.
              </p>
            </div>
            <div className="relative h-96 lg:h-full">
              <img 
                src="https://i.postimg.cc/wBWSGSVb/Young-Woman-Working-On-Laptop-on-the-floor-Over-White-Background.jpg" 
                alt="Professional working on laptop"
                className="w-full h-full object-cover rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-blue-600 mb-12 tracking-tight">
            Our Mission
          </h2>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <p className="text-lg text-black font-bold leading-loose tracking-wide">
              We believe that every professional deserves a resume that truly reflects their capabilities and accomplishments. Our mission is to bridge the gap between talent and opportunity by providing world-class CV enhancement services that highlight your unique value proposition in today's competitive job market.
            </p>
            <div className="relative h-80">
              <img 
                src="https://i.postimg.cc/7hStwc3v/Working-with-laptop.jpg" 
                alt="Professional working"
                className="w-full h-full object-cover rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-blue-600 mb-16 tracking-tight">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-5 tracking-wide">Excellence</h3>
              <p className="text-black font-light leading-loose tracking-wide">
                We maintain the highest standards in every resume we create, ensuring meticulous attention to detail and professional quality.
              </p>
            </div>

            <div className="p-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-5 tracking-wide">Personalization</h3>
              <p className="text-black font-light leading-loose tracking-wide">
                Every professional has a unique story. We tailor each resume to showcase your individual strengths and career trajectory.
              </p>
            </div>

            <div className="p-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-5 tracking-wide">Innovation</h3>
              <p className="text-black font-light leading-loose tracking-wide">
                We stay ahead of industry trends and ATS requirements to ensure your resume meets modern recruitment standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-blue-600 mb-16 tracking-tight">
            Our Expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-bold text-black mb-6 tracking-wide">Industry Experience</h3>
              <p className="text-black font-bold leading-loose tracking-wide mb-6">
                Our team comprises seasoned HR professionals, career coaches, and industry experts with decades of combined experience across various sectors including technology, finance, healthcare, marketing, and executive leadership.
              </p>
              <p className="text-black font-bold leading-loose tracking-wide">
                We understand what hiring managers look for and how to position your experience to stand out in applicant tracking systems and human reviews alike.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-600 mb-6 tracking-wide">Proven Results</h3>
              <p className="text-black font-light leading-loose tracking-wide mb-6">
                With thousands of satisfied clients who have secured interviews at Fortune 500 companies and leading organizations worldwide, our track record speaks for itself.
              </p>
              <p className="text-black font-light leading-loose tracking-wide">
                We've helped professionals at every career stage, from recent graduates to C-suite executives, achieve their career aspirations through compelling resume presentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-blue-600 mb-16 tracking-tight">
            Our Process
          </h2>
          <div className="space-y-12">
            {[
              {
                step: "1",
                title: "Consultation & Analysis",
                desc: "We begin by understanding your career goals, achievements, and target roles through detailed consultation and comprehensive review of your existing materials."
              },
              {
                step: "2",
                title: "Strategic Development",
                desc: "Our experts craft compelling content that highlights your key accomplishments, using industry-specific keywords and achievement-focused language."
              },
              {
                step: "3",
                title: "Design & Optimization",
                desc: "We format your resume with professional design principles while ensuring ATS compatibility and optimal readability."
              },
              {
                step: "4",
                title: "Review & Refinement",
                desc: "We work collaboratively with you through revisions to ensure your complete satisfaction with the final product."
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-light text-2xl">
                  {item.step}
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-normal text-black mb-4 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-black font-light leading-loose tracking-wide">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-blue-600 mb-8 tracking-tight">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-black font-light mb-12 leading-loose tracking-wide max-w-3xl mx-auto">
            Join thousands of professionals who have elevated their careers with our expert CV enhancement services.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-10 py-5 bg-gray-600 text-white font-light text-lg rounded-lg hover:bg-gray-700 transition-colors tracking-wide">
              Get Started Today
            </button>
            <button className="px-10 py-5 bg-blue-600 text-white font-light text-lg rounded-lg hover:bg-blue-700 transition-colors tracking-wide">
              View Our Services
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 sm:px-8 lg:px-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-black font-light tracking-wide">
            © 2025 CareerBoost. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

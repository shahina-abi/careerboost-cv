import HeroSection from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import MakeYourResumeShine from "@/components/ResumeSection";
import AIPoweredFeatures from "@/components/AIPoweredFeatures";
import CTASection from "@/components/CTASection";
import JobSearchSection from "@/components/JobSearch";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <MakeYourResumeShine />
      <JobSearchSection />
      <AIPoweredFeatures /> {/* 👈 Added AI section here */}
      <CTASection />
    </main>
  );
}

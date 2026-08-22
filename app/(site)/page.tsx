import CategorySection from "./(public)/_components/CategorySection";
import FeaturedProperties from "./(public)/_components/FeaturedProperties";
import HeroSection from "./(public)/_components/HeroSection";
import Testimonials from "./(public)/_components/Testimonials";


export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <CategorySection />

      <FeaturedProperties />

      {/* <WhyChooseUs /> */}

      {/* <HowItWorks /> */}

      <Testimonials />

      {/* <CTASection /> */}
    </main>
  );
}
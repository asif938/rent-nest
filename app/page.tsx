import CategorySection from "./(public)/_components/CategorySection";
import FeaturedProperties from "./(public)/_components/FeaturedProperties";
import HeroSection from "./(public)/_components/HeroSection";


export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <CategorySection />

      <FeaturedProperties />


    </main>
  );
}
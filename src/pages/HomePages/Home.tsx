import HomeHeader from '../../components/home/HomeHeader';
import HeroSection from '../../components/home/HeroSection';
import FeaturesSection from '../../components/home/FeaturesSection';
import HomeFooter from '../../components/home/HomeFooter';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HomeHeader />
      <HeroSection />
      <FeaturesSection />
      <HomeFooter />
    </div>
  );
}
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import Categories from "@/components/Categories";
import FeaturedTutorials from "@/components/FeaturedTutorials";
import FeaturedLuts from "@/components/FeaturedLuts";
import Submit from "@/components/Submit";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeatureGrid />
        <Categories />
        <FeaturedTutorials />
        <FeaturedLuts />
        <Submit />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

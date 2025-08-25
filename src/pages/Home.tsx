import Navigation from '@/components/Navigation';
import ProgressTracker from '@/components/ProgressTracker';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <section className="text-center py-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Your Project is in 
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Progress</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track the real-time progress of your photography and videography project. 
              We keep you updated every step of the way.
            </p>
          </section>

          {/* Progress Section */}
          <section className="py-12">
            <ProgressTracker />
          </section>

        </div>
      </main>
    </div>
  );
};

export default Home;
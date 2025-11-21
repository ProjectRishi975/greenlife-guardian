import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, Heart, Thermometer, Droplets, Wind, Bell } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Heart className="h-4 w-4" fill="currentColor" />
            <span className="text-sm font-medium">Caring for Those Who Need It Most</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            GreenLife Health Monitor
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            Automated health monitoring system for bedridden and paralyzed patients. 
            Real-time tracking of vital signs with intelligent alerts and virtual assistance.
          </p>
          
          <div className="flex gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
            <Button asChild size="lg" className="gap-2">
              <Link to="/auth">
                <Activity className="h-5 w-5" />
                Start Monitoring
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Comprehensive Health Monitoring
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-primary/20 hover:-translate-y-1">
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pulse Monitoring</h3>
              <p className="text-muted-foreground">
                Real-time heart rate tracking with instant alerts for abnormal readings
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-primary/20 hover:-translate-y-1">
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                <Thermometer className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Temperature Control</h3>
              <p className="text-muted-foreground">
                Continuous body temperature monitoring for optimal comfort and health
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-primary/20 hover:-translate-y-1">
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                <Droplets className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Humidity Tracking</h3>
              <p className="text-muted-foreground">
                Environmental humidity monitoring for respiratory comfort
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-primary/20 hover:-translate-y-1">
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                <Wind className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Fan Control</h3>
              <p className="text-muted-foreground">
                Automatic fan activation based on humidity and temperature levels
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-primary/20 hover:-translate-y-1">
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Alert System</h3>
              <p className="text-muted-foreground">
                Instant notifications to guardians when parameters exceed safe ranges
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-primary/20 hover:-translate-y-1">
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                <Heart className="h-6 w-6 text-primary" fill="currentColor" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Virtual Assistant</h3>
              <p className="text-muted-foreground">
                Voice-activated assistant for patient needs and emergency calls
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Caring?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join GreenLife today and provide the best automated care for your loved ones
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link to="/auth">
              Get Started Now
            </Link>
          </Button>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 GreenLife. Caring for those who need it most.</p>
        </div>
      </footer>
    </div>
  );
}

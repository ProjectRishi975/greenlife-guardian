import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Heart, Target, Users, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About GreenLife
            </h1>
            <p className="text-xl text-muted-foreground">
              Revolutionizing care for bedridden and partially paralyzed patients
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-16">
            <Card className="p-8 mb-8">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Heart className="h-8 w-8 text-primary" fill="currentColor" />
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                GreenLife is dedicated to providing automated, intelligent healthcare monitoring 
                for individuals who are bedridden or partially paralyzed. We believe everyone 
                deserves dignified, continuous care that responds to their needs in real-time.
              </p>
            </Card>

            <Card className="p-8 mb-8">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Target className="h-8 w-8 text-primary" />
                What We Do
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our system continuously monitors essential health parameters through advanced 
                IoT sensors connected via ESP8266. The system tracks:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Heart Rate:</strong> Continuous pulse monitoring with abnormality detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Body Temperature:</strong> Real-time temperature tracking for fever detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Environmental Humidity:</strong> Room conditions for respiratory comfort</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Automated Controls:</strong> Smart fan activation based on conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Alert System:</strong> Instant buzzer alerts for critical situations</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 mb-8">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Zap className="h-8 w-8 text-primary" />
                How It Works
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Sensor Network</h3>
                    <p>ESP8266 microcontroller connects medical-grade sensors to monitor vital signs 24/7</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Real-Time Data</h3>
                    <p>Data streams to Firebase Realtime Database for instant access and analysis</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Smart Dashboard</h3>
                    <p>Beautiful web interface displays live data with historical graphs and trends</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Guardian Alerts</h3>
                    <p>Automatic notifications to family members when health parameters require attention</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Virtual Assistant</h3>
                    <p>Voice-activated assistant (like Siri) helps patients request assistance when needed</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                Who Benefits
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                GreenLife is designed for:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Bedridden patients requiring constant monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Partially paralyzed individuals needing automated environmental control</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Families seeking peace of mind with real-time health updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Healthcare facilities looking to enhance patient monitoring</span>
                </li>
              </ul>
            </Card>
          </div>
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Heart } from "lucide-react";
import { auth, database } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    password: "",
    disease: "",
    guardianName: "",
    guardianPhone: "",
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        toast({
          title: "Welcome back!",
          description: "Successfully logged in",
        });
        navigate("/dashboard");
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        
        // Store patient data in Firebase
        await set(ref(database, `patients/${userCredential.user.uid}`), {
          patientName: formData.patientName,
          email: formData.email,
          disease: formData.disease,
          guardianName: formData.guardianName,
          guardianPhone: formData.guardianPhone,
          createdAt: new Date().toISOString(),
        });

        toast({
          title: "Account created!",
          description: "Welcome to GreenLife",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                <Heart className="h-8 w-8 text-primary" fill="currentColor" />
              </div>
              <h1 className="text-3xl font-bold mb-2">
                {isLogin ? "Welcome Back" : "Join GreenLife"}
              </h1>
              <p className="text-muted-foreground">
                {isLogin ? "Sign in to your account" : "Create your account"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input
                      id="patientName"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      required={!isLogin}
                    />
                  </div>

                  <div>
                    <Label htmlFor="disease">Disease/Condition</Label>
                    <Input
                      id="disease"
                      value={formData.disease}
                      onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
                      required={!isLogin}
                    />
                  </div>

                  <div>
                    <Label htmlFor="guardianName">Guardian Name</Label>
                    <Input
                      id="guardianName"
                      value={formData.guardianName}
                      onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                      required={!isLogin}
                    />
                  </div>

                  <div>
                    <Label htmlFor="guardianPhone">Guardian Phone Number</Label>
                    <Input
                      id="guardianPhone"
                      type="tel"
                      value={formData.guardianPhone}
                      onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                      required={!isLogin}
                    />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

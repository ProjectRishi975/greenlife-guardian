import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  user?: any;
}

export const Navbar = ({ user }: NavbarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out successfully",
        description: "Come back soon!",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Heart className="h-6 w-6 text-primary" fill="currentColor" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            GreenLife
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-foreground/70 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-foreground/70 hover:text-primary transition-colors">
            About
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-foreground/70 hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Button onClick={handleLogout} variant="outline" size="sm" className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

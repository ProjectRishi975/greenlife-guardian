import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Activity, Thermometer, Droplets, Wind, Bell, TrendingUp } from "lucide-react";
import { auth, database } from "@/lib/firebase";
import { ref, onValue, off, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface HealthData {
  buzzer: boolean;
  fan: boolean;
  hum: number;
  pulse: number;
  temp: number;
  timestamp: string;
}

interface PatientData {
  patientName: string;
  disease: string;
  guardianName: string;
  guardianPhone: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Listen to health monitor data
        const healthRef = ref(database, 'health_monitor');
        onValue(healthRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setHealthData(data);
            
            // Add to historical data
            setHistoricalData(prev => {
              const newData = [...prev, {
                time: new Date(data.timestamp).toLocaleTimeString(),
                pulse: data.pulse,
                temp: data.temp,
                humidity: data.hum,
              }].slice(-20); // Keep last 20 readings
              return newData;
            });
          }
        });

        // Listen to patient data
        const patientRef = ref(database, `patients/${currentUser.uid}`);
        onValue(patientRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setPatientData(data);
          }
        });

        return () => {
          off(healthRef);
          off(patientRef);
        };
      } else {
        navigate("/auth");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!healthData || !patientData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
        <Navbar user={user} />
        <div className="pt-32 flex items-center justify-center">
          <Card className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading health data...</p>
          </Card>
        </div>
      </div>
    );
  }

  const handleFanToggle = async (checked: boolean) => {
    try {
      const healthRef = ref(database, 'health_monitor');
      await update(healthRef, { fan: checked });
      toast({
        title: checked ? "Fan turned on" : "Fan turned off",
        description: "Fan status updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update fan status",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (value: number, type: string) => {
    if (type === 'pulse') {
      if (value < 60 || value > 100) return 'text-destructive';
      return 'text-success';
    }
    if (type === 'temp') {
      if (value < 36 || value > 37.5) return 'text-destructive';
      return 'text-success';
    }
    if (type === 'humidity') {
      if (value < 30 || value > 60) return 'text-warning';
      return 'text-success';
    }
    return 'text-success';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navbar user={user} />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Patient Info */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">{patientData.patientName}</h2>
                <p className="text-muted-foreground">Condition: {patientData.disease}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Guardian Contact</p>
                <p className="font-semibold">{patientData.guardianName}</p>
                <p className="text-sm text-primary">{patientData.guardianPhone}</p>
              </div>
            </div>
          </Card>

          {/* Real-time Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <span className={`text-2xl font-bold ${getStatusColor(healthData.pulse, 'pulse')}`}>
                  {healthData.pulse}
                </span>
              </div>
              <h3 className="font-semibold text-muted-foreground">Heart Rate</h3>
              <p className="text-sm text-muted-foreground">BPM</p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Thermometer className="h-6 w-6 text-primary" />
                </div>
                <span className={`text-2xl font-bold ${getStatusColor(healthData.temp, 'temp')}`}>
                  {healthData.temp}°C
                </span>
              </div>
              <h3 className="font-semibold text-muted-foreground">Temperature</h3>
              <p className="text-sm text-muted-foreground">Body Temp</p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Droplets className="h-6 w-6 text-primary" />
                </div>
                <span className={`text-2xl font-bold ${getStatusColor(healthData.hum, 'humidity')}`}>
                  {healthData.hum}%
                </span>
              </div>
              <h3 className="font-semibold text-muted-foreground">Humidity</h3>
              <p className="text-sm text-muted-foreground">Room Level</p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Wind className="h-6 w-6 text-primary" />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-2xl font-bold ${healthData.fan ? 'text-success' : 'text-muted-foreground'}`}>
                    {healthData.fan ? 'ON' : 'OFF'}
                  </span>
                  <Switch 
                    checked={healthData.fan} 
                    onCheckedChange={handleFanToggle}
                  />
                </div>
              </div>
              <h3 className="font-semibold text-muted-foreground">Fan Control</h3>
              <p className="text-sm text-muted-foreground">Manual/Auto Control</p>
            </Card>
          </div>

          {/* Alerts */}
          {healthData.buzzer && (
            <Card className="p-6 mb-8 border-destructive bg-destructive/5">
              <div className="flex items-center gap-3">
                <Bell className="h-6 w-6 text-destructive animate-pulse" />
                <div>
                  <h3 className="font-bold text-destructive">Alert Active</h3>
                  <p className="text-sm text-muted-foreground">Emergency buzzer has been triggered. Please check on patient immediately.</p>
                </div>
              </div>
            </Card>
          )}

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold">Heart Rate Trend</h3>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={historicalData}>
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))' 
                    }} 
                  />
                  <Line type="monotone" dataKey="pulse" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold">Temperature Trend</h3>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={historicalData}>
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[35, 39]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))' 
                    }} 
                  />
                  <Line type="monotone" dataKey="temp" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold">Humidity Trend</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={historicalData}>
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))' 
                  }} 
                />
                <Line type="monotone" dataKey="humidity" stroke="hsl(var(--info))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Last updated: {new Date(healthData.timestamp).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

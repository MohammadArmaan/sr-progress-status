import { useState } from 'react';
import { useProgress } from '@/contexts/ProgressContext';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import AdminLogin from '@/components/AdminLogin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Save, RotateCcw, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { currentProgress, milestones, updateProgress } = useProgress();
  const { isAuthenticated, login, logout } = useAuth();
  const [newProgress, setNewProgress] = useState(currentProgress);
  const { toast } = useToast();

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  const handleSave = () => {
    updateProgress(newProgress);
    toast({
      title: "Progress Updated",
      description: `Project progress set to ${newProgress}%`,
    });
  };

  const handleReset = () => {
    setNewProgress(currentProgress);
  };

  const handleQuickSet = (percentage: number) => {
    setNewProgress(percentage);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">Project Administration</h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  Update project progress to keep clients informed
                </p>
              </div>
              <Button
                variant="outline"
                onClick={logout}
                className="transition-all duration-300 w-full sm:w-auto"
                size="sm"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Progress Control */}
            <Card className="shadow-elegant animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Update Progress</span>
                </CardTitle>
                <CardDescription>
                  Current progress: {currentProgress}%
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Slider Control */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-foreground">
                    Progress Percentage: {newProgress}%
                  </label>
                  <Slider
                    value={[newProgress]}
                    onValueChange={(value) => setNewProgress(value[0])}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Direct Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Or enter exact percentage:
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={newProgress}
                    onChange={(e) => setNewProgress(parseInt(e.target.value) || 0)}
                    placeholder="Enter percentage"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                  <Button 
                    onClick={handleSave}
                    className="flex-1 bg-gradient-primary hover:shadow-elegant transition-all duration-300"
                    size="default"
                  >
                    <Save size={16} className="mr-2" />
                    Save Progress
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    className="flex-1 sm:flex-initial transition-all duration-300"
                    size="default"
                  >
                    <RotateCcw size={16} className="mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-elegant animate-slide-up">
              <CardHeader>
                <CardTitle>Quick Milestone Updates</CardTitle>
                <CardDescription>
                  Set progress to specific milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {milestones.map((milestone) => (
                    <Button
                      key={milestone.id}
                      variant={newProgress === milestone.percentage ? "default" : "outline"}
                      onClick={() => handleQuickSet(milestone.percentage)}
                      className="w-full justify-between transition-all duration-300"
                    >
                      <span>{milestone.name}</span>
                      <span className="text-sm">{milestone.percentage}%</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Preview */}
          <Card className="mt-8 shadow-elegant animate-slide-up">
            <CardHeader>
              <CardTitle>Progress Preview</CardTitle>
              <CardDescription>
                See how the progress will appear to clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {newProgress}%
                  </div>
                  <p className="text-muted-foreground">Complete</p>
                </div>
                
                <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${newProgress}%` }}
                  />
                </div>
                
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Current phase: <span className="font-medium text-foreground">
                      {milestones.find(m => newProgress >= m.percentage)?.name || milestones[0].name}
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;
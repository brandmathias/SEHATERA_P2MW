'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Info, Volume2, Moon, Contrast, Type } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SettingsPage() {
  const [textSize, setTextSize] = useState([110]);
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [tts, setTts] = useState(true);

  return (
    <div className="container mx-auto py-12 px-6 max-w-6xl animate-fade-in">
      <div className="mb-12">
        <h1 className="text-6xl font-headline font-medium text-foreground mb-4">Accessibility & Theme</h1>
        <p className="text-xl text-primary/70 max-w-2xl">
          Customize your view to make reading easier and more comfortable for your eyes. Changes save automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Settings Cards */}
        <div className="lg:col-span-7 space-y-8">
          {/* Text Settings */}
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[2rem] p-4 overflow-hidden">
            <CardContent className="p-6 space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-headline font-bold">Text Settings</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-medium">Text Size Adjustment</Label>
                  <Badge variant="secondary" className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                    {textSize[0]}%
                  </Badge>
                </div>
                
                <div className="flex items-center gap-6">
                  <span className="text-lg text-muted-foreground font-medium">aT</span>
                  <Slider
                    value={textSize}
                    onValueChange={setTextSize}
                    max={200}
                    min={80}
                    step={5}
                    className="flex-grow"
                  />
                  <span className="text-2xl font-bold">TT</span>
                </div>
                <p className="text-primary/60 text-md italic">
                  Slide to the right to make the text larger and easier to read.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Display Preferences */}
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[2rem] p-4 overflow-hidden">
            <CardContent className="p-6 space-y-8">
              <h3 className="text-2xl font-headline font-bold">Display Preferences</h3>
              
              <div className="space-y-6">
                {/* High Contrast */}
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-4 rounded-2xl group-hover:bg-primary/20 transition-colors">
                      <Contrast className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <Label className="text-lg font-bold">High Contrast Mode</Label>
                      <p className="text-muted-foreground">Increases the difference between text and background colors.</p>
                    </div>
                  </div>
                  <Switch checked={highContrast} onCheckedChange={setHighContrast} />
                </div>

                <div className="h-px bg-muted mx-2" />

                {/* Dark Mode */}
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-4 rounded-2xl group-hover:bg-primary/20 transition-colors">
                      <Moon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <Label className="text-lg font-bold">Dark Mode</Label>
                      <p className="text-muted-foreground">Reduces eye strain in low light conditions.</p>
                    </div>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>

                <div className="h-px bg-muted mx-2" />

                {/* TTS */}
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-4 rounded-2xl group-hover:bg-primary/20 transition-colors">
                      <Volume2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <Label className="text-lg font-bold">Text-to-Speech</Label>
                      <p className="text-muted-foreground">Add a read-aloud button to articles.</p>
                    </div>
                  </div>
                  <Switch checked={tts} onCheckedChange={setTts} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Live Preview */}
        <div className="lg:col-span-5 space-y-6">
          <h4 className="text-xs font-bold text-primary tracking-widest uppercase mb-4">Live Preview</h4>
          
          <div className="relative mx-auto max-w-[340px] aspect-[9/16] bg-secondary/20 rounded-[3rem] p-6 shadow-2xl border-4 border-white overflow-hidden">
            <Card className="overflow-hidden border-none shadow-xl rounded-[1.5rem] bg-white h-full flex flex-col">
              <div className="bg-primary/5 p-4 flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-primary/20">
                  <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100" />
                  <AvatarFallback>E</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-bold">Community Update</p>
                  <p className="text-[10px] text-muted-foreground">Just now</p>
                </div>
              </div>
              <div className="p-6 space-y-4 flex-grow">
                <h5 className="text-2xl font-headline font-bold text-primary leading-tight">Gardening Club Meeting</h5>
                <p className="text-sm text-foreground/80 leading-relaxed" style={{ fontSize: `${textSize[0]/110}rem` }}>
                  Join us this Tuesday at the community center. We will be planting new herbs and enjoying some fresh tea together.
                </p>
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-md">
                  <Image 
                    src="https://images.unsplash.com/photo-1586251214631-55099351062a?q=80&w=400" 
                    alt="Gardening" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="p-6">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 font-bold text-lg shadow-lg shadow-primary/20">
                  Sign Up
                </Button>
              </div>
            </Card>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex gap-3 items-start">
            <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700/80 leading-snug">
              This preview window shows you how content will look throughout the SEHATERA platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
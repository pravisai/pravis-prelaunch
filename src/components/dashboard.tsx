"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Palette, Box, Moon, LineChart, Paperclip, Camera, Mic } from "lucide-react";
import { Cube } from "./cube";

export function Dashboard() {
  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen bg-background text-foreground font-sans">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            {/* You can add a logo here if you want */}
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Palette className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Customize</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Box className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Integrations</p>
              </TooltipContent>
            </Tooltip>
             <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Moon className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <LineChart className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Analytics</p>
              </TooltipContent>
            </Tooltip>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
             <div className="text-center mb-12 z-20">
                <h1 className="text-6xl font-bold tracking-widest text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-primary">
                    P.R.A.V.I.S
                </h1>
                <p className="text-muted-foreground mt-2">
                    your Personal Restorative Alignment Virtually Intelligent System
                </p>
            </div>
            
            <Cube />

        </main>

        <footer className="p-4 z-20">
          <div className="relative max-w-2xl mx-auto">
             <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-lg opacity-30"></div>
            <Input
              placeholder="type a message with pravis..."
              className="w-full bg-input border-border rounded-full pl-12 pr-24 py-6 text-base"
            />
             <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-primary animate-pulse"></div>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Camera className="w-5 h-5" />
              </Button>
               <Button variant="ghost" size="icon" className="bg-primary/20 text-primary rounded-full hover:bg-primary/30">
                <Mic className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}

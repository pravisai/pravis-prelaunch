import { AnimatedLogo } from "@/components/animated-logo";
import { ParticleBackground } from "@/components/particle-background";
import { WaitlistForm } from "@/components/waitlist-form";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <main className="flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md p-8 sm:p-12 text-center bg-card/90 backdrop-blur-sm rounded-2xl shadow-2xl shadow-purple-500/5 z-10">
          <AnimatedLogo />
          <h1 className="text-5xl font-bold tracking-tighter text-primary font-headline">
            Pravis
          </h1>
          <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
            Design your digital mind.<br />
            Join the first <span className="text-accent font-semibold">•</span> Founder wave.
          </p>
          <div className="mt-10">
            <WaitlistForm />
          </div>
        </div>
      </main>
    </>
  );
}

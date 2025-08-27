"use client";

export function AnimatedLogo() {
  return (
    <div className="mb-5 h-20 flex items-center justify-center">
      <div className="relative w-20 h-20">
        <div className="absolute w-20 h-20 border-2 rounded-full border-t-primary border-b-primary border-x-transparent animate-rotate" style={{ animationDuration: '2s' }}></div>
        <div className="absolute w-16 h-16 top-2 left-2 border-2 rounded-full border-t-accent border-b-accent border-x-transparent animate-rotate" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
        <div className="absolute w-[30px] h-[30px] top-[25px] left-[25px] animate-cube-float" style={{ transformStyle: 'preserve-3d' }}>
          <div className="relative w-[30px] h-[30px] animate-cube-rotate" style={{ transformStyle: 'preserve-3d' }}>
            <div className="absolute w-[30px] h-[30px] bg-gradient-to-br from-primary to-accent border border-white/10 shadow-[0_0_8px_hsl(var(--primary)/0.3)]" style={{ transform: 'translateZ(15px)' }}></div>
            <div className="absolute w-[30px] h-[30px] bg-gradient-to-br from-primary to-accent border border-white/10 shadow-[0_0_8px_hsl(var(--primary)/0.3)]" style={{ transform: 'rotateY(180deg) translateZ(15px)' }}></div>
            <div className="absolute w-[30px] h-[30px] bg-gradient-to-br from-primary to-accent border border-white/10 shadow-[0_0_8px_hsl(var(--primary)/0.3)]" style={{ transform: 'rotateY(90deg) translateZ(15px)' }}></div>
            <div className="absolute w-[30px] h-[30px] bg-gradient-to-br from-primary to-accent border border-white/10 shadow-[0_0_8px_hsl(var(--primary)/0.3)]" style={{ transform: 'rotateY(-90deg) translateZ(15px)' }}></div>
            <div className="absolute w-[30px] h-[30px] bg-gradient-to-br from-primary to-accent border border-white/10 shadow-[0_0_8px_hsl(var(--primary)/0.3)]" style={{ transform: 'rotateX(90deg) translateZ(15px)' }}></div>
            <div className="absolute w-[30px] h-[30px] bg-gradient-to-br from-primary to-accent border border-white/10 shadow-[0_0_8px_hsl(var(--primary)/0.3)]" style={{ transform: 'rotateX(-90deg) translateZ(15px)' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

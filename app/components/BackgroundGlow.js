/**
 * BackgroundGlow — Server Component
 * Renders ambient glow orbs and the cyber-grid overlay behind all pages.
 */
export default function BackgroundGlow() {
  return (
    <>
      {/* Ambient Glow Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div
          className="glow-blob glow-blob-primary w-[42rem] h-[42rem] -top-60 -left-44"
          style={{ animation: "pulse-slow 9s cubic-bezier(0.4,0,0.6,1) infinite" }}
        />
        <div
          className="glow-blob glow-blob-secondary w-[48rem] h-[48rem] top-[38%] right-[-220px]"
          style={{ animation: "pulse-slow 12s cubic-bezier(0.4,0,0.6,1) infinite 1s" }}
        />
        <div
          className="glow-blob glow-blob-primary w-[36rem] h-[36rem] bottom-[-120px] left-[8%]"
          style={{ animation: "pulse-slow 10s cubic-bezier(0.4,0,0.6,1) infinite 3s" }}
        />
      </div>

      {/* Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-40 z-0 pointer-events-none" />
    </>
  );
}

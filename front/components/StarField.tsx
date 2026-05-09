"use client"

export function StarField() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
      {/* Static stars with CSS */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(1px 1px at 20px 30px, white, transparent),
          radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), transparent),
          radial-gradient(1px 1px at 50px 160px, rgba(255,255,255,0.6), transparent),
          radial-gradient(1px 1px at 90px 40px, white, transparent),
          radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.7), transparent),
          radial-gradient(1.5px 1.5px at 160px 120px, white, transparent),
          radial-gradient(1px 1px at 200px 50px, rgba(255,255,255,0.5), transparent),
          radial-gradient(1px 1px at 220px 150px, white, transparent),
          radial-gradient(1px 1px at 280px 90px, rgba(255,255,255,0.8), transparent),
          radial-gradient(1.5px 1.5px at 320px 20px, white, transparent)
        `,
        backgroundSize: '350px 200px'
      }} />
    </div>
  )
}
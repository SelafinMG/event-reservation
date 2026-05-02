"use client";

/**
 * NightSky — fond nuit brumeuse minimaliste
 * Nuages SVG flottants + étoiles CSS pures
 * Aucun canvas, aucun JS en boucle → performant
 */
export default function NightSky() {
  return (
    <div className="night-sky" aria-hidden="true">
      {/* ── Fond dégradé nuit ── */}
      <div className="sky-gradient" />

      {/* ── Lune douce ── */}
      <div className="moon" />
      <div className="moon-glow" />

      {/* ── Étoiles pures CSS ── */}
      <div className="stars-layer stars-sm" />
      <div className="stars-layer stars-md" />
      <div className="stars-layer stars-lg" />

      {/* ── Nuages SVG animés ── */}
      <svg
        className="clouds-svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="cloud-blur-1">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id="cloud-blur-2">
            <feGaussianBlur stdDeviation="30" />
          </filter>
          <filter id="cloud-blur-3">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <filter id="cloud-blur-4">
            <feGaussianBlur stdDeviation="45" />
          </filter>
        </defs>

        {/* Nuage masse arrière — très diffus */}
        <g filter="url(#cloud-blur-4)" className="cloud cloud-back-1">
          <ellipse cx="300" cy="200" rx="280" ry="80" fill="rgba(220,230,255,0.045)" />
          <ellipse cx="420" cy="170" rx="200" ry="60" fill="rgba(200,215,255,0.04)" />
        </g>

        <g filter="url(#cloud-blur-4)" className="cloud cloud-back-2">
          <ellipse cx="1100" cy="300" rx="320" ry="90" fill="rgba(210,225,255,0.04)" />
          <ellipse cx="980" cy="270" rx="220" ry="65" fill="rgba(200,220,255,0.035)" />
        </g>

        {/* Nuage milieu gauche */}
        <g filter="url(#cloud-blur-2)" className="cloud cloud-mid-1">
          <ellipse cx="160" cy="380" rx="180" ry="55" fill="rgba(230,238,255,0.07)" />
          <ellipse cx="280" cy="360" rx="140" ry="42" fill="rgba(220,232,255,0.065)" />
          <ellipse cx="80"  cy="390" rx="100" ry="38" fill="rgba(225,235,255,0.055)" />
        </g>

        {/* Nuage milieu droite */}
        <g filter="url(#cloud-blur-2)" className="cloud cloud-mid-2">
          <ellipse cx="1280" cy="260" rx="200" ry="60" fill="rgba(228,236,255,0.065)" />
          <ellipse cx="1160" cy="240" rx="160" ry="50" fill="rgba(215,228,255,0.055)" />
          <ellipse cx="1380" cy="275" rx="120" ry="42" fill="rgba(222,233,255,0.06)" />
        </g>

        {/* Nuage avant gauche — plus visible */}
        <g filter="url(#cloud-blur-3)" className="cloud cloud-front-1">
          <ellipse cx="-60"  cy="560" rx="200" ry="58" fill="rgba(235,242,255,0.09)" />
          <ellipse cx="80"   cy="540" rx="170" ry="50" fill="rgba(230,240,255,0.085)" />
          <ellipse cx="180"  cy="555" rx="130" ry="44" fill="rgba(225,237,255,0.075)" />
          <ellipse cx="260"  cy="570" rx="90"  ry="35" fill="rgba(220,235,255,0.065)" />
        </g>

        {/* Nuage avant droite */}
        <g filter="url(#cloud-blur-3)" className="cloud cloud-front-2">
          <ellipse cx="1500" cy="500" rx="220" ry="62" fill="rgba(232,240,255,0.088)" />
          <ellipse cx="1360" cy="482" rx="180" ry="54" fill="rgba(228,238,255,0.082)" />
          <ellipse cx="1260" cy="495" rx="140" ry="46" fill="rgba(223,235,255,0.072)" />
        </g>

        {/* Nappe de brume basse */}
        <g filter="url(#cloud-blur-4)" className="cloud cloud-mist">
          <ellipse cx="720" cy="820" rx="800" ry="120" fill="rgba(210,225,255,0.055)" />
        </g>

        {/* Nuage central léger */}
        <g filter="url(#cloud-blur-2)" className="cloud cloud-center">
          <ellipse cx="650" cy="140" rx="260" ry="65" fill="rgba(225,235,255,0.05)" />
          <ellipse cx="780" cy="120" rx="180" ry="50" fill="rgba(218,230,255,0.045)" />
        </g>
      </svg>

      <style>{`
        .night-sky {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        /* ── Dégradé nuit ── */
        .sky-gradient {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 120% 60% at 50% -10%, #0d1f35 0%, transparent 70%),
            linear-gradient(180deg,
              #060c18 0%,
              #080e1c 35%,
              #06101e 65%,
              #050b16 100%
            );
        }

        /* ── Lune ── */
        .moon {
          position: absolute;
          top: 7%;
          right: 15%;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 38%, #e8eef8, #c8d4e8 60%, #9aabcc);
          box-shadow:
            0 0 0 1px rgba(200,215,240,0.15),
            0 0 30px 6px rgba(180,200,235,0.12),
            0 0 80px 20px rgba(160,185,225,0.07);
        }

        .moon-glow {
          position: absolute;
          top: calc(7% - 30px);
          right: calc(15% - 30px);
          width: 116px;
          height: 116px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(180,205,240,0.08) 0%, transparent 70%);
          filter: blur(20px);
        }

        /* ── Étoiles CSS (box-shadow trick) ── */
        .stars-layer {
          position: absolute;
          inset: 0;
          border-radius: 50%;
        }

        .stars-sm {
          background: transparent;
          box-shadow:
            /* 40 petites étoiles */
            42px 78px 0 0px rgba(255,255,255,0.55),
            150px 30px 0 0px rgba(255,255,255,0.45),
            230px 95px 0 0px rgba(255,255,255,0.5),
            310px 20px 0 0px rgba(255,255,255,0.4),
            410px 65px 0 0px rgba(255,255,255,0.55),
            490px 42px 0 0px rgba(255,255,255,0.35),
            570px 88px 0 0px rgba(255,255,255,0.5),
            660px 15px 0 0px rgba(255,255,255,0.45),
            740px 72px 0 0px rgba(255,255,255,0.4),
            820px 38px 0 0px rgba(255,255,255,0.55),
            900px 92px 0 0px rgba(255,255,255,0.45),
            980px 25px 0 0px rgba(255,255,255,0.5),
            1060px 58px 0 0px rgba(255,255,255,0.4),
            1140px 82px 0 0px rgba(255,255,255,0.45),
            1220px 18px 0 0px rgba(255,255,255,0.55),
            1300px 70px 0 0px rgba(255,255,255,0.4),
            1380px 45px 0 0px rgba(255,255,255,0.5),
            85px 145px 0 0px rgba(255,255,255,0.35),
            185px 168px 0 0px rgba(255,255,255,0.45),
            285px 122px 0 0px rgba(255,255,255,0.4),
            385px 190px 0 0px rgba(255,255,255,0.5),
            485px 135px 0 0px rgba(255,255,255,0.35),
            585px 175px 0 0px rgba(255,255,255,0.45),
            685px 108px 0 0px rgba(255,255,255,0.55),
            785px 162px 0 0px rgba(255,255,255,0.4),
            885px 128px 0 0px rgba(255,255,255,0.45),
            985px 182px 0 0px rgba(255,255,255,0.35),
            1085px 115px 0 0px rgba(255,255,255,0.5),
            1185px 155px 0 0px rgba(255,255,255,0.4),
            1285px 195px 0 0px rgba(255,255,255,0.45),
            60px 240px 0 0px rgba(255,255,255,0.35),
            360px 265px 0 0px rgba(255,255,255,0.4),
            560px 220px 0 0px rgba(255,255,255,0.45),
            760px 275px 0 0px rgba(255,255,255,0.35),
            960px 235px 0 0px rgba(255,255,255,0.4),
            1160px 258px 0 0px rgba(255,255,255,0.45),
            1360px 228px 0 0px rgba(255,255,255,0.35),
            110px 310px 0 0px rgba(255,255,255,0.3),
            710px 325px 0 0px rgba(255,255,255,0.3),
            1010px 315px 0 0px rgba(255,255,255,0.3);
          width: 1px;
          height: 1px;
          animation: twinkle-sm 6s ease-in-out infinite alternate;
        }

        .stars-md {
          background: transparent;
          box-shadow:
            120px 55px 0 1px rgba(255,255,255,0.6),
            480px 30px 0 1px rgba(255,255,255,0.5),
            820px 60px 0 1px rgba(255,255,255,0.65),
            1100px 40px 0 1px rgba(255,255,255,0.55),
            1350px 75px 0 1px rgba(255,255,255,0.6),
            250px 140px 0 1px rgba(255,255,255,0.5),
            630px 155px 0 1px rgba(255,255,255,0.6),
            950px 130px 0 1px rgba(255,255,255,0.5),
            1250px 160px 0 1px rgba(255,255,255,0.55),
            380px 210px 0 1px rgba(255,255,255,0.45),
            840px 225px 0 1px rgba(255,255,255,0.5),
            1180px 205px 0 1px rgba(255,255,255,0.45);
          width: 1.5px;
          height: 1.5px;
          animation: twinkle-md 8s ease-in-out infinite alternate;
          animation-delay: -2s;
        }

        .stars-lg {
          background: transparent;
          box-shadow:
            340px 45px 0 1px rgba(220,235,255,0.7),
            900px 25px 0 1px rgba(220,235,255,0.65),
            1200px 85px 0 1px rgba(220,235,255,0.7),
            600px 110px 0 1px rgba(220,235,255,0.6),
            1050px 95px 0 1px rgba(220,235,255,0.65);
          width: 2px;
          height: 2px;
          animation: twinkle-lg 10s ease-in-out infinite alternate;
          animation-delay: -4s;
        }

        /* ── Animations nuages ── */
        .clouds-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .cloud { animation-timing-function: ease-in-out; animation-iteration-count: infinite; animation-direction: alternate; }

        .cloud-back-1  { animation: drift1  55s ease-in-out infinite alternate; }
        .cloud-back-2  { animation: drift2  62s ease-in-out infinite alternate; }
        .cloud-mid-1   { animation: drift3  42s ease-in-out infinite alternate; }
        .cloud-mid-2   { animation: drift4  48s ease-in-out infinite alternate; }
        .cloud-front-1 { animation: drift5  35s ease-in-out infinite alternate; }
        .cloud-front-2 { animation: drift6  38s ease-in-out infinite alternate; }
        .cloud-mist    { animation: drift7  70s ease-in-out infinite alternate; }
        .cloud-center  { animation: drift8  52s ease-in-out infinite alternate; }

        @keyframes drift1  { from { transform: translateX(0);    } to { transform: translateX(40px);  } }
        @keyframes drift2  { from { transform: translateX(0);    } to { transform: translateX(-50px); } }
        @keyframes drift3  { from { transform: translateX(-15px);} to { transform: translateX(30px);  } }
        @keyframes drift4  { from { transform: translateX(20px); } to { transform: translateX(-35px); } }
        @keyframes drift5  { from { transform: translateX(-10px);} to { transform: translateX(45px);  } }
        @keyframes drift6  { from { transform: translateX(15px); } to { transform: translateX(-40px); } }
        @keyframes drift7  { from { transform: translateX(-20px);} to { transform: translateX(25px);  } }
        @keyframes drift8  { from { transform: translateX(10px); } to { transform: translateX(-30px); } }

        @keyframes twinkle-sm {
          0%   { opacity: 0.6; }
          50%  { opacity: 0.9; }
          100% { opacity: 0.5; }
        }
        @keyframes twinkle-md {
          0%   { opacity: 0.7; }
          50%  { opacity: 1;   }
          100% { opacity: 0.6; }
        }
        @keyframes twinkle-lg {
          0%   { opacity: 0.8; }
          50%  { opacity: 1;   }
          100% { opacity: 0.65;}
        }
      `}</style>
    </div>
  );
}
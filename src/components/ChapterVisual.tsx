import React from 'react';

interface ChapterVisualProps {
  visualKey: string;
  year: number;
  age: number;
}

export const ChapterVisual: React.FC<ChapterVisualProps> = ({ visualKey, year, age }) => {
  return (
    <div className="relative w-full max-w-lg aspect-4/3 sm:aspect-16/11 mx-auto flex items-center justify-center select-none pointer-events-none">
      {/* Soft ambient background glow */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl opacity-35 transition-all duration-1000 -z-10"
        style={{
          background: visualKey === 'century' 
            ? 'radial-gradient(circle, #E2DCD1 0%, rgba(250,248,243,0) 70%)'
            : visualKey === 'old-age'
            ? 'radial-gradient(circle, #F3DECA 0%, rgba(250,248,243,0) 70%)'
            : 'radial-gradient(circle, #EFE8DA 0%, rgba(250,248,243,0) 70%)'
        }}
      />

      {/* Visual Renderings for each chapter */}
      {visualKey === 'birth' && (
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-72 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="birthGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FAF0E6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FAF0E6" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="cradleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9B79C" />
              <stop offset="100%" stopColor="#9C8B72" />
            </linearGradient>
          </defs>

          {/* Warm background aura */}
          <circle cx="200" cy="150" r="105" fill="url(#birthGlow)" className="animate-breathe" />

          {/* Hanging mobile star & moon */}
          <line x1="200" y1="20" x2="200" y2="70" stroke="#C9B79C" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="160" y1="70" x2="240" y2="70" stroke="#C9B79C" strokeWidth="1" />
          
          <g className="animate-sway origin-top">
            <line x1="165" y1="70" x2="165" y2="95" stroke="#C9B79C" strokeWidth="0.8" />
            <polygon points="165,95 168,102 175,102 169,106 171,113 165,109 159,113 161,106 155,102 162,102" fill="#D8C3A5" opacity="0.8" />
            
            <line x1="235" y1="70" x2="235" y2="90" stroke="#C9B79C" strokeWidth="0.8" />
            <circle cx="235" cy="98" r="7" fill="#E6DAC8" />
            <circle cx="238" cy="96" r="6" fill="#FAF8F3" />
          </g>

          {/* Floating starlight dust */}
          <circle cx="130" cy="120" r="2" fill="#C9B79C" className="animate-float-slow" />
          <circle cx="270" cy="130" r="1.5" fill="#C9B79C" className="animate-float-slow" style={{ animationDelay: '2s' }} />
          <circle cx="180" cy="230" r="2" fill="#C9B79C" className="animate-float-slow" style={{ animationDelay: '4s' }} />
          <circle cx="225" cy="60" r="1.5" fill="#C9B79C" className="animate-float-slow" style={{ animationDelay: '1s' }} />

          {/* Elegant minimalist woven basket / cradle */}
          <path d="M 120 185 Q 200 240 280 185 Q 260 215 200 218 Q 140 215 120 185 Z" fill="#EFE8DD" stroke="#D1C3B2" strokeWidth="1.2" />
          <path d="M 130 180 Q 200 155 270 180 Q 255 198 200 200 Q 145 198 130 180 Z" fill="#FFFFFF" stroke="#E5DCD0" strokeWidth="1" />
          
          {/* Sleeping newborn blanket bundle */}
          <g className="animate-breathe origin-center">
            <ellipse cx="200" cy="175" rx="38" ry="18" fill="#FBF7F2" stroke="#D9CEBF" strokeWidth="1" />
            {/* Baby head silhouette */}
            <circle cx="178" cy="168" r="13" fill="#EBDDCB" />
            {/* Tiny sleeping cap or soft curl */}
            <path d="M 172 163 Q 178 155 186 162" stroke="#8C7A65" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            {/* Peaceful closed eye arc */}
            <path d="M 174 169 Q 177 172 180 169" stroke="#7A6855" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            {/* Soft blanket folds */}
            <path d="M 188 174 Q 208 179 230 172" stroke="#D8CCBD" strokeWidth="1" strokeLinecap="round" fill="none" />
            <path d="M 194 180 Q 212 184 225 178" stroke="#D8CCBD" strokeWidth="1" strokeLinecap="round" fill="none" />
          </g>

          {/* Cradle stand */}
          <path d="M 160 220 L 140 255" stroke="#B8A68F" strokeWidth="2" strokeLinecap="round" />
          <path d="M 240 220 L 260 255" stroke="#B8A68F" strokeWidth="2" strokeLinecap="round" />
          <path d="M 130 255 Q 200 262 270 255" stroke="#B8A68F" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      )}

      {visualKey === 'childhood' && (
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-72 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Warm Sun in background */}
          <circle cx="285" cy="95" r="42" fill="#F8EFE2" className="animate-sun-pulse origin-center" />
          <circle cx="285" cy="95" r="54" stroke="#F5E7D3" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

          {/* Gentle rolling grassy hills */}
          <path d="M 0 250 Q 140 215 280 235 T 400 220 L 400 300 L 0 300 Z" fill="#F0EBE0" opacity="0.6" />
          <path d="M 0 265 Q 160 230 320 255 T 400 245 L 400 300 L 0 300 Z" fill="#EAE2D5" />

          {/* Little child walking silhouette */}
          <g transform="translate(170, 185)">
            {/* Child head */}
            <circle cx="20" cy="18" r="8" fill="#423933" />
            {/* Hair bun/curls */}
            <circle cx="16" cy="15" r="3.5" fill="#423933" />
            {/* Body / dress / coat */}
            <path d="M 14 26 L 10 46 L 30 46 L 26 26 Z" fill="#756254" />
            {/* Legs running / stepping */}
            <line x1="16" y1="46" x2="13" y2="60" stroke="#423933" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="24" y1="46" x2="28" y2="58" stroke="#423933" strokeWidth="2.5" strokeLinecap="round" />
            {/* Curious outstretched arm reaching */}
            <path d="M 23 30 Q 34 26 42 22" stroke="#423933" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>

          {/* Fluttering butterfly */}
          <g className="animate-float-slow" style={{ transformOrigin: '230px 190px' }}>
            <path d="M 230 190 Q 235 180 240 188 Q 242 195 230 192" fill="#C9B79C" />
            <path d="M 230 190 Q 235 200 240 193 Q 242 187 230 189" fill="#B5A184" />
          </g>

          {/* Dandelion seeds drifting in wind */}
          <g className="animate-float-slow" style={{ animationDelay: '1.5s' }}>
            <circle cx="80" cy="170" r="1.5" fill="#A89885" />
            <line x1="80" y1="170" x2="74" y2="176" stroke="#A89885" strokeWidth="0.8" />
            <circle cx="110" cy="150" r="1.5" fill="#A89885" />
            <line x1="110" y1="150" x2="105" y2="155" stroke="#A89885" strokeWidth="0.8" />
            <circle cx="140" cy="130" r="1.5" fill="#A89885" />
            <line x1="140" y1="130" x2="136" y2="135" stroke="#A89885" strokeWidth="0.8" />
          </g>

          {/* Tall meadow grass flowers */}
          <path d="M 60 265 Q 65 240 72 230" stroke="#B8AA98" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <circle cx="72" cy="228" r="3" fill="#D9CEBF" />
          <path d="M 90 270 Q 98 245 92 235" stroke="#B8AA98" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <circle cx="92" cy="233" r="2.5" fill="#D9CEBF" />
          <path d="M 330 260 Q 325 235 320 225" stroke="#B8AA98" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <circle cx="320" cy="223" r="3" fill="#D9CEBF" />
        </svg>
      )}

      {visualKey === 'school' && (
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-72 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Gentle moving clouds */}
          <g className="animate-float-slow opacity-60">
            <path d="M 80 75 Q 95 60 115 65 Q 130 55 145 68 Q 160 70 160 82 L 80 82 Z" fill="#EAE4D8" />
            <path d="M 270 50 Q 285 40 300 45 Q 315 35 330 48 L 270 48 Z" fill="#EAE4D8" />
          </g>

          {/* Distant schoolhouse with clock / bell tower */}
          <g transform="translate(190, 80)">
            {/* Bell tower roof */}
            <polygon points="60,20 40,60 80,60" fill="#B3A28E" />
            <rect x="48" y="60" width="24" height="25" fill="#E5DDD0" stroke="#C9B79C" strokeWidth="1" />
            {/* Small bell */}
            <circle cx="60" cy="72" r="4" fill="#8C7A65" />
            {/* Main school building */}
            <rect x="10" y="85" width="100" height="75" fill="#F4EFE6" stroke="#D9CEBF" strokeWidth="1.2" />
            <polygon points="10,85 60,50 110,85" fill="#C9B79C" />
            {/* Windows */}
            <rect x="25" y="100" width="16" height="20" rx="2" fill="#FFFFFF" stroke="#C9B79C" strokeWidth="1" />
            <rect x="52" y="100" width="16" height="20" rx="2" fill="#FFFFFF" stroke="#C9B79C" strokeWidth="1" />
            <rect x="79" y="100" width="16" height="20" rx="2" fill="#FFFFFF" stroke="#C9B79C" strokeWidth="1" />
            {/* Door */}
            <path d="M 50 160 L 50 135 Q 60 130 70 135 L 70 160 Z" fill="#8C7A65" />
          </g>

          {/* Mature leafy tree */}
          <g transform="translate(50, 100)">
            <path d="M 50 140 Q 55 100 45 80 Q 42 60 52 40" stroke="#8C7A65" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* Foliage puffs */}
            <circle cx="50" cy="40" r="32" fill="#D6CEBE" opacity="0.8" />
            <circle cx="70" cy="55" r="26" fill="#C5BBA9" opacity="0.8" />
            <circle cx="30" cy="55" r="28" fill="#DFD7C8" opacity="0.8" />
          </g>

          {/* Ground pathway */}
          <path d="M 0 240 Q 200 235 400 240 L 400 300 L 0 300 Z" fill="#EAE3D6" />
          <path d="M 120 280 Q 210 240 250 240" stroke="#FAF8F3" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.8" />

          {/* Student with backpack & book */}
          <g transform="translate(130, 180)">
            <circle cx="20" cy="15" r="7" fill="#3D352E" />
            {/* Backpack on back */}
            <rect x="6" y="24" width="8" height="15" rx="3" fill="#8C745E" />
            {/* Jacket body */}
            <path d="M 13 22 L 27 22 L 25 45 L 15 45 Z" fill="#52463D" />
            {/* Holding book */}
            <rect x="22" y="30" width="10" height="8" rx="1" fill="#C9B79C" transform="rotate(-15 22 30)" />
            {/* Legs walking */}
            <line x1="17" y1="45" x2="14" y2="62" stroke="#3D352E" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="23" y1="45" x2="27" y2="60" stroke="#3D352E" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      )}

      {visualKey === 'teen' && (
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-72 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dawn horizon / morning glow */}
          <defs>
            <linearGradient id="dawnSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F9EBE0" />
              <stop offset="60%" stopColor="#F5ECE1" />
              <stop offset="100%" stopColor="#EDE3D4" />
            </linearGradient>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F8DDC2" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FAF8F3" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sun on horizon */}
          <circle cx="200" cy="180" r="90" fill="url(#sunGlow)" className="animate-sun-pulse" />
          <circle cx="200" cy="180" r="32" fill="#FCEAD6" />

          {/* Vast horizon line */}
          <line x1="40" y1="185" x2="360" y2="185" stroke="#D1C3B0" strokeWidth="1" strokeDasharray="6 4" opacity="0.6" />

          {/* Open window arch or cliff viewpoint */}
          <path d="M 60 280 L 60 120 Q 200 40 340 120 L 340 280" stroke="#D8CEBF" strokeWidth="3" fill="none" opacity="0.5" />
          <line x1="40" y1="280" x2="360" y2="280" stroke="#B8A793" strokeWidth="3" strokeLinecap="round" />

          {/* Silhouette of young person standing, gazing forward */}
          <g transform="translate(185, 140)">
            {/* Head looking right toward horizon */}
            <circle cx="15" cy="20" r="9" fill="#2E2822" />
            {/* Breeze in hair */}
            <path d="M 12 12 Q 5 15 2 24 Q 8 20 12 18" fill="#2E2822" />
            {/* Slender youthful posture */}
            <path d="M 10 29 L 20 29 L 23 75 L 7 75 Z" fill="#423932" />
            {/* Coat/jacket tails lifted gently by morning breeze */}
            <path d="M 7 50 Q -2 60 0 74 L 8 70 Z" fill="#423932" className="animate-sway origin-top-left" />
            {/* Hands in pocket / thoughtful */}
            <path d="M 18 38 L 22 55" stroke="#2E2822" strokeWidth="2.5" strokeLinecap="round" />
            {/* Legs */}
            <line x1="11" y1="75" x2="10" y2="135" stroke="#2E2822" strokeWidth="3" strokeLinecap="round" />
            <line x1="19" y1="75" x2="20" y2="135" stroke="#2E2822" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Gentle birds flying toward horizon */}
          <g className="animate-float-slow" style={{ animationDelay: '2s' }}>
            <path d="M 280 110 Q 287 105 294 110 Q 301 105 308 110" stroke="#8C7D6B" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            <path d="M 315 95 Q 320 90 325 95 Q 330 90 335 95" stroke="#8C7D6B" strokeWidth="1" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      )}

      {visualKey === 'young-adult' && (
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-72 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Architectural city skyline & bridges silhouette */}
          <g opacity="0.6">
            <rect x="60" y="90" width="35" height="130" fill="#E2DACD" />
            <polygon points="60,90 77,65 95,90" fill="#D3C9BA" />
            <rect x="105" y="110" width="45" height="110" fill="#DFD6C8" />
            <rect x="160" y="70" width="50" height="150" fill="#D8CFBE" />
            <line x1="185" y1="40" x2="185" y2="70" stroke="#A69784" strokeWidth="1.5" />
            <rect x="220" y="100" width="40" height="120" fill="#E2DACD" />
            <rect x="270" y="85" width="55" height="135" fill="#DBD1C2" />
            <rect x="335" y="125" width="35" height="95" fill="#E5DCD0" />
          </g>

          {/* Subtle grid of lighted city windows */}
          <g fill="#FFFFFF" opacity="0.8">
            <rect x="170" y="85" width="4" height="6" />
            <rect x="180" y="85" width="4" height="6" />
            <rect x="195" y="85" width="4" height="6" />
            <rect x="170" y="105" width="4" height="6" />
            <rect x="195" y="105" width="4" height="6" />
            <rect x="280" y="100" width="4" height="6" />
            <rect x="295" y="100" width="4" height="6" />
          </g>

          {/* Urban avenue streetlamp */}
          <g transform="translate(130, 110)">
            <line x1="20" y1="20" x2="20" y2="130" stroke="#756758" strokeWidth="2" strokeLinecap="round" />
            <path d="M 12 20 Q 20 12 28 20" stroke="#756758" strokeWidth="2" fill="none" />
            {/* Glowing lantern */}
            <circle cx="20" cy="24" r="14" fill="#F8EBD7" opacity="0.7" className="animate-sun-pulse" />
            <polygon points="15,22 25,22 23,28 17,28" fill="#9C8974" />
          </g>

          {/* Paved path / crossroads */}
          <path d="M 0 240 L 400 240 L 400 300 L 0 300 Z" fill="#ECE5D8" />
          <line x1="0" y1="240" x2="400" y2="240" stroke="#D1C4B2" strokeWidth="1.5" />

          {/* Young adult walking with purposeful stride, small bag/briefcase */}
          <g transform="translate(195, 160)">
            <circle cx="20" cy="18" r="8.5" fill="#2E2620" />
            {/* Tailored overcoat */}
            <path d="M 12 28 L 28 28 L 32 60 L 10 60 Z" fill="#473C33" />
            {/* Small satchel / portfolio */}
            <rect x="30" y="44" width="12" height="9" rx="1.5" fill="#8C755E" />
            <line x1="28" y1="36" x2="33" y2="44" stroke="#8C755E" strokeWidth="1.5" />
            {/* Legs stepping forward */}
            <line x1="16" y1="60" x2="10" y2="82" stroke="#2E2620" strokeWidth="3" strokeLinecap="round" />
            <line x1="24" y1="60" x2="32" y2="80" stroke="#2E2620" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      )}

      {visualKey === 'adulthood' && (
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-72 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Warm Home Interior / Evening Window Scene */}
          <defs>
            <radialGradient id="lampLight" cx="45%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#FFF2D9" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#F5E4C8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FAF8F3" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Living room window frame looking in or out */}
          <rect x="80" y="50" width="240" height="180" rx="6" fill="#F8F3EA" stroke="#D9CDBD" strokeWidth="2" />
          <line x1="200" y1="50" x2="200" y2="230" stroke="#D9CDBD" strokeWidth="1.5" />
          <line x1="80" y1="130" x2="320" y2="130" stroke="#D9CDBD" strokeWidth="1.5" />

          {/* Gentle flowing curtain */}
          <path d="M 80 50 Q 105 130 95 230" stroke="#C9B79C" strokeWidth="1.5" fill="#EFE8DD" opacity="0.6" className="animate-sway origin-top-left" />
          <path d="M 320 50 Q 295 130 305 230" stroke="#C9B79C" strokeWidth="1.5" fill="#EFE8DD" opacity="0.6" className="animate-sway origin-top-right" />

          {/* Warm glowing table lamp */}
          <circle cx="160" cy="140" r="50" fill="url(#lampLight)" className="animate-breathe" />
          <polygon points="150,120 170,120 176,140 144,140" fill="#EAD9C0" stroke="#C9B79C" strokeWidth="1" />
          <line x1="160" y1="140" x2="160" y2="160" stroke="#8C7A65" strokeWidth="2" />
          <ellipse cx="160" cy="160" rx="8" ry="2.5" fill="#8C7A65" />

          {/* Potted houseplant on sill / table */}
          <g transform="translate(230, 140)">
            <polygon points="10,20 25,20 22,35 13,35" fill="#B3A28E" />
            <path d="M 17 20 Q 10 5 4 8 Q 12 12 17 20" fill="#9C8F7E" />
            <path d="M 17 20 Q 22 2 30 6 Q 23 11 17 20" fill="#A89B8A" />
            <path d="M 17 20 Q 18 0 17 -6 Q 16 8 17 20" stroke="#8C7E6D" strokeWidth="1.2" fill="none" />
          </g>

          {/* Silhouette of two family members or parent & child by table */}
          <g transform="translate(180, 155)">
            {/* Adult */}
            <circle cx="15" cy="20" r="7.5" fill="#3D332A" />
            <path d="M 8 28 L 22 28 L 25 50 L 5 50 Z" fill="#54483C" />
            {/* Child or partner */}
            <circle cx="34" cy="28" r="6" fill="#3D332A" />
            <path d="M 28 35 L 40 35 L 42 50 L 26 50 Z" fill="#54483C" />
          </g>

          {/* Wall framed memory print */}
          <rect x="245" y="70" width="32" height="24" rx="2" fill="#FFFFFF" stroke="#C9B79C" strokeWidth="1.2" />
          <circle cx="261" cy="78" r="3" fill="#D9CDBD" />
          <path d="M 250 88 L 258 82 L 266 88 L 273 83 L 273 90 L 250 90 Z" fill="#BFAF9E" />
        </svg>
      )}

      {visualKey === 'midlife' && (
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-72 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Armchair, photo album, and warm nostalgic sunlight */}
          <defs>
            <radialGradient id="midlifeSun" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#F9ECE0" />
              <stop offset="100%" stopColor="#FAF8F3" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Afternoon sunbeam streaming across */}
          <polygon points="40,20 180,20 360,260 220,260" fill="url(#midlifeSun)" opacity="0.6" />

          {/* Comfortable reading armchair */}
          <g transform="translate(150, 120)">
            {/* Chair back */}
            <path d="M 20 40 Q 50 10 80 40 L 85 90 L 15 90 Z" fill="#D8CCA8" stroke="#B8A983" strokeWidth="1.5" />
            {/* Chair seat & cushion */}
            <ellipse cx="50" cy="92" rx="42" ry="14" fill="#C9B995" stroke="#A89874" strokeWidth="1.2" />
            {/* Armrests */}
            <path d="M 10 65 Q 12 50 20 52 L 22 85 Q 12 85 10 65 Z" fill="#BAAA85" />
            <path d="M 90 65 Q 88 50 80 52 L 78 85 Q 88 85 90 65 Z" fill="#BAAA85" />
            {/* Legs */}
            <line x1="22" y1="98" x2="16" y2="120" stroke="#7A6852" strokeWidth="3" strokeLinecap="round" />
            <line x1="78" y1="98" x2="84" y2="120" stroke="#7A6852" strokeWidth="3" strokeLinecap="round" />

            {/* Mature figure resting comfortably, reading photo book */}
            <circle cx="50" cy="35" r="8" fill="#3D352D" />
            <path d="M 36 44 L 64 44 L 68 85 L 32 85 Z" fill="#52463B" />
            {/* Open book / photo album on lap */}
            <polygon points="34,75 50,78 66,75 62,88 50,86 38,88" fill="#FAF5ED" stroke="#B8A983" strokeWidth="1" />
          </g>

          {/* Floating memories / polaroid snapshots hovering gently */}
          <g className="animate-float-slow" style={{ animationDelay: '0.8s' }}>
            <g transform="translate(70, 75) rotate(-8)">
              <rect x="0" y="0" width="36" height="44" rx="2" fill="#FFFFFF" stroke="#D9CEBF" strokeWidth="1" className="shadow-xs" />
              <rect x="4" y="4" width="28" height="26" fill="#EDE4D5" />
              {/* Little tree in memory */}
              <circle cx="18" cy="16" r="6" fill="#C5B8A5" />
            </g>

            <g transform="translate(285, 90) rotate(10)">
              <rect x="0" y="0" width="34" height="42" rx="2" fill="#FFFFFF" stroke="#D9CEBF" strokeWidth="1" className="shadow-xs" />
              <rect x="4" y="4" width="26" height="24" fill="#E8DEC9" />
              {/* Little sun in memory */}
              <circle cx="17" cy="15" r="5" fill="#D9C7AE" />
            </g>
          </g>

          {/* Side table with warm steaming cup */}
          <g transform="translate(255, 185)">
            <line x1="20" y1="20" x2="20" y2="55" stroke="#7A6852" strokeWidth="2.5" />
            <ellipse cx="20" cy="20" rx="18" ry="4" fill="#C5B69F" stroke="#9C8D77" strokeWidth="1" />
            {/* Cup */}
            <rect x="15" y="10" width="10" height="9" rx="2" fill="#FAF8F3" stroke="#9C8D77" strokeWidth="1" />
            {/* Steam wisp */}
            <path d="M 20 8 Q 23 2 18 -4" stroke="#C9B79C" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" className="animate-breathe" />
          </g>
        </svg>
      )}

      {visualKey === 'later-life' && (
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-72 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Peaceful botanical garden & park bench */}
          {/* Gentle willow / leafy branches hanging from top */}
          <g transform="translate(0, 0)">
            <path d="M 20 0 Q 60 40 80 80 Q 90 120 85 140" stroke="#B8AA98" strokeWidth="1.5" strokeLinecap="round" fill="none" className="animate-sway origin-top-left" />
            <ellipse cx="80" cy="80" rx="4" ry="7" fill="#C7BAA8" transform="rotate(30 80 80)" />
            <ellipse cx="88" cy="110" rx="4" ry="7" fill="#C7BAA8" transform="rotate(20 88 110)" />
            
            <path d="M 380 0 Q 340 50 320 90 Q 310 130 315 150" stroke="#B8AA98" strokeWidth="1.5" strokeLinecap="round" fill="none" className="animate-sway origin-top-right" />
            <ellipse cx="320" cy="90" rx="4" ry="7" fill="#C7BAA8" transform="rotate(-30 320 90)" />
            <ellipse cx="312" cy="120" rx="4" ry="7" fill="#C7BAA8" transform="rotate(-20 312 120)" />
          </g>

          {/* Winding garden gravel path */}
          <path d="M 60 300 Q 170 240 200 200 Q 220 180 230 170" stroke="#EDE5D8" strokeWidth="36" strokeLinecap="round" fill="none" />
          <path d="M 60 300 Q 170 240 200 200 Q 220 180 230 170" stroke="#DFD6C7" strokeWidth="2" strokeDasharray="3 6" fill="none" />

          {/* Wooden park bench */}
          <g transform="translate(230, 175)">
            {/* Slats */}
            <line x1="0" y1="15" x2="60" y2="15" stroke="#8C7A65" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="0" y1="20" x2="60" y2="20" stroke="#8C7A65" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="2" y1="28" x2="58" y2="28" stroke="#8C7A65" strokeWidth="3" strokeLinecap="round" />
            {/* Bench legs */}
            <line x1="8" y1="28" x2="4" y2="45" stroke="#5E503F" strokeWidth="2" />
            <line x1="52" y1="28" x2="56" y2="45" stroke="#5E503F" strokeWidth="2" />
          </g>

          {/* Elderly person walking with walking stick, enjoying the garden */}
          <g transform="translate(130, 165)">
            <circle cx="18" cy="16" r="7.5" fill="#3D352E" />
            {/* Slightly curved respectful posture */}
            <path d="M 12 24 Q 22 23 22 55 L 8 55 Z" fill="#52473D" />
            {/* Walking cane / stick */}
            <line x1="26" y1="36" x2="31" y2="78" stroke="#7A6855" strokeWidth="2" strokeLinecap="round" />
            {/* Legs walking slowly */}
            <line x1="12" y1="55" x2="10" y2="76" stroke="#3D352E" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="18" y1="55" x2="21" y2="75" stroke="#3D352E" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Falling leaf floating gently */}
          <g className="animate-float-slow" style={{ animationDelay: '3s' }}>
            <path d="M 190 120 Q 198 115 202 122 Q 195 128 190 120 Z" fill="#C9A87C" />
            <path d="M 110 140 Q 116 135 120 142 Q 114 148 110 140 Z" fill="#BCA68E" />
          </g>

          {/* Little bird resting or in flight */}
          <path d="M 270 145 Q 278 138 285 142 Q 292 138 298 143" stroke="#7A6956" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </svg>
      )}

      {visualKey === 'old-age' && (
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-72 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Golden Sunset Vista & Porch / Veranda Rocking Chair */}
          <defs>
            <radialGradient id="goldenSunset" cx="50%" cy="80%" r="70%">
              <stop offset="0%" stopColor="#F9D2A8" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#F6DFCA" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FAF8F3" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Big warm setting sun */}
          <circle cx="200" cy="210" r="110" fill="url(#goldenSunset)" className="animate-sun-pulse" />
          <circle cx="200" cy="210" r="42" fill="#FCE3C8" />

          {/* Distant soft mountains / hills */}
          <path d="M 0 220 Q 90 180 180 210 Q 280 170 400 215 L 400 300 L 0 300 Z" fill="#E8DCcb" opacity="0.6" />
          <path d="M 0 240 Q 120 210 240 235 Q 330 215 400 240 L 400 300 L 0 300 Z" fill="#DFCDBB" />

          {/* Porch wooden floor */}
          <line x1="0" y1="260" x2="400" y2="260" stroke="#C9B79C" strokeWidth="2" />

          {/* Elegant rocking chair */}
          <g transform="translate(165, 160)">
            {/* Rocker curved runners */}
            <path d="M 5 88 Q 35 98 65 88" stroke="#665444" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Legs and seat */}
            <line x1="18" y1="62" x2="15" y2="90" stroke="#665444" strokeWidth="2.2" />
            <line x1="50" y1="62" x2="53" y2="90" stroke="#665444" strokeWidth="2.2" />
            <line x1="14" y1="62" x2="56" y2="62" stroke="#665444" strokeWidth="3" strokeLinecap="round" />
            {/* Spindle back */}
            <path d="M 12 25 Q 16 62 18 62" stroke="#665444" strokeWidth="2.2" />
            <path d="M 22 25 Q 24 62 25 62" stroke="#665444" strokeWidth="1.5" />
            <path d="M 32 25 Q 33 62 33 62" stroke="#665444" strokeWidth="1.5" />

            {/* Elderly person seated in quiet contentment */}
            <circle cx="26" cy="24" r="7.5" fill="#382E25" />
            <path d="M 18 32 L 36 32 L 38 62 L 16 62 Z" fill="#4E4034" />
            {/* Hands resting peacefully on armrests */}
            <line x1="28" y1="42" x2="44" y2="52" stroke="#382E25" strokeWidth="2" strokeLinecap="round" />
            {/* Legs covered in warm cozy plaid blanket */}
            <path d="M 38 60 Q 56 62 58 78 L 38 78 Z" fill="#A8947C" />
          </g>

          {/* Warm cup of tea on small wood stand */}
          <g transform="translate(245, 225)">
            <line x1="15" y1="12" x2="15" y2="35" stroke="#665444" strokeWidth="2" />
            <ellipse cx="15" cy="12" rx="12" ry="3" fill="#C2B19C" />
            <rect x="11" y="5" width="8" height="7" rx="1" fill="#FAF8F3" stroke="#8C7A65" strokeWidth="0.8" />
          </g>
        </svg>
      )}

      {visualKey === 'century' && (
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-72 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Symbolic 100 Years: Twilight horizon, magnificent ancient tree, quiet bench, emergent stars */}
          <defs>
            <linearGradient id="twilightSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E2DDD5" />
              <stop offset="50%" stopColor="#EDE6DC" />
              <stop offset="100%" stopColor="#FAF6F0" />
            </linearGradient>
            <radialGradient id="eveningGlow" cx="50%" cy="100%" r="80%">
              <stop offset="0%" stopColor="#F5ECE0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FAF8F3" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Horizon glow */}
          <rect x="0" y="0" width="400" height="300" fill="url(#twilightSky)" opacity="0.4" />
          <circle cx="200" cy="250" r="140" fill="url(#eveningGlow)" className="animate-breathe" />

          {/* Gentle starry sky emerging */}
          <g className="animate-float-slow">
            <circle cx="80" cy="40" r="1.5" fill="#C4B49F" />
            <circle cx="140" cy="25" r="1.2" fill="#D9CCBA" />
            <circle cx="220" cy="35" r="1.8" fill="#C4B49F" />
            <circle cx="310" cy="20" r="1.5" fill="#D9CCBA" />
            <circle cx="350" cy="50" r="1.2" fill="#C4B49F" />
            <circle cx="180" cy="65" r="1" fill="#C4B49F" />
            <circle cx="275" cy="55" r="1.5" fill="#D9CCBA" />
          </g>

          {/* Majestic ancient oak tree */}
          <g transform="translate(135, 70)">
            {/* Trunk */}
            <path d="M 60 180 Q 65 130 55 90 Q 50 60 65 30" stroke="#524335" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 58 100 Q 30 70 20 50" stroke="#524335" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M 62 85 Q 90 65 105 50" stroke="#524335" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Roots anchoring peacefully */}
            <path d="M 60 180 Q 40 188 25 190" stroke="#524335" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 60 180 Q 80 188 95 190" stroke="#524335" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Expansive foliage canopy clouds */}
            <circle cx="65" cy="25" r="32" fill="#C5B8A5" opacity="0.6" />
            <circle cx="25" cy="45" r="26" fill="#BDB09D" opacity="0.6" />
            <circle cx="100" cy="45" r="28" fill="#BDB09D" opacity="0.6" />
            <circle cx="60" cy="55" r="36" fill="#C8BCA9" opacity="0.5" />
          </g>

          {/* Serene rolling grass horizon */}
          <path d="M 0 250 Q 200 230 400 250 L 400 300 L 0 300 Z" fill="#DFD6C8" />

          {/* Empty peaceful wooden bench beneath tree */}
          <g transform="translate(240, 225)">
            <line x1="0" y1="10" x2="45" y2="10" stroke="#5C4D3E" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="0" y1="15" x2="45" y2="15" stroke="#5C4D3E" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="5" y1="22" x2="40" y2="22" stroke="#5C4D3E" strokeWidth="3" strokeLinecap="round" />
            <line x1="8" y1="22" x2="6" y2="35" stroke="#3D3227" strokeWidth="2" />
            <line x1="37" y1="22" x2="39" y2="35" stroke="#3D3227" strokeWidth="2" />
          </g>
        </svg>
      )}
    </div>
  );
};

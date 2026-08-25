const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const appDir = path.join(__dirname, 'app');

// ── 1. Open Graph Image (1200x630) ──────────────────────────────────────────
const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1528"/>
      <stop offset="50%" stop-color="#070d19"/>
      <stop offset="100%" stop-color="#040810"/>
    </linearGradient>

    <!-- Accent Gradient -->
    <linearGradient id="tealCyan" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2dd4bf"/>
      <stop offset="50%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#818cf8"/>
    </linearGradient>

    <!-- Blueprint Grid Pattern -->
    <pattern id="blueprintGrid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56, 189, 248, 0.07)" stroke-width="1"/>
      <circle cx="0" cy="0" r="1.5" fill="rgba(45, 212, 191, 0.25)"/>
    </pattern>

    <pattern id="blueprintMajorGrid" width="160" height="160" patternUnits="userSpaceOnUse">
      <path d="M 160 0 L 0 0 0 160" fill="none" stroke="rgba(45, 212, 191, 0.12)" stroke-width="1.5"/>
    </pattern>

    <!-- Card Background -->
    <linearGradient id="cardBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(15, 23, 42, 0.75)"/>
      <stop offset="100%" stop-color="rgba(7, 13, 25, 0.85)"/>
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  
  <!-- Ambient Glows -->
  <circle cx="150" cy="150" r="300" fill="#2dd4bf" opacity="0.08"/>
  <circle cx="1050" cy="480" r="350" fill="#38bdf8" opacity="0.07"/>

  <!-- Blueprint Grid Overlays -->
  <rect width="1200" height="630" fill="url(#blueprintGrid)"/>
  <rect width="1200" height="630" fill="url(#blueprintMajorGrid)"/>

  <!-- Outer Blueprint Technical Frame -->
  <rect x="28" y="28" width="1144" height="574" rx="20" fill="none" stroke="rgba(56, 189, 248, 0.2)" stroke-width="1.5"/>
  
  <!-- Technical Corner Ticks -->
  <path d="M 28 58 L 28 28 L 58 28" fill="none" stroke="#2dd4bf" stroke-width="3"/>
  <path d="M 1172 58 L 1172 28 L 1142 28" fill="none" stroke="#2dd4bf" stroke-width="3"/>
  <path d="M 28 572 L 28 602 L 58 602" fill="none" stroke="#2dd4bf" stroke-width="3"/>
  <path d="M 1172 572 L 1172 602 L 1142 602" fill="none" stroke="#2dd4bf" stroke-width="3"/>

  <!-- Top Status Banner -->
  <g transform="translate(64, 68)">
    <rect x="0" y="0" width="280" height="32" rx="16" fill="rgba(45, 212, 191, 0.12)" stroke="rgba(45, 212, 191, 0.35)" stroke-width="1"/>
    <circle cx="16" cy="16" r="4" fill="#2dd4bf"/>
    <text x="28" y="21" fill="#2dd4bf" font-size="11" font-family="monospace" font-weight="700" letter-spacing="1.5">OPEN FOR OPPORTUNITIES</text>

    <!-- Technical Coordinate Label -->
    <text x="1072" y="21" fill="#64748b" font-size="11" font-family="monospace" text-anchor="end" letter-spacing="1">SYS_SPEC // #DHP-PORTFOLIO-2026</text>
  </g>

  <!-- Main Content Area -->
  <g transform="translate(64, 150)">
    <!-- Monogram Tag -->
    <text x="0" y="0" fill="#38bdf8" font-family="monospace" font-size="14" font-weight="600" letter-spacing="2">&lt;DEVELOPER_PROFILE /&gt;</text>
    
    <!-- Primary Name -->
    <text x="0" y="68" fill="#ffffff" font-size="64" font-weight="900" letter-spacing="-1.5">
      ĐẶNG HẢI PHI
    </text>
    
    <!-- Subtitle Role -->
    <text x="0" y="118" fill="url(#tealCyan)" font-size="28" font-weight="700" letter-spacing="-0.5">
      Fullstack &amp; Backend Developer Intern
    </text>

    <!-- Bio Statement -->
    <text x="0" y="156" fill="#94a3b8" font-size="16" font-weight="400" letter-spacing="0.2">
      Sinh viên năm 4 HUFLIT &#8226; Chuyên sâu ASP.NET Core, Next.js, 12 GoF Patterns &amp; Automation QA.
    </text>
  </g>

  <!-- 3 Key Metric Cards at Bottom -->
  <g transform="translate(64, 375)">
    <!-- Card 1 -->
    <g transform="translate(0, 0)">
      <rect width="330" height="150" rx="14" fill="url(#cardBg)" stroke="rgba(45, 212, 191, 0.25)" stroke-width="1.2"/>
      <rect x="20" y="20" width="8" height="8" rx="2" fill="#2dd4bf"/>
      <text x="36" y="28" fill="#2dd4bf" font-size="11" font-family="monospace" font-weight="700" letter-spacing="1">BACKEND ARCHITECTURE</text>
      <text x="20" y="74" fill="#ffffff" font-size="34" font-family="monospace" font-weight="900">50+ APIs</text>
      <text x="20" y="105" fill="#94a3b8" font-size="13">RESTful Services &#8226; JWT Auth</text>
      <text x="20" y="125" fill="#64748b" font-size="11" font-family="monospace">ASP.NET Core / Node.js / Prisma</text>
    </g>

    <!-- Card 2 -->
    <g transform="translate(365, 0)">
      <rect width="330" height="150" rx="14" fill="url(#cardBg)" stroke="rgba(56, 189, 248, 0.25)" stroke-width="1.2"/>
      <rect x="20" y="20" width="8" height="8" rx="2" fill="#38bdf8"/>
      <text x="36" y="28" fill="#38bdf8" font-size="11" font-family="monospace" font-weight="700" letter-spacing="1">SYSTEM DESIGN</text>
      <text x="20" y="74" fill="#ffffff" font-size="34" font-family="monospace" font-weight="900">12 GoF</text>
      <text x="20" y="105" fill="#94a3b8" font-size="13">3-Tier Layered Architecture</text>
      <text x="20" y="125" fill="#64748b" font-size="11" font-family="monospace">Factory / Strategy / Singleton</text>
    </g>

    <!-- Card 3 -->
    <g transform="translate(730, 0)">
      <rect width="342" height="150" rx="14" fill="url(#cardBg)" stroke="rgba(129, 140, 248, 0.25)" stroke-width="1.2"/>
      <rect x="20" y="20" width="8" height="8" rx="2" fill="#818cf8"/>
      <text x="36" y="28" fill="#818cf8" font-size="11" font-family="monospace" font-weight="700" letter-spacing="1">QUALITY ASSURANCE</text>
      <text x="20" y="74" fill="#ffffff" font-size="34" font-family="monospace" font-weight="900">69 Tests</text>
      <text x="20" y="105" fill="#94a3b8" font-size="13">NUnit &#8226; Selenium WebDriver</text>
      <text x="20" y="125" fill="#64748b" font-size="11" font-family="monospace">70% Manual QA Time Saved</text>
    </g>
  </g>

  <!-- Right Logo / Visual Badge -->
  <g transform="translate(970, 140)">
    <rect width="100" height="100" rx="24" fill="#070d19" stroke="rgba(45, 212, 191, 0.4)" stroke-width="2"/>
    <text x="50" y="62" fill="#ffffff" font-family="monospace" font-size="38" font-weight="900" text-anchor="middle">
      <tspan fill="#2dd4bf">&lt;</tspan>P<tspan fill="#38bdf8">/&gt;</tspan>
    </text>
  </g>

  <!-- Footer Info Line -->
  <g transform="translate(64, 570)">
    <text x="0" y="0" fill="#475569" font-size="11" font-family="monospace">HUFLIT UNIVERSITY &#8226; CLASS OF 2027 &#8226; TÂN PHÚ, TP. HỒ CHÍ MINH</text>
    <text x="1072" y="0" fill="#2dd4bf" font-size="11" font-family="monospace" text-anchor="end" font-weight="700">phidanghai-portfolio.vercel.app</text>
  </g>
</svg>
`;

// ── 2. Favicon / Icon SVG (512x512) ─────────────────────────────────────────
const iconSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="iconBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1528"/>
      <stop offset="100%" stop-color="#050b14"/>
    </linearGradient>
  </defs>

  <rect width="512" height="512" rx="112" fill="url(#iconBg)" stroke="#2dd4bf" stroke-width="12" stroke-opacity="0.5"/>
  
  <!-- Corner Dots -->
  <circle cx="48" cy="48" r="10" fill="#2dd4bf" opacity="0.8"/>
  <circle cx="464" cy="48" r="10" fill="#38bdf8" opacity="0.8"/>
  <circle cx="48" cy="464" r="10" fill="#2dd4bf" opacity="0.8"/>
  <circle cx="464" cy="464" r="10" fill="#38bdf8" opacity="0.8"/>

  <!-- Inner Monogram < P /> -->
  <g font-family="Consolas, Monaco, monospace" font-size="160" font-weight="900" text-anchor="middle">
    <text x="256" y="315" fill="#ffffff">
      <tspan fill="#2dd4bf">&lt;</tspan>P<tspan fill="#38bdf8">/&gt;</tspan>
    </text>
  </g>
</svg>
`;

async function generateAll() {
  const pngToIco = (require('png-to-ico').default || require('png-to-ico'));

  // 1. Generate OG Image (1200x630)
  const ogPath = path.join(publicDir, 'og-image.png');
  await sharp(Buffer.from(ogSvg)).png({ quality: 95 }).toFile(ogPath);
  console.log('✅ Generated public/og-image.png (1200x630)');

  // 2. Generate Favicon set in public/
  const iconBuffer = Buffer.from(iconSvg);

  // 16x16
  await sharp(iconBuffer).resize(16, 16).png().toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('✅ Generated public/favicon-16x16.png');

  // 32x32
  await sharp(iconBuffer).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('✅ Generated public/favicon-32x32.png');

  // 180x180 (Apple touch icon)
  await sharp(iconBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✅ Generated public/apple-touch-icon.png');

  // 512x512
  await sharp(iconBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'icon-512.png'));
  console.log('✅ Generated public/icon-512.png');

  // Real multi-res favicon.ico (16, 32, 48)
  const tmp16 = path.join(publicDir, '_tmp-16.png');
  const tmp32 = path.join(publicDir, '_tmp-32.png');
  const tmp48 = path.join(publicDir, '_tmp-48.png');
  await sharp(iconBuffer).resize(16, 16).png().toFile(tmp16);
  await sharp(iconBuffer).resize(32, 32).png().toFile(tmp32);
  await sharp(iconBuffer).resize(48, 48).png().toFile(tmp48);
  const icoBuffer = await pngToIco([tmp16, tmp32, tmp48]);
  fs.unlinkSync(tmp16); fs.unlinkSync(tmp32); fs.unlinkSync(tmp48);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  console.log('✅ Generated real multi-res favicon.ico (16x16, 32x32, 48x48) in app/ and public/');
}

generateAll().catch(console.error);

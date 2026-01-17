# $GUNCOIN Website

A modern React-based website for $GUNCOIN - Since 2014.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
guncoin/
├── src/
│   ├── components/
│   │   ├── Hero.jsx          # Hero section with main branding
│   │   ├── TokenInfo.jsx     # Contract address display
│   │   ├── Lore.jsx          # The legend/story section
│   │   ├── Links.jsx         # Community links
│   │   └── Footer.jsx        # Footer component
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles with Tailwind
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── postcss.config.js         # PostCSS configuration
```

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- 🚀 Fast development with Vite
- 💎 Crypto-themed UI with custom color scheme
- 📱 Mobile-friendly responsive layout
- ✨ Smooth animations and transitions
- 🔗 Integrated links to X Community and DEXScreener

## Customization

The color scheme can be customized in `tailwind.config.js` under the `guncoin` color palette.

## License

MIT


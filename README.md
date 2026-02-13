# 💕 Valentine's Day Proposal Website

A beautiful, interactive Valentine's proposal experience inspired by modern design with smooth animations, memory timeline, and romantic music.

## ✨ Features

- 🎵 **Background Music** - Plays your special song throughout
- 💌 **Animated Welcome** - Beautiful entrance with floating hearts
- 💖 **Interactive Proposal** - Playful "No" button that runs away!
- 📸 **Memory Timeline** - Showcase your photos with captions
- 💭 **Interactive Questions** - Fun questions between memories
- 💝 **Typing Love Letter** - Romantic letter with typewriter effect
- 🎉 **Grand Finale** - Celebration with answer recap

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Customize Your Content

Edit `app/page.jsx` and personalize:

#### Partner's Name (line ~25)
```javascript
const partnerName = "My Love"; // Change to your partner's name
```

#### Your Song (line ~26)
```javascript
const songFile = "/song.mp3"; // Add your song to /public folder
```

#### Your Memories (starting ~28)
Replace the placeholder images with your own photos:
```javascript
const memories = [
  { 
    id: 1, 
    image: "/memories/first-meet.jpg",  // Your photo
    date: "The Day We Met",              // Your date
    caption: "Your caption...",          // Your caption
    fullStory: "The full story..."       // More details
  },
  // Add more memories...
];
```

#### Questions (starting ~75)
Customize the interactive questions and options.

#### Love Letter (starting ~85)
Write your own personalized love letter.

### 3. Add Your Files

**Photos:** Add to `/public/memories/`
- `first-meet.jpg`
- `first-date.jpg`
- `adventure.jpg`
- etc.

**Song:** Add to `/public/`
- `song.mp3` (or update the filename in code)

### 4. Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000`

### 5. Deploy to Vercel (Free!)

**Option A: Vercel CLI**
```bash
npm i -g vercel
vercel
```

**Option B: GitHub + Vercel**
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

## 📁 File Structure

```
valentine-proposal/
├── app/
│   ├── globals.css      # Tailwind + fonts
│   ├── layout.jsx       # HTML wrapper
│   └── page.jsx         # Main component ⭐ EDIT THIS!
├── public/
│   ├── song.mp3         # Your romantic song
│   └── memories/        # Your photos
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── README.md
```

## 🎨 Design Credits

Inspired by [vprop](https://github.com/) - A beautiful Valentine's proposal template featuring:
- **Caveat** handwriting font
- **Framer Motion** animations
- **Lucide React** icons
- Pink/rose gradient palette

## 💡 Tips

- **Photos**: Use landscape orientation (600x400px works well)
- **Song**: MP3 format recommended, keep file size reasonable
- **Mobile**: The site is fully responsive
- **Privacy**: Vercel URLs are private unless shared

## 🎶 Song Suggestions

- "Perfect" - Ed Sheeran
- "All of Me" - John Legend
- "A Thousand Years" - Christina Perri
- "Can't Help Falling in Love" - Elvis
- Your special song together!

---

Made with 💖 for that special someone

Happy Valentine's Day! 🌹

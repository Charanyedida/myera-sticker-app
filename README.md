# 🎨 MyEra Sticker Canvas

[![Demo Video](https://img.shields.io/badge/▶-Watch%20Demo%20Video-red?style=for-the-badge&logo=appveyor)](https://drive.google.com/file/d/1aL8H9ztqjrK9w4VwexgP7O-09UutQ0YN/view?usp=sharing)

A fun, interactive React app that lets users add, move, and delete stickers on a Konva canvas. Stickers snap to a grid for clean alignment, and the entire design can be downloaded as a PNG.

## 🌐 Live Demo  
[👉 myera-sticker-app.vercel.app](https://myera-sticker-app-rho.vercel.app)

## ✨ Features

### Sticker Management
- 🧲 Snap-to-Grid Dragging (40px)
- 🖱️ Double-click to Delete Stickers
- 🖼️ Predefined Stickers (⭐, ❤️, 😊)

### Canvas Features
- 📐 Visual Grid Overlay
- 💾 Download Canvas as PNG
- ⚡ Smooth Konva + React Integration

## 🎥 Demo Video
[Watch the full demo video here](https://drive.google.com/file/d/1aL8H9ztqjrK9w4VwexgP7O-09UutQ0YN/view?usp=sharing) showing all features in action.

## 🛠️ Tech Stack

- **Frontend**: React
- **Canvas Library**: react-konva + Konva.js
- **Image Handling**: use-image (for SVG decoding)

## 🚀 Getting Started

### Installation
```bash
git clone https://github.com/your-username/myera-sticker-canvas.git
cd myera-sticker-canvas
npm install
npm start
```
Project Structure
text
src/
├── App.js        # All logic, UI, and Konva canvas
├── App.css       # Responsive styling
└── index.js      # Entry point
🎮 How to Use
Add Stickers
Click any sticker from the palette to place it on the canvas

Move Stickers
Drag to reposition - they'll automatically snap to the 40px grid

Delete Stickers
Double-click any sticker to remove it

Export Your Design
Click "Download" to save your canvas as a PNG

Built with ❤️ by Charan Yedida

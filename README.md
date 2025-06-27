# Computer Graphics Group Assignment 
3D Image Gallery Created with Three.js

## Group Members
| Name                | ID           | Section |
|---------------------|--------------|---------|
| Hayat Ahmedjara     | UGR/3885/15  | 1       |
| Semer Nuru          | UGR/0396/15  | 2       |
| Sinsine Wono        | UGR/6097/15  | 2       |
| Zikra Abdusemed     | UGR/8046/15  | 1       |

## Project Structure

```
cg_Group_Assignment/
├── src/
│   ├── js/
│   │   └── main.js              # Main application entry point
│   ├── css/
│   │   └── styles.css           # Application styles
│   ├── components/
│   │   ├── UI.js               # User interface components
│   │   ├── Gallery.js          # Artwork gallery logic
│   │   ├── Scene.js            # 3D scene setup and management
│   │   ├── Controls.js         # Camera controls and movement
│   │   └── PostProcessing.js   # Post-processing effects
│   └── utils/
│       └── constants.js        # Application constants and data
├── public/                     # Static assets (images, models)
├── index.html                  # Main HTML file
├── package.json               # Dependencies and scripts
└── vite.config.js            # Vite configuration
```

## Features

### Core Features
- **3D Art Gallery**: Interactive gallery with rotating artwork display
- **Camera Controls**: OrbitControls and PointerLockControls with WASD movement
- **Artwork Interaction**: Hover effects, click interactions, and descriptions
- **Smooth Animations**: TWEEN.js powered transitions and effects

### Advanced Features
- **Physics Integration**: Cannon.js physics engine with interactive objects
- **Post-Processing**: Bloom effects and reflection handling
- **GLTF Model Loading**: External 3D model support
- **Particle System**: Atmospheric particle effects
- **Automated Tour**: Guided camera tour through the gallery
- **Ambient Audio**: Background music for immersive experience

### UI Features
- **Reset Camera Button**: Return to initial camera position
- **Take Tour Button**: Automated gallery tour
- **Camera Info Panel**: Real-time camera position and direction
- **Artwork Descriptions**: Hover/click to view artwork information

## Controls

| Control | Action |
|---------|--------|
| **Mouse** | Orbit camera around gallery |
| **WASD / Arrow Keys** | Move camera forward/backward/left/right |
| **Q/E** | Move camera up/down |
| **O** | Enable OrbitControls |
| **P** | Enable PointerLockControls |
| **Mouse Wheel** | Rotate gallery |
| **Click Artwork** | View description |
| **Hover Artwork** | Enlarge artwork and show description |

## Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Technologies Used

- **Three.js**: 3D graphics and rendering
- **Cannon.js**: Physics simulation
- **TWEEN.js**: Animation library
- **Vite**: Build tool and development server
- **Post-processing**: Visual effects pipeline

## Deployment

The project is configured for GitHub Pages deployment with automatic builds on push to main branch.

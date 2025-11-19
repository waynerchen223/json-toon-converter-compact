# Changelog

All notable changes to the JSON-TOON Converter project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [2.0.0] - 2025-01-19

### Added
- **Code Refactoring**: Complete modular architecture
  - `src/style.css` - Separated all styles from HTML
  - `src/lib/helpers.ts` - Utility functions (copy, paste, token counting, random JSON)
  - `src/lib/theme.ts` - Theme management module
  - `src/lib/icons.ts` - Centralized SVG icon definitions
- **Success Notifications**: Toast messages for copy/paste/convert actions
- **Smart Button States**: Copy buttons disabled when inputs are empty
- **Theme Toggle**: Dark/light mode with emoji toggle (☀️/🌙)
- **Theme Persistence**: localStorage saves user's theme preference

### Changed
- **Minimalist Design**: Complete UI overhaul
  - Outline-style buttons with hover effects (color inversion)
  - Icon-only buttons for copy/paste with scale animations
  - Simplified theme toggle without button frame
  - Success toast with centered position and background
- **Responsive Improvements**:
  - Taller textareas on mobile (300px minimum)
  - Full-width buttons in column layout on mobile
  - Improved panel header layout for small screens
  - Better toolbar distribution on mobile devices
- **Desktop Optimization**:
  - Reduced padding and margins to avoid scroll
  - Container height optimized to 70vh
  - Smaller typography for compact layout
  - Removed body min-height constraint

### Fixed
- SVG icons now loaded dynamically from module instead of inline HTML
- Theme toggle position changed from fixed to absolute (scrolls with content)
- TypeScript type errors resolved for theme toggle element

## [1.0.0] - 2025-01-18

### Added
- **Core Functionality**:
  - `jsonToToon()` - Convert JSON objects to TOON format
  - `toonToJson()` - Parse TOON format back to JSON
  - Support for nested objects using parentheses
  - Support for arrays using pipe separator (`|`)
  - Type inference for numbers and booleans
- **User Interface**:
  - Two-panel layout (JSON ↔ TOON)
  - Bidirectional conversion buttons
  - Random JSON generator
  - Real-time JSON validation
  - TOON validation (balanced parentheses, reject JSON-like input)
  - Token counters for both inputs
  - "Swap Panels" button to exchange panel positions
  - Copy/Paste buttons for each input
  - "Clear All" button
  - Placeholder examples in text areas
- **Testing**: Unit tests for core conversion functions using Vitest

### Technical Details
- Built with Vite + TypeScript
- Vanilla CSS for styling
- No external UI frameworks
- Grid-based responsive layout

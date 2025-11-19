# JSON-TOON Converter

A minimalist web application for converting between JSON and TOON (a custom compact text format). Built with TypeScript and Vite.

## 🎯 Features

### Core Functionality
- **Bidirectional Conversion**: Convert JSON to TOON and vice versa
- **Nested Object Support**: Handles deeply nested objects using parentheses
- **Array Support**: Arrays represented with pipe separators (`|`)
- **Type Inference**: Automatically detects numbers and booleans when parsing TOON
- **Real-time Validation**: Live syntax validation for both JSON and TOON inputs

### User Interface
- **🌓 Dark/Light Mode**: Toggle between themes with persistence
- **📋 Copy/Paste**: Quick clipboard operations for both inputs
- **🎲 Random JSON**: Generate sample JSON for testing
- **🔄 Swap Panels**: Exchange input/output panel positions
- **🧮 Token Counter**: Track approximate token count for inputs
- **✓ Success Notifications**: Discrete feedback for actions
- **📱 Fully Responsive**: Optimized for desktop and mobile devices

### Code Quality
- **Modular Architecture**: Clean separation of concerns
- **TypeScript**: Full type safety
- **Unit Tests**: Comprehensive test coverage with Vitest
- **No Dependencies**: Minimal runtime footprint

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd json-toon-converter

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 🚀 Usage

1. **Convert JSON to TOON**:
   - Paste or type JSON in the left panel
   - Click "JSON → TOON" button
   - Copy the compact TOON output

2. **Convert TOON to JSON**:
   - Enter TOON format in the right panel
   - Click "TOON ← JSON" button
   - Get formatted JSON output

3. **Generate Sample**:
   - Click "Random" button for example JSON data

## 📝 TOON Format Specification

TOON (Text Object Oriented Notation) is a compact alternative to JSON:

### Syntax Rules

- **Key-Value Pairs**: `key=value`
- **Objects**: Use parentheses for nesting: `user=(name=John|age=30)`
- **Arrays**: Use pipe separator: `tags=javascript|typescript|node`
- **Properties**: Separate with newlines

### Type Inference

When parsing TOON to JSON:
- Numbers: `age=25` → `{"age": 25}`
- Booleans: `active=true` → `{"active": true}`
- Strings: Everything else remains as string

### Examples

**JSON:**
```json
{
  "name": "Alice",
  "age": 28,
  "active": true,
  "skills": ["JavaScript", "TypeScript"],
  "address": {
    "city": "Madrid",
    "country": "Spain"
  }
}
```

**TOON:**
```
name=Alice
age=28
active=true
skills=JavaScript|TypeScript
address=(city=Madrid|country=Spain)
```

## 🏗️ Project Structure

```
json-toon-converter/
├── src/
│   ├── lib/
│   │   ├── toon.ts          # Core conversion logic
│   │   ├── toon.test.ts     # Unit tests
│   │   ├── helpers.ts       # Utility functions
│   │   ├── theme.ts         # Theme management
│   │   └── icons.ts         # SVG icon definitions
│   ├── main.ts              # Application entry point
│   └── style.css            # Global styles
├── index.html               # HTML template
├── package.json
├── tsconfig.json
├── vite.config.ts
├── CHANGELOG.md             # Version history
└── README.md
```

## 📜 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run unit tests
npm run test:ui      # Run tests with UI
```

## 🛠️ Tech Stack

- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Styling**: Vanilla CSS with CSS Variables
- **No Framework**: Pure TypeScript for minimal bundle size

## 🎨 Design Philosophy

- **Minimalism**: Clean, distraction-free interface
- **Performance**: Fast conversion with minimal overhead
- **Accessibility**: Keyboard-friendly, semantic HTML
- **Responsiveness**: Works seamlessly on all devices

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🚧 Limitations

- Special characters (`|`, `=`, `(`, `)`) in string values are not escaped
- Best suited for simple to moderately complex JSON structures
- Not recommended for JSON with nested arrays of objects

## 📞 Support

For issues, questions, or suggestions, please open an issue on the repository.

---

**Made with ❤️ using TypeScript and Vite**

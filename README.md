# Data Structures Visualizer

A modern, interactive web application built with Next.js and React for visualizing various data structures and their operations.

## Features

### Data Structures Supported
- **Array** - Dynamic array with insertion, deletion, and search operations
- **Stack** - LIFO (Last In, First Out) data structure
- **Queue** - FIFO (First In, First Out) data structure
- **Linked List** - Linear data structure with dynamic size
- **Doubly Linked List** - Linked list with bidirectional traversal
- **Circular Linked List** - Linked list with circular structure
- **Binary Search Tree** - Hierarchical tree structure with BST properties
- **Graph** - Network of nodes and edges with traversal algorithms

### Key Features
- 🎨 **Modern UI** - Clean, responsive design with dark/light theme support
- 🔄 **Real-time Visualization** - Interactive animations and visual feedback
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- ⚡ **Fast Performance** - Optimized React components with efficient rendering
- 🎯 **Educational** - Detailed explanations and operation descriptions
- 🌙 **Theme Support** - Toggle between light and dark modes

## Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd data-structures-visualizer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and theme variables
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── DataStructureVisualizer.tsx  # Main container component
│   ├── ArrayVisualizer.tsx          # Array visualization
│   ├── StackVisualizer.tsx          # Stack visualization
│   ├── QueueVisualizer.tsx          # Queue visualization
│   ├── LinkedListVisualizer.tsx     # Linked list visualization
│   ├── DoublyLinkedListVisualizer.tsx # Doubly linked list visualization
│   ├── CircularLinkedListVisualizer.tsx # Circular linked list visualization
│   ├── TreeVisualizer.tsx           # Binary search tree visualization
│   └── GraphVisualizer.tsx          # Graph visualization
├── package.json             # Dependencies and scripts
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **CSS Modules** - Scoped styling
- **SVG** - Vector graphics for tree and graph visualizations

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by various data structure visualization tools
- Built with modern web technologies for educational purposes
- Designed to help students understand data structures through interactive visualization





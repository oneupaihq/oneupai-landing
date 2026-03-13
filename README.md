# OneUpai - AI-Powered Learning Platform

A modern Next.js 16 landing page for OneUpai, an AI-powered learning platform designed for tomorrow's leaders.

## 🚀 Latest Updates

**Major Upgrade Completed!** 
- ⚡ **Next.js 16** with Turbopack for 50%+ faster builds
- ⚛️ **React 19** with modern features and performance improvements
- 🎨 **Enhanced Design System** with CSS variables and animations
- 🛠️ **Modern Developer Experience** with updated tooling

## ✨ Features

- **Next.js 16** with App Router and Turbopack (stable)
- **React 19** with automatic JSX runtime
- **TypeScript** for type safety with enhanced configuration
- **Tailwind CSS** with modern design system and CSS variables
- **AI Chatbot** - Intelligent assistant powered by AI SDK and OpenAI GPT-4o-mini
- **Responsive Design** - Mobile-first approach with optimized images
- **Figma Integration** - Direct asset loading with modern image formats
- **Performance Optimized** - Cache Components, bundle splitting, lazy loading
- **SEO Enhanced** - Comprehensive metadata, Open Graph, Twitter cards
- **Accessibility** - ARIA support and keyboard navigation
- **Modern Fonts** - Optimized loading with font-display: swap

## 🤖 AI Chatbot Features

- **Intelligent Responses**: Trained specifically on OneUpAI's services and offerings
- **Real-time Streaming**: Smooth, streaming responses using AI SDK
- **Suggested Questions**: Pre-built questions to help users get started
- **Error Handling**: Graceful error handling with user-friendly messages
- **Responsive Design**: Works perfectly on mobile and desktop devices
- **Context Awareness**: Understands OneUpAI's business model and guides users effectively
- **Professional UI**: Matches the website's design language and branding

## 🛠️ Tech Stack

- **Framework:** Next.js 16.1.4 (with Turbopack)
- **Runtime:** React 19.2.3
- **Language:** TypeScript 5.6.3
- **Styling:** Tailwind CSS 3.4.17 with CSS variables
- **AI:** AI SDK with OpenAI GPT-4o-mini
- **UI Components:** Radix UI with custom design system
- **Animations:** Framer Motion + CSS animations
- **Forms:** React Hook Form with Zod validation
- **Database:** Drizzle ORM with Neon PostgreSQL
- **Authentication:** Passport.js
- **State Management:** TanStack Query
- **Build Tool:** Turbopack (stable)
- **Linting:** ESLint + Prettier

## 📦 Installation

1. Set up the project:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
# Add your OpenAI API key to .env.local:
# OPENAI_API_KEY=your_openai_api_key_here
```

**Important**: Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/) and add it to your `.env.local` file for the chatbot to work.

3. Run the development server (with Turbopack):
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
├── app/
│   ├── api/
│   │   └── chat/           # AI chatbot API endpoint
│   │       └── route.ts    # OpenAI integration
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   │   ├── Button.tsx  # Modern button with variants
│   │   │   └── chat.tsx    # AI chatbot component
│   │   ├── sections/       # Page sections
│   │   │   ├── HeaderSection.tsx
│   │   │   ├── VideoSection.tsx
│   │   │   └── ...         # Other sections
│   ├── globals.css         # Global styles with CSS variables
│   ├── layout.tsx          # Root layout with font optimization
│   └── page.tsx            # Home page with chatbot integration
├── lib/
│   └── utils.ts            # Utility functions (cn, debounce, storage)
├── types/
│   └── index.ts            # TypeScript type definitions
├── config/
│   └── site.ts             # Site configuration and constants
├── public/                 # Static assets
├── next.config.mjs         # Next.js 16 configuration
├── tailwind.config.ts      # Tailwind with design system
└── tsconfig.json           # Enhanced TypeScript config
```

## 🎨 Design System

The project uses a modern design system with:

- **CSS Variables** for consistent theming
- **Component Variants** using class-variance-authority
- **Responsive Design** with mobile-first approach
- **Accessibility** built-in with ARIA support
- **Performance** optimized with modern image formats

### Colors
```css
--primary-blue: #1e3a8a
--primary-red: #f87171  
--primary-orange: #fb923c
```

### Typography
- **Headings**: Quicksand (optimized loading)
- **Body**: Nunito (optimized loading)
- **UI**: Inter (system font fallback)

## 📱 Sections

1. **Header** - Responsive navigation with mobile menu
2. **Hero Section** - Main CTA with optimized images
3. **Skills Section** - Feature highlights
4. **About Section** - Company information with statistics
5. **Video Section** - Promotional content
6. **Membership** - Pricing and plans
7. **Community** - Skool integration
8. **Testimonials** - User reviews
9. **Contact** - Contact form and information
10. **Footer** - Links and additional info

## ⚡ Performance Features

### Build Performance
- **Turbopack**: 50%+ faster development builds
- **Bundle Splitting**: Optimized vendor chunking
- **Tree Shaking**: Automatic dead code elimination
- **Cache Components**: Explicit caching system

### Runtime Performance
- **Image Optimization**: WebP/AVIF with responsive sizing
- **Font Optimization**: Reduced layout shift
- **Code Splitting**: Automatic page-level splitting
- **Lazy Loading**: Images and components

### Core Web Vitals
- **LCP**: Optimized with priority loading
- **CLS**: Minimized with font optimization
- **FID**: Enhanced with modern React patterns

## 🚀 Deployment

### Production Deployment
```bash
npm run build
npm start
```

Deploy to your preferred hosting platform with Node.js support.

### Other Platforms
```bash
npm run build
npm start
```

## 🔧 Scripts

- `npm run dev` - Development with Turbopack
- `npm run build` - Production build
- `npm start` - Production server
- `npm run lint` - ESLint checking
- `npm run lint:fix` - Auto-fix linting issues
- `npm run type-check` - TypeScript validation
- `npm run format` - Prettier formatting
- `npm run clean` - Clean build artifacts

## 🆙 Upgrade Information

This project has been upgraded to the latest technologies:

- **Next.js 16**: Latest features including Turbopack and Cache Components
- **React 19**: Modern runtime with enhanced performance
- **Enhanced TypeScript**: Better type safety and developer experience
- **Modern Tooling**: Updated ESLint, Prettier, and build tools

## 🤝 Contributing

1. Make your changes to the codebase
2. Test your changes thoroughly
3. Ensure all code follows the project standards

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [React 19 Features](https://react.dev/blog/2024/04/25/react-19)
- [Turbopack](https://turbo.build/pack)

## 📞 Support

For support, email support@oneupai.com or join our community.
# Next.js Mastery Dashboard 🚀

A modern, responsive web app designed for self-taught developers tracking their 2026 learning roadmap to become professional Next.js full-stack developers. Built with Next.js 15+, TypeScript, Tailwind CSS, and Clerk authentication.

![Next.js Mastery Dashboard](https://img.shields.io/badge/Next.js-15+-000000?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css)
![Clerk](https://img.shields.io/badge/Clerk-6B46C1?style=flat&logo=clerk)

## ✨ Features

- **📊 Dashboard Overview**: Welcome cards, quick stats, and current progress tracking
- **🗺️ Interactive Roadmap**: 5-phase learning journey from beginner to pro developer
- **✅ Daily Task Tracker**: Calendar view with checkboxes and progress bars
- **📚 Resources Hub**: Curated learning resources and development tools
- **🎯 Project Tracker**: Track 7+ real-world projects with GitHub integration
- **💪 Motivation Section**: Daily inspirational quotes and achievement system
- **🔐 Authentication**: Clerk-powered user authentication (free tier)
- **📱 Responsive Design**: Mobile-first design with dark mode support
- **🎨 Modern UI**: Framer Motion animations and polished interface

## 🏗️ Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Icons**: Heroicons & Lucide React
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rehaider479-cmyk/nextjs-mastery-dashboard.git
   cd nextjs-mastery-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your Clerk keys:
   ```env
   # Clerk Authentication (Get from https://clerk.com)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_secret_key_here

   # Clerk URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Clerk Authentication Setup

1. Go to [clerk.com](https://clerk.com) and create a free account
2. Create a new application
3. Copy your publishable key and secret key to `.env.local`
4. Configure your sign-in/sign-up URLs in the Clerk dashboard

### Vercel Deployment

1. **Connect your repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel
   ```

2. **Add environment variables** in Vercel dashboard:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

3. **Deploy**
   ```bash
   vercel --prod
   ```

## 📁 Project Structure

```
nextjs-mastery-dashboard/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with Clerk provider
│   │   ├── page.tsx           # Dashboard homepage
│   │   ├── roadmap/           # Roadmap page
│   │   ├── tasks/             # Task tracker page
│   │   ├── resources/         # Resources page
│   │   ├── projects/          # Projects page
│   │   └── motivation/        # Motivation page
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   │   ├── Sidebar.tsx    # Navigation sidebar
│   │   │   └── DashboardLayout.tsx
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── Card.tsx
│   │   │   ├── Button.tsx
│   │   │   └── Progress.tsx
│   │   ├── dashboard/         # Dashboard components
│   │   ├── roadmap/           # Roadmap components
│   │   ├── tasks/             # Task tracker components
│   │   ├── resources/         # Resources components
│   │   ├── projects/          # Projects components
│   │   └── motivation/        # Motivation components
│   └── lib/
│       └── utils.ts           # Utility functions
├── public/                    # Static assets
├── .env.example               # Environment variables template
└── README.md
```

## 🎯 2026 Learning Roadmap

### Phase 1: Next.js Fundamentals (Jan–Feb)
- Week 1–2: Setup + Basics (App Router, routing, layouts)
- Week 3–4: Data Fetching (Server Components, Actions, streaming)
- Week 5–6: Advanced (caching, middleware)

### Phase 2: TypeScript + Tailwind (Mar)
- Convert projects to TypeScript
- Master Tailwind CSS utilities

### Phase 3: Full-Stack (Apr–Jun)
- Prisma database integration
- Clerk authentication
- Stripe payments
- Build TradePro clone

### Phase 4: Advanced Niches (Jul–Sep)
- Vercel AI SDK integration
- E-commerce features

### Phase 5: Earning (Oct–Dec)
- Portfolio professionalization
- GitHub optimization
- Freelance/Upwork bidding

## 🛠️ Development Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn Course](https://nextjs.org/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Clerk Documentation](https://clerk.com/docs)

## 🎨 Customization

### Adding New Roadmap Phases

Edit `src/components/roadmap/RoadmapPhases.tsx` and add new phases to the `roadmapData` array.

### Customizing Quotes

Add new motivational quotes to the `motivationalQuotes` array in `src/components/motivation/MotivationSection.tsx`.

### Project Templates

Add new projects to the `projects` array in `src/components/projects/ProjectsTracker.tsx`.

## 🚀 Deployment Checklist

- [ ] Set up Clerk authentication
- [ ] Configure environment variables
- [ ] Test all pages and functionality
- [ ] Deploy to Vercel
- [ ] Set up custom domain (optional)
- [ ] Enable analytics (optional)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built for self-taught developers starting their Next.js journey
- Inspired by the thriving Next.js ecosystem in 2026
- Designed to track progress toward freelance and junior developer goals

---

**Happy coding! 🎉**

Remember: Every expert was once a beginner. Keep building, keep learning, and you'll reach your goals. The Next.js ecosystem is booming in 2026—level up and cash in!

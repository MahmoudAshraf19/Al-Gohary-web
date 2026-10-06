<div align="center">
  <img src="src/assets/main_logo.jpeg" alt="Al Gohary Logo" width="150" />
  
  # Al Gohary Web Platform
  
  **The Official Landing Page & Web Interface for Al-Gohary Home & General Services**
  
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)
</div>

<br />

## 🌟 About The Project

Al Gohary Web Platform is the digital storefront and web gateway for the Al-Gohary application ecosystem. It provides users with essential information about services, coverage areas, pricing, and allows service providers to easily apply to join the Al-Gohary network.

This project is built with modern web technologies, ensuring high performance, responsive design, and seamless integration with the Firebase backend used by the main mobile applications.

## ✨ Features

- **Modern Landing Page**: Stunning, responsive design with smooth animations.
- **Provider Registration Gateway**: A dedicated portal for professionals to learn about the benefits of joining Al-Gohary and easily redirecting them to the mobile app registration.
- **Dynamic Content**: Connected to Firebase Firestore for real-time updates on coverage areas (Governorates) and company settings.
- **Multi-language Support (i18n)**: Seamlessly switch between Arabic and English.
- **SEO Optimized**: Server-Side Rendering (SSR) capabilities built-in via TanStack Start & Nitro.
- **Dark/Light Mode**: Full theming support via Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Firebase CLI (for deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MahmoudAshraf19/Al-Gohary-web.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Al-Gohary-web
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📦 Build & Deployment

This project uses Vite for building and a custom prerender script for generating static assets for Firebase Hosting.

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy to Firebase:
   ```bash
   firebase deploy --only hosting
   ```

## 🛠️ Technology Stack

- **Framework**: React 18
- **Routing**: @tanstack/react-router
- **Styling**: Tailwind CSS & Radix UI (shadcn/ui)
- **State & Data**: @tanstack/react-query & Firebase SDK
- **Build Tool**: Vite
- **Deployment**: Firebase Hosting

## 📄 License

This project is proprietary and confidential. Unauthorized copying, modification, or distribution is strictly prohibited.

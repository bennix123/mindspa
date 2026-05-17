import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { ContentProvider } from './context/ContentContext';
import { LMSProvider } from './context/LMSContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import Preloader from './components/Preloader';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogsPage from './pages/BlogsPage';
import BlogPost from './pages/BlogPost';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import AwardsPage from './pages/AwardsPage';
import TestimonialsPage from './pages/TestimonialsPage';
import CoursesPage from './pages/CoursesPage';
import CurriculumPage from './pages/CurriculumPage';
import CourseDetail from './pages/CourseDetail';
import LessonView from './pages/LessonView';
import Dashboard from './pages/Dashboard';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Certificate from './pages/Certificate';
import SearchPage from './pages/SearchPage';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import AdminLMS from './pages/AdminLMS';
import MembershipsPage from './pages/MembershipsPage';
import BooksPage from './pages/BooksPage';
import SelfTalkPage from './pages/SelfTalkPage';

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Admin panel uses its own full-screen layout (no header/footer)
  const isAdminPanel = location.pathname.startsWith('/admin/lms');

  if (isAdminPanel) {
    return (
      <Routes>
        <Route path="/admin/lms" element={<AdminLMS />} />
      </Routes>
    );
  }

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div className="App">
        <ScrollProgress />
        <Header />
        <main key={location.pathname} className="page-transition">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/awards" element={<AwardsPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />

            {/* LMS routes */}
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/clinical-hypnotherapy-curriculum" element={<CurriculumPage />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="/courses/:courseId/learn/:lessonId" element={<LessonView />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/certificate/:courseId" element={<Certificate />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/memberships" element={<MembershipsPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/self-talk" element={<SelfTalkPage />} />

            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/lms" element={<AdminLMS />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

function App() {
  return (
    <ContentProvider>
      <LMSProvider>
        <AppContent />
      </LMSProvider>
    </ContentProvider>
  );
}

export default App;

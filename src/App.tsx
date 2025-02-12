import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Import pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import Photos from './pages/Photos';
import CV from './pages/CV';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import ManageBlog from './pages/admin/ManageBlog';
import ManagePhotos from './pages/admin/ManagePhotos';
import EditBlogPost from './pages/admin/EditBlogPost';
import EditPhoto from './pages/admin/EditPhoto';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/photos" element={<Photos />} />
              <Route path="/cv" element={<CV />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Protected Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="/admin/blog" element={
                <ProtectedRoute>
                  <ManageBlog />
                </ProtectedRoute>
              } />
              <Route path="/admin/blog/new" element={
                <ProtectedRoute>
                  <EditBlogPost />
                </ProtectedRoute>
              } />
              <Route path="/admin/blog/edit/:id" element={
                <ProtectedRoute>
                  <EditBlogPost />
                </ProtectedRoute>
              } />
              <Route path="/admin/photos" element={
                <ProtectedRoute>
                  <ManagePhotos />
                </ProtectedRoute>
              } />
              <Route path="/admin/photos/new" element={
                <ProtectedRoute>
                  <EditPhoto />
                </ProtectedRoute>
              } />
              <Route path="/admin/photos/edit/:id" element={
                <ProtectedRoute>
                  <EditPhoto />
                </ProtectedRoute>
              } />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import { PrivateRoute } from './components/routes/PrivateRoute.tsx';
import { PublicOnlyRoute } from './components/routes/PublicOnlyRoute.tsx';
import { AuthProvider } from './providers/AuthProvider.tsx';
import Admin from './pages/Admin.tsx';
import { AdminRoute } from './components/routes/AdminRoute.tsx';
import { PostsProvider } from './providers/PostProvider.tsx';
import Post from './pages/Post.tsx';
import { Profile } from './pages/Profile.tsx';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PostsProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route
                index
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicOnlyRoute>
                    <Login />
                  </PublicOnlyRoute>
                }
              />
              <Route
                path="/profile/:userId"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminRoute>
                      <Admin />
                    </AdminRoute>
                  </PrivateRoute>
                }
              />
              <Route
                path="/posts/:postId"
                element={
                  <PrivateRoute>
                    <Post />
                  </PrivateRoute>
                }
              />
            </Routes>
          </MainLayout>
        </Router>
      </PostsProvider>
    </AuthProvider>
  );
};

export default App;

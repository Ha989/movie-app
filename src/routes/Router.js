import { useAuth } from '../contexts/AuthContext';
import React from 'react';
import { Navigate, useLocation, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Discovery from '../pages/Discovery';
import FormPage from '../pages/FormPage';
import HomePage from '../pages/HomePage';
import MovieDetailPage from '../pages/MovieDetailPage';
import NotFoundPage from '../pages/NotFoundPage';
import FavoritePage from '../pages/FavoritePage';
import SearchQueryPage from '../pages/SearchQueryPage';


function Router() {
    let location = useLocation();
    let state = location.state;
    function RequireAuth({ children }) {
        let auth = useAuth();
        console.log("user status: ", auth.user);
        if(!auth.user) {
            return <Navigate to="/login" state={{ from: location }} replace/>
        }
        return children;
    }
  return (
    <>
       <Routes location={state?.backgroundLocation || location }>
           <Route path='/' element={<MainLayout />}>
              <Route index element={<HomePage />}/>
              <Route path='discovery/:pageId' element={<Discovery/>}/>
              <Route path='movie/:movieId' element={<MovieDetailPage />}/>
              <Route path='search/:query' element={<SearchQueryPage />}/>
              <Route path='/login' element={<FormPage />}/>
              <Route path='*' element={<NotFoundPage />}/>
              <Route 
                 path='/favorite'
                 element={
                    <RequireAuth>
                        <FavoritePage />
                    </RequireAuth>
                 }
              />
           </Route>
       </Routes>
       {state?.backgroundLocation && (
        <Routes>
            <Route path='/login' element={<FormPage />}/>
        </Routes>
       )}
    </>
  )
}

export default Router;
import { lazy } from "react";

const publicRoutes = [
    {
        path: '/',
        component: lazy(() => import('../pages/landing/LandingPage')),
    },
    {
        path: '/login',
        component: lazy(() => import('../pages/auth/LoginPage')),
    }
];

const privateRoutes = [
    {
        path: '/dashboard',
        component: lazy(() => import('../pages/dashboard/DashboardPage')),
    },
    {
        path: '/calculator',
        component: lazy(() => import('../pages/calculator/CalculatorPage')),
    }
];

export const getRoutes = (isAuthenticated) => {
    return isAuthenticated ? [...publicRoutes, ...privateRoutes] : publicRoutes;
}; 
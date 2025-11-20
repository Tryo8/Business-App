import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';
import { redirectGuard } from './core/guard/redirect.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    {   path:'', redirectTo:'auth',pathMatch:"full"},
    {
        path: 'auth',
        loadComponent: () => import('./layout/auth-layout/auth-layout.component')
        .then((c) => c.AuthLayoutComponent),
        title:"auth",
        children: [
            {
                path: '' , redirectTo: 'register', pathMatch: "full", title: 'home'
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/security/register/register.component')
                .then((c) => c.RegisterComponent),
                title: 'register',
                canActivate: [redirectGuard]
              
            },
            {
                path: 'login',
                loadComponent: () => import('./pages/security/login/login.component')
                .then((c) => c.LoginComponent),
                title: 'login',
                canActivate: [redirectGuard]
              
            },
            
        ]
    },
    {
        path: 'user',
        loadComponent: () => import('./layout/user-layout/user-layout.component')
        .then((c) => c.UserLayoutComponent),
        title:"user",
        canActivate: [ authGuard ],
        children: [
            { path: '', redirectTo: 'home' , pathMatch:"full", title: 'home' },
            {
                path: 'home',
                loadComponent: () => import('./pages/main/home/home.component')
                .then((c) => c.HomeComponent),
                title:"home",

            },
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/main/dashboard/dashboard.component')
                .then((c) => c.DashboardComponent),
                title:"dashboard",
              

            },
            {
                path: 'posts/:id',
                loadComponent: () => import('./pages/main/dashboard/get-one-post/get-one-post.component')
                .then((c) => c.GetOnePostComponent),
                title:"post details",
            },
    
            {
                path: 'employees',
                loadComponent: () => import('./pages/main/user-profile/user-profile.component')
                .then((c) => c.UserProfileComponent),
                title:"user profile",
            },
            {
                path: 'employees/:id',
                loadComponent: () => import('./pages/main/user-profile/get-user/get-user.component')
                .then((c) => c.GetUserComponent),
                title:"user details",
            },
            {
                path: 'profile',
                loadComponent: () => import('./pages/main/user-profile/main-user/main-user.component')
                .then((c) => c.MainUserComponent),
                title:"profile",
            }
        ]
    },
    {path: '**' , component:PageNotFoundComponent, title:"404" }
  

];

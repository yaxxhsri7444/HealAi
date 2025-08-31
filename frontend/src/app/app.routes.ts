import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Chat } from './chat/chat';
import { Register } from './register/register';
import { Dashboard } from './dashboard/dashboard';
import { About } from './about/about';

export const routes: Routes = [
    {path: 'login', component: Login},
    {path: 'chat', component: Chat},
    {path: 'dashboard', component: Dashboard},
    {path: 'about', component: About},
    {path: ' ', pathMatch: 'full', redirectTo: 'login'},
    {path: 'register', component: Register},

];

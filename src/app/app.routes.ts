// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', loadChildren: () => import('./profile/routes') },
  {
    path: 'assignment',
    loadComponent: () =>
      import('./assignment/pages/assignment-root/assignment-root').then(
        (m) => m.AssignmentRootPageComponent,
      ),
    children: [
      {
        path: 'view',
        loadComponent: () =>
          import('./assignment/pages/dynamic-section-view-page/dynamic-section-view-page').then(
            (m) => m.DynamicSectionViewPageComponent, // มั่นใจว่าชื่อคลาสในไฟล์ต้นทางตรงกัน
          ),
      },
      {
        path: 'form',
        loadComponent: () =>
          import('./assignment/pages/dynamic-section-form-page/dynamic-section-form-page').then(
            (m) => m.DynamicSectionFormPageComponent, // ตรวจสอบตัวสะกด Component/Page ให้ดี
          ),
      },
      { path: '', redirectTo: 'view', pathMatch: 'full' },
    ],
  },
];
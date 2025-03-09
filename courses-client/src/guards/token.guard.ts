import { CanActivateFn, Router } from '@angular/router';
// import * as jwt_decode from 'jwt-decode';
export const tokenGuard: CanActivateFn = (route, state) => {


  const token = sessionStorage.getItem('authToken');
  if (!token) {
    alert('You must be logged in to access this page 🤨' );
    // this.router.navigate(['/login']);
    return false;
  }
  // כדאי להוסיף בדיקה שבודקת תקינות 
  // כי גם אם הטוקן תקין זה לא אומר שהוא תקין
  return true;
};

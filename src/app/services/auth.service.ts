import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { map } from 'rxjs/operators';
import { Credentials } from '../models/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(
          userData => resolve(userData),
          err => reject(err))
    });
  }

  logOut() {
    this.afAuth.auth.signOut();
  }

  register(user: Credentials) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then(
          userData => resolve(userData),
          err => reject(err))
    });
  }

  getAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }
}

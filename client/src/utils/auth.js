import jwtDecode from 'jwt-decode';

class AuthService {
  login(idToken, userFound) {
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('user_found', userFound);
    window.location.assign('/home');
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); 
  }

  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
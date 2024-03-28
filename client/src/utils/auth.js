import jwtDecode from 'jwt-decode';

class AuthService {
  login(email, username, _id, token) {
    localStorage.setItem('email', email);
    localStorage.setItem('username', username);
    localStorage.setItem('id_token', token);
    localStorage.setItem('_id', _id);
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
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('_id');
    window.location.assign('/');
  }
}

export default new AuthService();
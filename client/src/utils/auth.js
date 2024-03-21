class AuthService {
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/home');
  }
}

export default new AuthService();
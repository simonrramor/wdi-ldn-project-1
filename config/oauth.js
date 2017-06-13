module.exports = {
  instagram: {
    loginUrl: 'https://api.instagram.com/oauth/authorize/',
    accessTokenUrl: 'https://api.instagram.com/oauth/access_token',
    redirectUri: 'http://localhost:8000/oauth/instagram',
    clientId: process.env.INSTA_ACCESS_KEY,
    clientSecret: process.env.INSTA_SECRET_KEY,
    responseCode: 'code',
    getLoginUrl() {
      return `${this.loginUrl}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=${this.responseCode}`;
    }
  }
};

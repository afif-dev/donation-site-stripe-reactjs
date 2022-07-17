const serviceAccount = {
  type: process.env.GS_TYPE,
  project_id: process.env.GS_PROJECT_ID,
  private_key_id: process.env.GS_PRIVATE_KEY_ID,
  private_key: process.env.GS_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.GS_CLIENT_EMAIL,
  client_id: process.env.GS_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.GS_CLIENT_X509_CERT_URL,
};

module.exports = serviceAccount;

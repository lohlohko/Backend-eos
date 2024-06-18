const setAccessTokenCookie = (res, accessToken) => {
  // Menyimpan akses token dalam cookie
  const cookieOptions = [
    `Bearer ${accessToken}`,
    'HttpOnly', // Hanya bisa diakses melalui HTTP
    'Secure', // Hanya dikirim via HTTPS (sesuai dengan kebutuhan)
    'SameSite=Strict', // Memastikan cookie hanya dikirimkan dalam konteks yang sama
    `Max-Age=${3600}` // Masa aktif cookie dalam detik (1 jam)
  ].join('; ');
  
  // Menetapkan header Set-Cookie dalam respons
  res.setHeader('Authorization', cookieOptions);
};

module.exports = { setAccessTokenCookie };
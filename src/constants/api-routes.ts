const protocol = process.env.VERCEL_ENV === 'development' ? 'http' : 'https';
const base = `${protocol}://${process.env.VERCEL_URL}`;

const apiRoutes = {
  CATEGORIES: `${base}/api/categories`,
};

export default apiRoutes;

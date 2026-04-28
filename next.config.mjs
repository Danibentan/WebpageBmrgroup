/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp']
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/quienes-somos.html', destination: '/quienes-somos', permanent: true },
      { source: '/tienda.html', destination: '/tienda', permanent: true },
      { source: '/nuestras-obras.html', destination: '/nuestras-obras', permanent: true },
      { source: '/contacto.html', destination: '/contacto', permanent: true },
      { source: '/catalogo.html', destination: '/catalogo', permanent: true },
      { source: '/marcas.html', destination: '/categorias', permanent: true }
    ];
  }
};

export default nextConfig;

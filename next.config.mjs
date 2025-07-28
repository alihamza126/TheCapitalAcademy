const config = {
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  }
  
  export default config
  
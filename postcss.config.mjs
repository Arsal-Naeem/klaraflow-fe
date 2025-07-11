const config = {
  plugins: [
    [
      "@tailwindcss/postcss", 
      {
        theme: {
          extend: {
            colors: {
              // 'brand-primary': '#ff2394',
              // 'brand-secondary': '#280595',
            }
          }
        }
      }
    ]
  ],
};

export default config;

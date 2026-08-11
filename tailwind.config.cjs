module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      'mobile': '390px',
      'tablet': '768px',
      'laptop': '1024px',
      'desktop': '1440px'
    },
    extend: {
      colors: {
        bg1: '#050816',
        bg2: '#0B1020',
        bg3: '#10182B',
        accent1: '#4F8CFF',
        accent2: '#6C63FF',
        accent3: '#00E5FF',
        accent4: '#A855F7'
      },
      borderRadius: {
        xlpanel: '24px'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(2,6,23,0.6)'
      }
    }
  },
  plugins: []
}

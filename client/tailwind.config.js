export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#F7F8FC',
        ink: '#101828',
        lilac: '#A78BFA',
        sky: '#60A5FA',
        pink: '#F472B6',
        cyan: '#22D3EE',
        amber: '#FBBF24'
      },
      boxShadow: {
        glow: '0 20px 60px rgba(96,165,250,0.22)',
        glass: '0 20px 60px rgba(15, 23, 42, 0.12)'
      },
      backgroundImage: {
        'mesh-soft':
          'radial-gradient(circle at 20% 20%, rgba(167,139,250,0.25), transparent 30%), radial-gradient(circle at 80% 0%, rgba(34,211,238,0.22), transparent 25%), radial-gradient(circle at 80% 70%, rgba(244,114,182,0.18), transparent 30%), linear-gradient(135deg, #f7f8fc 0%, #eef4ff 45%, #fef6fb 100%)'
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui'],
        display: ['"Sora"', 'ui-sans-serif', 'system-ui']
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.65', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 5s ease-in-out infinite'
      }
    }
  },
  plugins: []
};

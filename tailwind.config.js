/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B2149'
        },
        steel: {
          DEFAULT: '#4A5568'
        },
        base: {
          DEFAULT: '#FFFFFF'
        },
        cta: {
          DEFAULT: '#F2B705'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
      },
      boxShadow: {
        card: '0 6px 20px rgba(11,33,73,0.08)'
      },
      backgroundImage: {
        'architect-grid':
          'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
        'blueprint':
          'radial-gradient(ellipse at center, rgba(11,33,73,0.06), transparent 50%)'
      },
      backgroundSize: {
        'grid-size': '24px 24px'
      },
      transitionTimingFunction: {
        'out-smooth': 'cubic-bezier(0.22, 1, 0.36, 1)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.96)', opacity: 0.8 },
          '100%': { transform: 'scale(1)', opacity: 1 }
        },
        slowFloat: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
          '100%': { transform: 'translateY(0)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        premiumAttention: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '92%': { transform: 'translateY(0) scale(1)' },
          '96%': { transform: 'translateY(-4px) scale(1.03)' },
          '100%': { transform: 'translateY(0) scale(1)' }
        }
      },
      animation: {
        'fade-in': 'fadeIn 700ms ease-in-out both',
        'scale-in': 'scaleIn 500ms ease-in-out both',
        'slow-float': 'slowFloat 8s ease-in-out infinite',
        shimmer: 'shimmer 1500ms ease-in-out infinite',
        'premium-attention': 'premiumAttention 7s cubic-bezier(0.22,1,0.36,1) infinite'
      },
      maskImage: {
        'circle-soft': 'radial-gradient(circle at center, black 60%, transparent 65%)'
      }
    }
  },
  plugins: []
}

import type { Config } from "tailwindcss";
const { heroui } = require("@heroui/react");

const config: Config = {
   darkMode: ["class"],
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      container: {
         padding: { DEFAULT: "16px" },
      },
      extend: {
         // 1) Merge *all* your custom colors here:
         colors: {
            // brand & utility
            green: "#D2EF9A",
            black: "#1F1F1F",
            primary:"#1757ab",
            secondary: { DEFAULT: "#696C70", foreground: "#000000" },
            secondary2: "#A0A0A0",
            white: "#ffffff",
            surface: "#F7F7F7",
            red: "#DB4444",
            purple: "#8684D4",
            success: "#3DAB25",
            yellow: "#ECB018",
            pink: "#F4407D",
            line: "#E9E9E9",
            outline: "rgba(0, 0, 0, 0.15)",
            surface2: "rgba(255, 255, 255, 0.2)",
            surface1: "rgba(255, 255, 255, 0.1)",

            // radial / conic gradients
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            card: {
               DEFAULT: "hsl(var(--card))",
               foreground: "hsl(var(--card-foreground))",
            },
            popover: {
               DEFAULT: "hsl(var(--popover))",
               foreground: "hsl(var(--popover-foreground))",
            },
            muted: {
               DEFAULT: "hsl(var(--muted))",
               foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
               DEFAULT: "hsl(var(--accent))",
               foreground: "hsl(var(--accent-foreground))",
            },
            destructive: {
               DEFAULT: "hsl(var(--destructive))",
               foreground: "hsl(var(--destructive-foreground))",
            },
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            chart: {
               1: "hsl(var(--chart-1))",
               2: "hsl(var(--chart-2))",
               3: "hsl(var(--chart-3))",
               4: "hsl(var(--chart-4))",
               5: "hsl(var(--chart-5))",
            },
            sidebar: {
               DEFAULT: "hsl(var(--sidebar-background))",
               foreground: "hsl(var(--sidebar-foreground))",
               primary: "hsl(var(--sidebar-primary))",
               "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
               accent: "hsl(var(--sidebar-accent))",
               "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
               border: "hsl(var(--sidebar-border))",
               ring: "hsl(var(--sidebar-ring))",
            },
         },

         // 2) Everything else stays in extend:
         backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
               "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
         },
         borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
         },
         keyframes: {
            "accordion-down": {
               from: { height: "0" },
               to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
               from: { height: "var(--radix-accordion-content-height)" },
               to: { height: "0" },
            },
            blob: {
               "0%": {
                  transform: "translate(0px, 0px) scale(1)",
               },
               "33%": {
                  transform: "translate(30px, -50px) scale(1.1)",
               },
               "66%": {
                  transform: "translate(-20px, 20px) scale(0.9)",
               },
               "100%": {
                  transform: "translate(0px, 0px) scale(1)",
               },
            },
            float: {
               "0%, 100%": {
                  transform: "translateY(0px)",
               },
               "50%": {
                  transform: "translateY(-20px)",
               },
            },
            shimmer: {
               "0%": {
                  transform: "translateX(-100%)",
               },
               "100%": {
                  transform: "translateX(100%)",
               },
            },
            glow: {
               "0%, 100%": {
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
               },
               "50%": {
                  boxShadow: "0 0 40px rgba(59, 130, 246, 0.8)",
               },
            },
            pulse3d: {
               "0%, 100%": {
                  transform: "scale3d(1, 1, 1)",
               },
               "50%": {
                  transform: "scale3d(1.05, 1.05, 1.05)",
               },
            },
            rotate3d: {
               "0%": {
                  transform: "rotate3d(0, 1, 0, 0deg)",
               },
               "100%": {
                  transform: "rotate3d(0, 1, 0, 360deg)",
               },
            },
         },
         animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
            blob: "blob 7s infinite",
            float: "float 6s ease-in-out infinite",
            shimmer: "shimmer 2s infinite",
            glow: "glow 2s ease-in-out infinite alternate",
            pulse3d: "pulse3d 2s ease-in-out infinite",
            rotate3d: "rotate3d 10s linear infinite",
         },
         transformStyle: {
            "preserve-3d": "preserve-3d",
         },
         perspective: {
            1000: "1000px",
         },
      },
   },
   plugins: [
      heroui({
         themes: {
            light: {
               colors: {
                  secondary: {
                     DEFAULT: "#696C70",
                     foreground: "#000000",
                  },
                  focus: "#BEF264",
               },
            },
         },
      }),
      require("tailwindcss-animate"),
   ],
};

export default config;

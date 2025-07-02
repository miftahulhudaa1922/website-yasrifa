import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Jika ingin tetap extend dari Next.js tapi matikan semua rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Override semua rule di seluruh project
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    rules: {
      // Tambahkan ini untuk mematikan aturan secara global
      "all": "off", // Ini symbolic, tapi ESLint tidak support "all". Maka kita matikan individual.
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@next/next/no-img-element": "off",
      "react/react-in-jsx-scope": "off",
      "no-console": "off",
      "no-unused-vars": "off",
      // ...tambahkan aturan lain sesuai yang muncul di log
    },
  },
];

export default eslintConfig;

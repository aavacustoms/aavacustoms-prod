import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "AAVA Customs | Bespoke Creations & Customization",
  description: "Crafting the future of bespoke designs, engineered perfection, and uncompromised detail. AAVA Customs is launching soon.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#060b13] text-slate-100 selection:bg-[#2c7a7b]/30 selection:text-[#2c7a7b]">{children}</body>
    </html>
  );
}

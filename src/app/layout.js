import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Employ 🚀🏡⭐",
  description: "Old Employer",
};

export default function RootLayout({ children }) {
  return (
  <html lang="en">
    <head>
      <link rel="icon" href="/favicon.ico" />
    </head>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}>
        <body className={inter.className}>{children}</body>
      </GoogleOAuthProvider>
  </html>
  );
}

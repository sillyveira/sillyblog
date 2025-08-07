import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import '@ant-design/v5-patch-for-react-19';
import { AuthProvider } from "@/contexts/authContext";
//import "antd/dist/reset.css"

export const metadata: Metadata = {
  title: "SillyBlog",
  description: "Um mural de ideias bobas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <>
        <html>
          <body className="h-screen overflow-hidden">
          <AuthProvider>              
            <Header />
            <main className="h-full pt-16 overflow-hidden">
              {children}
            </main>
          </AuthProvider>
          </body>
        </html>
      </>
);
}

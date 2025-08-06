import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
//import "antd/dist/reset.css"

export const metadata: Metadata = {
  title: "SillyBlog",
  description: "Um mural de ideias bobas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <>
        <html>
          <body>
            <Header />
            {children}
          </body>
        </html>
      </>
);
}

import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import '@ant-design/v5-patch-for-react-19';
//import "antd/dist/reset.css"

export const metadata: Metadata = {
  title: "SillyBlog",
  description: "Um mural de ideias bobas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <>
        <html>
          <body className="overflow-hidden pt-[64px]">
            <Header />
            {children}
          </body>
        </html>
      </>
);
}

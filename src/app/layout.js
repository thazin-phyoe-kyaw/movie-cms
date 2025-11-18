import LayoutHeader from "@/components/layout/header/index";
import NextAuthProvider from "./providers";
import Content from "@/components/layout/content";
import Sidebar from "@/components/layout/sidebar";

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <title>Mahar Movie</title>
      </head>
      <body style={{ margin: 0 }}>
        <NextAuthProvider>
          <div style={{ width: "100%", display: "flex" }}>
            <div>
              <Sidebar />
            </div>
            <div style={{ flex: "auto", background: "black" }}>
              <LayoutHeader />
              <Content style ={{width : "100%"}}>{children}</Content>
            </div>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}

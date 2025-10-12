
import "./globals.css";
import LayoutClient from "@/components/LayoutClient"; // 👈 client wrapper

export const metadata = {
  title: "CareerBoost",
  description: "Empower your career with AI tools and expert guidance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}

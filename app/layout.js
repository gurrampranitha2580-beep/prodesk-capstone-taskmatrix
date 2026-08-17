import "./globals.css";
import StoreProvider from "./providers/StoreProvider";
import { Toaster } from "sonner";

export const metadata = {
  title: "TaskMatrix",
  description: "Agile Project Management Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>

        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
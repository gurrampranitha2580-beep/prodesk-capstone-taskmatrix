import "./globals.css";
import StoreProvider from "./providers/StoreProvider";

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
      </body>
    </html>
  );
}
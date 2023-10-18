"use client";
import "@/styles/globals.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// Define your custom primary color
const theme = createTheme({
  palette: {
    primary: {
      main: "#212121", // Replace with your desired primary color
    },
    secondary: {
      main: "#b069f0",
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

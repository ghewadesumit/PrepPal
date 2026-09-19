import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={"PrepPal"}>
        <GoogleOAuthProvider clientId={clientId}>
          <AppRoutes />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);

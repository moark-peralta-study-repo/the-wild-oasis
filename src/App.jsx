import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "./pages/Dashboard.jsx";
import Account from "./pages/Account.jsx";
import Cabins from "./pages/Cabins.jsx";
import Bookings from "./pages/Bookings.jsx";
import Login from "./pages/Login.jsx";
import Settings from "./pages/Settings.jsx";
import Users from "./pages/Users.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import GlobalStyles from "./styles/GlobalStyles.js";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />

      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="account" element={<Account />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<Users />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        toaster={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: "8px",
        }}
      />
    </QueryClientProvider>
  );
}

export default App;

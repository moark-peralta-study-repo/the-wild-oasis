import { useUser } from "../features/authentication/useUser.js";
import styled from "styled-components";
import Spinner from "./Spinner.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //Load authenticated user
  const { user, isLoading, isAuthenticated } = useUser();

  //If user is not authenticated, redirect to login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isLoading, isAuthenticated, navigate]);

  //While loading, show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // If there is a user, render app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;

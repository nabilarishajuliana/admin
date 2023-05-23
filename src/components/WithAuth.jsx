import { useToast } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

export const withAuth = (Component) => {
  const AuthRoute = (props) => {
    const isAuthenticated = !!localStorage.getItem("token");
    const toast = useToast();

    if (isAuthenticated) {
      return <Component {...props} />;
    }

    toast({
      title: "You have to login first.",
      status: "info",
      position: "top",
      variant: "top-accent",
      duration: 3000,
      isClosable: true,
    });
    return <Navigate to="/login" />;
  };

  return AuthRoute;
};

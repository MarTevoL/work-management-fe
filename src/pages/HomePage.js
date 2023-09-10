import React from "react";
import useAuth from "../hooks/useAuth";

function HomePage() {
  const { user } = useAuth();

  return <div>HomePage</div>;
}

export default HomePage;

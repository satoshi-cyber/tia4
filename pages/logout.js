import React, { useEffect } from "react";
import { useAction } from "../lib";
import { AuthService } from "../services";

export default function Home() {
  const logout = useAction([AuthService.logout]);

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="flex flex-1 w-full justify-center items-center py-20">
      logout
    </div>
  );
}

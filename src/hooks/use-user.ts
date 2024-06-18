import { useEffect, useState } from "react";
import { TokenType } from "@/types/shared";
import { SESSION_STORAGE_KEY } from "@/constants";
import { useNavigate } from "react-router-dom";
import { decodeAuthToken } from "@/utils/";
import { toast } from "react-toastify";

export const useUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<TokenType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dataFromSession = sessionStorage.getItem(
      SESSION_STORAGE_KEY
    );

    if (!dataFromSession) {
      toast.error("Authorized, please login", {
        toastId: "unauthorized-toast-3338",
      });
      navigate("/auth/login");
      return;
    }
    const user = decodeAuthToken(dataFromSession);
    setUser(user);
    setIsLoading(false);
  }, [navigate]);

  return { user, isLoading };
};

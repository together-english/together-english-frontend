import type { FC, PropsWithChildren } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts";

type RequireAuthProps = {};

const RequireAuth: FC<PropsWithChildren<RequireAuthProps>> = ({ children }) => {
  const { loggedUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loggedUser) router.back();
  }, [loggedUser, router]);

  return <>{children}</>;
};
export default RequireAuth;

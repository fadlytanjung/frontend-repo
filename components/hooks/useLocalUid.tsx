import { useEffect, useState } from "react";

export function useLocalUid() {
  const [localUid, setLocalUid] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const uid = localStorage.getItem("uid");
      setLocalUid(uid);
    }
  }, []);

  return localUid;
}

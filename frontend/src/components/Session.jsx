import { useEffect } from "react";
import { useStore } from "../store/useStore";

export const Session = () => {
  const { formData, fetchLoggedInData } = useStore();

  useEffect(() => {
    if (formData.accessToken) {
      fetchLoggedInData(formData.accessToken);
    }
  }, []);

  return <div>Session: You are logged in. {formData.message}</div>;
};

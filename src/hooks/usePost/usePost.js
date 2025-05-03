import { useState } from "react";
import { api } from "service";

export const usePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const mutate = ({
    url,
    data = {},
    config = {},
    method = "POST",
    onSuccess = () => {},
    onError = () => {},
  }) => {
    setIsLoading(true);
    api({ method: method, url, data }, config)
      .then((res) => {
        setIsLoading(false);
        onSuccess(res.data);
        setIsSuccess(true);
      })
      .catch((err) => {
        setIsLoading(false);
        onError(err);
        setError(err);
      });
  };

  return { isLoading, isSuccess, error, mutate };
};

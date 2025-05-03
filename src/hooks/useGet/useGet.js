import { useEffect, useState } from "react";
import { api } from "service";

export const useGet = ({
  url,
  onSuccess = () => {},
  onError = () => {},
  enabled = true,
  config = {},
  defaultValue = [],
}) => {
  const [data, setData] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const getData = () => {
    setIsLoading(true);
    api
      .get(url, config)
      .then((res) => {
        onSuccess(res.data);
        setData(res.data);
        setIsLoading(false);
        setIsSuccess(true);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        setErrorMessage(error.message);
        onError("error");
        if (error?.response?.data?.data?.message == "Unauthorized") {
          localStorage.clear();
          window.location.reload();
        }
      });
  };
  useEffect(() => {
    if (enabled) {
      getData();
    }
  }, [enabled]);
  return {
    refetch: getData,
    isError,
    isLoading,
    isSuccess,
    data,
    errorMessage,
  };
};

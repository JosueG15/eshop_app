import { useState, useEffect } from "react";
import { showToast } from "../components/Toast";

const placeholderImage = "https://placehold.co/500x600/png";

const useImageValidator = (imageUrl: string | null) => {
  const [validatedUrl, setValidatedUrl] = useState<string>(placeholderImage);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateImageUrl = async (url: string) => {
      try {
        const response = await fetch(url, { method: "HEAD" });
        if (response.ok) {
          setValidatedUrl(url);
        } else {
          setValidatedUrl(placeholderImage);
        }
      } catch (error) {
        setValidatedUrl(placeholderImage);
      } finally {
        setIsLoading(false);
      }
    };

    if (imageUrl && imageUrl.trim() !== "") {
      validateImageUrl(imageUrl);
    } else {
      setValidatedUrl(placeholderImage);
      setIsLoading(false);
    }
  }, [imageUrl]);

  return { validatedUrl, isLoading };
};

export default useImageValidator;

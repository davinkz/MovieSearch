const apiRequest = async (url, method, body = null) => {
  const unknownError = "An unknown error occurred.";
  const response = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: body,
  });

  if (!response.ok) {
    return {
      hasError: true,
      error: response.statusText ?? response.text ?? unknownError,
    };
  }

  const result = await response.json();
  if (result.hasError) {
    return { hasError: true, error: result.error ?? unknownError };
  }

  return result;
};

export default apiRequest;

type FormAction<T> = (values: T) => Promise<{
  error?: string;
  success?: string;
} | null>;

export const handleFormSubmit = async <T>(
  formAction: FormAction<T>,
  values: T,
  setError: (error: string) => void,
  setSuccess: (success: string) => void,
  form?: { reset: () => void }
) => {
  setError("");
  setSuccess("");

  try {
    const data = await formAction(values);

    if (data?.error) {
      setError(data.error);
    }

    if (data?.success) {
      form?.reset();
      setSuccess(data.success);
    }
  } catch (error) {
    console.error(error);
    setError("An unexpected error occurred. Please try again.");
  }
};

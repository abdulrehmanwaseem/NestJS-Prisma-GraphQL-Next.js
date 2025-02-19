import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const onQueryStarted = async (
  _: unknown,
  { queryFulfilled }: { queryFulfilled: Promise<{ data: unknown }> }
) => {
  try {
    const { data } = await queryFulfilled;

    console.log(data);
  } catch (err) {
    console.log("GraphQL API Error:", err);

    let status = 500;
    let message = "Something went wrong. Please try again later.";
    if (err && typeof err === "object" && "error" in err) {
      const error = err as { error: FetchBaseQueryError };

      if (error?.error?.path === "getProfile") {
        return null;
      }
      status = (error.error?.status as number) || 500;
      message =
        (error.error as any)?.data?.message ||
        (error.error as any)?.response?.data?.message ||
        message;
    }

    switch (status) {
      case 400:
        toast.error(message || "Bad Request");
        break;
      case 401:
        toast.error(message || "You are not authorized. Please log in again.");
        break;
      case 403:
        toast.error(
          message ||
            "Forbidden: You don't have permission to perform this action."
        );
        break;
      case 404:
        toast.error("Resource not found");
        break;
      case 409:
        toast.error("Conflict: This action cannot be performed.");
        break;
      case 422:
        toast.error("Validation Error: Please check your input.");
        break;
      case 500:
        toast.error("Internal Server Error. Please try again later.");
        break;
      case 503:
        toast.error("Service Unavailable. Please try again later.");
        break;
      default:
        toast.error(message);
    }
  }
};

export default onQueryStarted;

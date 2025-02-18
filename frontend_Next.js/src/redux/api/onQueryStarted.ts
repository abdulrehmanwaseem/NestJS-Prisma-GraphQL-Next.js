import { toast } from "react-toastify";
import { signOut } from "../slice/authSlice";

const onQueryStarted = async (_, { queryFulfilled, dispatch }) => {
  try {
    const { data } = await queryFulfilled;
    console.log(data);
    if (data) {
      toast.success("Operation successful!");
    }
  } catch ({ error }) {
    const status = error?.statusCode || 500;
    const message = error?.message;

    switch (status) {
      case 400:
        toast.error(message || "Bad Request");
        break;
      case 401:
        dispatch(signOut());
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
        toast.error(message || "Something went wrong. Please try again later.");
    }
  }
};

export default onQueryStarted;

import { toast } from "react-toastify";

export const notifySuccess = (title) =>
    toast.success(title, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
    });

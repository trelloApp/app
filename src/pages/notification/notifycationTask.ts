import { toast } from "react-toastify";
export const options = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  rtl: false,
  theme: "colored",
};

export const success = (c: string, option: any) =>
  toast.success(`${c}`, option);
export const warning = (c: string, option: any) => {
  return toast.warning(`${c}`, option);
};
export const errorShow = (c: string, option: any) => {
  return toast.error(`${c}`, option);
};

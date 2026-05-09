import * as React from "react";
import { PiWarningCircleBold } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { IoCheckmarkCircle } from "react-icons/io5";

const Notification = React.memo(function Notification({
    status = "success",
    message,
    showAlert,
    setShowAlert,
    alertKey,
    style,
}) {
    const timeoutRef = React.useRef(null);

    const handleClose = React.useCallback(() => {
        setShowAlert(false);
    }, [setShowAlert]);

    React.useEffect(() => {
        if (showAlert) {
            timeoutRef.current = setTimeout(() => {
                handleClose();
            }, 5000);
        }

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [showAlert, handleClose, alertKey]);

    if (!showAlert) return null;

    return (
        <div
            className={`fixed top-4 left-1/2 z-50 flex min-w-[320px] -translate-x-1/2 items-center justify-between rounded-2xl border-l-4 px-4 py-3 shadow-lg backdrop-blur-sm
      ${status === "success"
                    ? "border-green-600 bg-green-50 text-green-800"
                    : "border-red-600 bg-red-50 text-red-800"
                }
      ${style || ""}`}
        >
            <div className="flex items-center gap-3">
                <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-white
          ${status === "success" ? "bg-green-600" : "bg-red-600"
                        }`}
                >
                    {status === "success" ? (
                        <IoCheckmarkCircle className="text-lg" />
                    ) : (
                        <PiWarningCircleBold className="text-lg" />
                    )}
                </div>

                <p className="m-0 text-sm font-medium">{message}</p>
            </div>

            <button
                onClick={handleClose}
                className="ml-6 transition hover:scale-110"
            >
                <IoMdClose className="text-xl" />
            </button>
        </div>
    );
});

export default Notification;
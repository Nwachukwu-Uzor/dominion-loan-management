import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { IoMdClose } from "react-icons/io";

// import { ClipLoader } from "react-spinners";
// import { toast } from "react-toastify";
import { AdminType } from "@/types/shared";
import { FaCheck } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { FETCH_ALL_ADMINS, SESSION_STORAGE_KEY } from "@/constants";
import { AdminService } from "@/services";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

type Props = {
  openModal: boolean;
  onClose: () => void;
  admin?: AdminType | null;
};

export const ActivateAdmin = ({ openModal, onClose, admin }: Props) => {
  const queryClient = useQueryClient();

  const token = sessionStorage.getItem(SESSION_STORAGE_KEY);
  const adminService = new AdminService(token);

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      if (!admin) {
        return;
      }
      const payload = {
        userID: admin.id,
        actionType: "active",
      };

      const response = await adminService.updateAdminStatus(payload);
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [FETCH_ALL_ADMINS],
      });
      onClose();
    },
  });

  return (
    <>
      <Dialog open={openModal}>
        <DialogContent className="gap-0">
          <div className="flex justify-end">
            <button disabled={isPending}>
              <IoMdClose
                className="cursor-pointer hover:scale-150 transition-all"
                onClick={onClose}
              />
            </button>
          </div>
          <div className="h-10 w-10 lg:h-[60px] lg:w-[60px] bg-green-100 rounded-full mx-auto flex justify-center items-center">
            <FaCheck className="text-green-700 scale-150 text-xl lg:text-2xl" />
          </div>
          <h3 className="text-lg font-bold mt-5 text-center">
            Confirm Activation
          </h3>
          <p className="mt-[5px] text-center">
            Are you sure you want to activate{" "}
            <strong>{admin?.fullName ?? admin?.email}</strong>?
          </p>

          <Button
            className="bg-green-600 text-white mt-8 lg:mt-4"
            onClick={() => mutate()}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <ClipLoader size={12} color="#fff" /> <span>Loading...</span>
              </>
            ) : (
              "Yes"
            )}
          </Button>
          <Button
            className="bg-[#2D2D2D] text-white mt-0 lg:mt-4"
            onClick={onClose}
            disabled={isPending}
          >
            No, Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

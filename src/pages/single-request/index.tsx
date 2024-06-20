import  { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Container, DataTable, PageTitle } from "@/components/shared";
import { LoanType } from "@/types/shared";
import { ColumnDef } from "@tanstack/react-table";
import { dummyLoans } from "@/data/";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { IoEye } from "react-icons/io5";

import {
  formatNumberWithCommas,
  getDaysFromToday,
} from "@/utils";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z
  .object({
    status: z.optional(z.string()),
    startDate: z.string().refine(
      (value) => {
        // Validate that startDate is at least today's date
        const today = new Date();
        const selectedDate = new Date(value);
        return selectedDate <= today;
      },
      {
        message: "Start date must not exceed today's date",
      }
    ),
    endDate: z.string().refine(
      (value) => {
        // Validate that endDate is after startDate
        const today = new Date();
        const selectedDate = new Date(value);
        return selectedDate <= today;
      },
      {
        message: "End date must not exceed today's date",
      }
    ),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      return endDate > startDate;
    },
    {
      message: "End date must be more than start date",
      path: ["endDate"],
    }
  );

type FormFields = z.infer<typeof schema>;

const STATUS_OPTIONS = [
  {
    id: 1,
    value: "All",
    label: "All",
  },
  {
    id: 2,
    value: "Successful",
    label: "Successful",
  },
  {
    id: 3,
    value: "Pending",
    label: "Pending",
  },
  {
    id: 4,
    value: "Declined",
    label: "Declined",
  },
  {
    id: 5,
    value: "Failed",
    label: "Failed",
  },
];

const Requests = () => {
  const {
    register,
    setError,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const [status] = watch(["status"]);

  useEffect(() => {
    const dates = getDaysFromToday(-5);
    setValue("startDate", dates.other);
    setValue("endDate", dates.today);
  }, [setValue, handleSubmit]);

  const columns: ColumnDef<LoanType>[] = [
    {
      header: "Customer Name",
      accessorKey: "customerName",
    },
    {
      header: "Account Number",
      accessorKey: "customerAccountNumber",
    },
    {
      accessorKey: "amount",
      header: "Loan Amount",
      cell: ({ getValue }) => formatNumberWithCommas(getValue() as string),
    },
    {
      accessorKey: "totalPayment",
      header: "Total Payments",
      cell: ({ getValue }) => formatNumberWithCommas(getValue() as string),
    },
    
    {
      accessorKey: "startDate",
      header: "Start Date",
    },
    {
      accessorKey: "tenure",
      header: "Tenure",
    },
    {
      accessorKey: "nextPaymentDate",
      header: "Next Payment Date",
    },
    {
      header: "",
      accessorKey: "id",
      cell: ({ getValue }) => (
        <Link
          to={`requests/${getValue()}`}
          className="text-primary relative group w-fit font-bold text-sm flex items-center justify-center gap-0.5 hover:opacity-85"
        >
          <IoEye /> Details
          <span className="absolute left-0 h-[1.25px] -bottom-0.5 w-0 group-hover:w-full bg-primary ease-linear duration-150 opacity-85"></span>
        </Link>
      ),
    },
  ];

  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    try {
      console.log({ values });

      // const data = await transactionService.getTransactionsByDate(values);
      // setTransactions(data);
    } catch (error: any) {
      setError("root", {
        type: "deps",
        message:
          error?.response?.data?.message ??
          error?.message ??
          "An error occurred",
      });
      toast.error(
        error?.response?.data?.message ?? error?.message ?? "An error occurred",
        { toastId: "transactions-fetch-202233" }
      );
      return;
    }
  };
  return (
    <Container>
      {/* <Link
        to="/requests/new"
        className="max-w-[100px] gap-1 rounded-md active:scale-75 hover:opacity-60 duration-150 text-sm py-1.5 px-1 mb-2 flex items-center justify-center ml-auto bg-black text-white"
      >
        <FaPlus /> New
      </Link> */}
      <PageTitle title="Bulk Notification Details" />
      <Card className="my-2">
        <form
          className="flex my-2 flex-col lg:flex-row gap-3 lg:gap-2 justify-between items-start lg:items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full max-w-[400px]">
            <Label htmlFor="alertType" className="mb-1 font-semibold">
              Status
            </Label>
            <Select
              value={status}
              onValueChange={async (value) => {
                setValue("status", value);
                await trigger(["status"]);
              }}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {STATUS_OPTIONS?.map((opt) => (
                    <SelectItem value={opt.value} key={opt.id}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <Input
              type="date"
              label="Start Date"
              className="cursor-pointer w-full"
              {...register("startDate")}
              error={errors?.startDate?.message}
              disabled={isSubmitting}
            />
            <Input
              type="date"
              label="End Date"
              className="cursor-pointer w-full"
              {...register("endDate")}
              error={errors?.endDate?.message}
              disabled={isSubmitting}
            />
          </div>
          <Button>Search</Button>
        </form>
        <DataTable columns={columns} data={dummyLoans} />
      </Card>
    </Container>
  );
};

export default Requests;

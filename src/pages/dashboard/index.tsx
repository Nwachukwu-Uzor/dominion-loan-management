import { Container, DashboardCard, PageTitle } from "@/components/shared";
import { RequestType } from "@/types/shared";
import { ColumnDef } from "@tanstack/react-table";
import {
  formatNumberWithCommas,
  generateTransactionStatusStyle,
  getDaysFromToday,
} from "@/utils";
import { Link } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { dummyRequests } from "@/data";
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
import { toast } from "react-toastify";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";

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

const Dashboard = () => {
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

  const columns: ColumnDef<RequestType>[] = [
    {
      header: "Uploaded By",
      accessorKey: "uploadedBy",
    },
    {
      header: "Record Count",
      accessorKey: "totalRecords",
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
      cell: ({ getValue }) => formatNumberWithCommas(getValue() as string),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => (
        <div
          className={`${generateTransactionStatusStyle(getValue() as string)}`}
        >
          {getValue() as string}
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      header: "",
      accessorKey: "id",
      cell: ({ getValue }) => (
        <Link
          to={`/bulk-notifications/${getValue()}`}
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
      <PageTitle title="Dashboard" />
      <article className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <DashboardCard count={20} title="Completed Requests" theme="success" />
        <DashboardCard count={4} title="Pending Requests" theme="warn" />
        <DashboardCard count={5} title="Declined Requests" theme="danger" />
      </article>
      <Card className="mt-4">
        <h2 className="font-bold text-lg my-2">Requests</h2>
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
          <Button className="bg-black hover:opacity-70 active:bg-black">
            Search
          </Button>
        </form>
        <DataTable columns={columns} data={dummyRequests} />
      </Card>
    </Container>
  );
};

export default Dashboard;

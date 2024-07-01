import { 
  // useEffect, 
  useState } from "react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { SubmitHandler, useForm } from "react-hook-form";
import {
  Container,
  // DataTable,
  NonPaginatedTable,
  PageTitle,
} from "@/components/shared";
import { AccountType, 
  // RequestType 
} from "@/types/shared";
import { ColumnDef } from "@tanstack/react-table";
// import { dummyRequests } from "@/data/";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
// import { IoEye } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
// import {
//   formatNumberWithCommas,
//   generateTransactionStatusStyle,
//   getDaysFromToday,
// } from "@/utils";
// import { toast } from "react-toastify";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { FETCH_ACCOUNTS_PAGINATED, SESSION_STORAGE_KEY } from "@/constants";
import { AccountService } from "@/services/account-service";
import { Pagination } from "@/components/shared/pagination";
import { ClipLoader } from "react-spinners";

// const schema = z
//   .object({
//     status: z.optional(z.string()),
//     startDate: z.string().refine(
//       (value) => {
//         // Validate that startDate is at least today's date
//         const today = new Date();
//         const selectedDate = new Date(value);
//         return selectedDate <= today;
//       },
//       {
//         message: "Start date must not exceed today's date",
//       }
//     ),
//     endDate: z.string().refine(
//       (value) => {
//         // Validate that endDate is after startDate
//         const today = new Date();
//         const selectedDate = new Date(value);
//         return selectedDate <= today;
//       },
//       {
//         message: "End date must not exceed today's date",
//       }
//     ),
//   })
//   .refine(
//     (data) => {
//       const startDate = new Date(data.startDate);
//       const endDate = new Date(data.endDate);
//       return endDate > startDate;
//     },
//     {
//       message: "End date must be more than start date",
//       path: ["endDate"],
//     }
//   );

// type FormFields = z.infer<typeof schema>;

// const STATUS_OPTIONS = [
//   {
//     id: 1,
//     value: "All",
//     label: "All",
//   },
//   {
//     id: 2,
//     value: "Successful",
//     label: "Successful",
//   },
//   {
//     id: 3,
//     value: "Pending",
//     label: "Pending",
//   },
//   {
//     id: 4,
//     value: "Declined",
//     label: "Declined",
//   },
//   {
//     id: 5,
//     value: "Failed",
//     label: "Failed",
//   },
// ];

const initialPageConfig = {
  size: 10,
  total: 5,
  page: 1,
};

const Accounts = () => {
  // const {
  //   register,
  //   setError,
  //   handleSubmit,
  //   watch,
  //   setValue,
  //   trigger,
  //   formState: { errors, isSubmitting },
  // } = useForm<FormFields>({
  //   resolver: zodResolver(schema),
  // });

  const [pageConfig, setPageConfig] = useState(initialPageConfig);

  const token = sessionStorage.getItem(SESSION_STORAGE_KEY);
  const accountsService = new AccountService(token);

  const {
    data: accounts,
    isError: isAccountsError,
    error: accountError,
    isLoading: isLoadingAccounts,
  } = useQuery({
    queryKey: [FETCH_ACCOUNTS_PAGINATED, pageConfig.page],
    queryFn: async ({ queryKey }) => {
      const [_, page] = queryKey;
      const data = await accountsService.getAccounts(
        Number(page),
        pageConfig.size
      );
      setPageConfig(prev => ({...prev, total: data?.payload?.totalPages ?? 1}))
      return data?.payload?.accountRecords;
    },
  });

  // const [status] = watch(["status"]);

  // useEffect(() => {
  //   const dates = getDaysFromToday(-5);
  //   setValue("startDate", dates.other);
  //   setValue("endDate", dates.today);
  // }, [setValue, handleSubmit]);

  const columns: ColumnDef<AccountType>[] = [
    {
      header: "Account Number",
      accessorKey: "accountNumber",
    },
    {
      header: "Customer Number",
      accessorKey: "customerNumber",
    },
    {
      header: "Account Tier",
      accessorKey: "AccountTier",
    },
    {
      header: "Customer Name",
      accessorFn: (row) => `${row.profile.LastName} ${row.profile.OtherNames}`,
    },
    {
      header: "Phone Number",
      accessorFn: (row) => `${row.profile.PhoneNo}`,
    },
    // {
    //   accessorKey: "status",
    //   header: "Status",
    //   cell: ({ getValue }) => (
    //     <div
    //       className={`${generateTransactionStatusStyle(getValue() as string)}`}
    //     >
    //       {getValue() as string}
    //     </div>
    //   ),
    // },
    // {
    //   accessorKey: "date",
    //   header: "Date",
    // },
    // {
    //   header: "",
    //   accessorKey: "id",
    //   cell: ({ getValue }) => (
    //     <Link
    //       to={`/bulk-notifications/${getValue()}`}
    //       className="text-primary relative group w-fit font-bold text-sm flex items-center justify-center gap-0.5 hover:opacity-85"
    //     >
    //       <IoEye /> Details
    //       <span className="absolute left-0 h-[1.25px] -bottom-0.5 w-0 group-hover:w-full bg-primary ease-linear duration-150 opacity-85"></span>
    //     </Link>
    //   ),
    // },
  ];

  // const onSubmit: SubmitHandler<FormFields> = async (values) => {
  //   try {
  //     console.log({ values });

  //     // const data = await transactionService.getTransactionsByDate(values);
  //     // setTransactions(data);
  //   } catch (error: any) {
  //     setError("root", {
  //       type: "deps",
  //       message:
  //         error?.response?.data?.message ??
  //         error?.message ??
  //         "An error occurred",
  //     });
  //     toast.error(
  //       error?.response?.data?.message ?? error?.message ?? "An error occurred",
  //       { toastId: "transactions-fetch-202233" }
  //     );
  //     return;
  //   }
  // };

  const handlePaginate = (page: number) => {
    setPageConfig((prev) => ({ ...prev, page }));
  };

  return (
    <Container>
      <Link
        to="/bulk-notifications/new"
        className="max-w-[180px] gap-1 rounded-md active:scale-75 hover:opacity-60 duration-150 py-1.5 px-1 mb-4 flex items-center justify-center ml-auto bg-black text-white text-xs font-bold"
      >
        <FaPlus /> New Bulk Notifications
      </Link>
      <PageTitle title="Accounts" />
      <Card className="my-2">
        {/* <form
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
        </form> */}
        {isLoadingAccounts ? (
          <div className="min-h-[25vh] flex items-center justify-center">
            <ClipLoader size={25} color="#5b21b6" />
          </div>
        ) : isAccountsError ? (
          <div>{accountError?.message}</div>
        ) : accounts ? (
          <>
            <NonPaginatedTable columns={columns} data={accounts} />
            <div>
              <Pagination
                totalPages={pageConfig.total}
                currentPage={pageConfig.page}
                handlePageClick={handlePaginate}
              />
            </div>
          </>
        ) : null}
      </Card>
    </Container>
  );
};

export default Accounts;

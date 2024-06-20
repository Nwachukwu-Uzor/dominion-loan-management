import { Card } from "@/components/ui/card";
import React from "react";

const themes = {
  danger: "bg-red-700 text-white",
  success: "bg-green-700 text-white",
  warn: "bg-yellow-500 text-white",
};

type Props = {
  count: number;
  title: string;
  theme?: keyof typeof themes;
  icon: React.ReactNode
};
export const DashboardCard: React.FC<Props> = ({ count, title, theme, icon }) => {
  return (
    <Card
      className={`min-h-[20vh] items-center flex border-0 ${theme && themes[theme]}`}
    >
      <div className="font-bold">
        {icon}
        <h2 className="text-2xl lg:text-3xl my-1">{count}</h2>
        <h3 className="text-lg">{title}</h3>
      </div>
    </Card>
  );
};

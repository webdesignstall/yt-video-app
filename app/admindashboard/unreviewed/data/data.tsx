import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "active",
    label: "Active",
    icon: QuestionMarkCircledIcon,
    variant: "outline",
  },
  {
    value: "inactive",
    label: "Inactive",
    icon: QuestionMarkCircledIcon,
    variant: "destructive",
  },
  {
    value: "expired",
    label: "Expired",
    icon: QuestionMarkCircledIcon,
    variant: "secondary",
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];

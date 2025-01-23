import {
  ClockIcon,
  MenuIcon,
  RefreshCwIcon,
  StarIcon,
  UsersIcon,
  type LucideProps,
} from "lucide-react";

export const Icons = {
  Star: (props: LucideProps) => <StarIcon {...props} />,
  Refresh: (props: LucideProps) => <RefreshCwIcon {...props} />,
  Menu: (props: LucideProps) => <MenuIcon {...props} />,
  Clock: (props: LucideProps) => <ClockIcon {...props} />,
  Users: (props: LucideProps) => <UsersIcon {...props} />,
};

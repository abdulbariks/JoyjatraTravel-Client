import { Badge } from "@/components/ui/badge";
import { ModeratorStatus } from "@/types/moderator.types";

interface IStatusBadgeCellProps {
  status: ModeratorStatus;
}

const StatusBadgeCell = ({ status }: IStatusBadgeCellProps) => {
  return (
    <Badge
      variant={
        status === ModeratorStatus.ACTIVE
          ? "default"
          : status === ModeratorStatus.BLOCKED
            ? "destructive"
            : "secondary"
      }
      // className="px-2 py-1"
    >
      <span className="text-sm capitalize">{status.toLowerCase()}</span>
    </Badge>
  );
};

export default StatusBadgeCell;

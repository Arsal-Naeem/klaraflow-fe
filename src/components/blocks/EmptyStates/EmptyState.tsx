import { Inbox } from "lucide-react";

const EmptyState = ({
  height,
  message,
}: {
  height?: string;
  message?: string;
}) => {
  return (
    <div
      className={`w-full h-${
        height ?? "50"
      } flex flex-col items-center justify-center gap-3 text-center text-muted-foreground`}
    >
      <Inbox size={60} />
      {message ? message : "No Data Available"}
    </div>
  );
};

export default EmptyState;

const DataLoader = ({ height }: { height?: string }) => {
  return (
    <div
      className={`w-full h-${height ?? "50"} flex items-center justify-center`}
    >
      Loading...
    </div>
  );
};

export default DataLoader;

const Loader = () => {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-white bg-opacity-35 backdrop-blur-sm">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loader;
"use client";

const Settings = () => {
  return (
    <div className="rounded-lg border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div className="grid grid-cols-12  pb-4">
        <div className="col-span-5 flex  w-full  gap-4 max-md:col-span-12 max-xsm:flex-col "></div>
      </div>
      <div className="max-w-full h-60 flex items-center justify-center text-4xl">
        Settings
      </div>
      <div className="my-5 text-right"></div>
    </div>
  );
};

export default Settings;

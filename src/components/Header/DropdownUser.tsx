import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LuLogOut } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Props {
  userRole: string;
}
const DropdownUser = ({ userRole }: Props) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trigger = useRef<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dropdown = useRef<any>(null);
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {}, []);
  const onLogout = () => {
    Cookies.remove("w-access");
    router.push("/login");
  };
  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {userRole}
          </span>
          <span className="block text-xs"></span>
        </span>

        <FaChevronDown />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <button
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
          onClick={() => onLogout()}
        >
          <LuLogOut className="text-xl" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;

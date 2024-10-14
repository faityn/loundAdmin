import { adminMenuItemAtom } from "@/atom";
import { useRecoilState } from "recoil";

interface Props {
  id?: number;
  name?: string;
}
const Checkbox = ({ id, name }: Props) => {
  const [menuItems, setMenuItems] = useRecoilState(adminMenuItemAtom);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const newItem = {
      menuId: Number(id),
      isUse: true,
    };
    setMenuItems((prevChecked) =>
      e.target.checked
        ? [...prevChecked, newItem]
        : prevChecked.filter((item) => item.menuId !== Number(id))
    );
  };
  return (
    <div>
      <label
        htmlFor={String(id)}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={String(id)}
            value={id}
            className="sr-only"
            onChange={(e) => handleCheck(e, Number(id))}
            checked={menuItems.some((item) => item.menuId === id)}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              menuItems.some((item) => item.menuId === id) &&
              "border-primary bg-gray dark:bg-transparent"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${
                menuItems.some((item) => item.menuId === id) && "bg-primary"
              }`}
            ></span>
          </div>
        </div>
        {name}
      </label>
    </div>
  );
};

export default Checkbox;

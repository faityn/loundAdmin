"use client";
import { interestDetailAtom } from "@/atom";
import getToken from "@/helper/getToken";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import { getPurposesDetail, updatePurposes } from "@/hooks/useData";
import { FaRegCheckCircle } from "react-icons/fa";
import AlertModal from "../Modal/AlertModal";
import { LuAlertCircle } from "react-icons/lu";
import NotFound from "../common/NotFound";
interface Props {
  id: number;
  url?: string;
}

interface FormData {
  title: string;
  image?: string;
}
const PurposesUpdate = ({ id, url }: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [createError, setCreateError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [itemsDetail, setItemsDetail] = useRecoilState(interestDetailAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getData();
  }, []);

  const getData = async () => {
    const userToken = getToken();
    const response = await getPurposesDetail(String(userToken), id);

    if (response?.status) {
      setItemsDetail([response?.result]);
    } else {
      setNotFound(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    router.push(`${url}`);
  };

  const closeError = () => {
    setCreateError(false);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    const token = getToken();
    const title = data.title;
    const res = await updatePurposes(String(token), id, title);

    if (res?.status) {
      setIsOpen(true);
      setLoading(false);
    } else {
      setCreateError(true);
      setLoading(false);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        {notFound && <NotFound />}
        {itemsDetail?.length > 0 &&
          itemsDetail?.map((item, index) => (
            <div key={index} className="max-w-203">
              <form onSubmit={handleSubmit(onSubmit)}>
                <table className=" w-full table-auto text-sm">
                  <tbody>
                    <tr>
                      <td className="  border-[#eee] px-4 py-3 dark:border-strokedark ">
                        <h5 className="font-medium text-black dark:text-white">
                          Title
                        </h5>
                      </td>
                      <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                        <input
                          type="text"
                          {...register("title", {
                            required: true,
                          })}
                          defaultValue={item?.title}
                          placeholder="Enter title"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.title && (
                          <span className="font-medium text-red ">
                            This field is required
                          </span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex w-full justify-end gap-4 px-4 text-center">
                  <Link
                    href={`${url}`}
                    className="inline-flex w-26 items-center justify-center rounded-md border border-primary p-2 text-center font-medium text-primary hover:bg-opacity-90 "
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="flex w-26 justify-center rounded bg-primary p-2 font-medium text-gray hover:bg-opacity-90"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          ))}
      </div>
      <div className="my-5 text-right">
        {isOpen ? (
          <AlertModal>
            <div className="flex items-center justify-center gap-2 mb-3 mt-2 text-xl text-green-600">
              <FaRegCheckCircle className="text-xl" />{" "}
              <div className="">Saved successfully</div>
            </div>
            <div className="flex w-full items-center justify-center gap-4">
              <button
                onClick={closeModal}
                className="rounded-md bg-black px-4 py-1 text-white"
              >
                Ok
              </button>
            </div>
          </AlertModal>
        ) : (
          ""
        )}
        {createError ? (
          <AlertModal>
            <div className="flex items-center justify-center gap-2 mb-3 mt-2 text-xl text-red">
              <LuAlertCircle className="text-xl" />{" "}
              <div className="">Not saved!!</div>
            </div>
            <div className="flex w-full items-center justify-center gap-4">
              <button
                onClick={closeError}
                className="rounded-md bg-black px-4 py-1 text-white"
              >
                Ok
              </button>
            </div>
          </AlertModal>
        ) : (
          ""
        )}
        {loading ? <Loader /> : ""}
      </div>
    </div>
  );
};

export default PurposesUpdate;


import { TiStarFullOutline } from "react-icons/ti";
const getStarRating2 = (number: number) => {
  if (number === 1) {
    return (
      <div className={`flex justify-center text-center `}>
        {" "}
        <TiStarFullOutline className="text-[#FA423A]" />{" "}
        <TiStarFullOutline className="text-[#DBDBDB]" />{" "}
        <TiStarFullOutline className="text-[#DBDBDB]" />{" "}
        <TiStarFullOutline className="text-[#DBDBDB]" />{" "}
        <TiStarFullOutline className="text-[#DBDBDB]" />
      </div>
    );
  }
  if (number === 2) {
    return (
      <div className={`flex justify-center text-center `}>
        {" "}
        <TiStarFullOutline className="text-[#FA423A]" />{" "}
        <TiStarFullOutline className="text-[#FA423A]" />{" "}
        <TiStarFullOutline className="text-[#DBDBDB]" />{" "}
        <TiStarFullOutline className="text-[#DBDBDB]" />{" "}
        <TiStarFullOutline className="text-[#DBDBDB]" />
      </div>
    );
  }
  if (number === 3) {
    return (
      <div className={`flex justify-center text-center `}>
        {" "}
        <TiStarFullOutline className="text-[#FA423A]" />{" "}
        <TiStarFullOutline className="text-[#FA423A]" />{" "}
        <TiStarFullOutline className="text-[#FA423A]" />{" "}
        <TiStarFullOutline className="text-[#DBDBDB]" />{" "}
        <TiStarFullOutline className="text-[#DBDBDB]" />
      </div>
    );
  }
  if (number === 4) {
    return (
      <div className={`flex justify-center text-center `}>
        {" "}
        <TiStarFullOutline className="text-[#FA423A]" />{" "}
        <TiStarFullOutline className="text-[#FA423A]" />{" "}
        <TiStarFullOutline className="text-[#FA423A]" />{" "}
        <TiStarFullOutline className="text-[#FA423A]" />{" "}
        <TiStarFullOutline className="text-[#DBDBDB]" />
      </div>
    );
  }
  if (number === 5) {
    return (
      <div className={`flex justify-center text-center `}>
        {" "}
        <TiStarFullOutline className="text-[#FA423A]" />{" "}
        <TiStarFullOutline className="text-[#FA423A]" />{" "}
        <TiStarFullOutline className="text-[#FA423A]" />{" "}
        <TiStarFullOutline className="text-[#FA423A]" />{" "}
        <TiStarFullOutline className="text-[#FA423A]" />
      </div>
    );
  }
};

export default getStarRating2;

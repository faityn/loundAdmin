import { FaStar } from "react-icons/fa6";
const getStarRating = (number: number) => {
  if (number === 1) {
    return (
      <div className={`flex justify-center text-center `}>
        {" "}
        <FaStar className="text-[#FA423A]" />{" "}
        <FaStar className="text-[#DBDBDB]" />{" "}
        <FaStar className="text-[#DBDBDB]" />{" "}
        <FaStar className="text-[#DBDBDB]" />{" "}
        <FaStar className="text-[#DBDBDB]" />
      </div>
    );
  }
  if (number === 2) {
    return (
      <div className={`flex justify-center text-center `}>
        {" "}
        <FaStar className="text-[#FA423A]" />{" "}
        <FaStar className="text-[#FA423A]" />{" "}
        <FaStar className="text-[#DBDBDB]" />{" "}
        <FaStar className="text-[#DBDBDB]" />{" "}
        <FaStar className="text-[#DBDBDB]" />
      </div>
    );
  }
  if (number === 3) {
    return (
      <div className={`flex justify-center text-center `}>
        {" "}
        <FaStar className="text-[#FA423A]" />{" "}
        <FaStar className="text-[#FA423A]" />{" "}
        <FaStar className="text-[#FA423A]" />{" "}
        <FaStar className="text-[#DBDBDB]" />{" "}
        <FaStar className="text-[#DBDBDB]" />
      </div>
    );
  }
  if (number === 4) {
    return (
      <div className={`flex justify-center text-center `}>
        {" "}
        <FaStar className="text-[#FA423A]" />{" "}
        <FaStar className="text-[#FA423A]" />{" "}
        <FaStar className="text-[#FA423A]" />{" "}
        <FaStar className="text-[#FA423A]" />{" "}
        <FaStar className="text-[#DBDBDB]" />
      </div>
    );
  }
  if (number === 5) {
    return (
      <div className={`flex justify-center text-center `}>
        {" "}
        <FaStar className="text-[#FA423A]" />{" "}
        <FaStar className="text-[#FA423A]" />{" "}
        <FaStar className="text-[#FA423A]" />{" "}
        <FaStar className="text-[#FA423A]" />{" "}
        <FaStar className="text-[#FA423A]" />
      </div>
    );
  }
};

export default getStarRating;

import { MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md";

const getStarRating = (number: number) => {
  if (number === 1) {
    return (
      <div className={`flex justify-center text-center `}>
        {" "}
        <MdOutlineStarPurple500 className="text-yellow-500" />{" "}
        <MdOutlineStarOutline className="text-yellow-500" />{" "}
        <MdOutlineStarOutline className="text-yellow-500" />{" "}
        <MdOutlineStarOutline className="text-yellow-500" />{" "}
        <MdOutlineStarOutline className="text-yellow-500" />
      </div>
    );
  }
  if (number === 2) {
    return (
      <div className={`flex justify-center text-center `}>
        {" "}
        <MdOutlineStarPurple500 className="text-yellow-500" />{" "}
        <MdOutlineStarPurple500 className="text-yellow-500" />{" "}
        <MdOutlineStarOutline className="text-yellow-500" />{" "}
        <MdOutlineStarOutline className="text-yellow-500" />{" "}
        <MdOutlineStarOutline className="text-yellow-500" />
      </div>
    );
  }
  if (number === 3) {
    return (
      <div className={`flex justify-center text-center `}>
        {" "}
        <MdOutlineStarPurple500 className="text-yellow-500" />{" "}
        <MdOutlineStarPurple500 className="text-yellow-500" />{" "}
        <MdOutlineStarPurple500 className="text-yellow-500" />{" "}
        <MdOutlineStarOutline className="text-yellow-500" />{" "}
        <MdOutlineStarOutline className="text-yellow-500" />
      </div>
    );
  }
  if (number === 4) {
    return (
      <div className={`flex justify-center text-center `}>
        {" "}
        <MdOutlineStarPurple500 className="text-yellow-500" />{" "}
        <MdOutlineStarPurple500 className="text-yellow-500" />{" "}
        <MdOutlineStarPurple500 className="text-yellow-500" />{" "}
        <MdOutlineStarPurple500 className="text-yellow-500" />{" "}
        <MdOutlineStarOutline className="text-yellow-500" />
      </div>
    );
  }
  if (number === 5) {
    return (
      <div className={`flex justify-center text-center `}>
        {" "}
        <MdOutlineStarPurple500 className="text-yellow-500" />{" "}
        <MdOutlineStarPurple500 className="text-yellow-500" />{" "}
        <MdOutlineStarPurple500 className="text-yellow-500" />{" "}
        <MdOutlineStarPurple500 className="text-yellow-500" />{" "}
        <MdOutlineStarPurple500 className="text-yellow-500" />
      </div>
    );
  }
};

export default getStarRating;

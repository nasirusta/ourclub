import { BsCalendarCheck } from "react-icons/bs";

const ClubLine = ({ data }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(data.created);

  return (
    <div className="clubLine">
      <div className="name">
        <h1>{data.name}</h1>
      </div>
      <div className="clubUrl">@{data.clubURL}</div>
      <div className="createDate">
        <span>{`${date.getDate()} ${
          months[date.getMonth()]
        } ${date.getFullYear()}`}</span>
        <span>
          <BsCalendarCheck />
        </span>
      </div>
    </div>
  );
};

export default ClubLine;

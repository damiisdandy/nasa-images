import { FC, InputHTMLAttributes } from "react";
import { BsCalendar } from "react-icons/bs";
import { RxDividerVertical } from "react-icons/rx";

// https://geoawesomeness.com/eo-hub/70-years-ago-first-image-earth-taken-spac
const earliestYear = 1946;
const currentYear = new Date().getFullYear();

type YearInputProps = InputHTMLAttributes<HTMLInputElement> & {};

const YearInput: FC<YearInputProps> = ({ ...rest }) => {
  return (
    <input
      className="bg-transparent w-full min-w-[theme(spacing.16)] placeholder:text-placeholder-light outline-none border-none"
      type="number"
      min={earliestYear}
      max={currentYear}
      step="1"
      {...rest}
    />
  );
};

const DateRange = () => {
  return (
    <div className="flex w-full px-3 py-1.5 gap-4 rounded-lg overflow-hidden bg-dark-300 items-center">
      <span>
        <BsCalendar />
      </span>
      <div className="flex w-full items-center gap-2">
        <YearInput placeholder="from" />
        <span>|</span>
        <YearInput placeholder="to" />
      </div>
    </div>
  );
};

export default DateRange;

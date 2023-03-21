import { currentYear, earliestYear } from "@/config";
import { ChangeEventHandler, FC, InputHTMLAttributes } from "react";
import { BsCalendar } from "react-icons/bs";

type DateRangeProps = {
  endYear: string;
  startYear: string;
  onEndYearChange: ChangeEventHandler<HTMLInputElement>;
  onStartYearChange: ChangeEventHandler<HTMLInputElement>;
};

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

const DateRange: FC<DateRangeProps> = ({
  endYear,
  onEndYearChange,
  startYear,
  onStartYearChange,
}) => {
  return (
    <div className="flex w-full px-3 py-1.5 gap-4 rounded-lg overflow-hidden bg-dark-300 items-center">
      <span>
        <BsCalendar />
      </span>
      <div className="flex w-full items-center gap-2">
        <YearInput
          value={startYear}
          onChange={onStartYearChange}
          placeholder="from"
        />
        <span className="text-[#aaa]">|</span>
        <YearInput
          value={endYear}
          onChange={onEndYearChange}
          placeholder="to"
        />
      </div>
    </div>
  );
};

export default DateRange;

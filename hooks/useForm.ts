import { currentYear, earliestYear } from "@/config";
import { ChangeEventHandler, useState } from "react";

export default function useForm() {
  const [query, setQuery] = useState<string>("");
  const [startYear, setStartYear] = useState<string>("");
  const [endYear, setEndYear] = useState<string>("");
  // enable `useQuery`
  const [searchEnabled, setSearchEnabled] = useState(false);

  const enableSearch = () => {
    setSearchEnabled(true);
  }

  const disableSearch = () => {
    setSearchEnabled(false);
  }

  const onQueryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value);
    disableSearch();
  }

  const onStartYearChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setStartYear(e.target.value);
    disableSearch();

  }

  const onEndYearChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEndYear(e.target.value);
    disableSearch();
  }

  const validate = (): string[] => {
    const errorMessages = [];
    if (query.length < 3) errorMessages.push("Query should have a minimum of 3 characters")
    if (startYear && Number(startYear) < earliestYear) errorMessages.push(`Earliest year you can go for is ${earliestYear}`)
    if (endYear && Number(endYear) > currentYear) errorMessages.push(`End Year cannot be after ${currentYear}`)
    if ((startYear && endYear) && Number(startYear) > Number(endYear)) errorMessages.push('Start year cannot be after End year')

    return errorMessages;
  }

  const reset = () => {
    setQuery("");
    setEndYear("");
    setStartYear("")
  }


  return {
    query,
    startYear,
    endYear,
    onQueryChange,
    onEndYearChange,
    onStartYearChange,
    validate,
    reset,
    searchEnabled,
    enableSearch,
    disableSearch,
  }
}
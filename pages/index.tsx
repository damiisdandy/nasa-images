import DateRange from "@/components/date-range";
import SearchBar from "@/components/search-bar";
import useFetch, { UseFetchProps } from "@/hooks/useFetch";
import useForm from "@/hooks/useForm";
import { FormEventHandler, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type FormFields = Omit<UseFetchProps, "enabled">;

export default function Home() {
  const {
    query,
    startYear,
    endYear,
    onEndYearChange,
    onStartYearChange,
    onQueryChange,
    validate,
    searchEnabled,
    enableSearch,
  } = useForm();

  const { data, isLoading, error } = useFetch({
    query,
    startYear,
    endYear,
    enabled: searchEnabled,
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const errors = validate();
    if (errors.length) {
      console.log(errors);
      toast.error(
        errors.reduce((a, b, index) => a + (index !== 0 ? " and " : "") + b, "")
      );
      return;
    }
    enableSearch();
  };

  return (
    <div className="mt-4">
      <form
        onSubmit={onSubmit}
        className="flex md:flex-row gap-3 flex-col items-center md:items-stretch justify-center w-full md:px-5"
      >
        <div className="w-[95%]">
          <SearchBar value={query} onChange={onQueryChange} />
        </div>
        <div className="flex w-[95%] items-stretch gap-5">
          <DateRange
            endYear={endYear}
            onEndYearChange={onEndYearChange}
            startYear={startYear}
            onStartYearChange={onStartYearChange}
          />
          <button type="submit" className="px-5 py-1 bg-blue-600 rounded-lg">
            Search
          </button>
        </div>
      </form>
      {!data ? (
        <div className="flex items-center justify-center h-[70vh]">
          {!searchEnabled ? (
            <p className="text-[#888]">
              You search results will display here :)
            </p>
          ) : isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error</p>
          ) : null}
        </div>
      ) : (
        JSON.stringify(data)
      )}
    </div>
  );
}

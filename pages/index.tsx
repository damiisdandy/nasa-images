import DateRange from "@/components/date-range";
import SearchBar from "@/components/search-bar";
import useFetch, { UseFetchProps } from "@/hooks/useFetch";
import useForm from "@/hooks/useForm";
import { FormEventHandler } from "react";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "react-hot-toast";
import Card from "@/components/card";

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

  const { data, isLoading, isFetching, error } = useFetch({
    query,
    startYear,
    endYear,
    enabled: searchEnabled,
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const errors = validate();
    if (errors.length) {
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
      {isLoading || isFetching ? (
        <div className="flex items-center justify-center h-[70vh]">
          <p className="text-[50px] spin">
            <ImSpinner8 />
          </p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-[70vh]">
          <p className="text-center px-4 font-bold text-red-400">
            Error fetching images :(
          </p>
        </div>
      ) : (
        data &&
        (data.collection.items.length === 0 ? (
          <div className="flex items-center justify-center h-[70vh]">
            <p className="text-[#888] text-center px-4">
              Can&apos;t find anythign results for query {query}
            </p>
          </div>
        ) : (
          <div className="mt-5">
            <p className="text-right text-[#888] px-4">
              Displaying {data.collection.items.length} of{" "}
              {data.collection.metadata.total_hits}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-4 md:gap-6">
              {data.collection.items.map((item) => (
                <Card key={item.href} {...item} />
              ))}
            </div>
          </div>
        ))
      )}
      {!searchEnabled && !data && (
        <div className="flex items-center justify-center h-[70vh]">
          <p className="text-[#888] text-center px-4">
            Your search results will display here :)
          </p>
        </div>
      )}
    </div>
  );
}

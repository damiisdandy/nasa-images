import DateRange from "@/components/date-range";
import SearchBar from "@/components/search-bar";
import useFetch from "@/hooks/useFetch";
import { APIRoot } from "@/types";

export default function Home() {
  const { data, isLoading, error } = useFetch({
    query: "Apollo 11",
    enabled: true,
    startYear: 2012,
    endYear: 2023,
  });

  console.log(data);
  return (
    <div className="mt-4">
      <form className="flex md:flex-row gap-3 flex-col items-center md:items-stretch justify-center w-full md:px-5">
        <div className="w-[95%]">
          <SearchBar />
        </div>
        <div className="flex w-[95%] items-stretch gap-5">
          <DateRange />
          <button type="submit" className="px-5 py-1 bg-blue-600 rounded-lg">
            Search
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-[#888]">You search results will display here :)</p>
      </div>
    </div>
  );
}

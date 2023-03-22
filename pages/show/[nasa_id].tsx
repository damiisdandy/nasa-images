import useFetchMediaById from "@/hooks/useFetchMediaById";
import { useRouter } from "next/router";
import { ImSpinner8 } from "react-icons/im";
import Image from "next/image";
import dayjs from "dayjs";
import useFetchLargeImage from "@/hooks/useFetchLargeImage";
import { useEffect } from "react";

export default function Show() {
  const { query, back } = useRouter();
  const { nasa_id } = query;

  const { isLoading, data, error } = useFetchMediaById({
    id: nasa_id as string,
    // only start fetching after query parameter is gotten
    enabled: nasa_id !== undefined,
  });

  const {
    isLoading: isLoadingLargeImage,
    isFetching: isFetchLargeImage,
    data: largeImage,
    error: largeImageError,
    refetch,
  } = useFetchLargeImage({
    url: data?.collection?.items[0].href!,
    // fetch high quality image after media data is fetched
    enabled: data !== undefined,
  });

  useEffect(() => {
    if (data) {
      // force fetch high quality image (ignore cache! fixes issue of high quality image not matching media detials on initial load)
      refetch();
    }
  }, [data, refetch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <p className="text-[50px] spin">
          <ImSpinner8 />
        </p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-center px-4 font-bold text-red-400">
          Error fetching media
        </p>
      </div>
    );
  }
  if (data) {
    if (data.collection.items.length === 0) {
      return (
        <div className="flex items-center justify-center h-[70vh]">
          <p className="text-[#888] text-center px-4">
            Media with that ID doesn&apos;t exist
          </p>
        </div>
      );
    }
    const content = data.collection.items[0];
    return (
      <div className="mt-4 md:mt-8 px-4 md:px-12">
        <button
          onClick={back}
          className="bg-dark-300 font-bold px-5 mb-2 py-1 rounded-lg"
        >
          Back
        </button>
        <h1 className="text-xl md:text-4xl font-bold text-center capitalize mb-6 md:mb-12">
          {content.data[0].title}
        </h1>
        <div className="flex gap-4 flex-col md:flex-row md:items-start items-center justify-center">
          <div className="relative object-cover w-full max-w-[400px] h-80 overflow-hidden">
            <Image
              className="rounded-lg h-[inherit] w-full object-cover"
              src={content.links[0].href}
              alt={content.data[0].title}
              width={400}
              height={400}
            />
          </div>
          <div className="space-y-3 md:max-w-[60%]">
            <p className="w-full">{content.data[0].description}</p>
            <p className="font-bold">
              Location:{" "}
              <span className="font-normal text-[#aaa]">
                {content.data[0].location || "unknown"}
              </span>
            </p>
            <p className="font-bold">
              Photographer:{" "}
              <span className="font-normal text-[#aaa]">
                {content.data[0].photographer || "unknown"}
              </span>
            </p>
            <p className="font-bold">
              Data:{" "}
              <span className="font-normal text-[#aaa]">
                {dayjs(content.data[0].date_created).format(
                  "MMMM D, YYYY h:mm A"
                ) || "unknown"}
              </span>
            </p>
            <p className="font-bold flex items-start gap-2">
              Keywords:{" "}
              <span className="flex gap-2 items-center flex-wrap font-normal">
                {content.data[0].keywords.map((keyword) => (
                  <span
                    className="block bg-[#444] px-2 py-0.5 rounded-md text-sm font-bold"
                    key={keyword}
                  >
                    {keyword}
                  </span>
                ))}
              </span>
            </p>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-xl md:text-4xl font-bold text-center capitalize">
            Gallery
          </h2>
          <p className="text-center  mb-6 md:mb-12">
            High Quality Image is displayed below
          </p>
          {isLoadingLargeImage || isFetchLargeImage ? (
            <p className="text-center">Fetching Gallery ...</p>
          ) : largeImageError ? (
            <p className="text-center">Error Fetching Large Image</p>
          ) : (
            <div className="mx-auto relative object-cover w-full overflow-hidden">
              <Image
                className="rounded-lg  w-full object-cover"
                src={largeImage![1]}
                alt={content.data[0].title}
                width={400}
                height={400}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

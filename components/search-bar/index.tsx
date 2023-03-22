import { FC, InputHTMLAttributes } from "react";
import { BsSearch } from "react-icons/bs";

type Props = InputHTMLAttributes<HTMLInputElement> & {};

const SearchBar: FC<Props> = ({ ...rest }) => {
  return (
    <div className="w-full flex items-center gap-4 bg-dark-300 px-4 py-2 rounded-lg  overflow-hidden">
      <span>
        <BsSearch />
      </span>
      <input
        data-testid="search-input"
        className="bg-transparent w-full placeholder:text-placeholder-light outline-none border-none"
        placeholder="e.g Apollo 11"
        minLength={3}
        {...rest}
      />
    </div>
  );
};

export default SearchBar;

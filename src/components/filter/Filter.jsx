import { useContext } from "react";
import myContext from "../../context/data/myContext";

function Filter() {
  const { mode, searchkey, setSearchkey } = useContext(myContext);

  const isDark = mode === "dark";

  const handleSearch = (event) => {
    setSearchkey(event.target.value);
  };

  const clearSearch = () => {
    setSearchkey("");
  };

  return (
    <section>
      <div className="container mx-auto mt-5 px-4">
        <div
          className="rounded-lg border border-gray-200 bg-gray-100 p-5 drop-shadow-xl"
          style={{
            backgroundColor: isDark ? "#282c34" : "",
            color: isDark ? "white" : "",
          }}
        >
          <div className="relative">
            <div className="absolute left-0 top-0 ml-3 flex h-full items-center">
              <svg
                className="h-4 w-4 text-gray-500"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z" />
              </svg>
            </div>

            <input
              type="search"
              name="searchkey"
              id="searchkey"
              value={searchkey || ""}
              onChange={handleSearch}
              placeholder="Search products by name or category..."
              autoComplete="off"
              className="w-full rounded-md border-transparent bg-white px-10 py-3 pr-12 text-sm outline-none focus:ring-2 focus:ring-pink-500"
              style={{
                backgroundColor: isDark ? "rgb(64 66 70)" : "",
                color: isDark ? "white" : "",
              }}
            />

            {searchkey && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Filter;

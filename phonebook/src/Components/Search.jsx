const Search = ({ search, handleSearch }) => {
  return (
    <div>
      filter shown with <input value={search} onChange={handleSearch} />
    </div>
  );
};

export default Search;

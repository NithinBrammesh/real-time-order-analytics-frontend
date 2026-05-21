import { FaFilter, FaSearch } from "react-icons/fa";

export default function FilterBar({
  city,
  setCity,
  name,
  setName,
  limit,
  setLimit
}) {
  return (
    <div className="filterBar">

      <FaFilter />

      <label>City:</label>

      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e)=>setCity(e.target.value)}
      />

      {/* NAME SEARCH */}
      <FaSearch />

      <input
        type="text"
        placeholder="Search buyer name..."
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      {/* LIMIT */}
      <label>Limit:</label>

      <input
        type="number"
        placeholder="10"
        value={limit}
        onChange={(e)=>setLimit(e.target.value)}
      />

    </div>
  );
}
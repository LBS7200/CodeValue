import React, { useState, ChangeEvent } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 20px",
  },
  text: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  searchInput: {
    padding: "5px",
    marginRight: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    minWidth: "200px",
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#45a049",
    },
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
  },
  sortedContainer: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    position: "relative",
  },
  sortSelect: {
    padding: "5px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
    top: "100%",
  },
});

interface ToolbarProps {
  onAdd: () => void;
  onSearch: (query: string) => void;
  onSort: (option: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onAdd, onSearch, onSort }) => {
  const classes = useStyles();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("name");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
    onSort(event.target.value);
  };

  return (
    <div className={classes.toolbar}>
      <button className={classes.addButton} onClick={onAdd}>
        Add
      </button>
      <input
        type="text"
        className={classes.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className={classes.sortedContainer}>
        <text>Sort by:</text>
        <select
          className={classes.sortSelect}
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="name">Sort by Name</option>
          <option value="recent">Sort by Recently Added</option>
        </select>
      </div>
    </div>
  );
};

export default Toolbar;

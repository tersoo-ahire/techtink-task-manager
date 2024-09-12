import { TextField } from "@mui/material";

const SearchForm = ({ searchQuery, onSearchChange }) => {
  return (
    <TextField
      label="Search completed tasks"
      variant="outlined"
      fullWidth
      value={searchQuery}
      onChange={onSearchChange}
      style={{ backgroundColor: "white" }}
    />
  );
};

export default SearchForm;

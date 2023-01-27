import React from "react";
import { styled, alpha } from '@mui/material/styles';
import { InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";




const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  function SearchAppBar() {
    const [searchParams, setSearchParams] = useSearchParams();
    let query = searchParams.get("query");

    const handleSubmit = (event) => {
      event.preventDefault();
      let formData = new FormData(event.currentTarget);
      let query = formData.get("query");
      setSearchParams({ query: query });
    };

    return (
      <Box component="form" onSubmit={handleSubmit}>
        <Search>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
            name="query"
            defaultValue={query ?? undefined}
            placeholder="Search...."
            inputProps={{ "aria-label": "search" }}
            />
        </Search>
      </Box>
    );
  }

  export default SearchAppBar;
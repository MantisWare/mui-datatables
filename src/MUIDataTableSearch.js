import React from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import Grow from "material-ui/transitions/Grow";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import SearchIcon from "material-ui-icons/Search";
import IconButton from "material-ui/IconButton";
import ClearIcon from "material-ui-icons/Clear";
import FilterIcon from "material-ui-icons/FilterList";
import { withStyles } from "material-ui/styles";

const defaultSearchStyles = {
  main: {
    display: "flex",
    flex: "1 0 auto",
  },
  searchIcon: {
    marginTop: "10px",
    marginRight: "8px",
  },
  searchText: {
    flex: "0.8 0",
  },
  clearIcon: {
    "&:hover": {
      color: "#FF0000",
    },
  },
};

class MUIDataTableSearch extends React.Component {
  handleTextChange = event => {
    const { onSearchChange } = this.props.options;

    if (onSearchChange) {
      onSearchChange(event.target.value);
    }

    this.props.onSearch(event.target.value);
  };

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown, false);
  }

  onKeyDown = event => {
    if (event.keyCode == 27) {
      this.props.onHide();
    }
  };

  render() {
    const { classes, onHide, onSearch, options } = this.props;

    return (
      <Grow appear in={true} timeout={300}>
        <div className={classes.main} ref={el => (this.rootRef = el)}>
          <SearchIcon className={classes.searchIcon} />
          <TextField
            className={classes.searchText}
            autoFocus={true}
            InputProps={{
              "aria-label": "Search Table",
            }}
            onChange={this.handleTextChange}
            fullWidth={true}
            inputRef={el => (this.searchField = el)}
          />
          <IconButton className={classes.clearIcon} onClick={onHide}>
            <ClearIcon />
          </IconButton>
        </div>
      </Grow>
    );
  }
}

export default withStyles(defaultSearchStyles, { name: "MUIDataTableSearch" })(MUIDataTableSearch);

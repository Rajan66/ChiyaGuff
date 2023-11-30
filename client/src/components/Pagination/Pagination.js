import React, { useEffect } from "react";
import { Button, Link, Pagination, PaginationItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../actions/posts";

import useStyles from "./styles";

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      console.log(page);
      dispatch(getPosts(page));
    }
  }, [page]);

  return (
    <>
      <Pagination
        classes={{ ul: classes.ul }}
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
        )}
      />
      <Button component={Link} to='/auth'>Hie</Button>
      </>
      );
};

      export default Paginate;

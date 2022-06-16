import * as React from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import "./TodoSkeleton.scss";

export interface TodoSkeletonProps {}

export default function TodoSkeleton(props: TodoSkeletonProps) {
  return (
    <Box textAlign="center" mt={5} id="TodoSkeleton">
      <Grid container padding={2}>
        <Grid item sm={4} xs={12}>
          <Box display="flex" justifyContent="center">
            <Skeleton variant="rectangular" width={150} height={150} />
          </Box>
        </Grid>
        <Grid item sm={8} xs={12}>
          <Box className="title">
            <Skeleton variant="rectangular" height={60} />
            <Skeleton
              variant="text"
              width={200}
              height={40}
              style={{ marginTop: "10px" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}


import { Box, Chip, Grid, Stack, Typography } from "@mui/material";


const RationCard = ({
  percentage,
  title,
  count,
  msg,
}: {
  msg: string;
  percentage: number;
  count: number;
  title: string;
}) => {
  return (
    <Box
      sx={{
        p: 2.25,
        backgroundColor: "white",
      
        maxWidth: 300,
        borderRadius: 4,
              textAlign: "center",
        boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'
      }}
    >
      <Stack spacing={0.5}>
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
        <Grid container alignItems="center" textAlign={"center"}>
          <Grid item>
            <Typography variant="h4" color="inherit" sx={{ color: "black" }}>
              {count}
            </Typography>
          </Grid>

          <Grid item>
            <Chip
              variant="filled"
              color={"success"}
              label={`${percentage}%`}
              sx={{ ml: 1.25, pl: 1 }}
              size="small"
            />
          </Grid>
        </Grid>
        <Typography sx={{ fontSize: 18, color: "gray" }} textAlign={'left'}>{msg}</Typography>
      </Stack>
    </Box>
  );
};

export default RationCard;

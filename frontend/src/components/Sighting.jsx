import React from "react";
import { Typography, Box } from "@mui/material";
import formatRelative from "date-fns/formatRelative";
import subDays from "date-fns/subDays";
import formatDistance from "date-fns/formatDistance";
import parseISO from "date-fns/parseISO";

const Sighting = ({ sighting, comments, city, country }) => {
  const relativeDate = formatDistance(new Date(sighting.datetime), new Date(), {
    addSuffix: true,
  });

  return (
    <Box sx={{ width: 320 }}>
      <Typography color="primary" fontWeight={500} fontSize={14}>
        Latitude:
      </Typography>
      <Typography color="primary" fontSize={14}>
        {sighting.latitude}
      </Typography>
      <Typography color="primary" fontWeight={500} fontSize={14}>
        Longitude:
      </Typography>
      <Typography color="primary" mb={2} fontSize={14}>
        {sighting.longitude}
      </Typography>
      <Typography textAlign="right" color="primary" fontWeight={500}>
        {city.toUpperCase()} - {country.toUpperCase()}
      </Typography>
      <Typography textAlign="right" mb={3} color="primary" fontSize={14}>
        {relativeDate}
      </Typography>
      <Typography
        textAlign="center"
        mb={2}
        color="primary"
        // fontWeight={500}
        fontSize={16}
      >
        {comments}...[REDACTED]
      </Typography>
    </Box>
  );
};

export default Sighting;

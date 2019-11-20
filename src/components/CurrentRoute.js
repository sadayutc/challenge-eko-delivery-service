import React from 'react';
import { Typography, Box, Divider } from '@material-ui/core';
import { ArrowRightAlt as ArrowRightIcon } from '@material-ui/icons';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';
import AvatarWithColor from './AvatarWithColor';

const StyledBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1, 0.5),
}));

const CurrentRoute = ({ routesData }) => {
  return (
    <>
      <Typography gutterBottom variant="h5">
        <strong>Available routes</strong>
      </Typography>
      {!routesData ? (
        <Typography paragraph>No data, Please set available routes.</Typography>
      ) : (
        Object.keys(routesData).map(routeKey => (
          <React.Fragment key={`${routeKey}`}>
            <Box display="flex" flexDirection="row" flexWrap="wrap">
              {Object.keys(routesData[routeKey]).map(subRouteKey => (
                <StyledBox
                  alignItems="center"
                  display="flex"
                  key={`${subRouteKey}`}
                >
                  <AvatarWithColor character={routeKey} />
                  <ArrowRightIcon />
                  {routesData[routeKey][subRouteKey]}
                  <ArrowRightIcon />
                  <AvatarWithColor character={subRouteKey} />
                </StyledBox>
              ))}
            </Box>
            <Divider />
          </React.Fragment>
        ))
      )}
    </>
  );
};

CurrentRoute.propTypes = {
  routesData: PropTypes.object,
};

CurrentRoute.defaultProps = {
  routesData: null,
};

export default CurrentRoute;

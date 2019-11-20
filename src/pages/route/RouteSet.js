import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { useLayout } from '../../contexts/layoutContext';
import { useRoute } from '../../contexts/routeContext';
import CurrentRoute from '../../components/CurrentRoute';

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  margin: theme.spacing(2, 0),
}));

const StyledSubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 0, 0, 1),
}));

const RouteSet = () => {
  const [inputRoutes, setInputRoutes] = useState(
    'AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1',
  );
  const {
    state: { routesData },
    setRoutesData,
  } = useRoute();
  const { setHeaderTitle } = useLayout();

  useEffect(() => {
    setHeaderTitle('Set routes');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormSubmit = event => {
    event.preventDefault();

    // TODO: Validation
    if (inputRoutes.length > 0) {
      const routeArray = inputRoutes.replace(/\s*,\s*/g, ',').split(',');
      const sortedRouteArray = [...routeArray].sort();
      const newRoutesData = {};

      sortedRouteArray.forEach(route => {
        const [startNode, endNode, ...edge] = route;
        newRoutesData[startNode] = {
          ...newRoutesData[startNode],
          [endNode]: parseInt(edge.join(''), 10),
        };
      });

      setInputRoutes('');
      setRoutesData(newRoutesData);
    }
  };

  return (
    <>
      <Typography gutterBottom variant="h5">
        <strong>Set available routes</strong>
      </Typography>
      <Typography paragraph>
        Please set available routes in comma-separated format.
        <br />
        (e.g. &quot;AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1&quot;)
      </Typography>
      <StyledForm noValidate onSubmit={onFormSubmit}>
        <TextField
          id="routes"
          label="Routes"
          variant="outlined"
          fullWidth
          onChange={({ target: { value } }) => setInputRoutes(value.toUpperCase().trim())}
          value={inputRoutes}
          InputProps={{
            endAdornment: (
              <StyledSubmitButton
                type="submit"
                color="primary"
                size="large"
                variant="contained"
              >
                Set
              </StyledSubmitButton>
            ),
          }}
        />
      </StyledForm>
      <CurrentRoute routesData={routesData} />
    </>
  );
};

export default RouteSet;

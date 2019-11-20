import React, { useEffect } from 'react';
import { Typography, TextField, Button, Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import useForm from 'react-hook-form';
import { useLayout } from '../../contexts/layoutContext';
import { useRoute } from '../../contexts/routeContext';
import CurrentRoute from '../../components/CurrentRoute';

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(2, 0),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(0, 1, 1.5, 0),
}));

const StyledSubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1, 0, 0, 0),
}));

const RouteSet = () => {
  const {
    state: { routesData },
    setRoutesData,
  } = useRoute();
  const { setHeaderTitle } = useLayout();
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    setHeaderTitle('Set routes');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormSubmit = ({ routes }, event) => {
    const routeArray = routes.replace(/\s*,\s*/g, ',').split(',');
    const sortedRouteArray = [...routeArray].sort();
    const newRoutesData = {};

    sortedRouteArray.forEach(route => {
      const [startNode, endNode, ...edge] = route;
      newRoutesData[startNode] = {
        ...newRoutesData[startNode],
        [endNode]: parseInt(edge.join(''), 10),
      };
    });

    setRoutesData(newRoutesData);

    event.target.reset();
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
      <StyledForm noValidate onSubmit={handleSubmit(onFormSubmit)}>
        <Box>
          <StyledTextField
            id="routes"
            name="routes"
            label="Routes"
            variant="outlined"
            fullWidth
            margin="dense"
            inputRef={register({
              required: 'Routes are required.',
              pattern: {
                value: /^[A-Z]{2}\d+((,|, )([A-Z]{2}\d+))*$/,
                message: `Routes must follow comma-separated format ("AB1, AC4, AD10").`,
              },
            })}
            error={!!errors.routes}
            helperText={errors.routes ? errors.routes.message : null}
          />
        </Box>
        <StyledSubmitButton
          type="submit"
          color="primary"
          size="medium"
          variant="contained"
        >
          Set
        </StyledSubmitButton>
      </StyledForm>
      <CurrentRoute routesData={routesData} />
    </>
  );
};

export default RouteSet;

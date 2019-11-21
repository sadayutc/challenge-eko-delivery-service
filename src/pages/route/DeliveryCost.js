import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { ArrowRightAlt as ArrowRightIcon } from '@material-ui/icons';
import { toast } from 'react-toastify';
import useForm from 'react-hook-form';
import { useLayout } from '../../contexts/layoutContext';
import { useRoute } from '../../contexts/routeContext';
import { calculateDeliveryCost } from '../../helpers/route';
import AvatarWithColor from '../../components/AvatarWithColor';

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(2, 0),
}));

const StyledSubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1, 0, 0, 0),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(0, 1, 1.5, 0),
  width: 300,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1, 0.5),
}));

const DeliveryCost = () => {
  const [currentRoute, setCurrentRoute] = useState('');
  const [deliveryCost, setDeliveryCost] = useState(null);

  const {
    state: { routesData },
  } = useRoute();
  const { setHeaderTitle } = useLayout();
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    setHeaderTitle('Delivery cost');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormSubmit = ({ route }, event) => {
    if (routesData === null || Object.values(routesData).length === 0) {
      toast.error(
        'Please set available routes before start calculating the delivery cost.',
      );
      return;
    }

    setCurrentRoute(route);
    setDeliveryCost(calculateDeliveryCost(route, routesData));

    event.target.reset();
  };

  return (
    <>
      <Typography gutterBottom variant="h5">
        <strong>Calculate the delivery cost</strong>
      </Typography>
      <Typography paragraph>
        To calculate the delivery cost, please enter the route. (e.g.
        &quot;ABE&quot;)
      </Typography>
      <StyledForm noValidate onSubmit={handleSubmit(onFormSubmit)}>
        <Box>
          <StyledTextField
            id="route"
            name="route"
            label="Route"
            variant="outlined"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
            inputRef={register({
              required: 'Route is required.',
              minLength: {
                value: 2,
                message: 'Route must be at least 2 characters.',
              },
              pattern: {
                value: /^[A-Z]+$/,
                message: 'Route must contain only alphabets in uppercase form.',
              },
            })}
            error={!!errors.route}
            helperText={errors.route ? errors.route.message : null}
          />
        </Box>

        <StyledSubmitButton
          type="submit"
          color="primary"
          size="medium"
          variant="contained"
        >
          Calculate
        </StyledSubmitButton>
      </StyledForm>

      <Typography gutterBottom variant="h5">
        <strong>Your delivery cost</strong>
      </Typography>
      {currentRoute.length === 0 ? (
        <Typography paragraph>
          No calculation, please use above process.
        </Typography>
      ) : (
        <>
          {deliveryCost === null ? (
            <Typography paragraph>
              The delivery cost for route &quot;
              <strong>{currentRoute}</strong>
              &quot; is no such route.
            </Typography>
          ) : (
            <>
              <Typography gutterBottom>
                The delivery cost for route &quot;
                <strong>{currentRoute}</strong>
                &quot; is&nbsp;
                <strong>{deliveryCost}</strong>
              </Typography>
              <StyledBox alignItems="center" display="flex" flexWrap="wrap">
                {[...currentRoute].map((route, index, originalArray) => (
                  <React.Fragment key={`${route}_${index}`}>
                    <AvatarWithColor character={route} />
                    {routesData[route][originalArray[index + 1]] ? (
                      <>
                        <ArrowRightIcon />
                        {routesData[route][originalArray[index + 1]]}
                        <ArrowRightIcon />
                      </>
                    ) : (
                      <></>
                    )}
                  </React.Fragment>
                ))}
                <Box mx={2} fontSize={26}>
                  =
                </Box>
                <AvatarWithColor variant="rounded" character={deliveryCost} />
              </StyledBox>
            </>
          )}
        </>
      )}
    </>
  );
};

export default DeliveryCost;

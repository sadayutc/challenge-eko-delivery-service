import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { ArrowRightAlt as ArrowRightIcon } from '@material-ui/icons';
import { toast } from 'react-toastify';
import { useLayout } from '../../contexts/layoutContext';
import { useRoute } from '../../contexts/routeContext';
import { calculateDeliveryCost } from '../../helpers/route';
import AvatarWithColor from '../../components/AvatarWithColor';

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(2, 0),
}));

const StyledSubmitButton = styled(Button)(({ theme }) => ({
  // margin: theme.spacing(0, 0, 0, 1),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(0, 0.5, 0.5, 0),
}));

const StyledBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1, 0.5),
}));

const DeliveryCost = () => {
  const [inputRoute, setInputRoute] = useState('ABE');
  const [currentRoute, setCurrentRoute] = useState('');
  const [deliveryCost, setDeliveryCost] = useState(null);

  const {
    state: { routesData },
  } = useRoute();
  const { setHeaderTitle } = useLayout();

  useEffect(() => {
    setHeaderTitle('Delivery cost');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormSubmit = event => {
    event.preventDefault();

    if (routesData === null || Object.values(routesData).length === 0) {
      toast.error(
        'Please set available routes before start calculating the delivery cost.',
      );
      return;
    }

    // TODO: Validation
    if (inputRoute.length > 0) {
      setInputRoute('');
      setCurrentRoute(inputRoute);
      setDeliveryCost(calculateDeliveryCost(inputRoute, routesData));
    }
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
      <StyledForm noValidate onSubmit={onFormSubmit}>
        <Box>
          <StyledTextField
            id="route"
            label="Route"
            variant="outlined"
            onChange={({ target: { value } }) =>
              setInputRoute(value.toUpperCase().trim())
            }
            value={inputRoute}
            margin="dense"
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
          No calculation, Please use above process.
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
              <StyledBox alignItems="center" display="flex">
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

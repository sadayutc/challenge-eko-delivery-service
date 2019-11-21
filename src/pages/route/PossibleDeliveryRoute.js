import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Box, Divider } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { ArrowRightAlt as ArrowRightIcon } from '@material-ui/icons';
import { toast } from 'react-toastify';
import useForm from 'react-hook-form';
import AvatarWithColor from '../../components/AvatarWithColor';
import { useLayout } from '../../contexts/layoutContext';
import { useRoute } from '../../contexts/routeContext';
import { calculatePossibleDeliveryRoutes } from '../../helpers/route';

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(2, 0),
}));

const StyledSubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1, 0, 0, 0),
}));

const StyledBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1, 0.5),
}));

const StyledTextField = styled(({ narrow, ...rest }) => (
  <TextField {...rest} />
))(({ theme, narrow }) => ({
  margin: theme.spacing(0, 1, 1.5, 0),
  width: narrow ? 200 : 300,
}));

const PossibleDeliveryRoutes = () => {
  const [currentStartNode, setCurrentStartNode] = useState('');
  const [currentEndNode, setCurrentEndNode] = useState('');
  const [currentStop, setCurrentStop] = useState(null);
  const [possibleDeliveryRoutes, setPossibleDeliveryRoutes] = useState(null);

  const {
    state: { routesData },
  } = useRoute();
  const { setHeaderTitle } = useLayout();
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    setHeaderTitle('Possible delivery route');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormSubmit = ({ startNode, endNode, stop }, event) => {
    if (routesData === null || Object.values(routesData).length === 0) {
      toast.error(
        'Please set available routes before start calculating the possible delivery route.',
      );
      return;
    }

    const nullableStop = stop.length > 0 ? stop : null;

    setCurrentStartNode(startNode);
    setCurrentEndNode(endNode);
    setCurrentStop(nullableStop);
    setPossibleDeliveryRoutes(
      calculatePossibleDeliveryRoutes(
        startNode,
        endNode,
        nullableStop,
        routesData,
      ),
    );

    event.target.reset();
  };

  return (
    <>
      <Typography gutterBottom variant="h5">
        <strong>Calculate the possible delivery routes</strong>
      </Typography>
      <Typography paragraph>
        To calculate the number of possible delivery routes, please enter
        values.
      </Typography>
      <StyledForm noValidate onSubmit={handleSubmit(onFormSubmit)}>
        <Box>
          <StyledTextField
            id="startNode"
            name="startNode"
            label="Start node"
            variant="outlined"
            margin="dense"
            inputProps={{
              maxLength: 1,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputRef={register({
              required: 'Start node is required.',
              maxLength: {
                value: 1,
                message: 'Start node must be less than 1 characters.',
              },
              pattern: {
                value: /^[A-Z]+$/,
                message: 'Start node must contain only uppercase alphabets.',
              },
            })}
            error={!!errors.startNode}
            helperText={errors.startNode ? errors.startNode.message : null}
          />

          <StyledTextField
            id="endNode"
            name="endNode"
            label="End node"
            variant="outlined"
            margin="dense"
            inputProps={{
              maxLength: 1,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputRef={register({
              required: 'End node is required.',
              maxLength: {
                value: 1,
                message: 'End node must be less than 1 characters.',
              },
              pattern: {
                value: /^[A-Z]+$/,
                message: 'End node must contain only uppercase alphabets.',
              },
            })}
            error={!!errors.endNode}
            helperText={errors.endNode ? errors.endNode.message : null}
          />

          <StyledTextField
            id="stop"
            name="stop"
            label="Stop"
            variant="outlined"
            type="number"
            inputProps={{
              min: 1,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            margin="dense"
            narrow
            inputRef={register({
              min: {
                value: 1,
                message: 'Stop must be at least 1.',
              },
            })}
            error={!!errors.stop}
            helperText={errors.stop ? errors.stop.message : null}
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
        <strong>The number of possible delivery route</strong>
      </Typography>
      {!possibleDeliveryRoutes ? (
        <Typography paragraph>
          No calculation, please use above process.
        </Typography>
      ) : (
        <Typography paragraph>
          The number of possible delivery of route &quot;
          <strong>
            {currentStartNode}
            {currentEndNode}
          </strong>
          &quot;
          {currentStop && (
            <>
              &nbsp;with a maximum of <strong>{currentStop}</strong> stop(s)
            </>
          )}
          &nbsp;is&nbsp;
          <strong>{possibleDeliveryRoutes.length}</strong>
        </Typography>
      )}

      <Typography gutterBottom variant="h5">
        <strong>All possible delivery routes</strong>
      </Typography>

      {!possibleDeliveryRoutes ? (
        <Typography paragraph>
          No calculation, please use above process.
        </Typography>
      ) : (
        <>
          {!possibleDeliveryRoutes.length && (
            <Typography paragraph>No possible delivery routes.</Typography>
          )}
          {possibleDeliveryRoutes.map(
            ({ route: possibleDeliveryRoute, cost }) => (
              <React.Fragment key={possibleDeliveryRoute}>
                <StyledBox alignItems="center" display="flex" flexWrap="wrap">
                  {[...possibleDeliveryRoute].map(
                    (route, index, originalArray) => (
                      <React.Fragment key={`${route}_${index}`}>
                        <AvatarWithColor character={route} />
                        {routesData[route] &&
                          routesData[route][originalArray[index + 1]] && (
                            <>
                              <ArrowRightIcon />
                              {routesData[route][originalArray[index + 1]]}
                              <ArrowRightIcon />
                            </>
                          )}
                      </React.Fragment>
                    ),
                  )}
                  <Box mx={2} fontSize={26}>
                    =
                  </Box>
                  <AvatarWithColor variant="rounded" character={cost} />
                </StyledBox>
                <Divider />
              </React.Fragment>
            ),
          )}
        </>
      )}
    </>
  );
};

export default PossibleDeliveryRoutes;

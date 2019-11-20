import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Box, Divider } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { ArrowRightAlt as ArrowRightIcon } from '@material-ui/icons';
import { toast } from 'react-toastify';
import AvatarWithColor from '../../components/AvatarWithColor';
import { useLayout } from '../../contexts/layoutContext';
import { useRoute } from '../../contexts/routeContext';
import { calculatePossibleDeliveryRoutes } from '../../helpers/route';

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(2, 0),
}));

const StyledSubmitButton = styled(Button)(({ theme }) => ({
  // margin: theme.spacing(0),
}));

const StyledBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1, 0.5),
}));

const StyledTextField = styled(({ narrow, ...rest }) => (
  <TextField {...rest} />
))(({ theme, narrow }) => ({
  margin: theme.spacing(0, 0.5, 0.5, 0),
  maxWidth: narrow ? 100 : 150,
}));

const PossibleDeliveryRoutes = () => {
  const [startNode, setStartNode] = useState('E');
  const [endNode, setEndNode] = useState('D');
  const [stop, setStop] = useState(4);

  const [currentStartNode, setCurrentStartNode] = useState('');
  const [currentEndNode, setCurrentEndNode] = useState('');
  const [currentStop, setCurrentStop] = useState(null);
  const [possibleDeliveryRoutes, setPossibleDeliveryRoutes] = useState(null);

  const {
    state: { routesData },
  } = useRoute();
  const { setHeaderTitle } = useLayout();

  useEffect(() => {
    setHeaderTitle('Possible delivery route');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormSubmit = event => {
    event.preventDefault();

    if (routesData === null || Object.values(routesData).length === 0) {
      toast.error(
        'Please set available routes before start calculating the possible delivery route.',
      );
      return;
    }

    // TODO: Validation
    if(startNode && endNode && stop) {
      setCurrentStartNode(startNode);
      setCurrentEndNode(endNode);
      setCurrentStop(stop);
      setPossibleDeliveryRoutes(
        calculatePossibleDeliveryRoutes(startNode, endNode, stop, routesData),
      );

      setStartNode('');
      setEndNode('');
      setStop('');
    }
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
      <StyledForm noValidate onSubmit={onFormSubmit}>
        <Box>
          <StyledTextField
            id="startNode"
            label="Start node"
            variant="outlined"
            onChange={({ target: { value } }) =>
              setStartNode(
                value
                  .substr(0, 1)
                  .toUpperCase()
                  .trim(),
              )
            }
            margin="dense"
            value={startNode}
          />

          <StyledTextField
            id="endNode"
            label="End node"
            variant="outlined"
            onChange={({ target: { value } }) =>
              setEndNode(
                value
                  .substr(0, 1)
                  .toUpperCase()
                  .trim(),
              )
            }
            margin="dense"
            value={endNode}
          />

          <StyledTextField
            id="stop"
            label="Stop"
            variant="outlined"
            onChange={({ target: { value } }) => setStop(value < 1 ? 1 : value)}
            type="number"
            inputProps={{
              min: 1,
            }}
            value={stop}
            margin="dense"
            narrow
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
          No calculation, Please use above process.
        </Typography>
      ) : (
        <Typography paragraph>
          The number of possible delivery of route &quot;
          <strong>
            {currentStartNode}
            {currentEndNode}
          </strong>
          &quot; with a maximum of <strong>{currentStop}</strong> stops is&nbsp;
          <strong>{possibleDeliveryRoutes.length}</strong>
        </Typography>
      )}

      <Typography gutterBottom variant="h5">
        <strong>All possible delivery routes</strong>
      </Typography>

      {!possibleDeliveryRoutes ? (
        <Typography paragraph>
          No calculation, Please use above process.
        </Typography>
      ) : (
        <>
          {!possibleDeliveryRoutes.length && (
            <Typography paragraph>No possible delivery routes.</Typography>
          )}
          {possibleDeliveryRoutes.map(
            ({ route: possibleDeliveryRoute, cost }) => (
              <React.Fragment key={possibleDeliveryRoute}>
                <StyledBox alignItems="center" display="flex">
                  {[...possibleDeliveryRoute].map(
                    (route, index, originalArray) => (
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

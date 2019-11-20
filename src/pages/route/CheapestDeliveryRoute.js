import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { ArrowRightAlt as ArrowRightIcon } from '@material-ui/icons';
import { toast } from 'react-toastify';
import AvatarWithColor from '../../components/AvatarWithColor';
import { calculateCheapestDeliveryRoute } from '../../helpers/route';
import { useLayout } from '../../contexts/layoutContext';
import { useRoute } from '../../contexts/routeContext';

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(2, 0),
}));

const StyledSubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0),
}));

const StyledBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1, 0.5),
}));

const StyledTextField = styled(TextField)(({ theme, narrow }) => ({
  margin: theme.spacing(0, 0.5, 0.5, 0),
  maxWidth: narrow ? 100 : 150,
}));

const CheapestDeliveryRoute = () => {
  const [startNode, setStartNode] = useState('E');
  const [endNode, setEndNode] = useState('D');
  const [currentStartNode, setCurrentStartNode] = useState('');
  const [currentEndNode, setCurrentEndNode] = useState('');
  const [cheapestDeliveryRoute, setCheapestDeliveryRoute] = useState(null);

  const {
    state: { routesData },
  } = useRoute();
  const { setHeaderTitle } = useLayout();

  useEffect(() => {
    setHeaderTitle('Cheapest delivery route');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormSubmit = event => {
    event.preventDefault();

    if (routesData === null || Object.values(routesData).length === 0) {
      toast.error(
        'Please set available routes before start calculating the cheapest delivery route.',
      );
      return;
    }

    // TODO: Validation
    if (startNode && endNode) {
      setCurrentStartNode(startNode);
      setCurrentEndNode(endNode);
      setCheapestDeliveryRoute(
        calculateCheapestDeliveryRoute(startNode, endNode, routesData),
      );

      setStartNode('');
      setEndNode('');
    }
  };

  return (
    <>
      <Typography gutterBottom variant="h5">
        <strong>Calculate the cheapest delivery route</strong>
      </Typography>
      <Typography paragraph>
        To calculate the cheapest delivery route, please enter values.
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
        <strong>The cheapest delivery route</strong>
      </Typography>

      {!cheapestDeliveryRoute ? (
        <Typography paragraph>
          No calculation, Please use above process.
        </Typography>
      ) : (
        <>
          <Typography paragraph>
            The number of possible delivery of route &quot;
            <strong>
              {currentStartNode}
              {currentEndNode}
            </strong>
            &quot;is&nbsp;
            <strong>{cheapestDeliveryRoute.cost}</strong>
          </Typography>
          <StyledBox alignItems="center" display="flex">
            {[...cheapestDeliveryRoute.route].map(
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
            <AvatarWithColor
              variant="rounded"
              character={cheapestDeliveryRoute.cost}
            />
          </StyledBox>
        </>
      )}
    </>
  );
};

export default CheapestDeliveryRoute;

import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { ArrowRightAlt as ArrowRightIcon } from '@material-ui/icons';
import { toast } from 'react-toastify';
import useForm from 'react-hook-form';
import AvatarWithColor from '../../components/AvatarWithColor';
import { calculateCheapestDeliveryRoute } from '../../helpers/route';
import { useLayout } from '../../contexts/layoutContext';
import { useRoute } from '../../contexts/routeContext';

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

const StyledTextField = styled(TextField)(({ theme, narrow }) => ({
  margin: theme.spacing(0, 1, 1.5, 0),
  width: narrow ? 200 : 300,
}));

const CheapestDeliveryRoute = () => {
  const [currentStartNode, setCurrentStartNode] = useState('');
  const [currentEndNode, setCurrentEndNode] = useState('');
  const [cheapestDeliveryRoute, setCheapestDeliveryRoute] = useState(null);

  const {
    state: { routesData },
  } = useRoute();
  const { setHeaderTitle } = useLayout();
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    setHeaderTitle('Cheapest delivery route');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormSubmit = ({ startNode, endNode }, event) => {
    if (routesData === null || Object.values(routesData).length === 0) {
      toast.error(
        'Please set available routes before start calculating the cheapest delivery route.',
      );
      return;
    }

    setCurrentStartNode(startNode);
    setCurrentEndNode(endNode);
    setCheapestDeliveryRoute(
      calculateCheapestDeliveryRoute(startNode, endNode, routesData),
    );

    event.target.reset();
  };

  return (
    <>
      <Typography gutterBottom variant="h5">
        <strong>Calculate the cheapest delivery route</strong>
      </Typography>
      <Typography paragraph>
        To calculate the cheapest delivery route, please enter values.
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
                message:
                  'Start node must contain only alphabets in uppercase form.',
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
                message:
                  'End node must contain only alphabets in uppercase form.',
              },
            })}
            error={!!errors.endNode}
            helperText={errors.endNode ? errors.endNode.message : null}
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
        <>
          {!currentStartNode && !currentEndNode ? (
            <Typography paragraph>
              No calculation, please use above process.
            </Typography>
          ) : (
            <Typography paragraph>
              The cheapest delivery of route &quot;
              <strong>
                {currentStartNode}
                {currentEndNode}
              </strong>
              &quot; is no such route.
            </Typography>
          )}
        </>
      ) : (
        <>
          <Typography paragraph>
            The cost of cheapest delivery of route &quot;
            <strong>
              {currentStartNode}
              {currentEndNode}
            </strong>
            &quot; is&nbsp;
            <strong>{cheapestDeliveryRoute.cost}</strong>
          </Typography>
          <StyledBox alignItems="center" display="flex" flexWrap="wrap">
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

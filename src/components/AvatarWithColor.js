import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { alphabetColor } from '../helpers/color';

const StyledAvatar = styled(({ backgroundColor, ...rest }) => (
  <Avatar {...rest} />
))(({ theme, backgroundColor }) => ({
  margin: theme.spacing(0, 0, 1, 0),
  ...(backgroundColor
    ? {
        backgroundColor,
      }
    : {
        border: `1px solid ${theme.palette.text.primary}`,
        backgroundColor: 'transparent',
        color: theme.palette.text.primary,
      }),
}));

const AvatarWithColor = ({ character, ...rest }) => {
  let backgroundColor = null;
  if (typeof character === 'string') {
    backgroundColor = alphabetColor[character.substr(0, 1).toLowerCase()];
  }

  return (
    <StyledAvatar {...rest} backgroundColor={backgroundColor}>
      {character}
    </StyledAvatar>
  );
};

AvatarWithColor.propTypes = {
  character: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default AvatarWithColor;

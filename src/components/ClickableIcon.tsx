import styled from '@emotion/styled';
import { ComponentPropsWithoutRef } from 'react';
import { theme } from '../styles';
import { PalleteValueType } from '../styles/theme/colors';
import { Button, Icon } from './common';
import { ButtonHierarchy } from './common/Button';

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  hoverBackgroundColor?: PalleteValueType;
  disabled?: boolean;
  iconProps: ComponentPropsWithoutRef<typeof Icon>;
}

function ClickableIcon({
  iconProps,
  hoverBackgroundColor = theme.palette.gray300,
  disabled = false,
  onClick,
}: Props) {
  return (
    <Wrapper
      hierarchy={ButtonHierarchy.Parent}
      hoverBackgroundColor={hoverBackgroundColor}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon {...iconProps} />
    </Wrapper>
  );
}

type StyleProps = Pick<Props, 'hoverBackgroundColor'>;

const Wrapper = styled(Button)<StyleProps>`
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${({ hoverBackgroundColor }) => hoverBackgroundColor};
  }

  &:disabled {
    background-color: transparent;
  }

  &:disabled:hover {
    cursor: not-allowed;
    background-color: transparent;
  }
`;

export default ClickableIcon;

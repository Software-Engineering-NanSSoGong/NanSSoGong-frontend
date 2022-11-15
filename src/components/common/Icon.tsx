import React from 'react';
import {
  Lock,
  Mic,
  People,
  User,
  Employee,
  Rider,
  Left,
  Right,
  DoubleLeft,
  DoubleRight,
} from '../../asset/svg';

const ICONS = {
  user: User,
  lock: Lock,
  mic: Mic,
  people: People,
  employee: Employee,
  rider: Rider,
  left: Left,
  right: Right,
  doubleLeft: DoubleLeft,
  doubleRight: DoubleRight,
} as const;

type IconValueType = typeof ICONS;
export type IconKeyType = keyof IconValueType;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  type: IconKeyType;
}

function Icon({
  type,
  ...restProps
}: IconProps): React.FunctionComponentElement<React.SVGProps<SVGSVGElement>> {
  return React.createElement(ICONS[type], {
    style: { display: 'flex', alignItems: 'center' },
    ...restProps,
  });
}

export default Icon;

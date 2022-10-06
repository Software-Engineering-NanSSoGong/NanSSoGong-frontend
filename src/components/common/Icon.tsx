import React from 'react';
import { Lock, Mic, People, User, Employee, Rider } from '../../asset/svg';

const ICONS = {
  user: User,
  lock: Lock,
  mic: Mic,
  people: People,
  employee : Employee,
  rider: Rider,
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
  return React.createElement(ICONS[type], { ...restProps });
}

export default Icon;

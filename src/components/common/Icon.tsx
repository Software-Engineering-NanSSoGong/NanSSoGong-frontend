import React from 'react';
import { Lock, User } from '../../asset/svg';

const ICONS = {
  user: User,
  lock: Lock,
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

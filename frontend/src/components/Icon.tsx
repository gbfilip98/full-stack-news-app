import type { FunctionComponent, SVGProps } from 'react';

import Business from '../assets/icons/business.svg?react';
import Health from '../assets/icons/health.svg?react';
import General from '../assets/icons/general.svg?react';
import Science from '../assets/icons/science.svg?react';
import Sports from '../assets/icons/sports.svg?react';
import Technology from '../assets/icons/technology.svg?react';

import Home from '../assets/icons/home.svg?react';
import Star from '../assets/icons/star.svg?react';
import Eye from '../assets/icons/eye.svg?react';
import Arrow from '../assets/icons/arrow.svg?react';
import Search from '../assets/icons/search.svg?react';
import Alert from '../assets/icons/alert.svg?react';
import Close from '../assets/icons/close.svg?react';
import Open from '../assets/icons/open.svg?react';
import Logout from '../assets/icons/logout.svg?react';

const toSVGIcon = (Icon: unknown) => Icon as FunctionComponent<SVGProps<SVGSVGElement>>;

interface IconList {
  [key: string]: FunctionComponent<SVGProps<SVGSVGElement>>;
}

interface IconProps {
  name: string;
  height?: number | string;
  width?: number | string;
  rotate?: number;
  fill?: string;
  stroke?: string;
  className?: string;
  viewBox?: string;
  alt: string;
}

const icons: IconList = {
  "business": toSVGIcon(Business),
  "health": toSVGIcon(Health),
  "general": toSVGIcon(General),
  "science": toSVGIcon(Science),
  "sports": toSVGIcon(Sports),
  "technology": toSVGIcon(Technology),
  
  "home": toSVGIcon(Home),
  "star": toSVGIcon(Star),
  "eye": toSVGIcon(Eye),
  "arrow": toSVGIcon(Arrow),
  "search": toSVGIcon(Search),
  "alert": toSVGIcon(Alert),
  "close": toSVGIcon(Close),
  "open": toSVGIcon(Open),
  "logout": toSVGIcon(Logout)
};

const Icon: React.FunctionComponent<IconProps> = ({
  name,
  height = 20,
  width = 20,
  rotate = 0,
  fill,
  stroke,
  className,
  viewBox,
}: IconProps) => {
  const SvgIcon = icons[name];
  if (!SvgIcon) return null;

  return (
    <SvgIcon
      height={height}
      width={width}
      fill={fill}
      stroke={stroke}
      className={className}
      viewBox={viewBox}
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  );
};

export default Icon;
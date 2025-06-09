// import type { JSX } from "react";
import BusinessRaw from '../assets/icons/business.svg?react';
import HealthRaw from '../assets/icons/health.svg?react';
import GeneralRaw from '../assets/icons/general.svg?react';
import HomeRaw from '../assets/icons/home.svg?react';
import ScienceRaw from '../assets/icons/science.svg?react';
import SportsRaw from '../assets/icons/sports.svg?react';
import TechnologyRaw from '../assets/icons/technology.svg?react';

import StarRaw from '../assets/icons/star.svg?react';
import ArrowRaw from '../assets/icons/arrow.svg?react';
import SearchRaw from '../assets/icons/search.svg?react';
import AlertRaw from '../assets/icons/alert.svg?react';
import CloseRaw from '../assets/icons/close.svg?react';
import OpenRaw from '../assets/icons/open.svg?react';

import type { FC, SVGProps } from 'react';

const Business = BusinessRaw as unknown as FC<SVGProps<SVGSVGElement>>;
const Health = HealthRaw as unknown as FC<SVGProps<SVGSVGElement>>;
const General = GeneralRaw as unknown as FC<SVGProps<SVGSVGElement>>;
const Home = HomeRaw as unknown as FC<SVGProps<SVGSVGElement>>;
const Science = ScienceRaw as unknown as FC<SVGProps<SVGSVGElement>>;
const Sports = SportsRaw as unknown as FC<SVGProps<SVGSVGElement>>;
const Technology = TechnologyRaw as unknown as FC<SVGProps<SVGSVGElement>>;

const Star = StarRaw as unknown as FC<SVGProps<SVGSVGElement>>;
const Arrow = ArrowRaw as unknown as FC<SVGProps<SVGSVGElement>>;
const Search = SearchRaw as unknown as FC<SVGProps<SVGSVGElement>>;
const Alert = AlertRaw as unknown as FC<SVGProps<SVGSVGElement>>;
const Close = CloseRaw as unknown as FC<SVGProps<SVGSVGElement>>;
const Open = OpenRaw as unknown as FC<SVGProps<SVGSVGElement>>;

interface IconList {
  [key: string]: FC<SVGProps<SVGSVGElement>>;
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
}

const icons: IconList = {
  "business": Business,
  "health": Health,
  "general": General,
  "home": Home,
  "science": Science,
  "sports": Sports,
  "technology": Technology,

  "star": Star,
  "arrow": Arrow,
  "search": Search,
  "alert": Alert,
  "close": Close,
  "open": Open
};

const Icon = ({
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
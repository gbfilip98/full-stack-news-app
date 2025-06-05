// import type { JSX } from "react";

// // categories

// import Home from "../assets/icons/home.svg";

// interface IconList {
//   [key: string]: JSX.Element;
// }
// interface IconProps {
//   name: string;
//   height?: number | string;
//   width?: number | string;
//   rotate?: number;
//   fill?: string;
//   stroke?: string;
//   className?: string;
//   viewBox?: string;
// }

// const Icon = (iconProps: IconProps) => {
//   const icons: IconList = {
//     "home": (
//       <Home
//         height={iconProps.height || 20}
//         width={iconProps.width || 20}
//         fill={iconProps.fill || "none"}
//       />
//     ),
//   };

//   return (
//     // <IconWrapper rotate={iconProps?.rotate} className={iconProps.className}>
//       icons[iconProps.name]
//     // </IconWrapper>
//   );
// };

// export default Icon;
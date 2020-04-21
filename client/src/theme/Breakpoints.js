import { useMediaQuery } from "react-responsive";
import { theme } from "theme/theme";

const { large, small } = theme.media;

export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: parseInt(large) });
  return isDesktop ? children : null;
};

export const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: parseInt(small), maxWidth: parseInt(large) - 1 });
  return isTablet ? children : null;
};
export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: parseInt(small) - 1 });
  return isMobile ? children : null;
};

export const NotDesktop = ({ children }) => {
  const isTablet = useMediaQuery({ maxWidth: parseInt(large) - 1 });
  return isTablet ? children : null;
};

import * as Icons from 'react-feather';
import { Icon } from 'react-feather';  // For type checking

interface Props {
  name: keyof typeof Icons;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

const FeatherIcon: React.FC<Props> = ({ name, color, size, strokeWidth }) => {
  const IconComponent = Icons[name] as Icon;
  return IconComponent ? <IconComponent color={color} size={size} strokeWidth={strokeWidth}/> : null;
}

export default FeatherIcon;

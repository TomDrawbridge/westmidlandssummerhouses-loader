import * as Icons from 'react-feather';

function FeatherIcon({ name, color, size, strokeWidth }) {
  const IconComponent = Icons[name];
  return IconComponent ? <IconComponent color={color} size={size} strokeWidth={strokeWidth}/> : null;
}

export default FeatherIcon;

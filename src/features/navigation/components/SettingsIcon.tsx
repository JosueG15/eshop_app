import Icon from "react-native-vector-icons/FontAwesome";
import iconStyles from "../styles/iconStyle";
import { ICON_SIZE } from "../constants/iconConstants";

const SettingsIcon: React.FC<{ color: string }> = ({ color }) => (
  <Icon
    name="cog"
    style={iconStyles.icon}
    color={color}
    size={ICON_SIZE}
    accessible={true}
    accessibilityLabel="Ajustes"
  />
);

export default SettingsIcon;

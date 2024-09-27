import Icon from "react-native-vector-icons/FontAwesome";
import iconStyles from "../styles/iconStyle";
import { ICON_SIZE } from "../constants/iconConstants";

const UserIcon: React.FC<{ color: string }> = ({ color }) => (
  <Icon
    name="user"
    style={iconStyles.icon}
    color={color}
    size={ICON_SIZE}
    accessible={true}
    accessibilityLabel="Ajustes"
  />
);

export default UserIcon;

import Icon from "react-native-vector-icons/FontAwesome";
import iconStyles from "../styles/iconStyle";
import { ICON_SIZE } from "../constants/iconConstants";

const HomeIcon: React.FC<{ color: string }> = ({ color }) => (
  <Icon
    name="home"
    style={iconStyles.icon}
    color={color}
    size={ICON_SIZE}
    accessible={true}
    accessibilityLabel="Inicio"
  />
);

export default HomeIcon;

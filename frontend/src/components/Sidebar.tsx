import { NavLink } from "react-router-dom";
import {
  House,
  Grid,
  Layers,
  Box,
} from "react-bootstrap-icons";

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <SidebarItem to="/" icon={<House />} label="Home" />
      <SidebarItem to="/categories" icon={<Grid />} label="Category" />
      <SidebarItem to="/subcategories" icon={<Layers />} label="Subcategory" />
      <SidebarItem to="/products" icon={<Box />} label="Products" />
    </div>
  );
};

const SidebarItem = ({
  to,
  icon,
  label,
}: {
  to: string;
  icon: JSX.Element;
  label: string;
}) => {
  return (
    <NavLink
      to={to}
      end
      style={({ isActive }) => ({
        ...styles.item,
        ...(isActive ? styles.activeItem : {}),
      })}
    >
      <div style={styles.left}>
        <span style={styles.icon}>{icon}</span>
        <span style={styles.text}>{label}</span>
      </div>
      <span style={styles.arrow}>›</span>
    </NavLink>
  );
};

export default Sidebar;

const styles: { [key: string]: React.CSSProperties } = {
  sidebar: {
    backgroundColor: "#f8f9fa",
    height: "100%",
    padding: "10px",
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    marginBottom: "6px",
    textDecoration: "none",
    color: "#333",
    borderRadius: "6px",
    fontSize: "14px",
  },
  activeItem: {
    backgroundColor: "#fff3bf",
    fontWeight: 600,
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  icon: {
    fontSize: "16px",
  },
  text: {
    fontSize: "14px",
  },
  arrow: {
    fontSize: "16px",
    color: "#999",
  },
};

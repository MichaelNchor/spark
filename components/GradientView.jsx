import { LinearGradient } from "expo-linear-gradient";

const GradientView = ({ children, className = "" }) => {
  return (
    <LinearGradient
      colors={["#E94057", "#FF5DA2", "#F6E8FF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 0.5, 1]}
      className={className}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientView;

import { StyleSheet } from "react-native";

export const CustomBottomStyle = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 999
  },
});

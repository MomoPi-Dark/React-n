import { Image, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
// @ts-expect-error
import mg from "../../assets/images/home-image.jpg";

export default function Home() {
  return (
    <View style={styles.container}>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.title}>Selamat Datang</Text>
      <Text style={styles.content}>
        Di aplikasi perhitungan dengan skala matrix 3x3
      </Text>

      <Image source={mg} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    marginVertical: 50,
    fontSize: 30,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 20,
    fontSize: 20,
    alignItems: "center",
    textAlign: "center",
  },
  logo: {
    marginVertical: 85,
    marginHorizontal: "auto",
    alignItems: "center",
    width: 300,
    borderWidth: 1,
    borderRadius: 20,
    height: 300,
  },
  separator: {
    marginVertical: 0,
    height: 3,
    width: "100%",
  },
});

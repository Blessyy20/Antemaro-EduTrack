import { View, Text, Pressable, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";

export default function Landing() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>📚 Welcome to Edutrack</Text>
      <Text style={styles.subtitle}>Stay organized. Stay ahead.</Text>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#ab93e2ff" : "#ab93e2ff" },
        ]}
        onPress={() => router.push("signup")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#ab93e2ff" : "#ab93e2ff" },
        ]}
        onPress={() => router.push("login")}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a48cb8ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#f4f4ff",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#cbc9ff",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    width: 220,
    paddingVertical: 16,
    borderRadius: 30,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: "#f4f4ff",
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 1,
  },
});

import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please fill all fields");
      Alert.alert("⚠️ Please fill all fields");
      return;
    }

    try {
      const userData = await AsyncStorage.getItem(`user_${email}`);
      if (!userData) {
        setError("User not found. Please sign up first.");
        Alert.alert("User not found", "Please sign up first.");
        return;
      }

      const user = JSON.parse(userData);
      if (user.password !== password) {
        setError("Your Password is Incorrect");
        Alert.alert("Your Password is Incorrect");
        return;
      }

      // ✅ successful login
      await AsyncStorage.setItem("loggedInUser", email);
      setEmail("");
      setPassword("");
      setError("");
      router.replace("/home");
    } catch (e) {
      console.error(e);
      setError("Something went wrong. Please try again.");
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!🩷</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError("");
        }}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError("");
        }}
        secureTextEntry
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>

      {/* 👇 navigate to Sign Up */}
      <Pressable onPress={() => router.push("signup")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 30, textAlign: "center" },
  input: {
    width: "90%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#cab0caff",
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    width: "90%",
    backgroundColor: "#907df8ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  link: { color: "#957cf0ff", marginTop: 10 },
  error: {
    width: "90%",
    color: "#2e2236ff",
    marginBottom: 8,
    textAlign: "left",
  },
});

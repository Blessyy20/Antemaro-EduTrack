import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [strand, setStrand] = useState("");
  const [grade, setGrade] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !strand || !grade || !email || !password) {
      Alert.alert("⚠️ Please fill all fields");
      return;
    }

    try {
      const userData = { name, strand, grade, email, password };

      // ✅ Save user data
      await AsyncStorage.setItem(`user_${email}`, JSON.stringify(userData));

      Alert.alert("✅ Success", "Account created! Please login.");
      router.replace("/login"); // go to login after signup
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Something went wrong. Try again.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#c5ebf8ff" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account 🌸</Text>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Strand"
          value={strand}
          onChangeText={setStrand}
          style={styles.input}
        />
        <TextInput
          placeholder="Grade"
          value={grade}
          onChangeText={setGrade}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>

        <Pressable onPress={() => router.push("login")}>
          <Text style={styles.link}>Already have an account? Log In</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
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
});

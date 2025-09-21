import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "../hooks/useUser"; // make sure the path is correct

export default function Signup() {
  const router = useRouter();
  const { signupUser, loading } = useUser();

  const [name, setName] = useState("");
  const [strand, setStrand] = useState("");
  const [grade, setGrade] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await signupUser({ name, strand, grade, email, password });
      Alert.alert("✅ Success", "Account created! Please login.");
      router.replace("/login");
    } catch (e) {
      Alert.alert("⚠️ Error", e.message);
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

        {/* Sign Up Button */}
        <Pressable
          style={styles.button}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "Creating..." : "Sign Up"}</Text>
        </Pressable>

        {/* Navigate to Login */}
        <Pressable
          style={[styles.button, { backgroundColor: "transparent" }]}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText2}>Already have an account? Sign In</Text>
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
  buttonText2: { color: "#907df8ff", fontWeight: "bold" },
});

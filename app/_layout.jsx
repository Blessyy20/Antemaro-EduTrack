// app/_layout.tsx
import { Stack } from "expo-router";
import { UserProvider } from "../contexts/UserContext";

export default function Layout() {
  return (
    <UserProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
    </UserProvider>
  );
}

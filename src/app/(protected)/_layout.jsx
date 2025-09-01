import { Stack } from "expo-router";
import { useSelector } from "react-redux";

export default function ProtectedLayout() {
  const session = useSelector((state) => state.session);
  const { user, token } = session;

  // if (!user || !token) {
  //   return <Redirect href={"/auth/"} />;
  // }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

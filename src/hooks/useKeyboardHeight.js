import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export default function useKeyboardHeight() {
  //handle keyboard display
  const [keyboardHeight, setKeyboardHeight] = useState(32);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(Number(event.endCoordinates.height) + 32);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(32);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return keyboardHeight;
}

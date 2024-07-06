import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ToastProvider, useToast } from '@eylamf/react-native-toast-machine';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function App() {
  const [test, setTest] = useState(false);

  if (test) return <View style={{ flex: 1, backgroundColor: 'blue' }} />;

  return (
    <SafeAreaProvider>
      <ToastProvider>
        <View style={styles.container}>
          <MyButton />
          <Text onPress={() => setTest(true)}>Test</Text>
        </View>
      </ToastProvider>
    </SafeAreaProvider>
  );
}

function MyButton() {
  const { showToast } = useToast();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        showToast({
          content: (
            <>
              <Text style={styles.label}>Conversation marked as unread</Text>
              <Text style={styles.sublabel}>View all unread</Text>
            </>
          ),
        })
      }
    >
      <Text style={styles.label}>Show toast</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 20,
    borderCurve: 'continuous',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  label: { color: 'white' },
  sublabel: { color: 'rgb(150, 150, 150)', fontSize: 12, marginTop: 2 },
});

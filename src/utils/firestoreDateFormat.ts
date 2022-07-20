import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export function formatDate(timestamp: FirebaseFirestoreTypes.Timestamp) {
  if (timestamp) {
    const data = new Date(timestamp.toDate());

    const day = data.toLocaleDateString();
    const hour = data.toLocaleTimeString();

    return `${day} at ${hour}`;
  }
}
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { List, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import format from 'date-fns/format';
import { loadAll, IMemo } from './store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
  },
});

export const Main: React.FC = () => {
  const navigation = useNavigation();
  const [memos, setMemos] = useState<IMemo[]>([]);

  useEffect(() => {
    const initialize = async () => {
      const newMemos = await loadAll();
      setMemos(newMemos);
    };

    const unsubscribe = navigation.addListener('focus', initialize);

    return unsubscribe;
  }, [navigation]);

  const onPressAdd = () => {
    navigation.navigate('Compose');
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={memos}
        keyExtractor={(item) => `${item.createdAt}`}
        renderItem={({ item }) => (
          <List.Item
            title={item.text}
            titleNumberOfLines={5}
            description={`作成日時: ${format(
              Number.parseInt(item.createdAt),
              'yyyy.MM.dd HH:mm'
            )}`}
            descriptionStyle={{ textAlign: 'right' }}
          />
        )}
      />
      <FAB
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
        }}
        icon="plus"
        onPress={onPressAdd}
      />
    </View>
  );
};

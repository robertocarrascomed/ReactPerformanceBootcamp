import React, {useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useGetCharacters} from './src/adapters/useGetCharacters';
import {CharacterCard} from './src/domain/components/CharacterCard';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Character} from './src/ports/types';

function App(): React.JSX.Element {
  const [actual, setActual] = useState(0);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {characters, loading}: {characters: Character[]; loading: boolean} =
    useGetCharacters();

  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <View style={styles.container}>
        <StatusBar backgroundColor={backgroundStyle.backgroundColor} />
        <View>
          {characters && characters?.length >= 0 && !loading && (
            <FlatList
              data={characters}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => <CharacterCard character={item} />}
              horizontal
              initialNumToRender={5}
              windowSize={10}
              removeClippedSubviews={true}
              maxToRenderPerBatch={5}
            />
          )}
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default App;

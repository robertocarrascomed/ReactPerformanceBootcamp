import {StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';

import {PanGestureHandler} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {useGestureEvents} from '../../hooks/useGestureEvents';
import {memo} from 'react';
import {Character} from '../../ports/types';

type Props = {
  character: Character;
};

export const CharacterCard = memo(({character}: Props) => {
  const {onGestureEvent, onGestureEnd, animatedStyle, opacity} =
    useGestureEvents();

  return (
    <View style={styles.containerCharacterCard}>
      {!!character ? (
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onEnded={onGestureEnd}>
          <Animated.View
            style={[styles.characterCard, animatedStyle, {opacity: opacity}]}>
            <Text style={styles.textName}>{character.name}</Text>
            <Text style={styles.textSpecies}>{character.species}</Text>
            <View style={styles.containerImage}>
              <FastImage
                style={styles.imageStyles}
                source={{uri: character.image}}
              />
            </View>
          </Animated.View>
        </PanGestureHandler>
      ) : (
        <Text>Character not found</Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  containerCharacterCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 40,
  },
  characterCard: {
    width: 300,
    height: 420,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    borderRadius: 20,
  },
  imageCharacterCard: {
    width: 50,
    height: 50,
  },
  textCharacterCard: {
    fontSize: 20,
  },
  textName: {fontSize: 40, fontWeight: '700', marginBottom: 5},
  textSpecies: {
    backgroundColor: 'lightblue',
    padding: 5,
    borderRadius: 5,
  },
  containerImage: {
    flexGrow: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignContent: 'center',
  },
  imageStyles: {height: 250, width: 250, borderRadius: 20},
});

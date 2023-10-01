import React, { FC } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import { FadeInImage } from '../components/FadeInImage';
import { RootStackParams } from '../navigator/Navigator';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen: FC<Props> = ({ navigation, route }) => {
  const {
    simplePokemon: { name, id, picture },
    color,
  } = route.params;
  const { top } = useSafeAreaInsets();
  const { isLoading, pokemon } = usePokemon(id);

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.container, { backgroundColor: color }]}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          activeOpacity={0.8}
          style={[styles.backButton, { top: top + 10 }]}>
          <Icon name="arrow-back-outline" color="white" size={30} />
        </TouchableOpacity>

        <Text style={[styles.pokemonName, { top: top + 40 }]}>
          {name + '\n'}#{id}
        </Text>

        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokebola}
        />

        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokebola: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import ImageColors from 'react-native-image-colors';

import { SimplePokemon } from '../interfaces/PokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { RootStackParams } from '../navigator/Navigator';

const windowWith = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const uri = pokemon.picture;

  const getBackgroundColor = async () => {
    const result = await ImageColors.getColors(uri, { fallback: 'grey' });

    if (!isMounted) {
      return;
    }

    switch (result.platform) {
      case 'ios':
        setBgColor(result.background || 'grey');
        break;
      case 'android':
        setBgColor(result.dominant || 'grey');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getBackgroundColor();

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('PokemonScreen', {
          simplePokemon: pokemon,
          color: bgColor,
        })
      }>
      <View
        style={[
          styles.cardContainer,
          { width: windowWith * 0.4, backgroundColor: bgColor },
        ]}>
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>

        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>

        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -25,
    right: -25,
    // opacity: 0.5,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -5,
    bottom: -5,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    // bottom: -20,
    // right: -20,
    opacity: 0.5,
  },
});

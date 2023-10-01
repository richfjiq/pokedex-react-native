import React, { FC } from 'react';
import {
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { styles } from '../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { PokemonCard } from '../components/PokemonCard';

interface Props extends StackScreenProps<any, any> {}

export const HomeScreen: FC<Props> = () => {
  const { top } = useSafeAreaInsets();
  const { simplePokemonList, loadPokemons } = usePokemonPaginated();

  //   console.log(JSON.stringify(simplePokemonList, null, 4));

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />

      <View style={stylesComponent.flatListContainer}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={(pokemon, index) => pokemon.id + index}
          numColumns={2}
          ListHeaderComponent={() => (
            <Text
              style={[
                styles.title,
                styles.globalMargin,
                { top: top + 10, marginBottom: top + 20 },
              ]}>
              Pokedex
            </Text>
          )}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          // infinite scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <ActivityIndicator style={styles.loader} size={20} color="grey" />
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

const stylesComponent = StyleSheet.create({
  flatListContainer: {
    alignItems: 'center',
  },
});

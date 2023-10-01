import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Text,
  FlatList,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Loading } from '../components/Loading';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { styles } from '../theme/appTheme';
import { SimplePokemon } from '../interfaces/PokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const { isFetching, simplePokemonList } = usePokemonSearch();
  const [term, setTerm] = useState('');
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }

    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(poke =>
          poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()),
        ),
      );
    } else {
      const pokemonById = simplePokemonList.find(poke => poke.id === term);
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View
      style={[
        stylesComponent.container,
        { marginTop: Platform.OS === 'ios' ? top : top + 10 },
      ]}>
      <SearchInput
        // onDebounce={value => setTerm(value)}
        onDebounce={setTerm}
        style={{
          ...stylesComponent.inputStyles,
          width: screenWidth - 40,
        }}
      />

      <FlatList
        data={pokemonFiltered}
        keyExtractor={(pokemon, index) => pokemon.id + index}
        numColumns={2}
        ListHeaderComponent={() => (
          <Text
            style={[
              styles.title,
              styles.globalMargin,
              stylesComponent.marginVertical,
            ]}>
            {term}
          </Text>
        )}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
};

const stylesComponent = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  marginVertical: {
    top: 10,
    marginTop: 55,
    marginBottom: 20,
  },
  inputStyles: {
    position: 'absolute',
    zIndex: 999,
    top: 10,
  },
});

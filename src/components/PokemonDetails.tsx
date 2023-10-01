import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { PokemonFull } from '../interfaces/PokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface Props {
  pokemon: PokemonFull;
}

export const PokemonDetails: FC<Props> = ({ pokemon }) => {
  return (
    <ScrollView
      style={[StyleSheet.absoluteFillObject]}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.container, styles.marginTopContainer]}>
        <Text style={styles.title}>Types</Text>

        <View style={styles.row}>
          {pokemon.types.map(({ type }) => (
            <Text key={type.name} style={styles.regularText}>
              {type.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={[styles.container]}>
        <Text style={styles.title}>Weight</Text>
        <Text style={styles.regularText}>{pokemon.weight} kg</Text>
      </View>

      <View style={[styles.container]}>
        <Text style={styles.title}>Sprites</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprite}
        />

        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={styles.basicSprite}
        />

        <FadeInImage
          uri={pokemon.sprites.front_shiny}
          style={styles.basicSprite}
        />

        <FadeInImage
          uri={pokemon.sprites.back_shiny}
          style={styles.basicSprite}
        />
      </ScrollView>

      <View style={[styles.container]}>
        <Text style={styles.title}>Basic Skills</Text>
        <View style={styles.row}>
          {pokemon.abilities.map(({ ability }) => (
            <Text key={ability.name} style={styles.regularText}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={[styles.container]}>
        <Text style={styles.title}>Moves</Text>
        <View style={styles.rowWrap}>
          {pokemon.moves.map(({ move }) => (
            <Text key={move.name} style={styles.regularText}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={[styles.container]}>
        <Text style={styles.title}>Stats</Text>
        <View>
          {pokemon.stats.map((stat, i) => (
            <View key={stat.stat.name + i} style={styles.row}>
              <Text style={[styles.regularText, styles.statTitle]}>
                {stat.stat.name}
              </Text>
              <Text style={[styles.regularText, styles.statNumber]}>
                {stat.base_stat}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.lastContainer}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicSprite}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  marginTopContainer: {
    marginTop: 370,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  regularText: {
    fontSize: 19,
    marginRight: 10,
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
  statTitle: {
    width: 150,
  },
  statNumber: {
    fontWeight: 'bold',
  },
  lastContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
});

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, TouchableOpacity } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';

import { client } from './apolloClient';
import WeightObservations from './playground/WeightObservations';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, margin: 16 }}>
      <TouchableOpacity onPress={() => navigation.navigate('Weight Observations')}>
        <Text>Weight Observations</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="API Playground" component={HomeScreen} />
          <Stack.Screen name="Weight Observations" component={WeightObservations} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

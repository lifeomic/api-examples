import * as React from 'react';
import { Text, FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_OBSERVATIONS_CONNECTION_BY_TYPE = gql`
  query GetObservationConnectionsByType($type: String!, $after: String) {
    patient {
      id
      observationsConnection(code: $type, after: $after) {
        edges {
          node {
            resourceType
            code {
              coding {
                system
                code
                display
              }
            }
            id
            effectiveDateTime
            valueQuantity {
              value
              unit
              system
              code
            }
          }
        }
      }
    }
  }
`

const WeightObservationList = () => {
  const loincSystem = 'http://loinc.org';
  const bodyWeightCode = '29463-7';
  
  const { loading, data } = useQuery(GET_OBSERVATIONS_CONNECTION_BY_TYPE, {
    variables: {
      type: `${loincSystem}|${bodyWeightCode}`, // system|code to query by, this is the LOINC coding system with the LOINC code for body weight
    },
  });

  if (loading) { return null; }

  return (
    <FlatList 
      data={data.patient.observationsConnection.edges}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (<Text>{item.node.valueQuantity.value}kg on {item.node.effectiveDateTime}</Text>)}
      style={{ padding: 16 }}
    />
  );
}

export default WeightObservationList;
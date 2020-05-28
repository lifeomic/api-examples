import React, { useCallback } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { TouchableOpacity, ActivityIndicator } from 'react-native'

const FullObservation = gql`
  fragment FullObservation on Observation {
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
`

export const CREATE_OBSERVATION = gql`
  mutation CreateObservation($observation: ObservationIn!) {
    createObservation(observation: $observation) {
      ...FullObservation
    }
  }
  ${FullObservation}
`

const DELETE_OBSERVATION = gql`
  mutation DeleteObservation($id: String!) {
    deleteObservation(id: $id)
  }
`

const useCreateWeightObservation = () => {
  const [createObservationFn, { loading, data }] = useMutation(CREATE_OBSERVATION)
  const createWeightObservation = async (weightInMetric, effectiveDateTime) => {
    const result = await createObservationFn({
      variables: {
        observationType: "Weight",
        value: weightInMetric,
        effectiveDateTime
      }
    })
    return result
  }

  return {
    createWeightObservation,
    data,
    loading
  }
}

// Sample component you could render to display a button that just creates a weight observation
// with the current time and 45kg.

// Note: Metric - Send all readings in metric values.
const AddWeightComponent = () => {
  const { createWeightObservation, loading } = useCreateWeightObservation()
  const logWeight = useCallback(async () => {
    await createWeightObservation(45, new Date())
  })

  return (
    <>
      <ActivityIndicator animating={loading} hidesWhenStopped />
      <TouchableOpacity disabled={loading} onPress={logWeight}>
        <Text>Log Weight</Text>
      </TouchableOpacity>
      />
    </>
  )
}
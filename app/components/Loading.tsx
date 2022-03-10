import React, {memo} from 'react';
import {ActivityIndicator} from 'react-native';
import {Box, Text} from 'native-base';
import {colors} from 'constant/colors';

export interface LoadingProps {
  isLoading?: boolean;
}

const Loading = (props: LoadingProps) => {
  if (!props.isLoading) {
    return null;
  }
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      flex="1"
      width="100%"
      height="100%"
      zIndex={999}
      background="rgba(0, 0, 0, 0.4)"
      position="absolute">
      <ActivityIndicator size="large" color={colors.primary} />
      <Text color={colors.primary} fontSize="md" mt="3">
        Loading...
      </Text>
    </Box>
  );
};

export default memo(Loading);

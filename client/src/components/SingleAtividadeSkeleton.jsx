import { Box, Divider, Skeleton } from '@mui/material';
import { useEffect } from 'react';

const SingleAtividadeSkeleton = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ borderBottom: '1px solid #cacacaff' }}>
        <Skeleton width="100%" height="90px" />
      </Box>
      <Box sx={{}}>
        <Skeleton width="100%" height="55px" />
        <Skeleton width="100%" height="55px" />
        <Skeleton width="100%" height="55px" />
        <Skeleton width="100%" height="55px" />
        <Skeleton width="100%" height="55px" />
      </Box>
    </Box>
  );
};

export default SingleAtividadeSkeleton;

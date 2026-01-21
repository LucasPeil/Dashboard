import { Box, Skeleton } from '@mui/material';
import React from 'react';
import CategoryCardsContainer from './CategoryCardsContainer';
import DashboardContainer from './Container';

const DashboardSkeleton = () => {
  return (
    <DashboardContainer>
      {/* Header Skeleton */}
      <Box sx={{ width: '100%', mb: 4, pt: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #e0e0e0',
            pb: 1,
            mb: 2,
          }}
        >
          <Skeleton variant="text" width="70%" height={80} />
        </Box>
      </Box>

      {/* Cards Skeleton */}
      <CategoryCardsContainer minCardWidth={300}>
        {[1, 2, 3].map((item) => (
          <Box component={'li'} key={item}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={140}
              sx={{ borderRadius: 2 }}
            />
          </Box>
        ))}
      </CategoryCardsContainer>

      {/* Table Skeleton */}
      <Box sx={{ width: '100%', px: 2, mt: 4 }}>
        {/* Search Bar Skeleton */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
          <Skeleton
            variant="rectangular"
            width={'100%'}
            height={40}
            sx={{ borderRadius: 1 }}
          />
        </Box>
        {/* Table Body Skeleton */}
        <Skeleton
          variant="rectangular"
          width="100%"
          height={400}
          sx={{ borderRadius: 2 }}
        />
      </Box>
    </DashboardContainer>
  );
};

export default DashboardSkeleton;

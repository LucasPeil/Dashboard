import { Box, Skeleton, Stack, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import CategoryCardsContainer from './CategoryCardsContainer';
import DashboardContainer from './Container';

const DashboardSkeleton = () => {
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <DashboardContainer>
      <Stack
        spacing={2}
        sx={{
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          overflow: 'auto',
          p: '0.5rem 0.8rem',
        }}
      >
        {/* Header Skeleton */}
        <Box sx={{ flexShrink: 0 }}>
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
        <Box sx={{ width: '100%', flexShrink: 1 }}>
          {upSm ? (
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
          ) : (
            <Stack component={'ul'} spacing={1}>
              {[1, 2, 3].map((item) => (
                <Box component={'li'} key={item}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={70}
                    sx={{ borderRadius: 2 }}
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Box>

        {/* Table Skeleton */}
        <Box sx={{ width: '100%', height: '100%' }}>
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
      </Stack>
    </DashboardContainer>
  );
};

export default DashboardSkeleton;

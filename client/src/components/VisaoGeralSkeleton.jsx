import {
  Box,
  Grid,
  Paper,
  Skeleton,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';

const VisaoGeralSkeleton = () => {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const downLg = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
      <Box
        sx={{
          height: '100vh',
          transition: 'all 0.5s ease',
          margin: !upMd && `auto auto`,
          width: upMd ? 'calc(100% - 6rem)' : '96%',
        }}
      >
        {/* Header Buttons Skeleton */}
        <Grid
          container
          spacing={downLg ? 1 : 10}
          component={'section'}
          sx={{ mb: 2, pt: 6 }}
        >
          {[1, 2, 3].map((item) => (
            <Grid
              item
              xs={4}
              lg={4}
              key={item}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Skeleton
                variant="rectangular"
                width="70%"
                height={120}
                sx={{ borderRadius: 4 }}
              />
            </Grid>
          ))}
        </Grid>

        <Paper
          elevation={6}
          component={'main'}
          sx={{
            px: 2,
            boxSizing: 'border-box',
            width: upMd ? 'calc(100% - 4rem)' : '100%',
            margin: '2rem auto',
            height: downMd ? 'calc(100vh - 15rem)' : '42rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack
            component={'section'}
            direction={'column'}
            justifyContent={'space-between'}
            sx={{
              height: downMd ? 'calc(100vh - 15rem)' : '41rem',
            }}
          >
            <Box
              component={'header'}
              sx={{
                borderBottom: '1px solid #D8D8D8',
                pb: 1,
                pt: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                mb: 2,
              }}
            >
              <Skeleton variant="text" width="30%" height={60} />
            </Box>

            <Box
              component={'figure'}
              sx={{
                px: 2,
                position: 'relative',
                height: '100%',
                flexGrow: 1,
              }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ borderRadius: 2 }}
              />
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default VisaoGeralSkeleton;

import { Skeleton } from '@mui/material';

const SingleAtividadeSkeleton = () => {
  return new Array(5).map((_, index) => (
    <Skeleton
      key={index}
      animation="wave"
      variant="rectangular"
      width={210}
      height={118}
    />
  ));
};

export default SingleAtividadeSkeleton;

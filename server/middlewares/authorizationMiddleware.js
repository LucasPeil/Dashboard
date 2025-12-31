const authorization = (req, res, next) => {
  const userId = req.user._id;
  const userIdAtividade = req?.query?.userId;
  switch (req.method) {
    case 'POST':
      const data = req.body.data ? JSON.parse(req.body.data) : null;
      if (!data?._id || userId == data?.userId) {
        next();
      } else {
        res.status(401);
        throw new Error('Acesso não autorizado');
      }
      break;
    case 'DELETE':
      if (userIdAtividade == userId) {
        next();
      } else {
        res.status(401);
        throw new Error('Acesso não autorizado');
      }
      break;
    default:
      res.status(401);
      throw new Error('Acesso não autorizado');
  }
};

module.exports = authorization;

/* eslint-disable import/prefer-default-export */
export const respond = (req, res) => {
  res.status(200).json(req);
};

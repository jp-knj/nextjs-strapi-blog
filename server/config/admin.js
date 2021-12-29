module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '66ae68429aa815f3f12b202e2be5e3cf'),
  },
});

const bcrypt = require('bcrypt');
const saltRounds = 10;

const bcryptHelper = {
  hash: async (password) => {
    return await bcrypt.hash(password, saltRounds);
  },

  compare: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  },
  
};

module.exports = bcryptHelper;

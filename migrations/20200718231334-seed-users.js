const dummyUsers = [
  {
    name: "Tom",
  },
  {
    name: "Roman",
  },
  {
    name: "Zenek",
  },
  {
    name: "Hank",
  },
  {
    name: "Grazyna",
  }
]

module.exports = {
  async up(db, client) {
    try {
      for (let i = 0; i < dummyUsers.length; i++) {
        const dummyUser = dummyUsers[i]
        await db.collection('users').create({
          name: dummyUser.name,
          email: `${dummyUser.name}@email.com`,
          password: `${dummyUser.name}1234`,
        })
      }
    } catch (err) {
      console.log(err)
    }
  },

  async down(db, client) {
    try {
      for (let i = 0; i < dummyUsers.length; i++) {
        const dummyUser = dummyUsers[i]
        const problem = await db.collection('users').findOne({ email: `${dummyUser.name}@email.com`})
        await problem.delete()
      }
    } catch (err) {
      console.log(err)
    }
  }
};

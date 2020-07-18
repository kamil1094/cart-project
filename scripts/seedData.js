const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const { Product } = require('../dist/models/product')
const { User } = require('../dist/models/user')

const connect = async function() {
  const uri = 'mongodb://localhost:27017/cart-project'
  mongoose.Promise = global.Promise
  const db = await mongoose.connect(uri, { useNewUrlParser: true })
  console.info(`Connected to ${uri} \n`)
  return db
}

const dummyUsers = [
  {
    _id: ObjectId("5f1346071cb41e3a44497122"),
    name: 'Tom',
  },
  {
    _id: ObjectId("5f1346071cb41e3a44497123"),
    name: 'Hank',
  },
  {
    _id: ObjectId("5f1346071cb41e3a44497124"),
    name: 'Frank',
  },
  {
    _id: ObjectId("5f1346071cb41e3a44497125"),
    name: 'Jessica',
  },
  {
    _id: ObjectId("5f1346071cb41e3a44497126"),
    name: 'Grazyna',
  }
]

const dummyProducts = [
  {
    _id: ObjectId("5f1346071cb41e3a44497127"),
    name: 'shoes',
    price: 10,
    image: "iVBORw0KGgoAAAANSUhEUgAAAiYAAAFACAMAAAC/VUeuAAACE1BMVEWI29H///8AsaDsHCMWjoCH29Efuqyf4tsmq5xtuK9esacRtqYYrJ3f9fPP8O1kw7gzwbKK2M4NtaUItKNBq58rv7CI2tAkvK4WuKjqICeF2tCD2c+B2c+Uxb1JsaR+2M531sxt08gdk4YZkILYQkboJCrsHST4/fz0/PuB18w+xbdgwLXFZ2feNzvu+fi86+aY4NiT3tZ7182QzMRbzcKRycFMybyWwblTua0auao5ppmrmpWvko6xjYq0iIbTTU/C7eir5t+P3dR01cqN0cdezsJUy79Ryr48qJy4f33hMjfkLDLmKC78/v7p+Pfj9fPc9fLU8u+56uW36eP70dJ808lCxrg5w7WZu7MxwLGesaqhrKcDsqECsqGmop33mp2pnZkilYjKXV/NV1ncOz/hMDX/+fnZ9PHI7+qL3NKM1Mpl0cVXzMCtlpK7eXjVSEvuMjj//Pze7+3E7emw5+Gc4dqL1sxx1Ml30MVHx7pmxbmYvrb5srWjp6GkpaAnrZ9MqJ0zoJP0dnrBcG/zZ2zxUljQUlTwS1D+9fb97O2n5N782dqz2tb7ysyf0ct7v7f4r7GbtrBpt646t6ktt6n4p6lar6U/opf2jI8qm462g4G9dXTyXWLvPUPtJy396+z94uO839u63dml0876xMZuyb+Jxr+FxLxpxrstsqQmsKIdrZ4crZ7zcXXxWF3tKTDtKC5IfwUNAAABAWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iPz48cjpSREYgeG1sbnM6cj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+PHI6RGVzY3JpcHRpb24geG1sbnM6eD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+PHg6Q3JlYXRlRGF0ZT4yMDIwLTAzLTI0VDA3OjU5OjIxLTAwOjAwPC94OkNyZWF0ZURhdGU+PC9yOkRlc2NyaXB0aW9uPjwvcjpSREY+PD94cGFja2V0IGVuZD0iciI/PiVT4nUAAAgESURBVHja7MGBAAAAAICg/akXqQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGbn7n0SCcIwgL+b5y/YhmQLOthqtyKEApCGRqC0MJIIUaAwUbGxObXwAzQXEy1MLnfqXXHtffyJl/3gWAVWGLqZ51dv+WRn5n3fGSIiIiIiIiIiIiKtnBay2eKBpLNL7XJlo1rpPtaFTJM593ouAq3aUduW+eqVkYMJt7abETJJ2UdSy9uRWdueg7eOt4WMURhhRq9ivwvJPmY5FSFDlBqYp1FNBKXouZjrSMgIpSYW8C8kdtjCIptCBqj7eOOvi6n9bPBJdh8pukL628PUTWfr1rq7xpTjlctXeaTJl4R018V/z5+t0GCIldR4Ltad7SP2+mBNPGM1ZSG9bSD2Z8uaOBliNQ1bSGcZHxHn3poYXGJVh0I6u0CsY4Vun67Hr1hZTkhnHiIvJ1bgbAg1POxorY/ImRXouFBUFdJXAZFh+DO5d6FqT0hfbUQurcAYMW5OKKmbXHO2oK4ppK8KImH59QvUtYT0VUZkEMTkmjGh1LKJFbiBOl9IX5+SMfkNdTUhfdkOQndBTC6h7kpIY8cIhW2/BySwR0xTm4mOzuAFqtyCkMa2ERpbgSduTWi+XGLV+YkYBwloboHtZq36WvNUSGt2A6FfP753HKTjHQxzVbG2Ji+da8/uYYLDJrTQOdaU48C0CTysxXkUMkC9gQD3r5Sq7UJdjUuOKb5CWb8oZIjMHhTld4SMcXqMxfhoBcUKPajYEDJKto80fFCLQqXVc/JNyDilPlNCH8v6LKvRx4o5LM1lv89YByMsKb8rZCzbw1KarKr9Y+/ef1uAojiAn3PdNZga7arVVbe2ZF0XW1c0JfHajAo1I4hnIiTmnXjEK4L4TYQEIfyGePsjhdsHum6R9LqPfT9/w82555x777lz26bl82a3cgXB3HZ01+zDTM4RzHUrZklkl78hAFr6cMbhnkhLQDmxe14rp/C+D2pWbG5RB2/E3HFoWLZp1XQVzh0C+N2dy025607cZ4TZAspK/OsHTf76bWnVJoQSaOHE6lpHDTejobVzl37uPKfvEsBMtp24eARVMAAAAAAAAAAAAMC/S4wfjARinW0XyyUI/JDYHhDarMc68ULvwbDQqUjgvI7tYaFXlMB1hajQLUDguFRIaJcjcNv5sNAuVCBwWiostIuOETitEBINoR0jw2eC7TRZ6Ovr6yFwW0dU1EWvZ7ndrhF4YIeoCY9WuO2GCDzQG65XrJOswT4CD+REVWQPa1AZJXBfohZMYhOswxkCD9Qzk32sxX4CDwSEspb1yBO4L3FcKHtZi34CD4wL5RbrESTwQFEoedZjMYEHDgllkvXYQuCBiFD6WY9hAg9Eqwd+3IB6GLBMAJsO1OhJYRezHlcJPFAUygjrMUnggfNCybEeEwQe6Dk2TeMEzXqYvtQRRa7D0R/87YKo2soNuLwGLa4ldZ5hHfYS+OCgqFofZA0qIwQe6A2JqthVrkGDDVplJ+JYIcttN3SWwAMdEVEX69jDCo514E+9naLheK7waMvidrp6I5VK9RG4biwktIulCBx3IyS0CyOgOG8sJrQ7ROC6xGExHQzVgj+Nd4pmGNEHf+kpNmcoGPgJTeLjkbDQJRAncMiB210zKD3/cu/7orb79nywq+v2hwMEbkhKk9LlQYxhc0BJmpYuYaFY76Q07+RnAqsNSCskCWwWz0grlFH3WK0s7VDG5/k2O/Ba2gH7jtUGSuUNPy38/16+ysiG2wT2m2IDhp48aNQ7AwTWG+1nE7JPse04ZYrNeCKrMmjdOyDPhqxBOHFJkA15KZU0uvYOGGZDJtJSGSSwXp5NqaWxZQL7ZdmQK1JJE9hvL5tyXyo3Caw3xaZ8lEoXgfWG2ZR3UikRWO8am3IFnRN3bGVThqTSTWC9R2xKBcvEHYgmgNwE2mMfm/IWlY47ptiUdTjUcQe6sGDzmc6EVNK4Xm+/PJvySSobCKxnLIPdcxKpiTuCbMgzqWRwt95+I2zIe4nmmju2sBmPMxJ1jjNGs2xCZV0GwcQhRoJJ/+NXsiaNZzoWiw8mu396tuD/u/+rxEGZY78BWyYSYMuxWbe0wwbMwbHYMkumJT3Agz+bWTJ7rRuxxG5paV4a2avtktK0TBI9euvFzeawmQclLBLb3diRW7Lkxb35htz7+uLwklZyYwQW6CnGhM1+sHfHqgkEQRjHZwYuFkIQ5VCCoFZKChPDNXZRMXZJIGAQtA5BWwvfPpI78BH2O/j/XmGHYfdbdna/NiS3boa4TmZIK3sMfQNDUtkuaoAySew76qBvSOkUdTA3pPTSiRqY8591Wq3bUqzODTn2dnUacc5Ja3iIynDsghYGAduozFzR+NeQXtaOUuGSPg0CVlHqvLukV4OAIkpH18TWRMIlSk+u6WwQUCWw+4lrWhoE7KrIxEUZFOTxL3dRBgVVmXRdFLGJhCqqb7uomUHANko/rqlhELCRjurdvwwCjqG9h703COgforRwSVODgm6UeqKXOs8GAUVU8g9XxN2fhKwXleZy6nomJCcSiriZ3+npNa+6hSGtPOrgYkhq0I4aODAbJ7FRLZ5g8OovtVEd+gllktzwLuQxti+9bKPeUHKDgIdiJzzjZN+imQjJRBkAAAAAAAAAAAAAAAD+2oNDAgAAAABB/1/7wgQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALwCzimCRfBh8+4AAAAASUVORK5CYII="
  },
  {
    _id: ObjectId("5f1346071cb41e3a44497128"),
    name: 'trousers',
    price: 16,
    image: "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"
  },
  {
    _id: ObjectId("5f1346071cb41e3a44497129"),
    name: 'bread',
    price: 14,
    image: "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"
  },
  {
    _id: ObjectId("5f1346071cb41e3a4449712a"),
    name: 'hard drive',
    price: 22,
    image: "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"
  },
  {
    _id: ObjectId("5f1346071cb41e3a4449712b"),
    name: 'boat',
    price: 75,
    image: "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"
  }
]

const loadDummyUsers = async() => {
  for(let i = 0; i < dummyUsers.length; i++) {
    const dummy = dummyUsers[i]
    await User.create({
      _id: dummy._id,
      name: dummy.name,
      email: `${dummy.name.toLowerCase()}@email.com`,
      password: `${dummy.name}1234`,
    })
  }
}

const loadDummyProducts = async() => {
  for(let i = 0; i < dummyProducts.length; i++) {
    const dummy = dummyProducts[i]
    await Product.create({
      _id: dummy._id,
      name: dummy.name,
      price: dummy.price,
      image: dummy.image,
    })
  }
}
const run = async () => {
  try {
    await loadDummyUsers()
    await loadDummyProducts()
  } catch (err) {
    console.log(err)
  }
}

return (async function() {
  try {
    console.info('Process started. \n')
    await connect()
    await run()
    console.info('Finished.')
  } catch (err) {
    console.error(err)
  }
})()
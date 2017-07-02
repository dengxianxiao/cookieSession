const express = require('express')
const session = require('express-session')
const app = express()

app.use(session({
  cookie: {
    maxAge: 60*60*1000 // 1h
  },
  secret: 'you know',
  resave: false,
  saveUninitialized: false,
  name: 'cookie1'
}))

app.get('/', (req, res, next) => {
  let sess = req.session
  console.log(sess.id)
  console.log(sess.cookie)
  if (sess.views) {
    sess.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views:' + sess.views +  '</p>')
    res.write('<p>expires in : ' + (sess.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    sess.views = 1
    res.send('welcome to your app')
  }
})

app.get('/', (req, res) => {
  // 设置返回值cookie
  res.cookie('testName0', 'testValue0', {
    maxAge: 24*60*60*1000
  })
	res.cookie('testName', 'testValue', {
    httpOnly: true
  })
  res.send('<h1>hello world</h1>')
})

app.get('/parent', (req, res) => {
  res.cookie('parent-name', 'parent-value', {
    path: '/parent'
  })
  res.send('父路径')
})

app.get('/parent/childA', (req, res) => {
  res.cookie('child-name-A', 'child-value-A',{
    path: '/parent/childA'
  })
  res.send('A路径')
})

app.get('/parent/childB', (req, res) => {
  res.cookie('child-name-B', 'child-value-B',{
    path: '/parent/childB'
  })
  res.send('B路径')
})

app.listen(3000, err => {
  if (err) {
    return console.log(err)
  }
  console.log('open localhost:3000')
})

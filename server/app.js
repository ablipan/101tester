import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import twig from 'twig'
import AV from 'leanengine'
import routes from './routes'
import favicon from 'serve-favicon'
import {isDevelopment} from './utils/env'

const app = express()

if (isDevelopment) {
    twig.cache(false)
}

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'twig')

// leancloud
app.use(AV.Cloud)

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../client/assets', 'favicon.ico')))
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res) => {
        res.status(err.status || 500)
        res.render('error', {
            message: err.message,
            error: err
        })
    })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: {}
    })
})

export default app

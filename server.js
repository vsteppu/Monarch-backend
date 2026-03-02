import { Hono } from 'hono';
import { cors } from 'hono/cors'
import auth from './routes/auth.js'
import gallery from './routes/gallery.js'

const app = new Hono();

app.use('*', cors({
  	origin: '*',
  	allowMethods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
}))

app.route(`/`, auth);
app.route(`/`, gallery);
export default app;
import { Hono } from 'hono';
import { cors } from 'hono/cors'
import auth from './routes/auth.js'

const app = new Hono();

app.use('*', cors({
  	origin: '*',
  	allowMethods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
}))

app.route(`/`, auth);
app.get(`/data`, (c) => {
  	return c.json({ message: 'Hello from /data' });
});
export default app;
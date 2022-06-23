import express from 'express';
import router from './routes.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.static('./public'));
app.use(router); 

app.set('view engine', 'ejs');
app.set('views', './public');

app.get('/', (req, res) => {
    res.render('index');
  });
 
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
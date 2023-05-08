import  Express  from "express";
import productsRoutes from "./routes/productsRouter.js";
import cartRoutes from "./routes/cartsRoutes.js";

const app = Express();

app.use(Express.json());

app.use(Express.urlencoded({extended: true}));

app.use("api/products", productsRoutes)
app.use("api/cart", cartRoutes)


app.listen(8080, ()=>{
    console.log("Iniciando")
})
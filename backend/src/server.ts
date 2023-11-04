import Fastify from "fastify";
import cors from '@fastify/cors'
import { routes } from "./routes";

const app = Fastify({ logger: true})

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({message: error.message})
})

const start = async () => {

    await app.register(routes);
    await app.register(cors);

    try{
        await app.listen({ port: 3366 })
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

start();

//npm run dev
//usuario01
//teste12
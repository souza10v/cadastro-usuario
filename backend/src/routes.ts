import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateCurstomerController } from "./controllers/CreateCustomerController";
import { ListCustomerController } from "./controllers/ListCustomerController";
import { DeleteCustomerController } from "./controllers/DeleteCustomerController";
import { EditCustomerController } from "./controllers/EditCustomerController";

export async function routes(fastify: FastifyInstance) {    

    fastify.get("/teste", async(request: FastifyRequest, reply: FastifyReply) => {
        return{ok : true}
    })

    fastify.post("/customer", async(request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCurstomerController().handle(request, reply)
    })

    fastify.get("/customers", async(request: FastifyRequest, reply: FastifyReply) => {
        return new ListCustomerController().handle(request, reply)
    })

    fastify.delete("/deletecustomer", async(request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteCustomerController().handle(request, reply)
    })

    fastify.put("/editcustomer", async(request: FastifyRequest, reply: FastifyReply) => {
        return new EditCustomerController().handle(request, reply)
    })


}
import { FastifyRequest, FastifyReply } from "fastify";
import { EditCustomerService } from "../services/EditCustomerService";

class EditCustomerController{

    async handle(request: FastifyRequest, reply: FastifyReply){

        const { id } = request.query as {id: string};

        const { name, email, status } = request.body as {name: string, email: string, status: boolean};

        const editCustomerService = new EditCustomerService();

        const customer = await editCustomerService.execute({
            id, name, email, status
        });

        reply.send(customer)
    }
} 

export { EditCustomerController }


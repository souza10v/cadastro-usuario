import { FastifyRequest, FastifyReply } from "fastify";
import { EditCustomerService } from "../services/EditCustomerService";

class EditCustomerController{

    async handle(request: FastifyRequest, reply: FastifyReply){

        const { id } = request.query as {id: string};

        const { name, email } = request.body as {name: string, email: string};

        const editCustomerService = new EditCustomerService();

        const customer = await editCustomerService.execute({
            id, name, email
        });

        reply.send(customer)
    }
} 

export { EditCustomerController }


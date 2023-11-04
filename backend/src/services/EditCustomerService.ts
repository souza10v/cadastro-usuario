import prismaClient from "../prisma"

interface EditCustomerProps {
    id: string;
    name: string;
    email: string;
}

class EditCustomerService {



    async execute({ id, name, email }: EditCustomerProps) {

        if (!id) {
            throw new Error("Solicitação inválida")
        }

        const existingCustomer = await prismaClient.customer.findUnique({
            where: {
                id: id,
            },
        });

        if (!existingCustomer) {
            throw new Error("Cliente não encontrado.");
        }

        const currentTimestamp = new Date().toISOString();

        const updatedCustomer = await prismaClient.customer.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                email: email,
                updated_at: currentTimestamp
            },
        });

        return { message: "Editado com sucesso", updatedCustomer };

    }
}

export { EditCustomerService }


// w-full widht full, toda a largura que se consiga para div
// min-h-screen minima altura da div sera o tamanho da tela
//  bg-gray-900 flex  background color
// display flex para alinhar ao centro
// flex para criar um flexbox
// flex-col coloca as boxes em colunas
// justify center
// my margin bottom e top de 40
// padding 4px
// md:max-w-2xl quando atinge width maior que 768px trava tamanho
//mb margin bottom 5
// p padding
// relative posicao relativa
// absolute refere ao elemento relativem pois sua posicao eh relativa a ele, elemento filho dentro do relative
// hover:scale-105 duration-200 aumenta quando mouse esta encima

// 


import { FiTrash, FiEdit } from 'react-icons/fi'
import { useState, useEffect, useRef, FormEvent } from 'react'
import { api } from './services/apis'

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

export default function App() {

  const [customers, setCustomers] = useState<CustomerProps[]>([])
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadCustomer();
  }, [])


  const loadCustomer = async () => {

    try {
      const response = await api.get("/customers")
      setCustomers(response.data)
    } catch (error) {
      console.log("Erro ao ler usuário ", error)
    }

  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!nameRef.current?.value || !emailRef.current?.value) {
      console.log("null")
      return;
    }

    try {
      const response = await api.post("customer", {
        name: nameRef.current?.value,
        email: emailRef.current?.value
      })

      console.log(response.data)
      setCustomers(allCustomers => [...allCustomers, response.data]) //adiciona a resposta na lista
      //loadCustomer();
      nameRef.current.value = ""
      emailRef.current.value = ""
    }
    catch (error) {
      console.log("Error cadastrando usuário ", error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await api.delete("/deletecustomer", {
        params: {
          id: id
        }
      })

      const allCustomers = customers.filter( (customer) => customer.id !== id) // a cada vez remove da lista o intem que com id clicado, ou seja salva todos que tem o id diferente
      setCustomers(allCustomers)

    } catch (error) {
      console.log("Erro ao deletar, ", error)
    }
  }

  return (

    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">Clientes</h1>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome</label>
          <input
            type="text"
            placeholder="Insira o nome"
            className="w-full mb-5 p-2"
            ref={nameRef}
          />
          <label className="font-medium text-white">Email</label>
          <input
            type="email"
            placeholder="Insira o email"
            className="w-full mb-5 p-2"
            ref={emailRef}
          />

          <input
            type="submit"
            value="Cadastrar"
            className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
          />
        </form>


        <section className="flex flex-col gap-4">
          {customers.map((item) => (
            <article
              key={item.id}
              className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200" >
              <p><span className="font-medium"> Nome:</span > {item.name} </p>
              <p><span className="font-medium"> Email:</span > {item.email} </p>
              <p><span className="font-medium"> Status:</span > {item.status ? "Ativo" : "Inativo"} </p>

              <button
                onClick={() => handleDelete(item.id)}
                className='bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-4 top-6'>
                <FiTrash size={18} color="#FFF" />
              </button>

              <button
                className='bg-green-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-14 top-6'>
                <FiEdit size={18} color="#FFF" />
              </button>

            </article>
          ))}
        </section>

      </main>
    </div>
  )
}
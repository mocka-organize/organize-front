import { Button, Drawer, Form, Image, Input, Popconfirm, Table } from "antd";
import { useCreateClientes, useDeleteClientes, useGetClientes } from "../../hooks/clientesHooks";
import { BiPencil, BiPlus, BiTrash } from "react-icons/bi";
import { useContext, useState } from "react";
import { AntContext } from "../../contexts/AntContext";

const Clientes = () => {

    const [visibleCreate, setVisibleCreate] = useState();
    const { data: clientes } = useGetClientes();
    const { mutateAsync: createCliente } = useCreateClientes();
    const { mutateAsync: deleteCliente } = useDeleteClientes();
    const { api } = useContext(AntContext);

    function criar(data){
        createCliente(data, {
            onSuccess: (response) => {
                api[response.type]({
                    description: response.description
                })
            },
            onError: (response) => {
                api[response.type]({
                    description: response.description
                })
            }
        })
    }

    function deletar(id) {
        deleteCliente(id, {
            onSuccess: (response) => {
                api[response.type]({
                    description: response.description
                })
            },
            onError: (response) => {
                api[response.type]({
                    description: response.description
                })
            }
        })
    }

    return (
        <>
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl text-indigo-500 font-semibold">Clientes</h1>
                <Button
                    type="primary"
                    icon={<BiPlus />}
                    onClick={() => setVisibleCreate(true)}
                >
                    Novo cliente
                </Button>
            </div>
            <Table
                dataSource={clientes || []}
                rowKey={"cliente_id"}
            >
                <Table.Column
                    title={"Foto"}
                    className="w-[80px]"
                    render={(_, row) => (
                        <Image
                            src={row.foto}
                            alt={row.nome}
                            width={60}
                            height={60}
                            className="object-cover rounded"
                        />
                    )}
                />
                <Table.Column
                    title={"Dados"}
                    render={(_, row) => (
                        <div>
                            <div><strong>Nome: </strong>{row.nome}</div>
                            <div><strong>Email: </strong>{row.email}</div>
                        </div>
                    )}
                />
                <Table.Column
                    title={"Ações"}
                    className="w-[100px]"
                    render={(_, row) => (
                        <div className="flex gap-3">
                            {/* <Button
                                type="primary"
                                shape="circle"
                                icon={<BiPencil />}
                            /> */}
                            <Popconfirm
                                title="Alerta"
                                description="Deseja realmente apagar?"
                                onConfirm={() => deletar(row.cliente_id)}
                                okText="Sim"
                                cancelText="Não"
                            >
                                <Button
                                    type="primary"
                                    icon={<BiTrash />}
                                />
                            </Popconfirm>
                        </div>
                    )}
                />
            </Table>
            <Drawer
                open={visibleCreate}
                onClose={() => setVisibleCreate(false)}
                title={"Criar"}
            >
                <Form
                    layout="vertical"
                    encType="multipart/form-data"
                    onFinish={criar}
                >
                    <Form.Item
                        label="Nome"
                        name={"nome"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name={"email"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Foto"
                        name={"foto"}
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e?.target?.files?.[0];
                        }}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input type="file" />
                    </Form.Item>
                    <div className="flex justify-end">
                        <Button
                            htmlType="submit"
                            type="primary"
                        >
                            Criar
                        </Button>
                    </div>
                </Form>
            </Drawer>
        </>
    );
}

export default Clientes;
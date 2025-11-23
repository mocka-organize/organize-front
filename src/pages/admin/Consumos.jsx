import { Button, Drawer, Form, Input, Popconfirm, Table } from "antd";
import { useCreateConsumos, useUpdateConsumos, useDeleteConsumos, useGetConsumos } from "../../hooks/consumosHooks";
import { BiPencil, BiPlus, BiTrash } from "react-icons/bi";
import { useContext, useState } from "react";
import { AntContext } from "../../contexts/AntContext";

const Consumos = () => {

    const [visibleCreate, setVisibleCreate] = useState();
    const [visibleUpdate, setVisibleUpdate] = useState();
    const [formEdit] = Form.useForm();
    const { data: consumos } = useGetConsumos();
    const { mutateAsync: createDepartamento } = useCreateConsumos();
    const { mutateAsync: updateDepartamento } = useUpdateConsumos();
    const { mutateAsync: deleteDepartamento } = useDeleteConsumos();
    const { api } = useContext(AntContext);

    function criar(data) {
        createDepartamento(data, {
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
        }).finally(() => setVisibleCreate(false))
    }

    function editar(data) {
        updateDepartamento(data, {
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
        }).finally(() => setVisibleUpdate(false))
    }

    function deletar(id) {
        deleteDepartamento(id, {
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
            <div className="flex flex-col lg:flex-row gap-2 justify-between lg:items-center mb-5">
                <h1 className="text-2xl text-blue-500 font-semibold">Consumos</h1>
                {/* <Button
                    type="primary"
                    icon={<BiPlus />}
                    onClick={() => setVisibleCreate(true)}
                >
                    Novo Consumo
                </Button> */}
            </div>
            <div className="lg:hidden">
                <Table
                    dataSource={consumos || []}
                    rowKey={"consumo_id"}
                    className="shadow-lg bg-white rounded-2xl"

                >
                    <Table.Column
                        title={"Consumo"}
                        render={(_, row) => (
                            <div>
                                <div className="flex *:flex-1">
                                    <div>
                                        <span className="font-bold block text-slate-500">Cliente:</span>
                                        <span className="line-clamp-1">{row.clientes.nome}</span>
                                    </div>
                                    <div>
                                        <span className="font-bold block text-slate-500">Balcão:</span>
                                        <span className="line-clamp-1">{row.balcoes.localizacao}</span>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3">
                                    <Button
                                        type="primary"
                                        icon={<BiPencil />}
                                        onClick={() => {
                                            delete row.senha;
                                            formEdit.setFieldsValue({ ...row })
                                            setVisibleUpdate(true);
                                        }}
                                    />
                                    <Popconfirm
                                        title="Alerta"
                                        description="Deseja realmente apagar?"
                                        onConfirm={() => deletar(row.departamento_id)}
                                        okText="Sim"
                                        cancelText="Não"
                                    >
                                        <Button
                                            type="primary"
                                            icon={<BiTrash />}
                                        />
                                    </Popconfirm>
                                </div>
                            </div>
                        )}
                        dataIndex={"nome"}
                        key={"nome"}
                    />
                </Table>
            </div>
            <div className="hidden lg:block">
                <Table
                    dataSource={consumos || []}
                    rowKey={"consumo_id"}
                    className="shadow-lg bg-white rounded-2xl"
                >
                    <Table.Column
                        title={"ID"}
                        dataIndex={"consumo_id"}
                        key={"consumo_id"}
                        className="w-[50px]"
                    />
                    <Table.Column
                        title={"Cliente"}
                        render={(_, row) => row.clientes.nome}
                    />
                    <Table.Column
                        title={"Balcão"}
                        render={(_, row) => row.balcoes.localizacao}
                    />
                    <Table.Column
                        title={"Balcão"}
                        render={(_, row) => (
                            <div>{new Date(row.created_at).toLocaleDateString()} {new Date(row.created_at).toLocaleTimeString()}</div>
                        )}
                    />
                    <Table.Column
                        title={"Ações"}
                        className="w-[100px]"
                        render={(_, row) => (
                            <div className="flex gap-3">
                                <Button
                                    type="primary"
                                    icon={<BiPencil />}
                                    onClick={() => {
                                        formEdit.setFieldsValue({ ...row })
                                        setVisibleUpdate(true);
                                    }}
                                />
                                <Popconfirm
                                    title="Alerta"
                                    description="Deseja realmente apagar?"
                                    onConfirm={() => deletar(row.consumo_id)}
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
            </div>
            <Drawer
                open={visibleCreate}
                onClose={() => setVisibleCreate(false)}
                title={"Criar"}
            >
                <Form
                    layout="vertical"
                    onFinish={criar}
                >
                    <Form.Item
                        label="Nome"
                        name={"nome"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input />
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
            <Drawer
                open={visibleUpdate}
                onClose={() => setVisibleUpdate(false)}
                title={"Editar"}
            >
                <Form
                    layout="vertical"
                    onFinish={editar}
                    form={formEdit}
                >
                    <Form.Item
                        name={"consumo_id"}
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Nome"
                        name={"nome"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input />
                    </Form.Item>
                    <div className="flex justify-end">
                        <Button
                            htmlType="submit"
                            type="primary"
                        >
                            Editar
                        </Button>
                    </div>
                </Form>
            </Drawer>
        </>
    );
}

export default Consumos;
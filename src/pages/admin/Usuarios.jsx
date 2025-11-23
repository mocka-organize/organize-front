import { Button, Drawer, Form, Input, Popconfirm, Select, Table } from "antd";
import { useCreateUsuarios, useDeleteUsuarios, useGetUsuarios } from "../../hooks/usuarioHooks";
import { BiPencil, BiPlus, BiTrash } from "react-icons/bi";
import { useContext, useState } from "react";
import { AntContext } from "../../contexts/AntContext";
import { useUpdateUsuarios } from "../../hooks/usuarioHooks";
import { useGetDepartamentos } from "../../hooks/departamentoHooks";

const Usuarios = () => {

    const [visibleCreate, setVisibleCreate] = useState();
    const [visibleUpdate, setVisibleUpdate] = useState();
    const [formEdit] = Form.useForm();
    const { data: usuarios } = useGetUsuarios();
    const { data: departamentos, isFetched: departamentosFetched } = useGetDepartamentos();
    const { mutateAsync: createUsuario } = useCreateUsuarios();
    const { mutateAsync: updateUsuario } = useUpdateUsuarios();
    const { mutateAsync: deleteUsuario } = useDeleteUsuarios();
    const { api } = useContext(AntContext);

    function criar(data){
        createUsuario(data, {
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

    function editar(data){
        updateUsuario(data, {
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
        deleteUsuario(id, {
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
                <h1 className="text-2xl text-blue-500 font-semibold">Usuarios</h1>
                <Button
                    type="primary"
                    icon={<BiPlus />}
                    onClick={() => setVisibleCreate(true)}
                >
                    Novo Usuario
                </Button>
            </div>
            <div className="lg:hidden">
                <Table
                    dataSource={usuarios || []}
                    rowKey={"usuario_id"}
                    className="shadow-lg bg-white rounded-2xl"

                >
                    <Table.Column
                        title={"Usuário"}
                        render={(_, row) => (
                            <div>
                                <div className="flex *:flex-1">
                                    <div>
                                        <span className="font-bold block text-slate-500">Nome:</span>
                                        <span className="line-clamp-1">{row.nome}</span>
                                    </div>
                                    <div>
                                        <span className="font-bold block text-slate-500">Email:</span>
                                        <span className="line-clamp-1">{row.email}</span>
                                    </div>
                                </div>
                                <div className="flex *:flex-1">
                                    <div>
                                        <span className="font-bold block text-slate-500">Departamento:</span>
                                        {row.departamentos.nome}
                                    </div>
                                    <div>
                                        <span className="font-bold block text-slate-500">Status:</span>
                                        {row.status == 1 ? "Ativo" : "Inativo"}
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
                                    onConfirm={() => deletar(row.usuario_id)}
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
                    dataSource={usuarios || []}
                    rowKey={"usuario_id"}
                    className="shadow-lg bg-white rounded-2xl"

                >
                    <Table.Column
                        title={"ID"}
                        dataIndex={"usuario_id"}
                        key={"usuario_id"}
                        className="w-[50px]"
                    />
                    <Table.Column
                        title={"Nome"}
                        dataIndex={"nome"}
                        key={"nome"}
                    />
                    <Table.Column
                        title={"Email"}
                        dataIndex={"email"}
                        key={"email"}
                    />
                    <Table.Column
                        title={"Departamento"}
                        render={(_, row) => row.departamentos.nome}
                        className="w-[150px]"
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
                                        delete row.senha;
                                        formEdit.setFieldsValue({ ...row })
                                        setVisibleUpdate(true);
                                    }}
                                />
                                <Popconfirm
                                    title="Alerta"
                                    description="Deseja realmente apagar?"
                                    onConfirm={() => deletar(row.usuario_id)}
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
                    defaultValue={{
                        status: 1
                    }}
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
                        label="Senha"
                        name={"senha"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Departamento"
                        name={"departamento_id"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Select 
                            options={departamentosFetched ? departamentos.map(departamento => {
                                return {
                                    value: departamento.departamento_id,
                                    label: departamento.nome
                                }
                            }) : []}
                            placeholder={"Escolha o departamento"}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name={"status"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Select 
                            options={[
                                {
                                    value: 1,
                                    label: "Ativo"
                                },
                                {
                                    value: 0,
                                    label: "Inativo"
                                }
                            ]}
                            placeholder={"Escolha o status"}
                        />
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
                        name={"usuario_id"}
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
                    <Form.Item
                        label="Email"
                        name={"email"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Senha"
                        name={"senha"}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Departamento"
                        name={"departamento_id"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Select 
                            options={departamentosFetched ? departamentos.map(departamento => {
                                return {
                                    value: departamento.departamento_id,
                                    label: departamento.nome
                                }
                            }) : []}
                            placeholder={"Escolha o departamento"}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name={"status"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Select 
                            options={[
                                {
                                    value: 1,
                                    label: "Ativo"
                                },
                                {
                                    value: 0,
                                    label: "Inativo"
                                }
                            ]}
                            placeholder={"Escolha o status"}
                        />
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

export default Usuarios;
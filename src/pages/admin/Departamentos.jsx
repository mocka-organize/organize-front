import { Button, Drawer, Form, Input, Popconfirm, Table } from "antd";
import { useCreateDepartamentos, useUpdateDepartamentos, useDeleteDepartamentos, useGetDepartamentos } from "../../hooks/departamentoHooks";
import { BiPencil, BiPlus, BiTrash } from "react-icons/bi";
import { useContext, useState } from "react";
import { AntContext } from "../../contexts/AntContext";

const Departamentos = () => {

    const [visibleCreate, setVisibleCreate] = useState();
    const [visibleUpdate, setVisibleUpdate] = useState();
    const [formEdit] = Form.useForm();
    const { data: departamentos } = useGetDepartamentos();
    const { mutateAsync: createDepartamento } = useCreateDepartamentos();
    const { mutateAsync: updateDepartamento } = useUpdateDepartamentos();
    const { mutateAsync: deleteDepartamento } = useDeleteDepartamentos();
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
                <h1 className="text-2xl text-blue-500 font-semibold">Departamentos</h1>
                <Button
                    type="primary"
                    icon={<BiPlus />}
                    onClick={() => setVisibleCreate(true)}
                >
                    Novo Departamento
                </Button>
            </div>
            <div className="lg:hidden">
                <Table
                    dataSource={departamentos || []}
                    rowKey={"departamento_id"}
                    className="shadow-lg bg-white rounded-2xl"

                >
                    <Table.Column
                        title={"Departamento"}
                        render={(_, row) => (
                            <div>
                                <div>
                                    <span className="font-bold block text-slate-500">Nome:</span>
                                    <span className="line-clamp-1">{row.nome}</span>
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
                    dataSource={departamentos || []}
                    rowKey={"departamento_id"}
                    className="shadow-lg bg-white rounded-2xl"
                >
                    <Table.Column
                        title={"ID"}
                        dataIndex={"departamento_id"}
                        key={"departamento_id"}
                        className="w-[50px]"
                    />
                    <Table.Column
                        title={"Nome"}
                        dataIndex={"nome"}
                        key={"nome"}
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
                        name={"departamento_id"}
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

export default Departamentos;
import { Button, Drawer, Form, Input, Popconfirm, Select, Table } from "antd";
import { useCreateBalcoes, useUpdateBalcoes, useDeleteBalcoes, useGetBalcoes } from "../../hooks/balcaoHooks";
import { BiPencil, BiPlus, BiTrash } from "react-icons/bi";
import { useContext, useState } from "react";
import { AntContext } from "../../contexts/AntContext";

const Balcoes = () => {

    const [visibleCreate, setVisibleCreate] = useState();
    const [visibleUpdate, setVisibleUpdate] = useState();
    const [formEdit] = Form.useForm();
    const { data: balcoes } = useGetBalcoes();
    const { mutateAsync: createDepartamento } = useCreateBalcoes();
    const { mutateAsync: updateDepartamento } = useUpdateBalcoes();
    const { mutateAsync: deleteDepartamento } = useDeleteBalcoes();
    const { api } = useContext(AntContext);

    function criar(data){
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
    
    function editar(data){
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
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl text-blue-500 font-semibold">Balcões</h1>
                <Button
                    type="primary"
                    icon={<BiPlus />}
                    onClick={() => setVisibleCreate(true)}
                >
                    Novo Balcão
                </Button>
            </div>
            <Table
                dataSource={balcoes || []}
                rowKey={"balcao_id"}
            >
                <Table.Column
                    title={"ID"}
                    dataIndex={"balcao_id"}
                    key={"balcao_id"}
                    className="w-[50px]"
                />
                <Table.Column
                    title={"Localização"}
                    dataIndex={"localizacao"}
                    key={"localizacao"}
                />
                <Table.Column
                    title={"Status"}
                    render={(_, row) => row.status == 1 ? "Ativo" : "Inativo"}
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
                                onConfirm={() => deletar(row.balcao_id)}
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
                    onFinish={criar}
                >
                    <Form.Item
                        label="Localização"
                        name={"localizacao"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input />
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
                        name={"balcao_id"}
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Localização"
                        name={"localizacao"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input />
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

export default Balcoes;
/* eslint-disable no-unused-vars */
import { useState, useContext } from "react"
import { useNavigate } from "react-router"
import { Button, Form, Input } from "antd"
import { API } from "../../services"
import { AntContext } from "../../contexts/AntContext"
import { useLogin } from "../../hooks/usuarioHooks"

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { api } = useContext(AntContext);
    const { mutateAsync: login } = useLogin();

    function logar(dados) {
        setLoading(true);
        login(dados, {
            onSuccess: (response) => {
                setLoading(false);
                if (response.type == 'warning') {
                    api[response.type]({
                        description: response.description
                    })
                    return;
                }
                sessionStorage.setItem("token", response.token)
                sessionStorage.setItem("usuario", JSON.stringify(response.usuario))
                api[response.type]({
                    description: "Login efetuado com sucesso!"
                });
                navigate("/admin");
            },
            onError: (response) => {
                setLoading(false);
                api[response.type]({
                    description: response.description
                });
            }
        })
    }

    // const onFinish = async (values) => {
    //     setLoading(true)
    //     try {
    //         const res = await API.post("/login", values);
    //         if (res.status == 200 && res.data.token) {
    //             sessionStorage.setItem("token", res.data.token)
    //             sessionStorage.setItem("usuario", JSON.stringify(res.data.usuario))
    //             api.success({
    //                 message: "Login efetuado com sucesso!"
    //             })
    //             navigate("/admin");
    //         } else {
    //             api.error({
    //                 message: res.data.description || res.data.message || "Email ou senha inválidos!"
    //             })
    //         }
    //     } catch (e) {
    //         api.error({
    //             message: "Erro ao conectar com o servidor!"
    //         })
    //     }
    //     setLoading(false)
    // }
    return (
        <div className="flex justify-center items-center h-screen overflow-hidden">
            <div className="w-full lg:w-[400px] p-4 lg:px-[60px]">
                <Form
                    layout="vertical"
                    className=""
                    onFinish={logar}
                >
                    <h3 className="flex justify-center lg:block text-xl font-bold mb-4 text-bege">Seja bem-vindo</h3>
                    <Form.Item
                        name={"email"}
                        label={"Email"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input placeholder="Digite seu email" />
                    </Form.Item>
                    <Form.Item
                        name={"senha"}
                        label={"Senha"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input.Password placeholder="********" />
                    </Form.Item>
                    <Button
                        type="primary"
                        className="w-full"
                        htmlType="submit"
                        loading={loading}
                    >
                        Entrar
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;
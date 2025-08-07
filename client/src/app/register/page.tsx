"use client";

import { Form, Input, Button, Card, Typography, Space, message } from "antd";
import { UserOutlined, LockOutlined, SmileOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";

const { Title, Text } = Typography;

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const { register } = useAuth();
  const onFinish = async (values: RegisterFormData) => {
    try {
      await register(values);
      messageApi.success("Registro realizado com sucesso!");
      router.push("/"); 
    } catch (err: any) {
      messageApi.error(err.message || "Erro ao registrar.");
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    messageApi.error("Erro ao registrar. Verifique os dados.");
  }

  return (
    <>
      {contextHolder}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-100 to-indigo-300 p-5 pb-[64px]">
        <Card className="w-full max-w-md shadow-2xl rounded-xl border-0">
          <Space direction="vertical" size="large" className="w-full">
            <div className="text-center">
              <Title level={2} className="!mb-0 !text-gray-800">
                SillyBlog
              </Title>
              <Text type="secondary" className="text-gray-600">
                Se registre!
              </Text>
            </div>

            <Form
              name="login"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="w-full"
            >
              <Form.Item
                label="Nome"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira seu nome!",
                  },
                  {
                    type: "string",
                    message: "Por favor, insira seu nome!",
                  },
                ]}
              >
                <Input
                  prefix={<SmileOutlined />}
                  placeholder="Seu nome"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira seu email!",
                  },
                  {
                    type: "email",
                    message: "Por favor, insira um email válido!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="seu@email.com"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                label="Senha"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira sua senha!",
                  },
                  {
                    min: 6,
                    message: "A senha deve ter pelo menos 6 caracteres!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Sua senha"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="w-full rounded-lg h-12 font-medium"
                >
                  Registrar
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center">
              <Text type="secondary" className="text-gray-600">
                Já tem uma conta?
                <Button
                  type="link"
                  onClick={() => router.push("/login")}
                  className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700"
                >
                  Entrar
                </Button>
              </Text>
            </div>
          </Space>
        </Card>
      </div>
    </>
  );
}

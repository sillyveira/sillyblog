"use client";

import { Form, Input, Button, Card, Typography, Space, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values: LoginFormData) => {
  try {
    const res = await fetch("http://10.0.0.200:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include", // importante para aceitar cookies do backend
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data?.error || "Erro ao fazer login");
    }

    messageApi.success("Login realizado com sucesso!");
    router.push("/");
  } catch (err: any) {
    messageApi.error(err.message || "Erro ao fazer login.");
  }
};
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    messageApi.error("Erro ao fazer login. Verifique suas credenciais.");
  };

  return (
    <>
      {contextHolder}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-100 to-pink-50 p-5 pb-[64px]">
        <Card className="w-full max-w-md shadow-2xl rounded-xl border-0">
          <Space direction="vertical" size="large" className="w-full">
            <div className="text-center">
              <Title level={2} className="!mb-0 !text-gray-800">
              SillyBlog
            </Title>
            <Text type="secondary" className="text-gray-600">
              Entre na sua conta
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
                Entrar
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center">
            <Text type="secondary" className="text-gray-600">
              Não tem uma conta?
              <Button
                type="link"
                onClick={() => router.push("/register")}
                className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700"
              >
                Cadastre-se
              </Button>
            </Text>
          </div>
        </Space>
      </Card>
    </div>

    </>
  );
}
import React, { useCallback } from 'react';

import { FiArrowLeft, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import * as Yup from 'yup';

import Input from '../../components/input';
import Button from '../../components/button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => {
    const handleSubmit = useCallback(async (data: object) => {
        try{
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string()
                    .min(6, 'No mínimo 6 dígitos'),
            });
            await schema.validate(data, {
                abortEarly: false
            });
        } catch(error){
            console.log(error);
        }
    }, [])
    return (
        <Container>
            <Background />
            <Content>
                <Form onSubmit={handleSubmit}>
                    <h1>Faça o seu Login</h1>
                    <Input name="email" icon={FiMail} placeholder="E-mail"/>
                    <Input name="password" icon={FiLock} placeholder="Senha" type="password"/>
                    <Button type="submit">Cadastrar</Button>
                    <a href="forgot">Esqueci minha senha</a>
                </Form>
                <a href="login">
                    <FiArrowLeft />
                    Voltar para Logon
                </a>
            </Content>
            <Background />
        </Container>
    )
}

export default SignIn;

import React, { useCallback, useRef } from 'react';
import getValidationErrors from '../../utils/getValidationErrors';
import { FiArrowLeft, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import * as Yup from 'yup';
import { FormHandles } from '@unform/core'
import Input from '../../components/input';
import Button from '../../components/button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const handleSubmit = useCallback(async (data: object) => {
        try{
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string()
                    .required('Senha Obrigatória'),
            });
            await schema.validate(data, {
                abortEarly: false
            });
        } catch(error){
            const errors = getValidationErrors(error);
            formRef.current?.setErrors(errors);
        }
    }, [])
    return (
        <Container>
            <Background />
            <Content>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça o seu Login</h1>
                    <Input name="email" icon={FiMail} placeholder="E-mail"/>
                    <Input name="password" icon={FiLock} placeholder="Senha" type="password"/>
                    <Button type="submit">Cadastrar</Button>
                    <a href="forgot">Esqueci minha senha</a>
                </Form>
                <a href="signIn">
                    <FiArrowLeft />
                    Criar conta
                </a>
            </Content>
            <Background />
        </Container>
    )
}

export default SignIn;

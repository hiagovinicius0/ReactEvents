import React from 'react';
import {AiFillDelete} from 'react-icons/ai'

import { Container, Background, Content, Events, Title, FormCreate } from './styles';
import cartaz from '../../assets/cartaz.jpg'

const events: React.FC = () => {
    return (
        <>

        <Container>
            <Background />
            <Content>
                <Title>Eventos</Title>
                <FormCreate>
                    <div>
                        <label>Nome: </label><input type="text"/>
                    </div>
                    <div>
                        <label>Local: </label><input type="text"/>
                    </div>
                    <div>
                        <label>Data: </label><input type="date"/>
                    </div>
                    <div>
                        <label>Imagem: </label><input type="file"/>
                    </div>
                    <button type="submit">Cadastrar</button>
                </FormCreate>
                <Events>
                    <a href="/">
                    <AiFillDelete size={20} />
                        <h1>30/09/2020</h1>
                        <h3>18h</h3>

                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <img src={cartaz} width="100%">
                        </img >
                    </a>
                    <a href="/">
                        <h1>30/09/2020</h1>
                        <h3>18h</h3>

                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <img src={cartaz} width="100%">
                        </img >
                    </a>
                    <a href="/">
                    <AiFillDelete size={20} />
                        <h1>30/09/2020</h1>
                        <h3>18h</h3>

                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <img src={cartaz} width="100%">
                        </img >
                    </a>
                    <a href="/">
                        <h1>30/09/2020</h1>
                        <h3>18h</h3>

                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <img src={cartaz} width="100%">
                        </img >
                    </a>
                </Events>
            </Content>
            <Background />
        </Container>

        </>
    )
}

export default events;
